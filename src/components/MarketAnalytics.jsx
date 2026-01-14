export default function MarketAnalytics({ stats }) {
    if (!stats) return null;

    const maxVal = Math.max(...stats.chartData);

    return (
        <div className="glass-panel" style={{ padding: '2rem', marginTop: '2rem' }}>
            <h3 className="title-gradient" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Market Analytics</h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem', textAlign: 'center' }}>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '0.5rem' }}>
                    <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Avg. Salary</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#34d399' }}>{stats.avgSalary}</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '0.5rem' }}>
                    <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Growth (5yr)</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#60a5fa' }}>{stats.growth}</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '0.5rem' }}>
                    <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Demand</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f472b6' }}>{stats.demand}</div>
                </div>
            </div>

            <div>
                <h4 style={{ marginBottom: '1rem', color: '#e2e8f0' }}>Salary Trend (Simulated)</h4>

                {/* Graph Area */}
                <div style={{ display: 'flex', alignItems: 'flex-end', height: '150px', gap: '1rem', marginBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    {stats.chartData.map((val, i) => (
                        <div key={i} style={{ flex: 1, height: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                            <div style={{
                                width: '100%',
                                background: 'linear-gradient(to top, #6366f1, #c084fc)',
                                height: `${(val / maxVal) * 100}%`,
                                borderRadius: '0.25rem 0.25rem 0 0',
                                opacity: 0.8,
                                transition: 'height 0.5s ease-out'
                            }}></div>
                        </div>
                    ))}
                </div>

                {/* X-Axis Labels */}
                <div style={{ display: 'flex', gap: '1rem' }}>
                    {stats.chartData.map((_, i) => (
                        <div key={i} style={{ flex: 1, textAlign: 'center', fontSize: '0.8rem', color: '#94a3b8' }}>
                            Yr {i + 1}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
