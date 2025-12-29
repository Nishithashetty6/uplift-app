import { useState } from 'react';
import { mentors } from '../data/mentorData';

export default function Mentorship() {
    const [filter, setFilter] = useState('all');
    const [connected, setConnected] = useState([]);

    const filteredMentors = filter === 'all'
        ? mentors
        : mentors.filter(m => m.category === filter);

    const handleConnect = (id) => {
        setConnected([...connected, id]);
        // In a real app, this would send an API request
    };

    return (
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 className="title-gradient" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Find a Mentor</h1>
                <p style={{ fontSize: '1.2rem', color: '#94a3b8' }}>
                    Connect with industry professionals who can guide your journey.
                </p>
            </div>

            {/* Filter Tabs */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
                {['all', 'tech', 'psych', 'art', 'eng'].map(cat => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: '2rem',
                            background: filter === cat ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                            border: 'none',
                            color: 'white',
                            cursor: 'pointer',
                            textTransform: 'capitalize',
                            fontWeight: 600,
                            transition: 'all 0.2s'
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                {filteredMentors.map(mentor => (
                    <div key={mentor.id} className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ fontSize: '3rem', background: 'rgba(255,255,255,0.1)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {mentor.image}
                            </div>
                            <div>
                                <h3 style={{ margin: 0 }}>{mentor.name}</h3>
                                <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.9rem' }}>{mentor.role}</p>
                                <p style={{ color: '#818cf8', margin: 0, fontSize: '0.8rem' }}>@ {mentor.company}</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {mentor.expertise.map(exp => (
                                <span key={exp} style={{ background: 'rgba(255,255,255,0.05)', padding: '0.25rem 0.5rem', borderRadius: '0.5rem', fontSize: '0.8rem', color: '#cbd5e1' }}>
                                    {exp}
                                </span>
                            ))}
                        </div>

                        <div style={{ marginTop: 'auto' }}>
                            <button
                                onClick={() => handleConnect(mentor.id)}
                                className="btn-primary"
                                disabled={connected.includes(mentor.id)}
                                style={{
                                    width: '100%',
                                    background: connected.includes(mentor.id) ? 'transparent' : undefined,
                                    border: connected.includes(mentor.id) ? '1px solid #10b981' : undefined,
                                    color: connected.includes(mentor.id) ? '#10b981' : 'white'
                                }}
                            >
                                {connected.includes(mentor.id) ? 'Request Sent ✓' : 'Connect'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
