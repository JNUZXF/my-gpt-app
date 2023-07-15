import React, { useState } from "react";
import ChatBox from "../components/ChatBox";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const IndexPage = () => {
  const [messages, setMessages] = useState([
    { role: 'system', content: 'You are a helpful assistant.' },
  ]);

  const handleSendMessage = async (message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: 'user', content: message },
    ]);

    const completion = await openai.createChatCompletion({
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${key}`,
          },
        model: "gpt-3.5-turbo",
      messages: [
        ...messages,
        { role: 'user', content: message },
      ],
    });

    setMessages((prevMessages) => [
      ...prevMessages,
      { role: 'assistant', content: completion.data.choices[0].message.content },
    ]);
  };

  return (
    <div className="container">
      <h1 className="title">Welcome to our chat!</h1>
      <ChatBox messages={messages} onSendMessage={handleSendMessage} />
    </div>
  );
};

export default IndexPage;
