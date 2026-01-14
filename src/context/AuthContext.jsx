import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for session
        const storedUser = localStorage.getItem('upLift_user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                // Validate that this is a "real" user with an ID (from backend)
                if (parsedUser && parsedUser.id) {
                    setUser(parsedUser);
                } else {
                    console.warn("Found legacy session without ID. Clearing.");
                    localStorage.removeItem('upLift_user');
                    localStorage.removeItem('upLift_token');
                }
            } catch (e) {
                console.error("Failed to parse session", e);
                localStorage.removeItem('upLift_user');
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const API_URL = import.meta.env.VITE_API_URL || '';
            const res = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            }).catch(err => {
                throw new Error('Server unreachable. Is the backend running?');
            });

            if (!res.ok) throw new Error('Login failed');

            const data = await res.json();
            setUser(data.user);
            localStorage.setItem('upLift_token', data.token); // Store token
            localStorage.setItem('upLift_user', JSON.stringify(data.user)); // Cache user
            return data.user;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const signup = async (name, email, password) => {
        try {
            const API_URL = import.meta.env.VITE_API_URL || '';
            const res = await fetch(`${API_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            }).catch(err => {
                throw new Error('Server unreachable. Is the backend running?');
            });

            if (!res.ok) throw new Error('Signup failed');

            const data = await res.json();
            setUser(data.user);
            localStorage.setItem('upLift_token', data.token);
            localStorage.setItem('upLift_user', JSON.stringify(data.user));
            return data.user;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    const updateUser = async (id, updates) => {
        try {
            const API_URL = import.meta.env.VITE_API_URL || '';
            const res = await fetch(`${API_URL}/api/users/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates)
            });
            if (!res.ok) throw new Error('Update failed');
            const updatedUser = await res.json();
            setUser(updatedUser);
            localStorage.setItem('upLift_user', JSON.stringify(updatedUser)); // Update cache
            return updatedUser;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('upLift_user');
        localStorage.removeItem('upLift_token');
    };

    const value = {
        user,
        login,
        signup,
        logout,
        updateUser,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
