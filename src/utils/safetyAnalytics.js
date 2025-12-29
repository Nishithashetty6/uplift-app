export const SAFETY_KEYWORDS = {
    CRISIS: [
        'suicide', 'kill myself', 'hurt myself', 'want to die', 'end it all',
        'hopeless', 'no way out', 'better off dead', 'self harm', 'cutting myself'
    ],
    DISTRESS: [
        'overwhelmed', 'panic', 'anxiety attack', 'cant breathe', 'can\'t breathe',
        'fail', 'failure', 'useless', 'worthless', 'giving up', 'depressed'
    ]
};

/**
 * Analyzes text for safety risks.
 * @param {string} text - The user input text.
 * @returns {object} - { level: 'HIGH' | 'MODERATE' | 'LOW', triggers: string[] }
 */
export const analyzeRisk = (text) => {
    if (!text) return { level: 'LOW', triggers: [] };

    const lowerText = text.toLowerCase();
    const triggers = [];

    // Check High Risk (Crisis)
    const crisisMatch = SAFETY_KEYWORDS.CRISIS.find(k => lowerText.includes(k));
    if (crisisMatch) {
        triggers.push(crisisMatch);
        return { level: 'HIGH', triggers };
    }

    // Check Moderate Risk (Distress)
    const distressMatch = SAFETY_KEYWORDS.DISTRESS.find(k => lowerText.includes(k));
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
