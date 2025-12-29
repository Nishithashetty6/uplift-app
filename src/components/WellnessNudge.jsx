import { useState, useEffect } from 'react';

export default function WellnessNudge({ type, onAction, onClose }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
        const timer = setTimeout(() => setVisible(false), 10000); // Auto hide after 10s
        return () => clearTimeout(timer);
    }, []);

    if (!visible) return null;

    const content = {
        stress: {
            icon: '🍃',
            title: "Rough day?",
            message: "You seem a bit overwhelmed. Want to take a 1-minute breather?",
            action: "Start Breathing"
        },
        sadness: {
            icon: '💙',
            title: "Sending hugs",
            message: "It's okay to feel this way. Remember to be kind to yourself.",
            action: "Read Positivity"
        }
    };

    const data = content[type] || content.stress;

    return (
        <div style={{
            position: 'fixed', bottom: '6rem', left: '50%', transform: 'translateX(-50%)',
            background: 'white', padding: '1rem 1.5rem', borderRadius: '3rem',
            boxShadow: '0 10px 25px rgba(0,0,0,0.15)', zIndex: 900,
            display: 'flex', alignItems: 'center', gap: '1rem',
            animation: 'slideUpFade 0.5s ease-out'
        }}>
            <span style={{ fontSize: '1.5rem' }}>{data.icon}</span>
            <div>
                <strong style={{ display: 'block', fontSize: '0.9rem', color: '#1e293b' }}>{data.title}</strong>
                <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{data.message}</span>
            </div>
            <button
                onClick={onAction}
                style={{
                    background: '#ecfdf5', color: '#059669', border: 'none',
                    padding: '0.5rem 1rem', borderRadius: '1.5rem', fontWeight: 'bold',
                    cursor: 'pointer', fontSize: '0.85rem'
                }}
            >
                {data.action}
            </button>
            <button onClick={() => setVisible(false)} style={{ background: 'transparent', border: 'none', color: '#cbd5e1', cursor: 'pointer' }}>×</button>
        </div>
    );
}
