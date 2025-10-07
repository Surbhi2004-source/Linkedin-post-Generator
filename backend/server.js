// import express from "express";
// import bodyParser from "body-parser";
// import cors from "cors";
// import dotenv from "dotenv";
// import Groq from "groq-sdk";

// dotenv.config();

// const app = express();
// const port = 5000;

// app.use(cors());
// app.use(bodyParser.json());

// // setup Groq client
// const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// // Route: Generate LinkedIn Post
// app.post("/generate-post", async (req, res) => {
//   try {
//     const { topic, length, language } = req.body;

//     const prompt = `Write a ${length} LinkedIn post in ${language} about ${topic}.
//     Make it professional, engaging, and suitable for LinkedIn.`;

//     const chatCompletion = await groq.chat.completions.create({
//       messages: [{ role: "user", content: prompt }],
//       model: "llama-3.1-8b-instant",
//       temperature: 1,
//       max_completion_tokens: 512,
//       top_p: 1,
//       stream: false
//     });

//     const output = chatCompletion.choices[0]?.message?.content || "No output generated";
//     res.json({ text: output });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Groq API failed" });
//   }
// });

// // Route: Generate Caption
// app.post("/generate-caption", async (req, res) => {
//   try {
//     const { company, date, certName, issuedBy, skills, hashtags, url } = req.body;

//     const prompt = `Write a LinkedIn caption for completing "${certName}" from ${company},
//     issued by ${issuedBy} on ${date}. Mention skills: ${skills}, hashtags: ${hashtags},
//     and include the certificate URL: ${url}.`;

//     const chatCompletion = await groq.chat.completions.create({
//       messages: [{ role: "user", content: prompt }],
//       model: "llama-3.1-8b-instant",
//       temperature: 1,
//       max_completion_tokens: 512,
//       top_p: 1,
//       stream: false
//     });

//     const output = chatCompletion.choices[0]?.message?.content || "No output generated";
//     res.json({ text: output });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Groq API failed" });
//   }
// });

// app.listen(port, () => {
//   console.log(`✅ Backend running at http://localhost:${port}`);
// });

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

// ✅ Route 2: Generate Caption
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

// ✅ Start server
app.listen(port, () => {
  console.log(`🚀 Backend running at http://localhost:${port}`);
});

