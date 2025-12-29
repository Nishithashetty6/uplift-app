export default function ThreeCirclesBackground() {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: -1,
            overflow: 'hidden',
            background: '#2b211e', // Espresso Base
        }}>
            {/* The Vinyl Record Shape */}
            <div style={{
                position: 'fixed',
                top: '50%',
                right: '-20%',
                transform: 'translateY(-50%)',
                width: '80vh',
                height: '80vh',
                borderRadius: '50%',
                background: 'conic-gradient(from 0deg, #1a120f, #2b211e, #1a120f, #3e302b, #1a120f)',
                boxShadow: '0 0 100px rgba(0,0,0,0.5)',
                opacity: 0.15,
                animation: 'spin 30s linear infinite'
            }}>
                {/* Inner label area styling would go here, creating simple rings for now */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '30%',
                    height: '30%',
                    borderRadius: '50%',
                    background: '#d97757',
                    opacity: 0.1
                }} />
            </div>

            {/* Subtle Gradient Overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.4) 100%)',
                pointerEvents: 'none'
            }} />

            <style>{`
                @keyframes spin {
                    from { transform: translateY(-50%) rotate(0deg); }
                    to { transform: translateY(-50%) rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
