import { useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { recommendations } from '../data/recommendationData';

export function useJourney() {
    // --- Data Sources ---
    const [careerPath] = useLocalStorage('uplift_career_path', null);
    const [journalPosts] = useLocalStorage('uplift_journal_posts', []);
    const [goals, setGoals] = useLocalStorage('uplift_goals_v2', [
        {
            id: 1,
            title: "Complete Career Assessment",
            category: "career",
            deadline: new Date().toISOString().split('T')[0],
            subtasks: [
                { id: 101, text: "Answer all questions", done: false },
                { id: 102, text: "Read result analysis", done: false }
            ]
        }
    ]);

    // --- Derived Stats (Wellness) ---
    const wellnessStats = useMemo(() => {
        const totalEntries = journalPosts.length;

        // Calculate Streak
        let streak = 0;
        if (totalEntries > 0) {
            const now = new Date();
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
            const oneDay = 24 * 60 * 60 * 1000;

            // Get unique dates from posts
            const uniqueDates = [...new Set(journalPosts.map(p => {
                const d = new Date(p.date);
                return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
            }))].sort((a, b) => b - a); // Descending

            // Check if streak is active (posted today or yesterday)
            if (uniqueDates.length > 0) {
                const diff = (today - uniqueDates[0]) / oneDay;
                if (diff <= 1) {
                    streak = 1;
                    for (let i = 0; i < uniqueDates.length - 1; i++) {
                        const curr = uniqueDates[i];
                        const next = uniqueDates[i + 1];
                        if ((curr - next) === oneDay) {
                            streak++;
                        } else {
                            break;
                        }
                    }
                }
            }
        }

        // Analyze recent keywords for context
        const recentText = journalPosts.slice(0, 3).map(p => p.content.toLowerCase()).join(" ");
        const needsCalm = recentText.includes("stress") || recentText.includes("anxious") || recentText.includes("overwhelmed");
        const needsMotivation = recentText.includes("tired") || recentText.includes("stuck") || recentText.includes("bored");

        return { totalEntries, streak, needsCalm, needsMotivation };
    }, [journalPosts]);

    // --- Smart Recommendations ---
    const suggestedActions = useMemo(() => {
        let actions = [];

        // 1. Context-Aware Wellness
        if (wellnessStats.needsCalm) {
            actions.push({ id: 'w1', text: "Try a 5-minute Box Breathing exercise", type: "wellness", icon: "🌬️" });
            actions.push({ id: 'w2', text: "Read 'Grounding Techniques for Anxiety'", type: "reading", icon: "📖" });
        } else if (wellnessStats.needsMotivation) {
            actions.push({ id: 'w3', text: "Review your Career Roadmap for inspiration", type: "career", icon: "🚀" });
        } else {
            actions.push({ id: 'w0', text: "Log a gratitude entry in your journal", type: "wellness", icon: "✍️" });
        }

        // 2. Career Path Specific
        if (careerPath && recommendations[careerPath]) {
            actions = [...actions, ...recommendations[careerPath].slice(0, 3)];
        } else if (!careerPath) {
            actions.push({ id: 'c0', text: "Take the Career Assessment to get started", type: "career", icon: "🎯" });
        }

        return actions;
    }, [wellnessStats, careerPath]);

    // --- Goal Management ---
    const addGoal = (title, category, deadline) => {
        const newGoal = {
            id: Date.now(),
            title,
            category,
            deadline,
            subtasks: []
        };
        setGoals([...goals, newGoal]);
    };

    const deleteGoal = (id) => {
        setGoals(goals.filter(g => g.id !== id));
    };

    const addSubtask = (goalId, text) => {
        setGoals(goals.map(g => {
            if (g.id === goalId) {
                return { ...g, subtasks: [...g.subtasks, { id: Date.now(), text, done: false }] };
            }
            return g;
        }));
    };

    const toggleSubtask = (goalId, subtaskId) => {
        setGoals(goals.map(g => {
            if (g.id === goalId) {
                const updatedSubtasks = g.subtasks.map(s =>
                    s.id === subtaskId ? { ...s, done: !s.done } : s
                );
                return { ...g, subtasks: updatedSubtasks };
            }
            return g;
        }));
    };

    const calculateGoalProgress = (goal) => {
        if (!goal.subtasks || goal.subtasks.length === 0) return 0;
        const completed = goal.subtasks.filter(s => s.done).length;
        return Math.round((completed / goal.subtasks.length) * 100);
    };

    return {
        careerPath,
        wellnessStats,
        goals,
        suggestedActions,
        addGoal,
        deleteGoal,
        addSubtask,
        toggleSubtask,
        calculateGoalProgress
    };
}
