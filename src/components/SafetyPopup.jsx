import { crisisResources } from '../data/chatData';

export default function SafetyPopup({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.8)', zIndex: 9999,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(5px)'
        }}>
            <div style={{
                background: 'white', maxWidth: '500px', width: '90%',
                borderRadius: '1rem', overflow: 'hidden',
                animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}>
                <div style={{ background: '#dc2626', padding: '1.5rem', color: 'white', textAlign: 'center' }}>
                    <h2 style={{ margin: 0, fontSize: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        ⚠️ You are not alone.
                    </h2>
                </div>

                <div style={{ padding: '2rem' }}>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#334155', marginBottom: '2rem', textAlign: 'center' }}>
                        We noticed you might be going through a difficult time. There are people who want to support you right now.
                        Please reach out.
                    </p>

                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {crisisResources.map((res, idx) => (
                            <div key={idx} style={{
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                padding: '1rem', background: '#fef2f2', border: '1px solid #fee2e2', borderRadius: '0.5rem'
                            }}>
                                <div>
                                    <strong style={{ display: 'block', color: '#991b1b' }}>{res.name}</strong>
                                    <span style={{ fontSize: '0.9rem', color: '#b91c1c' }}>{res.description}</span>
                                </div>
                                <a href={`tel:${res.number.replace(/\D/g, '')}`} className="btn-primary" style={{
                                    background: '#dc2626', padding: '0.5rem 1.5rem', textDecoration: 'none'
                                }}>
                                    Call {res.number}
                                </a>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                        <button
                            onClick={() => {
                                alert("Simulation: A counselor would be notified here.");
                            }}
                            style={{
                                background: 'transparent', border: '1px solid #cbd5e1', padding: '0.75rem 2rem',
                                borderRadius: '0.5rem', color: '#64748b', cursor: 'pointer', marginRight: '1rem'
                            }}
                        >
                            Notify a Counselor
                        </button>
                        <button
                            onClick={onClose}
                            style={{ color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                        >
                            I'm safe, close this
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
