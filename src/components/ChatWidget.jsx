import { useState, useRef, useEffect } from 'react';
import { findResponse, crisisResources } from '../data/chatData';
import { analyzeRisk } from '../utils/safetyAnalytics';
import { useChat } from '../context/ChatContext';

export default function ChatWidget() {
    const { isOpen, setIsOpen, messages, setMessages, triggerMessage, setTriggerMessage } = useChat();
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    // Handle Auto-Triggered Messages (e.g., from "Ask AI Coach" button)
    useEffect(() => {
        if (triggerMessage) {
            handleSend(null, triggerMessage);
            setTriggerMessage(null); // Clear trigger
        }
    }, [triggerMessage]);

    const handleSend = (e, textOverride = null) => {
        if (e) e.preventDefault();
        const textToSend = textOverride || input;

        if (!textToSend.trim()) return;

        const userMsg = { id: Date.now(), text: textToSend, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        if (!textOverride) setInput("");
        setIsTyping(true);

        // Simulate network delay
        setTimeout(() => {
            // 1. Safety Check
            const risk = analyzeRisk(userMsg.text);
            if (risk.level === 'HIGH') {
                const botMsg = {
                    id: Date.now() + 1,
                    text: "I'm detecting that you're in severe distress. Please let us help you find support immediately.",
                    sender: 'bot',
                    type: 'crisis'
                };
                setMessages(prev => [...prev, botMsg]);
                setIsTyping(false);
                return;
            }

            const response = findResponse(userMsg.text);
            const botMsg = {
                id: Date.now() + 1,
                text: response.text,
                sender: 'bot',
                type: response.type
            };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 1000);
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="btn-primary"
                style={{
                    position: 'fixed',
                    bottom: '2rem',
                    right: '2rem',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    fontSize: '2rem',
                    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'transform 0.2s'
                }}
                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
            >
                💬
            </button>
        );
    }

    return (
        <div className="glass-panel" style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            width: '350px',
            height: '500px',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1000,
            padding: 0,
            overflow: 'hidden',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            background: 'white'
        }}>
            {/* Header */}
            <div style={{ padding: '1rem', background: 'linear-gradient(135deg, #a5b4fc 0%, #818cf8 100%)', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem' }}>UpLift Helper 🤖</h3>
                <button onClick={() => setIsOpen(false)} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1.5rem' }}>×</button>
            </div>

            {/* Messages Area */}
            <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', background: '#f8fafc' }}>
                {messages.map(msg => (
                    <div key={msg.id} style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
                        <div style={{
                            padding: '0.8rem 1rem',
                            borderRadius: '1rem',
                            borderBottomRightRadius: msg.sender === 'user' ? '0' : '1rem',
                            borderBottomLeftRadius: msg.sender === 'bot' ? '0' : '1rem',
                            background: msg.sender === 'user' ? '#818cf8' : 'white',
                            color: msg.sender === 'user' ? 'white' : '#334155',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                            fontSize: '0.95rem',
                            lineHeight: '1.5'
                        }}>
                            {msg.text}
                        </div>
                        {msg.type === 'crisis' && (
                            <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', animation: 'fadeIn 0.5s' }}>
                                {crisisResources.map((res, idx) => (
                                    <div key={idx} style={{ background: '#fee2e2', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #fecaca' }}>
                                        <div style={{ fontWeight: 'bold', color: '#b91c1c', fontSize: '0.9rem' }}>{res.name}</div>
                                        <div style={{ fontSize: '0.85rem', color: '#7f1d1d', marginBottom: '0.5rem' }}>{res.description}</div>
                                        <a href={`tel:${res.number}`} style={{
                                            display: 'block', textAlign: 'center', background: '#dc2626', color: 'white',
                                            textDecoration: 'none', padding: '0.4rem', borderRadius: '0.3rem', fontSize: '0.9rem', fontWeight: 'bold'
                                        }}>
                                            Call {res.number}
                                        </a>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
                {isTyping && (
                    <div style={{ alignSelf: 'flex-start', background: 'white', padding: '0.5rem 1rem', borderRadius: '1rem', fontSize: '0.8rem', color: '#94a3b8' }}>
                        Typing...
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} style={{ padding: '1rem', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '0.5rem', background: 'white' }}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type here..."
                    style={{ flex: 1, padding: '0.8rem', borderRadius: '2rem', border: '1px solid #cbd5e1', outline: 'none', fontSize: '0.95rem' }}
                />
                <button
                    type="submit"
                    disabled={!input.trim()}
                    style={{
                        background: '#818cf8', color: 'white', border: 'none', borderRadius: '50%', width: '40px', height: '40px',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem',
                        opacity: !input.trim() ? 0.5 : 1
                    }}
                >
                    ➤
                </button>
            </form>
        </div>
    );
}
