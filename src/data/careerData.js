export const questions = [
    {
        id: 1,
        question: "How do you prefer to solve problems?",
        options: [
            { text: "Analyzing data and logic", type: "tech" },
            { text: "Understanding human behavior", type: "psych" },
            { text: "Creative expression and design", type: "art" },
            { text: "Hands-on implementation", type: "eng" },
            { text: "Strategizing and leading teams", type: "biz" }
        ]
    },
    {
        id: 2,
        question: "What topic interests you most?",
        options: [
            { text: "Artificial Intelligence and Code", type: "tech" },
            { text: "Mental Health and Well-being", type: "psych" },
            { text: "Visual Arts and Media", type: "art" },
            { text: "Building Machines/Structures", type: "eng" },
            { text: "Business Strategy and Growth", type: "biz" }
        ]
    },
    {
        id: 3,
        question: "What kind of work environment do you prefer?",
        options: [
            { text: "Remote with a computer", type: "tech" },
            { text: "Clinical or therapy setting", type: "psych" },
            { text: "Studio or creative space", type: "art" },
            { text: "Field work or lab", type: "eng" },
            { text: "Collaborative office or meeting room", type: "biz" }
        ]
    },
    {
        id: 4,
        question: "Which of these hobbies appeals to you most?",
        options: [
            { text: "Coding or gaming", type: "tech" },
            { text: "Volunteering or mentoring", type: "psych" },
            { text: "Painting or photography", type: "art" },
            { text: "Fixing things or DIY projects", type: "eng" },
            { text: "Organizing events or trading", type: "biz" }
        ]
    },
    {
        id: 5,
        question: "If you could pick a school subject to study forever, what would it be?",
        options: [
            { text: "Computer Science", type: "tech" },
            { text: "Psychology or Sociology", type: "psych" },
            { text: "Fine Arts or Music", type: "art" },
            { text: "Physics or Shop Class", type: "eng" },
            { text: "Economics or Business", type: "biz" }
        ]
    },
    {
        id: 6,
        question: "What role do you usually take in a team?",
        options: [
            { text: "The strategist/planner", type: "tech" },
            { text: "The mediator/listener", type: "psych" },
            { text: "The visionary/designer", type: "art" },
            { text: "The builder/doer", type: "eng" },
            { text: "The leader/organizer", type: "biz" }
        ]
    },
    {
        id: 7,
        question: "Which tool would you prefer to work with?",
        options: [
            { text: "Advanced software code", type: "tech" },
            { text: "Conversation and empathy", type: "psych" },
            { text: "Canvas and brushes (digital or analog)", type: "art" },
            { text: "Wrench and blueprints", type: "eng" },
            { text: "Spreadsheets and presentations", type: "biz" }
        ]
    },
    {
        id: 8,
        question: "What is your main goal in a career?",
        options: [
            { text: "To innovate and optimize", type: "tech" },
            { text: "To heal and understand people", type: "psych" },
            { text: "To express and inspire", type: "art" },
            { text: "To build and construct", type: "eng" },
            { text: "To lead and grow value", type: "biz" }
        ]
    },
    {
        id: 9,
        question: "How do you handle a new challenge?",
        options: [
            { text: "Research and find a logical solution", type: "tech" },
            { text: "Ask others for their perspective", type: "psych" },
            { text: "Brainstorm creative alternatives", type: "art" },
            { text: "Start experimenting with a prototype", type: "eng" },
            { text: "Create a roadmap and delegate", type: "biz" }
        ]
    },
    {
        id: 10,
        question: "What kind of news headlines grab your attention?",
        options: [
            { text: "New tech gadget releases", type: "tech" },
            { text: "Studies on human happiness", type: "psych" },
            { text: "New art exhibitions or movies", type: "art" },
            { text: "Breakthroughs in engineering", type: "eng" },
            { text: "Global market trends", type: "biz" }
        ]
    },
    {
        id: 11,
        question: "Which famous figure do you admire most?",
        options: [
            { text: "Bill Gates or Alan Turing", type: "tech" },
            { text: "Sigmund Freud or B.F. Skinner", type: "psych" },
            { text: "Picasso or Walt Disney", type: "art" },
            { text: "Elon Musk or Nikola Tesla", type: "eng" },
            { text: "Steve Jobs or Warren Buffet", type: "biz" }
        ]
    },
    {
        id: 12,
        question: "What is your preferred way to communicate?",
        options: [
            { text: "Via text or email (efficient)", type: "tech" },
            { text: "Face-to-face (personal)", type: "psych" },
            { text: "Through visual media", type: "art" },
            { text: "Through diagrams and models", type: "eng" },
            { text: "In meetings or negotiations", type: "biz" }
        ]
    },
    {
        id: 13,
        question: "What would you do on a free afternoon?",
        options: [
            { text: "Solve puzzles or play logic games", type: "tech" },
            { text: "Meet a friend for deep conversation", type: "psych" },
            { text: "Visit a gallery or sketch", type: "art" },
            { text: "Assemble a model kit", type: "eng" },
            { text: "Read business biographies or network", type: "biz" }
        ]
    },
    {
        id: 14,
        question: "How do you view the future?",
        options: [
            { text: "A digital utopia", type: "tech" },
            { text: "A conscious, connected society", type: "psych" },
            { text: "A beautiful, designed world", type: "art" },
            { text: "An automated, efficient place", type: "eng" },
            { text: "A world of opportunity and growth", type: "biz" }
        ]
    },
    {
        id: 15,
        question: "Choose a word that describes you best:",
        options: [
            { text: "Logical", type: "tech" },
            { text: "Empathetic", type: "psych" },
            { text: "Creative", type: "art" },
            { text: "Practical", type: "eng" },
            { text: "Ambitious", type: "biz" }
        ]
    }
];

export const careers = {
    tech: {
        title: "Software Engineer",
        description: "Architecting the digital world through code.",
        past: "Initially focused on basic automation and mainframe computing.",
        present: "High demand, remote work options, diverse fields (Web, Mobile, AI).",
        future: "Increasing integration with AI, focus on ethical computing and cyber-security.",
        icon: "💻"
    },
    psych: {
        title: "Clinical Psychologist",
        description: "Helping individuals understand and improve their mental health.",
        past: "Focused heavily on psychoanalysis and institutionalization.",
        present: "Holistic approaches, tele-therapy rise, destigmatization.",
        future: "AI-assisted diagnostics, personalized therapy plans, focus on preventative care.",
        icon: "🧠"
    },
    art: {
        title: "Digital Artist",
        description: "Creating visual content for entertainment, marketing, and more.",
        past: "Traditional mediums (paint, sculpture) dominated.",
        present: "3D modeling, VFX, UI/UX design are booming.",
        future: "VR/AR experiences, generative art collaboration.",
        icon: "🎨"
    },
    eng: {
        title: "Robotics Engineer",
        description: "Designing and building autonomous machines.",
        past: "Industrial assembly lines and simple automation.",
        present: "Service robots, drones, smart home devices.",
        future: "Humanoid robots, space exploration, nanobots.",
        icon: "🤖"
    },
    biz: {
        title: "Product Manager",
        description: "Bridging the gap between business, technology, and user experience.",
        past: "Brand managers in FMCG companies.",
        present: "Mini-CEOs of digital products, agile leadership.",
        future: "AI product management, ethics governance, growth hacking.",
        icon: "📊"
    }
};
