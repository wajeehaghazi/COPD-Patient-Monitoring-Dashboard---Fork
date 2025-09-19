import React, { useEffect, useState, useRef } from 'react';
import { Send, Mic, User, Bot } from 'lucide-react';
interface ChatInterfaceProps {
  messages: {
    id: number;
    sender: string;
    content: string;
    timestamp: string;
  }[];
}
export const ChatInterface = ({
  messages: initialMessages
}: ChatInterfaceProps) => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '') return;
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    setMessages([...messages, userMessage]);
    setInput('');
    // Simulate AI response
    setIsTyping(true);
    setTimeout(() => {
      const aiMessage = {
        id: messages.length + 2,
        sender: 'ai',
        content: 'I understand your concern. Based on your recent symptoms and vitals, I recommend taking your prescribed medication and doing some gentle breathing exercises. Would you like me to guide you through a breathing exercise?',
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };
  return <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Chat with your AI Health Coach
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Ask questions or discuss your symptoms
        </p>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.sender === 'user' ? 'bg-blue-500 text-white rounded-tr-none' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-none'}`}>
              <div className="flex items-center mb-1">
                {message.sender === 'user' ? <>
                    <span className="text-xs opacity-80">
                      {message.timestamp}
                    </span>
                    <User size={14} className="ml-1" />
                  </> : <>
                    <Bot size={14} className="mr-1" />
                    <span className="text-xs opacity-80">
                      {message.timestamp}
                    </span>
                  </>}
              </div>
              <p>{message.content}</p>
            </div>
          </div>)}
        {isTyping && <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-tl-none px-4 py-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce" style={{
              animationDelay: '0ms'
            }}></div>
                <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce" style={{
              animationDelay: '150ms'
            }}></div>
                <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce" style={{
              animationDelay: '300ms'
            }}></div>
              </div>
            </div>
          </div>}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <button type="button" className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors" aria-label="Voice input">
            <Mic size={20} />
          </button>
          <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Type your message..." className="flex-1 py-2 px-4 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" />
          <button type="submit" className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors" aria-label="Send message" disabled={input.trim() === ''}>
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>;
};