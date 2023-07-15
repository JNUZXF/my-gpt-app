// pages/index.js
import React, { useState } from "react";
import ChatBox from "../components/ChatBox";
import axios from 'axios';

const IndexPage = () => {
  const [messages, setMessages] = useState([
    { role: 'system', content: 'You are a helpful assistant.' },
  ]);

  const handleSendMessage = async (message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: 'user', content: message },
    ]);

    try {
      const response = await axios.post('/api/chat', {
        messages: [
          ...messages,
          { role: 'user', content: message },
        ],
      });

      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'assistant', content: response.data.choices[0].message.content },
      ]);
    } catch (error) {
      console.error('Error calling chat API', error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Welcome to our chat!</h1>
      <ChatBox messages={messages} onSendMessage={handleSendMessage} />
    </div>
  );
};

export default IndexPage;
