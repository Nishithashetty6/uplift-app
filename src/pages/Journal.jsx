import { useState, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useJourney } from '../hooks/useJourney';
import { analyzeRisk, detectMoodDrop } from '../utils/safetyAnalytics';
import SafetyPopup from '../components/SafetyPopup';
import WellnessNudge from '../components/WellnessNudge';
import ToolOverlay from '../components/tools/ToolOverlay';


export default function Journal() {
    const [posts, setPosts] = useLocalStorage('uplift_journal_posts', []);
    const [newPost, setNewPost] = useState("");
    const [selectedMood, setSelectedMood] = useState(null);

    const moods = ["😢", "😕", "😐", "🙂", "😄"];

    const [showSafetyPopup, setShowSafetyPopup] = useState(false);
    const [nudgeType, setNudgeType] = useState(null);
    const [activeTool, setActiveTool] = useState(null);

    const handlePost = () => {
        if (!newPost.trim() || !selectedMood) return;

        // 1. Analyze Safety Risk
        const risk = analyzeRisk(newPost);
        if (risk.level === 'HIGH') {
            setShowSafetyPopup(true);
            return; // Block saving for now in this demo, or save as flagged
        }

        // 2. Detect Mood Drop (Wellness Nudge)
        const isMoodDrop = detectMoodDrop(selectedMood, posts);

        // Check if current mood is 'sad' or 'confused' AND keywords match distress
        if ((selectedMood === '😢' || selectedMood === '😕') && risk.level === 'MODERATE') {
            setNudgeType('stress');
        } else if (isMoodDrop) {
            // If significantly worse than recent average
            setNudgeType('sadness');
        } else if (selectedMood === '😢') {
            setNudgeType('sadness');
        }

        const post = {
            id: Date.now(),
            content: newPost,
            date: new Date().toISOString(),
            mood: selectedMood
        };

        setPosts([post, ...posts]);
        setNewPost("");
        setSelectedMood(null);
    };

    const { wellnessStats } = useJourney();
    const streak = wellnessStats.streak;

    return (
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '4rem' }}>

            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 className="title-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Your Sanctuary</h1>
                <p style={{ fontSize: '1.1rem', color: '#64748b' }}>
                    This space is private and safe. No one sees this but you.
                </p>
            </div>

            {/* Insight Banner */}
            {streak > 0 && (
                <div style={{
                    background: '#ecfdf5',
                    color: '#047857',
                    padding: '1rem',
                    borderRadius: '1rem',
                    marginBottom: '2rem',
                    border: '1px solid #d1fae5',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    justifyContent: 'center'
                }}>
                    <span>🌿</span>
                    <strong>You're doing great!</strong>
                    <span>You've taken time for yourself {streak} days in a row.</span>
                </div>
            )}

            {/* Writing Area */}
            <div className="glass-panel" style={{ padding: '2.5rem', marginBottom: '3rem', background: 'white', border: '1px solid #e2e8f0' }}>

                <label style={{ display: 'block', marginBottom: '1rem', color: '#475569', fontWeight: '600' }}>
                    How are you feeling right now?
                </label>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                    {moods.map(m => (
                        <button
                            key={m}
                            onClick={() => setSelectedMood(m)}
                            style={{
                                fontSize: '2rem',
                                background: selectedMood === m ? '#f0f9ff' : 'transparent',
                                border: selectedMood === m ? '2px solid #bae6fd' : '2px solid transparent',
                                borderRadius: '50%',
                                width: '60px',
                                height: '60px',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                transform: selectedMood === m ? 'scale(1.1)' : 'scale(1)'
                            }}
                        >
                            {m}
                        </button>
                    ))}
                </div>

                <textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="Take a deep breath and write whatever comes to mind..."
                    style={{
                        width: '100%',
                        minHeight: '200px',
                        background: '#f8fafc',
                        border: 'none',
                        borderRadius: '1rem',
                        color: '#334155',
                        padding: '1.5rem',
                        marginBottom: '1.5rem',
                        resize: 'none',
                        fontSize: '1.2rem',
                        lineHeight: '1.8',
                        fontFamily: 'inherit',
                        outline: 'none',
                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
                    }}
                />

                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
                        {newPost.length > 0 ? 'Draft saved locally' : ''}
                    </span>
                    <button
                        onClick={handlePost}
                        className="btn-primary"
                        disabled={!newPost.trim() || !selectedMood}
                        style={{
                            opacity: (!newPost.trim() || !selectedMood) ? 0.5 : 1,
                            padding: '0.75rem 2rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <span>Save Entry</span>
                        <span>✨</span>
                    </button>
                </div>
            </div>

            {/* Past Entries */}
            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', color: '#1e293b' }}>Reflection History</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {posts.map(post => (
                    <div key={post.id} className="glass-panel" style={{ padding: '2rem', background: 'rgba(255,255,255,0.6)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ fontSize: '1.5rem' }}>{post.mood || '😐'}</span>
                                <span style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: '500' }}>{post.date}</span>
                            </div>
                        </div>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: '#334155', whiteSpace: 'pre-wrap' }}>
                            {post.content}
                        </p>
                    </div>
                ))}
                {posts.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '4rem', color: '#94a3b8' }}>
                        No entries yet. Start your journey today.
                    </div>
                )}
            </div>

            {/* Safety & Wellness Overlays */}
            <SafetyPopup isOpen={showSafetyPopup} onClose={() => setShowSafetyPopup(false)} />

            <ToolOverlay toolType={activeTool} onClose={() => setActiveTool(null)} />

            {nudgeType && (
                <WellnessNudge
                    type={nudgeType}
                    onAction={() => {
                        setNudgeType(null); // Close nudge
                        if (nudgeType === 'stress') setActiveTool('breathing');
                        if (nudgeType === 'sadness') setActiveTool('grounding'); // Or another tool
                    }}
                    onClose={() => setNudgeType(null)}
                />
            )}
        </div>
    );
}
