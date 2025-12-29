import { useState } from 'react';
import ActionPlan from '../components/ActionPlan';
import { useChat } from '../context/ChatContext';
import { questions, careers } from '../data/careerData';
import { roadmaps, marketStats } from '../data/roadmapData';
import CareerRoadmap from '../components/CareerRoadmap';
import MarketAnalytics from '../components/MarketAnalytics';


export default function Career() {
    const [step, setStep] = useState('start'); // start, test, result
    const [answers, setAnswers] = useState({});
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [scores, setScores] = useState({ tech: 0, psych: 0, art: 0, eng: 0 });
    const [result, setResult] = useState(null);
    const [resultKey, setResultKey] = useState(null);
    const { openChat } = useChat();

    const startTest = () => setStep('test');

    const handleAnswer = (type) => {
        const newScores = { ...scores, [type]: scores[type] + 1 };
        setScores(newScores);

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            calculateResult(newScores);
        }
    };

    const calculateResult = (finalScores) => {
        const sorted = Object.entries(finalScores).sort((a, b) => b[1] - a[1]);
        const topType = sorted[0][0];
        setResult(careers[topType]);
        setResultKey(topType);
        setStep('result');

        // Persist result for Dashboard
        localStorage.setItem('uplift_career_path', topType);


    };

    const reset = () => {
        setStep('start');
        setCurrentQuestion(0);
        setScores({ tech: 0, psych: 0, art: 0, eng: 0 });
        setResult(null);
        setResultKey(null);
    };

    return (
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            {step === 'start' && (
                <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center' }}>
                    <h1 className="title-gradient" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Find Your Path</h1>
                    <p style={{ fontSize: '1.2rem', color: '#94a3b8', marginBottom: '2rem' }}>
                        Take our AI-powered assessment to discover a career that matches your passion and potential.
                    </p>
                    <button onClick={startTest} className="btn-primary" style={{ fontSize: '1.2rem', padding: '1rem 3rem' }}>
                        Start Assessment
                    </button>
                </div>
            )}

            {step === 'test' && (
                <div className="glass-panel" style={{ padding: '3rem' }}>
                    <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', color: '#94a3b8' }}>
                        <span>Question {currentQuestion + 1} of {questions.length}</span>
                        <span>{Math.round(((currentQuestion) / questions.length) * 100)}% Completed</span>
                    </div>

                    <h2 style={{ fontSize: '2rem', marginBottom: '3rem', textAlign: 'center' }}>
                        {questions[currentQuestion].question}
                    </h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                        {questions[currentQuestion].options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswer(option.type)}
                                className="glass-panel"
                                style={{
                                    padding: '2rem',
                                    fontSize: '1.1rem',
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    border: '1px solid rgba(255,255,255,0.1)'
                                }}
                                onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                            >
                                {option.text}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {step === 'result' && result && (
                <div style={{ animation: 'fadeIn 0.5s' }}>
                    <div className="glass-panel" style={{ padding: '3rem', marginBottom: '2rem' }}>
                        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{result.icon}</div>
                            <h2 className="title-gradient" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{result.title}</h2>
                            <p style={{ fontSize: '1.2rem', color: '#e2e8f0' }}>{result.description}</p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '1rem' }}>
                            <div className="glass-panel" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.05)' }}>
                                <h3 style={{ color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase' }}>PAST</h3>
                                <p>{result.past}</p>
                            </div>
                            <div className="glass-panel" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--primary)' }}>
                                <h3 style={{ color: '#818cf8', marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase' }}>PRESENT</h3>
                                <p>{result.present}</p>
                            </div>
                            <div className="glass-panel" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.05)' }}>
                                <h3 style={{ color: '#c084fc', marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase' }}>FUTURE</h3>
                                <p>{result.future}</p>
                            </div>
                        </div>
                    </div>

                    {/* AI Coach & Action Plan */}
                    <ActionPlan
                        role={result.title}
                        onAskCoach={() => openChat(`Can you tell me more about becoming a ${result.title}? What skills do I need?`)}
                    />

                    <CareerRoadmap roadmap={roadmaps[resultKey]} />

                    <MarketAnalytics stats={marketStats[resultKey]} />

                    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                        <button onClick={reset} style={{ background: 'transparent', border: '1px solid #94a3b8', color: '#94a3b8', padding: '0.75rem 2rem', borderRadius: '0.5rem', cursor: 'pointer' }}>
                            Retake Assessment
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
