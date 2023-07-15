import React, { useState } from "react";

const ChatBox = ({ messages = [], onSendMessage }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() !== '') {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="chat-box">
      {messages.map((message, index) => (
        <p key={index}>{message.role === 'user' ? `You: ${message.content}` : `Assistant: ${message.content}`}</p>
      ))}
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default ChatBox;
