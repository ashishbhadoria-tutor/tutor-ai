import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "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"
    },
    body: JSON.stringify({
      model: "llama3-70b-8192",
      messages: [
        {
          role: "system",
          content: "You are a friendly Class 4 English teacher. Teach grammar in simple English. Ask questions and encourage the child."
        },
        {
          role: "user",
          content: userMessage
        }
      ]
    })
  });

  const data = await response.json();
  res.json({ reply: data.choices[0].message.content });
});

app.listen(3000);
