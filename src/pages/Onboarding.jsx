import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import WelcomeCarousel from '../components/WelcomeCarousel';

export default function Onboarding() {
    const { user, updateUser } = useAuth();
    const navigate = useNavigate();
    const [step, setStep] = useState('intro'); // intro | form

    // Form State
    const [formData, setFormData] = useState({
        role: 'student',
        interests: '',
        bio: ''
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.interests || !formData.bio) {
            setError("Please fill in all fields.");
            return;
        }

        if (!user || !user.id) {
            setError("User session invalid. Please log in again.");
            return;
        }

        try {
            const success = await updateUser(user.id, formData);
            if (success) {
                navigate('/');
            } else {
                setError("Failed to update profile. Please try again.");
            }
        } catch (err) {
            console.error("Onboarding error:", err);
            setError("An unexpected error occurred.");
        }
    };

    if (step === 'intro') {
        return (
            <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
                <div className="glass-panel" style={{ maxWidth: '600px', width: '100%', padding: '0' }}>
                    <WelcomeCarousel onComplete={() => setStep('form')} />
                </div>
            </div>
        );
    }

    return (
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <div className="glass-panel" style={{ maxWidth: '500px', width: '100%', padding: '2.5rem' }}>
                <h2 className="title-gradient" style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '2rem' }}>Complete Profile</h2>

                {error && <div style={{ background: '#fee2e2', color: '#dc2626', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    <div>
                        <label style={labelStyle}>I am a...</label>
                        <select
                            style={inputStyle}
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        >
                            <option value="student">Student</option>
                            <option value="job_seeker">Job Seeker</option>
                            <option value="professional">Professional</option>
                        </select>
                    </div>

                    <div>
                        <label style={labelStyle}>Career Interests</label>
                        <input
                            type="text"
                            style={inputStyle}
                            placeholder="e.g., Design, Engineering, Marketing"
                            value={formData.interests}
                            onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                        />
                    </div>

                    <div>
                        <label style={labelStyle}>Short Bio</label>
                        <textarea
                            style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
                            placeholder="Tell us a bit about yourself..."
                            value={formData.bio}
                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        />
                    </div>

                    <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem', fontSize: '1.1rem' }}>
                        Get Started
                    </button>
                </form>
            </div>
        </div>
    );
}

const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    color: 'var(--text-secondary)',
    fontWeight: '500'
};

const inputStyle = {
    width: '100%',
    padding: '0.8rem',
    background: '#f8fafc',
    border: '1px solid #cbd5e1',
    borderRadius: '0.5rem',
    color: '#334155',
    outline: 'none',
    transition: 'border-color 0.2s',
    fontSize: '1rem'
};
