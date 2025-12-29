import { useState } from 'react';
import { resources } from '../data/resourceData';

export default function Resources() {
    const [filter, setFilter] = useState('all');

    const filteredResources = filter === 'all'
        ? resources
        : resources.filter(r => r.category === filter);

    return (
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 className="title-gradient" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Learning Hub</h1>
                <p style={{ fontSize: '1.2rem', color: '#94a3b8' }}>
                    Curated courses, articles, and videos to kickstart your journey.
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
                {filteredResources.map(resource => (
                    <div key={resource.id} className="glass-panel" style={{ padding: '2rem', transition: 'transform 0.2s' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{resource.image}</div>
                        <div style={{
                            display: 'inline-block',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '0.5rem',
                            background: 'rgba(255,255,255,0.1)',
                            fontSize: '0.8rem',
                            marginBottom: '1rem',
                            color: '#cbd5e1'
                        }}>
                            {resource.type}
                        </div>
                        <h3 style={{ marginBottom: '0.5rem', lineHeight: '1.4' }}>{resource.title}</h3>
                        <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Provided by {resource.provider}</p>
                        <a
                            href={resource.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                color: '#818cf8',
                                fontWeight: '600',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                textDecoration: 'none'
                            }}
                        >
                            Access Resource →
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}
