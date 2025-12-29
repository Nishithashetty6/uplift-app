import { useState } from 'react';

export default function CareerRoadmap({ roadmap }) {
    const [activeStep, setActiveStep] = useState(0);

    if (!roadmap) return <div className="glass-panel" style={{ padding: '2rem' }}>Select a career to view its roadmap.</div>;

    return (
        <div className="glass-panel" style={{ padding: '2rem', marginTop: '2rem' }}>
            <h3 className="title-gradient" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>{roadmap.title}</h3>

            <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem' }}>
                {roadmap.steps.map((step, index) => (
                    <div
                        key={index}
                        onClick={() => setActiveStep(index)}
                        style={{
                            minWidth: '200px',
                            padding: '1.5rem',
                            borderRadius: '0.75rem',
                            background: activeStep === index ? 'rgba(99, 102, 241, 0.3)' : 'rgba(255,255,255,0.05)',
                            border: activeStep === index ? '1px solid #818cf8' : '1px solid transparent',
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            opacity: activeStep === index ? 1 : 0.7
                        }}
                    >
                        <div style={{
                            width: '30px',
                            height: '30px',
                            background: activeStep === index ? '#818cf8' : '#475569',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            marginBottom: '1rem'
                        }}>
                            {index + 1}
                        </div>
                        <h4 style={{ marginBottom: '0.5rem' }}>{step.title}</h4>
                    </div>
                ))}
            </div>

            <div className="glass-panel" style={{ marginTop: '1.5rem', padding: '1.5rem', background: 'rgba(0,0,0,0.2)' }}>
                <h4 style={{ fontSize: '1.4rem', color: '#c084fc', marginBottom: '0.5rem' }}>{roadmap.steps[activeStep].title}</h4>
                <p style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#e2e8f0' }}>{roadmap.steps[activeStep].description}</p>
                <div>
                    <span style={{ color: '#94a3b8', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Recommended Resources:</span>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                        {roadmap.steps[activeStep].resources.map(r => (
                            <span key={r} style={{ background: 'rgba(255,255,255,0.1)', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.9rem' }}>
                                {r}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
