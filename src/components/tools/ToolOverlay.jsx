import BreathingExercise from './BreathingExercise';
import GroundingExercise from './GroundingExercise';

export default function ToolOverlay({ toolType, onClose }) {
    if (!toolType) return null;

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(30, 41, 59, 0.95)', zIndex: 9999,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(5px)', color: 'white'
        }}>
            <button
                onClick={onClose}
                style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'none', border: 'none', color: 'white', fontSize: '2rem', cursor: 'pointer' }}
            >
                ×
            </button>

            {toolType === 'breathing' && <BreathingExercise onComplete={onClose} />}
            {toolType === 'grounding' && <GroundingExercise onComplete={onClose} />}
        </div>
    );
}
