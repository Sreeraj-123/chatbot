'use client';

import { useState } from 'react';

// Define a type that matches what your UI expects
type MockMessage = {
  id: string;
  role: 'user' | 'assistant';
  parts: { type: 'text'; text: string }[];
};

export default function Chat() {
  const [input, setInput] = useState('');
  
  // 1. Manually set your messages here
  const [messages, setMessages] = useState<MockMessage[]>([
    {
      id: '1',
      role: 'user',
      parts: [{ type: 'text', text: 'Testing the primary border color!' }]
    },
    {
      id: '2',
      role: 'assistant',
      parts: [{ type: 'text', text: 'Testing the assistant secondary border color!' }]
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // 2. Just add the message to the local list (Simulating a chat)
    const newMessage: MockMessage = {
      id: Date.now().toString(),
      role: 'user',
      parts: [{ type: 'text', text: input }]
    };
    
    setMessages([...messages, newMessage]);
    setInput('');
  };

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto p-4 bg-background">
      <div className="flex-1 overflow-y-auto space-y-4 pb-20 flex flex-col">
        {messages.map((m) => (
          <div 
            key={m.id} 
            className={`p-3 rounded-lg max-w-[80%] border-2 transition-all ${
              m.role === 'user' 
                ? 'bg-primary text-primary-foreground self-end border-user-border' 
                : 'bg-muted text-muted-foreground self-start border-assistant-border'
            }`}
          >
            <div className="font-bold text-xs mb-1 opacity-50 uppercase">{m.role}</div>
            {m.parts.map((part, i) => (
              part.type === 'text' ? <p key={i}>{part.text}</p> : null
            ))}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="fixed bottom-4 left-0 right-0 max-w-2xl mx-auto px-4">
        <input
          className="w-full p-3 border rounded-xl shadow-lg focus:ring-1 focus:ring-green-500 outline-none bg-white text-black"
          value={input}
          placeholder="Type to test UI..."
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
    </div>
  );
}