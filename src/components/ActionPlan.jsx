export default function ActionPlan({ role, onAskCoach }) {
    if (!role) return null;

    // Mock Data - In a real app, this would come from a database based on the 'role' ID
    const planData = {
        courses: [
            { title: `${role} Fundamentals`, platform: "Coursera", duration: "4 weeks" },
            { title: "Advanced Portfolio Building", platform: "Udemy", duration: "2 weeks" },
        ],
        projects: [
            "Build a personal portfolio website",
            "Contribute to an open-source project",
            "Create a case study based on a real-world problem"
        ],
        internship: [
            "Update LinkedIn profile with key skills",
            "Network with 3 professionals in the field",
            "Apply to 5 entry-level positions"
        ]
    };

    return (
        <div style={{ marginTop: '3rem', textAlign: 'left', animation: 'fadeIn 0.5s' }}>
            <h2 className="title-gradient" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>
                🚀 Kickstart Your {role} Journey
            </h2>

            <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                {/* Courses */}
                <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <h3 style={{ color: '#4f46e5', marginBottom: '1rem' }}>📚 Recommended Courses</h3>
                    <ul style={{ paddingLeft: '1.2rem', color: '#475569' }}>
                        {planData.courses.map((c, i) => (
                            <li key={i} style={{ marginBottom: '0.8rem' }}>
                                <strong>{c.title}</strong>
                                <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{c.platform} • {c.duration}</div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Projects */}
                <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <h3 style={{ color: '#059669', marginBottom: '1rem' }}>🛠️ Project Ideas</h3>
                    <ul style={{ paddingLeft: '1.2rem', color: '#475569' }}>
                        {planData.projects.map((p, i) => (
                            <li key={i} style={{ marginBottom: '0.5rem' }}>{p}</li>
                        ))}
                    </ul>
                </div>

                {/* Internship Prep */}
                <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <h3 style={{ color: '#d946ef', marginBottom: '1rem' }}>💼 Internship Prep</h3>
                    <ul style={{ paddingLeft: '1.2rem', color: '#475569' }}>
                        {planData.internship.map((t, i) => (
                            <li key={i} style={{ marginBottom: '0.5rem' }}>{t}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                <button
                    onClick={onAskCoach}
                    className="btn-primary"
                    style={{ background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)' }}
                >
                    🤖 Ask AI Coach about "{role}"
                </button>
            </div>
        </div>
    );
}
