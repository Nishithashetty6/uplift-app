export const SAFETY_KEYWORDS = {
    CRISIS: [
        'suicide', 'kill myself', 'hurt myself', 'want to die', 'end it all',
        'hopeless', 'no way out', 'better off dead', 'self harm', 'cutting myself'
    ],
    DISTRESS: [
        'overwhelmed', 'panic', 'anxiety attack', 'cant breathe', 'can\'t breathe',
        'fail', 'failing', 'failed', 'failure', 'useless', 'worthless', 'giving up', 'depressed'
    ]
};

export const SAFE_CONTEXTS = [
    'suicide prevention',
    'not depressed',
    'without fail',
    'no fail',
    'not fail',
    'never fail',
    'panic at the disco',
    'don\'t want to die',
    'dont want to die',
    'not hopeless'
];

/**
 * Analyzes text for safety risks.
 * @param {string} text - The user input text.
 * @returns {object} - { level: 'HIGH' | 'MODERATE' | 'LOW', triggers: string[] }
 */
export const analyzeRisk = (text) => {
    if (!text) return { level: 'LOW', triggers: [] };

    let cleanedText = text.toLowerCase();

    // Remove safe contexts from analysis
    SAFE_CONTEXTS.forEach(context => {
        cleanedText = cleanedText.replace(new RegExp(context, 'gi'), ' ');
    });

    const triggers = [];

    // Helper to check keywords with word boundaries
    const checkKeywords = (keywords) => {
        for (const k of keywords) {
            // Escape special regex chars if any, though our keywords are simple
            const esc = k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            // Look for whole word match
            const regex = new RegExp(`\\b${esc}\\b`, 'i');
            if (regex.test(cleanedText)) {
                return k;
            }
        }
        return null;
    };

    // Check High Risk (Crisis)
    const crisisMatch = checkKeywords(SAFETY_KEYWORDS.CRISIS);
    if (crisisMatch) {
        triggers.push(crisisMatch);
        return { level: 'HIGH', triggers };
    }

    // Check Moderate Risk (Distress)
    const distressMatch = checkKeywords(SAFETY_KEYWORDS.DISTRESS);
    if (distressMatch) {
        triggers.push(distressMatch);
        return { level: 'MODERATE', triggers };
    }

    return { level: 'LOW', triggers: [] };
};

/**
 * Detects significant mood drop based on recent history.
 * @param {string} currentMood - Current mood emoji.
 * @param {Array} history - Array of previous posts/entries.
 * @returns {boolean} - True if significant drop detected.
 */
export const detectMoodDrop = (currentMood, history) => {
    const MOOD_VALUES = { "😄": 5, "🙂": 4, "😐": 3, "😕": 2, "😢": 1 };

    if (!currentMood || !history || history.length === 0) return false;

    const currentVal = MOOD_VALUES[currentMood] || 3;

    // Get average of last 3 entries
    const recentHistory = history.slice(0, 3);
    const sum = recentHistory.reduce((acc, entry) => acc + (MOOD_VALUES[entry.mood] || 3), 0);
    const avg = sum / recentHistory.length;

    // Trigger if current mood is significantly lower than recent average (e.g., drop of 2 points)
    return (avg - currentVal) >= 1.5;
};
