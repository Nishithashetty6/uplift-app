import { useState, useEffect } from 'react';

export default function Focus() {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState('focus'); // focus, break
    const [task, setTask] = useState('');
    const [focusDuration, setFocusDuration] = useState(25);
    const [breakDuration, setBreakDuration] = useState(5);

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            if (mode === 'focus') {
                alert(`Great focus session! Take a ${breakDuration}-minute break.`);
                setMode('break');
                setTimeLeft(breakDuration * 60);
            } else {
                alert("Break is over! Ready to focus again?");
                setMode('focus');
                setTimeLeft(focusDuration * 60);
            }
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft, mode, focusDuration, breakDuration]);

    const toggleTimer = () => setIsActive(!isActive);

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(mode === 'focus' ? focusDuration * 60 : breakDuration * 60);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h1 className="title-gradient" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Deep Focus Mode</h1>
            <p style={{ fontSize: '1.2rem', color: '#94a3b8', marginBottom: '3rem' }}> Eliminate distractions and get in the zone.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>

                {/* Timer Section */}
                <div className="glass-panel" style={{ padding: '3rem' }}>

                    {/* Intention Input */}
                    <input
                        placeholder="I am focusing on..."
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        style={{
                            width: '100%',
                            background: 'transparent',
                            border: 'none',
                            borderBottom: '1px solid rgba(255,255,255,0.2)',
                            color: 'white',
                            fontSize: '1.2rem',
                            textAlign: 'center',
                            outline: 'none',
                            marginBottom: '2rem',
                            paddingBottom: '0.5rem'
                        }}
                    />

                    {/* Timer Display */}
                    <div style={{
                        fontSize: '6rem',
                        fontWeight: 'bold',
                        fontFamily: 'monospace',
                        marginBottom: '2rem',
                        color: mode === 'focus' ? '#99f6e4' : '#c084fc',
                        textShadow: '0 0 20px rgba(153, 246, 228, 0.3)'
                    }}>
                        {formatTime(timeLeft)}
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}>
                        <button onClick={toggleTimer} className="btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.2rem' }}>
                            {isActive ? 'Pause' : 'Start Focus'}
                        </button>
                        <button onClick={resetTimer} style={{ padding: '1rem', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '1rem', color: 'white', cursor: 'pointer' }}>
                            Reset
                        </button>
                    </div>

                    {/* Settings */}
                    {!isActive && (
                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', marginBottom: '1rem', display: 'flex', justifyContent: 'center', gap: '2rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <label style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Focus (min)</label>
                                <input
                                    type="number"
                                    value={focusDuration}
                                    onChange={(e) => setFocusDuration(Number(e.target.value))}
                                    style={{ width: '60px', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white', textAlign: 'center' }}
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <label style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Break (min)</label>
                                <input
                                    type="number"
                                    value={breakDuration}
                                    onChange={(e) => setBreakDuration(Number(e.target.value))}
                                    style={{ width: '60px', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white', textAlign: 'center' }}
                                />
                            </div>
                        </div>
                    )}

                    <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                        {mode === 'focus' ? 'Stay with the task. You got this.' : 'Relax. Breathe. Recharge.'}
                    </p>
                </div>

                {/* Ambience Section */}
                <div className="glass-panel" style={{ padding: '2rem' }}>
                    <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                        🎧 Lo-Fi Ambience
                    </h3>
                    <div style={{ borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
                        <iframe
                            style={{ borderRadius: '12px' }}
                            src="https://open.spotify.com/embed/playlist/0vvXsWCC9xrXsKd4FyS8kM?utm_source=generator&theme=0"
                            width="100%"
                            height="352"
                            frameBorder="0"
                            allowFullScreen=""
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                        ></iframe>
                    </div>
                    <p style={{ marginTop: '1rem', color: '#94a3b8', fontSize: '0.9rem' }}>
                        Curated beats for maximum concentration.
                    </p>
                </div>

            </div>
        </div>
    );
}
