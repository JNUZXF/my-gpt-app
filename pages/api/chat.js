// pages/api/chat.js
import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const { messages } = req.body;

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
      stream: true,  // Enable streaming
    });

    // Handle the response as a stream
    response.data.on('data', (chunk) => {
      // Each chunk is a part of the response
      const part = JSON.parse(chunk.toString());
      res.write(part);
    });

    response.data.on('end', () => {
      // Close the connection when the response is complete
      res.end();
    });

  } catch (error) {
    console.error('Error calling OpenAI API', error);
    res.status(500).json({ error: error.toString() });
  }
}
