// ⚠️ This is a Trae AI abstraction layer
// Real Trae AI SDK / API yahin plug hoga

export async function analyzeProject(project) {
  // TEMP MOCK (Hackathon-safe)
  return {
    score: Math.floor(Math.random() * 3) + 7, // 7–9
    category: "Web Development",
    strengths: [
      "Clear project structure",
      "Practical use case",
    ],
    improvements: [
      "Add authentication",
      "Deploy on cloud",
      "Improve README documentation",
    ],
  };
}
