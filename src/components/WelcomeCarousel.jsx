import { useState } from 'react';

const slides = [
    {
        id: 1,
        title: "Explore Your Path",
        description: "Discover careers that match your unique passions and skills.",
        icon: "🚀",
        color: "#818cf8"
    },
    {
        id: 2,
        title: "Nurture Your Mind",
        description: "Track your moods and build healthy mental habits.",
        icon: "🧠",
        color: "#2dd4bf"
    },
    {
        id: 3,
        title: "Grow Together",
        description: "Connect with mentors and peers in a safe community.",
        icon: "🤝",
        color: "#f472b6"
    }
];

export default function WelcomeCarousel({ onComplete }) {
    const [current, setCurrent] = useState(0);

    const next = () => {
        if (current < slides.length - 1) {
            setCurrent(current + 1);
        } else {
            onComplete();
        }
    };

    return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{
                fontSize: '5rem',
                marginBottom: '1rem',
                animation: 'bounce 2s infinite ease-in-out'
            }}>
                {slides[current].icon}
            </div>

            <h2 style={{
                fontSize: '2rem',
                marginBottom: '1rem',
                color: 'var(--text-primary)',
                fontWeight: '700'
            }}>
                {slides[current].title}
            </h2>

            <p style={{
                fontSize: '1.2rem',
                color: 'var(--text-secondary)',
                marginBottom: '3rem',
                minHeight: '60px'
            }}>
                {slides[current].description}
            </p>

            {/* Dots */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '3rem' }}>
                {slides.map((_, idx) => (
                    <div key={idx} style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        background: idx === current ? slides[current].color : '#e2e8f0',
                        transition: 'all 0.3s'
                    }} />
                ))}
            </div>

            <button
                onClick={next}
                className="btn-primary"
                style={{
                    padding: '1rem 3rem',
                    fontSize: '1.2rem',
                    background: slides[current].color,
                    border: 'none',
                    boxShadow: `0 4px 14px -4px ${slides[current].color}`
                }}
            >
                {current === slides.length - 1 ? "Get Started" : "Next"}
            </button>

            <style>{`
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
            `}</style>
        </div>
    );
}
