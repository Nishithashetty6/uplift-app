import { useState } from 'react';

export default function GroundingExercise({ onComplete }) {
    const [step, setStep] = useState(0);

    const steps = [
        { count: 5, action: "Identify 5 things you can SEE around you.", icon: "👁️" },
        { count: 4, action: "Identify 4 things you can TOUCH or FEEL.", icon: "✋" },
        { count: 3, action: "Identify 3 things you can HEAR.", icon: "👂" },
        { count: 2, action: "Identify 2 things you can SMELL.", icon: "👃" },
        { count: 1, action: "Identify 1 thing you can TASTE.", icon: "👅" }
    ];

    const handleNext = () => {
        if (step < steps.length - 1) {
            setStep(step + 1);
        } else {
            onComplete();
        }
    };

    const current = steps[step];

    return (
        <div style={{ textAlign: 'center', color: 'white', maxWidth: '400px', padding: '1rem' }}>
            <h2>5-4-3-2-1 Grounding</h2>
            <div style={{ fontSize: '4rem', margin: '1rem 0' }}>{current.icon}</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Find {current.count} things</h3>
            <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>{current.action}</p>

            <button
                onClick={handleNext}
                className="btn-primary"
                style={{ background: 'white', color: '#4f46e5', fontWeight: 'bold', border: 'none' }}
            >
                {step === steps.length - 1 ? "I'm Done" : "Next"}
            </button>
            <div style={{ marginTop: '1rem', opacity: 0.7 }}>Step {step + 1} of 5</div>
        </div>
    );
}
