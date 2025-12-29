import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <h1 className="title-gradient" style={{ fontSize: '4rem', marginBottom: '1rem' }}>
                upLift
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 4rem' }}>
                Your comprehensive companion for career clarity, mental wellness, and personal growth.
            </p>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
                padding: '0 1rem'
            }}>
                <Link to="/career" className="glass-panel" style={{ padding: '2rem', textAlign: 'left', transition: 'transform 0.2s', display: 'block', textDecoration: 'none' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🚀</div>
                    <h2 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Career Guidance</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Discover your path with our AI-powered interest test and detailed career insights.</p>
                </Link>

                <Link to="/mental-health" className="glass-panel" style={{ padding: '2rem', textAlign: 'left', transition: 'transform 0.2s', display: 'block', textDecoration: 'none' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🧘</div>
                    <h2 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Mental Wellness</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Track your mood, get insights, and maintain a healthy state of mind.</p>
                </Link>

                <Link to="/journal" className="glass-panel" style={{ padding: '2rem', textAlign: 'left', transition: 'transform 0.2s', display: 'block', textDecoration: 'none' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📔</div>
                    <h2 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Journaling</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Express your thoughts safely and reflect on your daily journey.</p>
                </Link>
            </div>
        </div>
    );
}
