import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is missing!" });
    }

    console.log("🧠 Generating post with prompt:", prompt);

    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.1-8b-instant",
      temperature: 1,
      max_completion_tokens: 500,
      top_p: 1,
      stream: false,
    });

    const output = completion.choices[0]?.message?.content || "No response.";
    res.json({ text: output });
  } catch (error) {
    console.error("❌ Error generating post:", error);
    res.status(500).json({ error: "Failed to generate post." });
  }
});

//Generate Caption
app.post("/generate-caption", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is missing!" });
    }

    console.log("🧠 Generating caption with prompt:", prompt);

    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.1-8b-instant",
      temperature: 1,
      max_completion_tokens: 500,
      top_p: 1,
      stream: false,
    });

    const output = completion.choices[0]?.message?.content || "No response.";
    res.json({ text: output });
  } catch (error) {
    console.error("❌ Error generating caption:", error);
    res.status(500).json({ error: "Failed to generate caption." });
  }
});

//Start server
app.listen(port, () => {
  console.log(`🚀 Backend running at http://localhost:${port}`);
});


