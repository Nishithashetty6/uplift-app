import React, { createContext, useState, useContext } from 'react';

const ChatContext = createContext();

export function useChat() {
    return useContext(ChatContext);
}

export function ChatProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi! 👋 I'm your UpLift assistant. I can help with stress, career tips, or just listen. How are you feeling?", sender: 'bot' }
    ]);
    const [triggerMessage, setTriggerMessage] = useState(null); // Used to auto-send a user message

    const openChat = (initialMessage = null) => {
        setIsOpen(true);
        if (initialMessage) {
            setTriggerMessage(initialMessage);
        }
    };

    const closeChat = () => setIsOpen(false);

    const addMessage = (msg) => {
        setMessages(prev => [...prev, msg]);
    };

    const value = {
        isOpen,
        setIsOpen,
        messages,
        setMessages,
        openChat,
        closeChat,
        triggerMessage,
        setTriggerMessage,
        addMessage
    };

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    );
}
