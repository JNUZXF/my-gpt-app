// pages/api/chat.js
import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const { messages } = req.body;

  try {
    const result = await openai.createChatCompletion({
    headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },  
      model: "gpt-3.5-turbo",
      messages: messages,
    });
    res.status(200).json(result.data);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}
