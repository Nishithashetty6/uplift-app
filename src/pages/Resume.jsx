import { useState } from 'react';
import { generateExperience, suggestSkills } from '../utils/resumeAI';
import html2pdf from 'html2pdf.js';

export default function Resume() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        experience: '',
        education: '',
        skills: '',
        photo: null
    });

    const [preview, setPreview] = useState(false);

    const downloadPDF = () => {
        const element = document.getElementById('resume-preview');
        const opt = {
            margin: 0.5,
            filename: `${formData.name.replace(/\s+/g, '_')}_Resume.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        html2pdf().from(element).set(opt).save();
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, photo: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAIEnhance = (field) => {
        const role = prompt("What was your role? (e.g., 'Frontend Developer', 'Designer', 'Intern')");
        if (!role) return;

        if (field === 'experience') {
            const points = generateExperience(role);
            setFormData(prev => ({
                ...prev,
                experience: (prev.experience ? prev.experience + "\n\n" : "") + points.join("\n")
            }));
        } else if (field === 'skills') {
            const newSkills = suggestSkills(role);
            setFormData(prev => ({
                ...prev,
                skills: (prev.skills ? prev.skills + ", " : "") + newSkills
            }));
        }
    };

    return (
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 className="title-gradient" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Resume Builder</h1>
                <p style={{ fontSize: '1.2rem', color: '#94a3b8' }}>Create a professional resume in minutes.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>

                {/* Editor */}
                <div className="glass-panel" style={{ padding: '2rem' }}>
                    <h3 style={{ marginBottom: '1.5rem' }}>Your Details</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} style={inputStyle} />
                        <input name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} style={inputStyle} />

                        {/* Photo Upload */}
                        <div style={{ position: 'relative' }}>
                            <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Profile Photo</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoChange}
                                style={{ ...inputStyle, padding: '0.5rem' }}
                            />
                        </div>

                        {/* Experience with AI Magic */}
                        <div style={{ position: 'relative' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <label style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>Experience</label>
                                <button
                                    onClick={() => handleAIEnhance('experience')}
                                    style={{ background: 'none', border: 'none', color: '#818cf8', cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                                >
                                    ✨ AI Enhance
                                </button>
                            </div>
                            <textarea name="experience" placeholder="Work Experience" value={formData.experience} onChange={handleChange} style={{ ...inputStyle, height: '120px' }} />
                        </div>

                        {/* Education */}
                        <textarea name="education" placeholder="Education" value={formData.education} onChange={handleChange} style={{ ...inputStyle, height: '100px' }} />

                        {/* Skills with AI Magic */}
                        <div style={{ position: 'relative' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <label style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>Skills</label>
                                <button
                                    onClick={() => handleAIEnhance('skills')}
                                    style={{ background: 'none', border: 'none', color: '#c084fc', cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                                >
                                    💡 Suggest Skills
                                </button>
                            </div>
                            <textarea name="skills" placeholder="Skills (comma separated)" value={formData.skills} onChange={handleChange} style={{ ...inputStyle, height: '80px' }} />
                        </div>
                    </div>
                </div>

                {/* Preview */}
                <div id="resume-preview" className="glass-panel" style={{ padding: '3rem', background: 'white', color: '#333' }}>
                    <div style={{ borderBottom: '2px solid #333', paddingBottom: '1rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h2 style={{ fontSize: '2rem', margin: 0 }}>{formData.name || 'Your Name'}</h2>
                            <p style={{ color: '#666', margin: 0 }}>{formData.email || 'email@example.com'}</p>
                        </div>
                        {formData.photo && (
                            <img
                                src={formData.photo}
                                alt="Profile"
                                style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #333' }}
                            />
                        )}
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <h4 style={{ borderBottom: '1px solid #ccc', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>EXPERIENCE</h4>
                        <p style={{ whiteSpace: 'pre-wrap' }}>{formData.experience || 'Start typing to see your experience here...'}</p>
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <h4 style={{ borderBottom: '1px solid #ccc', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>EDUCATION</h4>
                        <p style={{ whiteSpace: 'pre-wrap' }}>{formData.education || 'Start typing to see your education here...'}</p>
                    </div>

                    <div>
                        <h4 style={{ borderBottom: '1px solid #ccc', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>SKILLS</h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {formData.skills.split(',').map((skill, i) => skill.trim() && (
                                <span key={i} style={{ background: '#eee', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.9rem' }}>{skill}</span>
                            ))}
                        </div>
                    </div>
                </div>

            </div>

            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <button className="btn-primary" onClick={downloadPDF} style={{ padding: '1rem 3rem' }}>
                    Download PDF
                </button>
            </div>

        </div>
    );
}

const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '0.5rem',
    background: 'rgba(0,0,0,0.3)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: 'white',
    fontFamily: 'inherit'
};
