import OpenAI from "openai";

let client;

function getClient() {
  if (!client && process.env.OPENAI_API_KEY) {
    client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return client;
}

export async function askAI(question) {
  const trimmed = question?.trim();

  if (!trimmed) {
    return {
      answer:
        "Ask a specific question about projects, startups, freelancing, or careers.",
      source: "OpenAI",
    };
  }

  const openai = getClient();

  if (!openai) {
    return {
      answer: "AI mentor is not configured on the server.",
      source: "System",
    };
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are AURA AI Mentor helping students with projects, startups, freelancing, careers and productivity. Give clear, practical, step-by-step advice.",
        },
        { role: "user", content: trimmed },
      ],
      temperature: 0.7,
    });

    const content =
      response.choices?.[0]?.message?.content ||
      "I could not generate an answer. Try asking in a different way.";

    return {
      answer: content,
      source: "OpenAI",
    };
  } catch (err) {
    console.error("askAI error", err);
    return {
      answer: "AI mentor is temporarily unavailable. Please try again later.",
      source: "System",
    };
  }
}

