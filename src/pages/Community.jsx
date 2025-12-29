import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useJourney } from '../hooks/useJourney';

const CAREER_LABELS = {
    tech: 'Technology',
    psych: 'Psychology',
    art: 'Creative',
    eng: 'Engineering',
    biz: 'Business',
    all: 'All',
    general: 'General'
};

export default function Community() {
    const { user } = useAuth();
    const { careerPath } = useJourney();
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({ title: '', content: '', isAnonymous: false });
    const [category, setCategory] = useState('General');
    const [filter, setFilter] = useState('All');
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const res = await fetch(`${API_URL}/api/posts`);
            const data = await res.json();
            setPosts(data);
        } catch (err) {
            console.error("Failed to fetch posts", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handlePost = async () => {
        if (!newPost.title || !newPost.content) return;

        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const res = await fetch(`${API_URL}/api/posts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...newPost,
                    authorName: user.name,
                    authorEmail: user.email,
                    tags: [category]
                })
            });

            if (res.ok) {
                setNewPost({ title: '', content: '', isAnonymous: false });
                fetchPosts(); // Refresh feed
            }
        } catch (err) {
            console.error("Failed to post", err);
        }
    };

    return (
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 className="title-gradient" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Community Stories</h1>
                <p style={{ fontSize: '1.2rem', color: '#94a3b8' }}>Share your journey, anonymously if you prefer.</p>
            </div>

            {/* Filter Bar */}
            <div className="glass-panel" style={{ padding: '1rem', marginBottom: '2rem', display: 'flex', gap: '0.5rem', overflowX: 'auto', alignItems: 'center' }}>
                <span style={{ fontSize: '0.9rem', color: '#94a3b8', marginRight: '0.5rem' }}>Filter:</span>
                {['All', 'Technology', 'Creative', 'Business', 'Healthcare', 'General'].map(cat => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '1rem',
                            border: 'none',
                            background: filter === cat ? 'var(--primary-dark)' : 'rgba(255,255,255,0.1)',
                            color: filter === cat ? 'white' : '#64748b',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {cat}
                    </button>
                ))}

                {/* My Match Button */}
                {careerPath && (
                    <button
                        onClick={() => setFilter(CAREER_LABELS[careerPath] || 'All')}
                        style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '1rem',
                            border: '1px solid var(--secondary-dark)',
                            background: filter === (CAREER_LABELS[careerPath] || 'All') ? 'var(--secondary-dark)' : 'transparent',
                            color: filter === (CAREER_LABELS[careerPath] || 'All') ? 'white' : 'var(--secondary-dark)',
                            cursor: 'pointer',
                            marginLeft: 'auto',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.3rem'
                        }}
                    >
                        ✨ My Match
                    </button>
                )}
            </div>

            {/* Create Post */}
            <div className="glass-panel" style={{ padding: '2rem', marginBottom: '3rem' }}>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                    <input
                        placeholder="Title"
                        value={newPost.title}
                        onChange={e => setNewPost({ ...newPost, title: e.target.value })}
                        style={{ ...inputStyle, fontSize: '1.2rem', fontWeight: 'bold' }}
                    />
                    <select
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        style={{ ...inputStyle, width: 'auto', cursor: 'pointer' }}
                    >
                        {['General', 'Technology', 'Creative', 'Business', 'Healthcare', 'Wellness'].map(c => (
                            <option key={c} value={c} style={{ color: '#333' }}>{c}</option>
                        ))}
                    </select>
                </div>

                <textarea
                    placeholder="Share your story..."
                    value={newPost.content}
                    onChange={e => setNewPost({ ...newPost, content: e.target.value })}
                    style={{ ...inputStyle, height: '120px', resize: 'none', marginBottom: '1rem' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: '#cbd5e1' }}>
                        <input
                            type="checkbox"
                            checked={newPost.isAnonymous}
                            onChange={e => setNewPost({ ...newPost, isAnonymous: e.target.checked })}
                        />
                        Post Anonymously
                    </label>
                    <button onClick={handlePost} className="btn-primary" style={{ padding: '0.75rem 2rem' }}>
                        Publish Post
                    </button>
                </div>
            </div>

            {/* Feed */}
            {loading ? <div style={{ textAlign: 'center' }}>Loading stories...</div> : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                    {posts
                        .filter(post => filter === 'All' || (post.tags && post.tags.includes(filter)))
                        .map(post => {
                            const isOwner = post.authorEmail === user.email;

                            return (
                                <div key={post.id} className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                                    {isOwner && (
                                        <button
                                            onClick={async () => {
                                                if (window.confirm("Delete this post?")) {
                                                    try {
                                                        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                                                        await fetch(`${API_URL}/api/posts/${post.id}`, { method: 'DELETE' });
                                                        setPosts(posts.filter(p => p.id !== post.id));
                                                    } catch (e) { console.error("Delete failed", e); }
                                                }
                                            }}
                                            style={{
                                                position: 'absolute',
                                                top: '1rem',
                                                right: '1rem',
                                                background: 'rgba(255,0,0,0.1)',
                                                border: 'none',
                                                borderRadius: '50%',
                                                width: '32px',
                                                height: '32px',
                                                color: '#f87171', // Red-400
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                            title="Delete Post"
                                        >
                                            🗑️
                                        </button>
                                    )}

                                    <div style={{ marginBottom: '1rem', paddingRight: '2rem' }}>
                                        <span style={{
                                            background: 'rgba(255,255,255,0.1)',
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '1rem',
                                            fontSize: '0.8rem',
                                            color: '#cbd5e1'
                                        }}>
                                            {post.tags[0] || 'Story'}
                                        </span>
                                    </div>
                                    <h3 style={{ marginBottom: '0.5rem', fontSize: '1.4rem' }}>{post.title}</h3>
                                    <p style={{ color: '#e2e8f0', lineHeight: '1.6', flex: 1, marginBottom: '1.5rem' }}>
                                        {post.content}
                                    </p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem', color: '#94a3b8', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                                        <span>By {post.author}</span>
                                        <span>{new Date(post.timestamp).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            )}
        </div>
    );
}

const inputStyle = {
    width: '100%',
    padding: '1rem',
    borderRadius: '0.5rem',
    background: 'rgba(255,255,255,0.9)', // High opacity white
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#1e293b', // Slate 800 (Dark text)
    fontFamily: 'inherit'
};
