export const crisisResources = [
    {
        name: "National Suicide Prevention Lifeline",
        number: "988",
        description: "24/7, free and confidential support."
    },
    {
        name: "Crisis Text Line",
        number: "Text 'HELLO' to 741741",
        description: "Free 24/7 support at your fingertips."
    },
    {
        name: "Emergency Services",
        number: "911",
        description: "Immediate assistance."
    }
];

export const chatResponses = {
    // Crisis Keywords
    crisis: ['suicide', 'kill myself', 'hurt myself', 'want to die', 'end it', 'hopeless', 'no way out'],

    // Wellness / Mental Health
    stress: [
        "I hear that you're stressed. Try the 4-7-8 breathing technique: Inhale for 4s, hold for 7s, exhale for 8s.",
        "It's okay to feel overwhelmed. Have you taken a short break today to just stretch or walk?",
        "Stress is a sign you care, but don't let it consume you. Break your tasks into tiny steps."
    ],
    anxiety: [
        "Anxiety can be tough. Ground yourself: Name 5 things you see, 4 you feel, 3 you hear.",
        "You are safe right now. focus on your breathing. In... and out.",
        "Remember, this feeling is temporary. It will pass."
    ],
    sad: [
        "I'm sorry you're feeling down. It's perfectly okay to not be okay sometimes.",
        "Be gentle with yourself today. Do one small thing that brings you comfort.",
        "Have you eaten or hydrated recently? Sometimes our body needs fuel to help our mind."
    ],
    happy: [
        "That's wonderful! I'm glad you're feeling good!",
        "Yay! Hold onto this feeling. What made you smile today?",
        "Fantastic! Celebrating small wins is so important."
    ],

    // Career / Academic
    exam: [
        "Exams are stressful, but they don't define your worth. You've got this!",
        "Try the Pomodoro technique: 25 minutes of focus, 5 minutes of break.",
        "Don't forget to sleep! Your brain needs rest to consolidate what you've learned."
    ],
    career: [
        "Feeling lost about your career? That's normal! Have you tried our Career Assessment in the app?",
        "Your path is unique. Don't compare your Chapter 1 to someone else's Chapter 20.",
        "Focus on your strengths. What do you enjoy doing so much you lose track of time?"
    ],
    job: [
        "Job hunting is a marathon, not a sprint. Keep going!",
        "Tailor your resume for each application. Quality over quantity.",
        "Rejection is just redirection to something better."
    ],
    tech: [
        "To become a Software Engineer, focus on fundamentals: HTML, CSS, JavaScript (frontend) or Python/Java/Node.js (backend).",
        "Build projects! A clone of a popular app or a personal portfolio is the best way to learn and show skills.",
        "Key skills for Software Engineering: Problem solving, Git/Version Control, and one major framework like React."
    ],

    // Default
    default: [
        "I'm here to listen. Tell me more.",
        "I hear you. How long have you felt this way?",
        "Thank you for sharing that with me. I'm here for you.",
        "I'm an AI, so I might not understand everything, but I want to support you."
    ]
};

export const findResponse = (input) => {
    const lowerInput = input.toLowerCase();

    // Check Crisis First
    if (chatResponses.crisis.some(keyword => lowerInput.includes(keyword))) {
        return { type: 'crisis', text: "It sounds like you're going through a really hard time. Please reach out to a professional who can help you safely." };
    }

    const techKeywords = ['software', 'developer', 'coding', 'programming', 'engineer', 'tech', 'stack', 'frontend', 'backend'];

    // Check Categories
    for (const [key, responses] of Object.entries(chatResponses)) {
        if (key === 'crisis' || key === 'default') continue;

        let match = lowerInput.includes(key);
        if (key === 'anxiety' && lowerInput.includes('anxious')) match = true;
        if (key === 'tech' && techKeywords.some(k => lowerInput.includes(k))) match = true;

        if (match) {
            // Return random response from category
            return { type: 'text', text: responses[Math.floor(Math.random() * responses.length)] };
        }
    }

    // Default
    return { type: 'text', text: chatResponses.default[Math.floor(Math.random() * chatResponses.default.length)] };
};
