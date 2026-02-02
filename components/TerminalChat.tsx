'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const PROMPTS = [
  "What is Project Carb?",
  "What did Cameron do in the Air Force?",
  "What is Cameron studying at Yale?",
  "How can I contact Cameron?",
  "What is mycapsule.ai?",
  "What certifications does Cameron have?",
  "What did Cameron do at Gavin de Becker?",
  "What is Cameron interested in?",
];

const ASCII_NAME = `  ___      __       ___ ___       __    _ __    ___     ___
 /'___\\  /'__\`\\   /' __\` __\`\\   /'__\`\\ /\\\`'__\\ / __\`\\ /' _ \`\\
/\\ \\__/ /\\ \\L\\.\\_/\\ \\/\\ \\/ \\ \\ /\\  __/ \\ \\ \\/ /\\ \\L\\ \\/\\ \\/\\ \\
\\ \\____\\\\ \\__/.\\_\\\\ \\_\\ \\_\\ \\_\\\\ \\____\\ \\ \\_\\ \\ \\____/\\ \\_\\ \\_\\
 \\/____/ \\/__/\\/_/ \\/_/\\/_/\\/_/ \\/____/  \\/_/  \\/___/  \\/_/\\/_/
                                   __
                                  /\\ \\
             ___ ___       __     \\ \\ \\___      ___     ___
           /' __\` __\`\\   /'__\`\\    \\ \\  _ \`\\   / __\`\\ /' _ \`\\
           /\\ \\/\\ \\/\\ \\ /\\ \\L\\.\\_   \\ \\ \\ \\ \\ /\\ \\L\\ \\/\\ \\/\\ \\
           \\ \\_\\ \\_\\ \\_\\\\ \\__/.\\_\\   \\ \\_\\ \\_\\\\ \\____/\\ \\_\\ \\_\\
            \\/_/\\/_/\\/_/ \\/__/\\/_/    \\/_/\\/_/ \\/___/  \\/_/\\/_/`;

export default function TerminalChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [promptIndex, setPromptIndex] = useState(() =>
    Math.floor(Math.random() * PROMPTS.length)
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const pickNewPrompt = () => {
    setPromptIndex((prev) => {
      let next = Math.floor(Math.random() * PROMPTS.length);
      while (next === prev && PROMPTS.length > 1) {
        next = Math.floor(Math.random() * PROMPTS.length);
      }
      return next;
    });
  };

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
      inputRef.current?.focus();
      pickNewPrompt();
    }
  };

  return (
    <div
      className="flex flex-col h-full overflow-hidden"
      style={{
        background: 'var(--terminal-bg)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid var(--glass-border)',
        boxShadow: '0 0 30px var(--accent-muted)',
      }}
    >
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-5 py-4 terminal-scroll">
        {/* ASCII name always visible */}
        <pre
          style={{
            color: 'var(--terminal-text)',
            fontSize: 'clamp(5px, 1.1vw, 9px)',
            lineHeight: 1.15,
            fontFamily: 'var(--font-mono), monospace',
            whiteSpace: 'pre',
            marginBottom: '1rem',
          }}
        >
          {ASCII_NAME}
        </pre>

        {messages.length === 0 && (
          <div className="text-sm" style={{ color: 'var(--terminal-text)' }}>
            <span className="cursor-blink">_</span>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className="mb-3 text-sm">
            {msg.role === 'user' ? (
              <p style={{ color: 'var(--terminal-text)' }}>&gt; {msg.content}</p>
            ) : (
              <p style={{ color: 'var(--terminal-text)', opacity: 0.8 }}>{msg.content}</p>
            )}
          </div>
        ))}

        {isLoading && (
          <p className="text-sm" style={{ color: 'var(--terminal-text)' }}>
            <span className="cursor-blink">...</span>
          </p>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <form onSubmit={handleSubmit} style={{ borderTop: '1px solid var(--accent-muted)' }}>
        <div className="flex items-center p-4">
          <span style={{ color: 'var(--terminal-text)' }}>&gt;&nbsp;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={PROMPTS[promptIndex]}
            disabled={isLoading}
            className="flex-1 bg-transparent outline-none text-sm placeholder-current"
            style={{ color: 'var(--terminal-text)' }}
            autoComplete="off"
            spellCheck={false}
          />
        </div>
      </form>
    </div>
  );
}
