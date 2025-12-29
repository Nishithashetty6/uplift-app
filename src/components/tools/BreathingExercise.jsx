import { useState, useEffect } from 'react';

export default function BreathingExercise({ onComplete }) {
    const [phase, setPhase] = useState('inhale'); // inhale, hold, exhale
    const [timeLeft, setTimeLeft] = useState(4);
    const [cycle, setCycle] = useState(1);
    const TOTAL_CYCLES = 3;

    useEffect(() => {
        let timer;
        if (cycle > TOTAL_CYCLES) {
            onComplete();
            return;
        }

        const tick = () => {
            setTimeLeft(prev => {
                if (prev > 1) return prev - 1;

                // Switch phase
                if (phase === 'inhale') {
                    setPhase('hold');
                    return 7;
                } else if (phase === 'hold') {
                    setPhase('exhale');
                    return 8;
                } else {
                    setPhase('inhale');
                    setCycle(c => c + 1);
                    return 4;
                }
            });
        };

        timer = setInterval(tick, 1000);
        return () => clearInterval(timer);
    }, [phase, cycle, onComplete]);

    const instructions = {
        inhale: "Inhale deeply...",
        hold: "Hold your breath...",
        exhale: "Exhale slowly..."
    };

    return (
        <div style={{ textAlign: 'center', color: 'white' }}>
            <h2>4-7-8 Breathing</h2>
            <div style={{
                width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)',
                margin: '2rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 1s ease-in-out',
                transform: phase === 'inhale' ? 'scale(1.5)' : (phase === 'exhale' ? 'scale(1)' : 'scale(1.2)')
            }}>
                <span style={{ fontSize: '3rem', fontWeight: 'bold' }}>{timeLeft}</span>
            </div>
            <h3>{instructions[phase]}</h3>
            <p>Cycle {Math.min(cycle, TOTAL_CYCLES)} / {TOTAL_CYCLES}</p>
        </div>
    );
}
