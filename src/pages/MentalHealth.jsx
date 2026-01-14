import { useState, useEffect, useRef } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function MentalHealth() {
    // Persistent chat history
    const [messages, setMessages] = useLocalStorage('uplift_chat_history', [
        { id: 1, sender: 'bot', text: "Hello! I'm your Wellness Companion. How are you feeling today? You can share your thoughts, and I'll do my best to listen and help.", timestamp: new Date().toISOString() }
    ]);

    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const analyzeSentimentAndReply = (userText) => {
        const lowerText = userText.toLowerCase();
        let replyText = "I hear you. Tell me more about that.";

        // Simple keyword analysis
        if (lowerText.includes("sad") || lowerText.includes("cry") || lowerText.includes("depress")) {
            replyText = "I'm sorry you're feeling this way. It's okay to not be okay. Have you tried taking a gentle walk or listening to some calming music? Remember to be kind to yourself.";
        } else if (lowerText.includes("anx") || lowerText.includes("stress") || lowerText.includes("worr")) {
            replyText = "It sounds like you're carrying a lot of tension. Let's try a quick grounding exercise: Name 5 things you can see, 4 you can feel, 3 you can hear, 2 you can smell, and 1 you can taste.";
        } else if (lowerText.includes("exam") || lowerText.includes("study") || lowerText.includes("fail") || lowerText.includes("grade")) {
            replyText = "Academic pressure is real. Remember, your grades don't define your worth. Break your tasks into tiny steps, and don't forget to take breaks. You've got this!";
        } else if (lowerText.includes("happy") || lowerText.includes("good") || lowerText.includes("great") || lowerText.includes("excit")) {
            replyText = "That's wonderful! I'm so glad to hear you're doing well. What was the highlight of your day?";
        } else if (lowerText.includes("tired") || lowerText.includes("sleep") || lowerText.includes("exhaust")) {
            replyText = "Rest is productive too. If you can, try to disconnect from screens for a bit and recharge.";
        } else if (lowerText.includes("mentor") || lowerText.includes("career") || lowerText.includes("job")) {
            replyText = "Thinking about the future? It might be a good time to check the Mentorship section or review your Career Roadmap.";
        }

        return {
            id: Date.now() + 1,
            sender: 'bot',
            text: replyText,
            timestamp: new Date().toISOString()
        };
    };

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = {
            id: Date.now(),
            sender: 'user',
            text: input,
            timestamp: new Date().toISOString()
        };

        setMessages((prev) => [...prev, userMsg]);
        setInput("");

        // Simulate AI delay
        setTimeout(() => {
            const botMsg = analyzeSentimentAndReply(userMsg.text);
            setMessages((prev) => [...prev, botMsg]);
        }, 1000);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto', height: 'calc(100vh - 150px)', display: 'flex', flexDirection: 'column' }}>

            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <h1 className="title-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Smart Journal</h1>
                <p style={{ fontSize: '1rem', color: '#94a3b8' }}>A safe space to share your thoughts and get personalized guidance.</p>
            </div>

            {/* Chat Area */}
            <div className="glass-panel" style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                padding: '2rem',
                overflow: 'hidden',
                background: 'rgba(15, 23, 42, 0.6)'
            }}>

                {/* Messages List */}
                <div style={{ flex: 1, overflowY: 'auto', marginBottom: '1.5rem', paddingRight: '1rem' }}>
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            style={{
                                display: 'flex',
                                justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                marginBottom: '1.5rem'
                            }}
                        >
                            <div style={{
                                maxWidth: '70%',
                                padding: '1.5rem',
                                borderRadius: msg.sender === 'user' ? '1.5rem 1.5rem 0 1.5rem' : '1.5rem 1.5rem 1.5rem 0',
                                background: msg.sender === 'user' ? 'var(--primary-accent)' : 'rgba(255,255,255,0.1)',
                                color: 'white',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                            }}>
                                <div style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>{msg.text}</div>
                                <div style={{ fontSize: '0.75rem', opacity: 0.7, marginTop: '0.5rem', textAlign: 'right' }}>
                                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Type here..."
                        style={{
                            flex: 1,
                            padding: '1rem',
                            borderRadius: '1rem',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: 'white',
                            resize: 'none',
                            height: '60px',
                            fontFamily: 'inherit',
                            fontSize: '1rem'
                        }}
                    />
                    <button
                        onClick={handleSend}
                        className="btn-primary"
                        style={{
                            height: '60px',
                            padding: '0 2rem',
                            borderRadius: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <span style={{ fontSize: '1.5rem' }}>➤</span>
                    </button>
                </div>

            </div>
        </div>
    );
}
