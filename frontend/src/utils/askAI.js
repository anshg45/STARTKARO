import OpenAI from "openai";
import fetch from "node-fetch";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function askAI(prompt) {
  // 1️⃣ Try ChatGPT first
  try {
    const res = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    return {
      source: "ChatGPT",
      answer: res.choices[0].message.content,
    };
  } catch (err) {
    console.log("⚠️ ChatGPT failed, switching to Gemini...");
  }

  // 2️⃣ Fallback to Gemini
  try {
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await geminiRes.json();

    return {
      source: "Gemini",
      answer: data.candidates[0].content.parts[0].text,
    };
  } catch (err) {
    throw new Error("All AI models failed");
  }
}
