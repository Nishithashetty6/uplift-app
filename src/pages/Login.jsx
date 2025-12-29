import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError('');
            setLoading(true);
            await login(email, password);
            navigate('/dashboard'); // Redirect to dashboard after login
        } catch {
            setError('Failed to log in');
        }
        setLoading(false);
    };

    return (
        <div className="container" style={{ maxWidth: '400px', margin: '4rem auto' }}>
            <div className="glass-panel" style={{ padding: '2rem', background: 'rgba(255,255,255,0.8)' }}>
                <h2 className="title-gradient" style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>Welcome Back</h2>

                {error && <div style={{ background: '#fee2e2', color: '#ef4444', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: '0.5rem',
                                border: '1px solid #e2e8f0',
                                background: 'white',
                                color: '#1e293b',
                                outline: 'none'
                            }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '500' }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: '0.5rem',
                                border: '1px solid #e2e8f0',
                                background: 'white',
                                color: '#1e293b',
                                outline: 'none'
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={loading}
                        style={{ marginTop: '1rem', fontSize: '1rem' }}
                    >
                        {loading ? 'Logging in...' : 'Log In'}
                    </button>
                </form>

                <div style={{ marginTop: '1.5rem', textAlign: 'center', color: '#64748b' }}>
                    Don't have an account? <Link to="/signup" style={{ color: '#0d9488', fontWeight: '600' }}>Sign Up</Link>
                </div>
            </div>
        </div>
    );
}
