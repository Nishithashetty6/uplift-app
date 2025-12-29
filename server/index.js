import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, 'db.json');
const SECRET_KEY = 'super-secret-key-for-dev'; // In prod, use ENV

const app = express();
app.use(cors());
app.use(express.json());

// Helper to read/write DB
const getDb = async () => {
    try {
        const data = await fs.readFile(DB_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (e) {
        return { users: [], posts: [] };
    }
};

const saveDb = async (data) => {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
};

// --- AUTH ROUTES ---

app.post('/api/auth/register', async (req, res) => {
    const { name, email, password } = req.body;
    const db = await getDb();

    if (db.users.find(u => u.email === email)) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = { id: Date.now(), name, email, password, role: 'student', isOnboarded: false }; // Password should be hashed in real app
    db.users.push(newUser);
    await saveDb(db);

    const token = jwt.sign({ id: newUser.id, email: newUser.email }, SECRET_KEY, { expiresIn: '1h' });
    res.status(201).json({ user: newUser, token });
});

app.put('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    console.log(`[PUT] Update user ${id}`, updates); // Debug log

    const db = await getDb();

    // Check if user exists (compare as strings just in case)
    const userIndex = db.users.findIndex(u => String(u.id) === String(id));

    if (userIndex === -1) {
        console.log(`[PUT] User ${id} not found`);
        return res.status(404).json({ message: 'User not found' });
    }

    // Merge updates
    db.users[userIndex] = { ...db.users[userIndex], ...updates, isOnboarded: true };
    await saveDb(db);
    console.log(`[PUT] User ${id} updated successfully`);

    res.json(db.users[userIndex]);
});

app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    const db = await getDb();

    const user = db.users.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ user, token });
});

// --- POST ROUTES ---

app.get('/api/posts', async (req, res) => {
    const db = await getDb();
    res.json(db.posts.sort((a, b) => b.timestamp.localeCompare(a.timestamp)));
});

app.post('/api/posts', async (req, res) => {
    const { title, content, isAnonymous, tags, authorName, authorEmail } = req.body;
    const db = await getDb();

    const newPost = {
        id: Date.now(),
        title,
        content,
        author: isAnonymous ? "Anonymous Student" : authorName,
        authorEmail, // Store for ownership check
        tags: tags || [],
        timestamp: new Date().toISOString(),
        likes: 0
    };

    db.posts.push(newPost);
    await saveDb(db);
    res.status(201).json(newPost);
});

app.delete('/api/posts/:id', async (req, res) => {
    const { id } = req.params;
    const db = await getDb();

    const postIndex = db.posts.findIndex(p => String(p.id) === String(id));
    if (postIndex === -1) {
        return res.status(404).json({ message: 'Post not found' });
    }

    // In a real app, verify req.body.email matches post.authorEmail here for security
    // For this prototype, we're trusting the frontend owner check

    db.posts.splice(postIndex, 1);
    await saveDb(db);
    res.json({ message: 'Post deleted' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
