// Mock AI Service for Resume Generation

const experienceDatabase = {
    'developer': [
        "• Developed and maintained scalable web applications using React.js and Node.js, improving site performance by 25%.",
        "• Collaborated with cross-functional teams to design and implement RESTful APIs, ensuring seamless data integration.",
        "• Optimized database queries and implemented caching strategies, reducing server response times by 40%."
    ],
    'designer': [
        "• Designed intuitive user interfaces for mobile and web platforms, resulting in a 30% increase in user engagement.",
        "• Created high-fidelity prototypes and wireframes using Figma, streamlining the handoff process to developers.",
        "• Conducted user research and usability testing to iterate on designs and improve overall user experience."
    ],
    'marketing': [
        "• Executed comprehensive social media campaigns across multiple platforms, growing follower base by 50% in 6 months.",
        "• Analyzed market trends and competitor strategies to develop data-driven marketing plans.",
        "• Coordinated with content creators to produce engaging blog posts and newsletters, boosting website traffic by 20%."
    ],
    'intern': [
        "• Assisted senior team members in daily operations, gaining hands-on experience in project management and execution.",
        "• Conducted research and data analysis to support key business decisions and strategic initiatives.",
        "• Participated in team meetings and brainstorming sessions, contributing innovative ideas for process improvement."
    ],
    'default': [
        "• Demonstrated strong problem-solving skills and attention to detail in a fast-paced environment.",
        "• Collaborated effectively with team members to achieve project goals and deliverables.",
        "• Adapted quickly to new technologies and processes, ensuring efficient workflow and productivity."
    ]
};

const skillDatabase = {
    'developer': "React, Node.js, JavaScript, Python, SQL, Git, AWS, Docker",
    'designer': "Figma, Adobe XD, Photoshop, Illustrator, UI/UX Principles, Prototyping",
    'marketing': "SEO, Google Analytics, Social Media Marketing, Content Strategy, Copywriting",
    'intern': "Microsoft Office, Research, Communication, Time Management, Teamwork",
    'default': "Communication, Problem Solving, Leadership, Teamwork, Adaptability"
};

export function generateExperience(role) {
    const key = Object.keys(experienceDatabase).find(k => role.toLowerCase().includes(k)) || 'default';
    return experienceDatabase[key];
}

export function suggestSkills(role) {
    const key = Object.keys(skillDatabase).find(k => role.toLowerCase().includes(k)) || 'default';
    return skillDatabase[key];
}
