
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { useJourney } from '../hooks/useJourney';


export default function Dashboard() {
    const { user, logout } = useAuth();
    const {
        careerPath,
        wellnessStats,
        goals,
        suggestedActions,
        addGoal,
        deleteGoal,
        addSubtask,
        toggleSubtask,
        calculateGoalProgress
    } = useJourney();

    const [activeTab, setActiveTab] = useState('overview'); // overview, career, wellness
    const [showGoalModal, setShowGoalModal] = useState(false);

    // New Goal Form State
    const [newGoalTitle, setNewGoalTitle] = useState("");
    const [newGoalCategory, setNewGoalCategory] = useState("career");
    const [newGoalDate, setNewGoalDate] = useState("");

    const handleAddGoal = (e) => {
        e.preventDefault();
        if (!newGoalTitle.trim()) return;
        addGoal(newGoalTitle, newGoalCategory, newGoalDate);
        setShowGoalModal(false);
        setNewGoalTitle("");
        setNewGoalDate("");
    };

    const [newSubtaskInputs, setNewSubtaskInputs] = useState({});

    const handleAddSubtask = (goalId) => {
        const text = newSubtaskInputs[goalId];
        if (!text?.trim()) return;
        addSubtask(goalId, text);
        setNewSubtaskInputs({ ...newSubtaskInputs, [goalId]: "" });
    };

    return (
        <div className="container" style={{ maxWidth: '1200px', paddingBottom: '4rem' }}>

            {/* Header */}
            <div className="glass-panel" style={{ padding: '3rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 className="title-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Your Journey</h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>Welcome back, <strong>{user?.name}</strong>!</p>
                </div>
                <button onClick={logout} className="btn-primary" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)' }}>
                    Log Out
                </button>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                {['overview', 'career', 'wellness'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            padding: '0.75rem 2rem',
                            borderRadius: '2rem',
                            fontSize: '1.1rem',
                            textTransform: 'capitalize',
                            background: activeTab === tab ? 'var(--primary-accent)' : 'rgba(255,255,255,0.05)',
                            color: activeTab === tab ? 'white' : 'var(--text-secondary)',
                            border: activeTab === tab ? 'none' : '1px solid var(--glass-border)',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            boxShadow: activeTab === tab ? '0 4px 6px -1px rgba(0,0,0,0.2)' : 'none'
                        }}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>

                {/* Left Column: Timeline & Stats */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* Visual Journey Timeline */}
                    <div className="glass-panel" style={{ padding: '2rem' }}>
                        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', color: 'var(--text-primary)' }}>My Path</h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
                            {/* Vertical Line */}
                            <div style={{ position: 'absolute', left: '15px', top: '10px', bottom: '10px', width: '2px', background: 'rgba(255,255,255,0.1)' }}></div>

                            {/* Step 1: Assessment */}
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                                <div style={{
                                    width: '32px', height: '32px', borderRadius: '50%',
                                    background: careerPath ? 'var(--primary-accent)' : 'rgba(255,255,255,0.1)',
                                    color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    {careerPath ? '✓' : '1'}
                                </div>
                                <div>
                                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.2rem' }}>Career Assessment</h4>
                                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{careerPath ? `Result: ${careerPath.toUpperCase()} ` : 'Not started'}</span>
                                </div>
                            </div>

                            {/* Step 2: Goal Setting */}
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                                <div style={{
                                    width: '32px', height: '32px', borderRadius: '50%',
                                    background: goals.length > 0 ? 'var(--primary-accent)' : 'rgba(255,255,255,0.1)',
                                    color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    {goals.length > 0 ? '✓' : '2'}
                                </div>
                                <div>
                                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.2rem' }}>Goal Setting</h4>
                                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{goals.length} Active Goals</span>
                                </div>
                            </div>

                            {/* Step 3: Consistent Action */}
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                                <div style={{
                                    width: '32px', height: '32px', borderRadius: '50%',
                                    background: wellnessStats.streak > 2 ? 'var(--primary-accent)' : 'rgba(255,255,255,0.1)',
                                    color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    3
                                </div>
                                <div>
                                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.2rem' }}>Consistent Action</h4>
                                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Current Streak: {wellnessStats.streak} Days</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Suggestions Card */}
                    <div className="glass-panel" style={{ padding: '2rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)' }}>
                        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Suggestions for You</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {suggestedActions.map((action, idx) => (
                                <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'start', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '0.5rem', boxShadow: 'none', border: '1px solid var(--glass-border)' }}>
                                    <div style={{ fontSize: '1.5rem' }}>{action.icon || '💡'}</div>
                                    <div>
                                        <p style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: '500' }}>{action.text}</p>
                                        <div style={{ marginTop: '0.5rem' }}>
                                            <span style={{
                                                fontSize: '0.75rem',
                                                textTransform: 'uppercase',
                                                padding: '0.2rem 0.5rem',
                                                borderRadius: '0.25rem',
                                                background: action.type === 'wellness' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(59, 130, 246, 0.2)',
                                                color: action.type === 'wellness' ? '#34d399' : '#60a5fa',
                                            }}>
                                                {action.type}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Active Goals */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    <div className="glass-panel" style={{ padding: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>Active Goals</h3>
                            <button
                                onClick={() => setShowGoalModal(!showGoalModal)}
                                className="btn-primary"
                                style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                            >
                                + New Goal
                            </button>
                        </div>

                        {/* Add Goal Form (Collapsible) */}
                        {showGoalModal && (
                            <form onSubmit={handleAddGoal} style={{
                                background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '1rem', marginBottom: '2rem',
                                border: '1px solid var(--glass-border)', animation: 'fadeIn 0.3s'
                            }}>
                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Goal Title</label>
                                    <input
                                        type="text"
                                        value={newGoalTitle}
                                        onChange={e => setNewGoalTitle(e.target.value)}
                                        placeholder="e.g., Complete Python Course"
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.1)', color: 'var(--text-primary)' }}
                                    />
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Category</label>
                                        <select
                                            value={newGoalCategory}
                                            onChange={e => setNewGoalCategory(e.target.value)}
                                            style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.1)', color: 'var(--text-primary)' }}
                                        >
                                            <option value="career" style={{ background: '#333' }}>Career</option>
                                            <option value="wellness" style={{ background: '#333' }}>Wellness</option>
                                        </select>
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Deadline</label>
                                        <input
                                            type="date"
                                            value={newGoalDate}
                                            onChange={e => setNewGoalDate(e.target.value)}
                                            style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.1)', color: 'var(--text-primary)' }}
                                        />
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                                    <button type="button" onClick={() => setShowGoalModal(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>Cancel</button>
                                    <button type="submit" className="btn-primary" style={{ padding: '0.5rem 1.5rem' }}>Add Goal</button>
                                </div>
                            </form>
                        )}

                        {/* Filtered Goals List */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {goals.filter(g => activeTab === 'overview' || g.category === activeTab).map(goal => (
                                <div key={goal.id} style={{
                                    background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '1rem',
                                    boxShadow: 'none', border: '1px solid var(--glass-border)'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                        <div>
                                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                                                <span style={{
                                                    fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '0.5px',
                                                    color: goal.category === 'career' ? '#60a5fa' : '#34d399'
                                                }}>
                                                    {goal.category}
                                                </span>
                                                {goal.deadline && <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>• Due {goal.deadline}</span>}
                                            </div>
                                            <h4 style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>{goal.title}</h4>
                                        </div>
                                        <button onClick={() => deleteGoal(goal.id)} style={{ color: 'var(--text-secondary)', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.5rem' }}>×</button>
                                    </div>

                                    {/* Subtasks */}
                                    <div style={{ marginBottom: '1rem' }}>
                                        {goal.subtasks && goal.subtasks.map(sub => (
                                            <div key={sub.id}
                                                onClick={() => toggleSubtask(goal.id, sub.id)}
                                                style={{
                                                    display: 'flex', gap: '0.75rem', alignItems: 'center', padding: '0.5rem 0',
                                                    cursor: 'pointer', opacity: sub.done ? 0.5 : 1
                                                }}>
                                                <div style={{
                                                    width: '18px', height: '18px', borderRadius: '4px', border: '2px solid var(--text-secondary)',
                                                    background: sub.done ? 'var(--text-secondary)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    color: 'var(--bg-color)', fontSize: '0.8rem'
                                                }}>
                                                    {sub.done && '✓'}
                                                </div>
                                                <span style={{ fontSize: '0.95rem', color: sub.done ? 'var(--text-secondary)' : 'var(--text-primary)', textDecoration: sub.done ? 'line-through' : 'none' }}>{sub.text}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Progress Bar & Add Subtask */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                                            <div style={{ width: `${calculateGoalProgress(goal)}% `, height: '100%', background: 'var(--primary-accent)', transition: 'width 0.3s' }}></div>
                                        </div>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{calculateGoalProgress(goal)}%</span>
                                    </div>

                                    <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                                        <input
                                            type="text"
                                            placeholder="Add a step..."
                                            value={newSubtaskInputs[goal.id] || ""}
                                            onChange={e => setNewSubtaskInputs({ ...newSubtaskInputs, [goal.id]: e.target.value })}
                                            onKeyPress={e => e.key === 'Enter' && handleAddSubtask(goal.id)}
                                            style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '0.5rem', padding: '0.5rem', fontSize: '0.9rem', color: 'var(--text-primary)' }}
                                        />
                                        <button
                                            onClick={() => handleAddSubtask(goal.id)}
                                            style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '0.5rem', padding: '0 1rem', cursor: 'pointer', color: 'var(--text-secondary)' }}
                                        >
                                            +
                                        </button>
                                    </div>

                                </div>
                            ))}
                            {goals.filter(g => activeTab === 'overview' || g.category === activeTab).length === 0 && (
                                <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8', fontStyle: 'italic', border: '2px dashed #e2e8f0', borderRadius: '1rem' }}>
                                    No goals found in this category. Click + New Goal to start!
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

