const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: `You are a knowledgeable and friendly AI assistant designed specifically for the trucking industry.
                                    You help commercial truck drivers troubleshoot issues, understand DOT (Department of Transportation) compliance regulations, and provide clear, step-by-step maintenance advice.
                                    Whenever possible, include actionable steps, safety considerations, and refer to industry best practices.
                                    Keep your language clear and concise, and avoid overly technical jargon unless the user specifically asks for it.`},
        { role: "user", content: message }
      ]
    })
  });

  const data = await response.json();
  res.json({ reply: data.choices[0].message.content });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

app.post("/api/pretrip", async (req, res) => {
  const { state } = req.body;

  if (!state) {
    return res.status(400).json({ error: "State is required" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are acting as a DOT compliance officer generating official pre-trip inspection checklists.
                      Your job is to provide commercial truck drivers with state-specific inspection steps that comply with FMCSA (Federal Motor Carrier Safety Administration) and local DOT regulations.

                      The checklist should be:
                      - Clear and easy to follow
                      - Broken down by inspection areas (e.g., exterior, engine, cab, tires)
                      - Written in plain language
                      - Including mandatory items specific to the selected state
                      - Emphasizing safety and legal compliance`},
          {
            role: "user",
            content: `Generate a pre-trip inspection checklist for a commercial truck driver operating in ${state}. Follow DOT standards.`
          }
        ]
      })
    });

    const data = await response.json();
    res.json({ checklist: data.choices[0].message.content });
  } catch (error) {
    console.error("Error generating pre-trip checklist:", error);
    res.status(500).json({ error: "Failed to generate checklist." });
  }
});