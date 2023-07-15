// pages/api/chat.js
import { Configuration, OpenAIApi } from "openai";
import fetch from "node-fetch";

export default async function handler(req, res) {
  const { messages } = req.body;

  try {
    const fetchResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: messages,
        stream: true,  // Enable streaming
      })
    });

    if (!fetchResponse.ok) {
      // Forward the error response
      res.status(fetchResponse.status);
      res.send(await fetchResponse.text());
      return;
    }

    // Forward the response as a stream
    res.setHeader('Content-Type', 'application/json');
    fetchResponse.body.pipe(res);

  } catch (error) {
    console.error('Error calling OpenAI API', error);
    res.status(500).json({ error: error.toString() });
  }
}
