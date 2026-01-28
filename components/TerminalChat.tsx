'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function TerminalChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.response }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Connection error. Try again.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col h-full overflow-hidden"
      style={{
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(74, 222, 128, 0.5)',
        boxShadow: '0 0 30px rgba(74, 222, 128, 0.1)',
      }}
    >
      {/* Terminal header */}
      <div
        className="px-4 py-2 text-xs"
        style={{
          borderBottom: '1px solid rgba(74, 222, 128, 0.3)',
          color: 'rgba(74, 222, 128, 0.7)',
        }}
      >
        terminal — ask me anything
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 terminal-scroll">
        {messages.length === 0 && (
          <div className="text-sm" style={{ color: 'rgba(74, 222, 128, 0.5)' }}>
            <p>system ready</p>
            <p>type a question about cameron</p>
            <p className="mt-2">
              <span style={{ color: '#4ade80' }}>&gt; </span>
              <span className="cursor-blink" style={{ color: '#4ade80' }}>_</span>
            </p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className="mb-3 text-sm">
            {msg.role === 'user' ? (
              <p style={{ color: '#4ade80' }}>&gt; {msg.content}</p>
            ) : (
              <p style={{ color: 'rgba(74, 222, 128, 0.8)' }}>{msg.content}</p>
            )}
          </div>
        ))}

        {isLoading && (
          <p className="text-sm" style={{ color: '#4ade80' }}>
            <span className="cursor-blink">...</span>
          </p>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <form onSubmit={handleSubmit} style={{ borderTop: '1px solid rgba(74, 222, 128, 0.3)' }}>
        <div className="flex items-center p-4">
          <span style={{ color: '#4ade80' }}>&gt;&nbsp;</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder=""
            disabled={isLoading}
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: '#4ade80' }}
            autoComplete="off"
            spellCheck={false}
          />
          {!isLoading && (
            <span style={{ color: '#4ade80' }} className="cursor-blink">_</span>
          )}
        </div>
      </form>
    </div>
  );
}
