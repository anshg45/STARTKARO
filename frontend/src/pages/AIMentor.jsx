import { useState } from "react";
import ReactMarkdown from "react-markdown";
import api from "../services/api";

export default function AIMentor() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const ask = async () => {
    if (!question.trim() || loading) return;

    try {
      setLoading(true);
      setAnswer("");
      const res = await api.post("/ai/mentor", { question });
      setAnswer(res.data.answer);
    } catch (error) {
      setAnswer("Failed to get response. Backend may be offline.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-mentor-page page-container">
      <div className="container">
        <div className="ai-mentor-header">
          <div className="ai-mentor-icon">🤖</div>
          <div>
            <h1 className="page-title">AURA AI Mentor</h1>
            <p>Describe your doubt in simple words and get a guided answer.</p>
          </div>
        </div>

        <div className="ai-input-card animated-card">
          <textarea
            className="ai-input"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Example: I want to start a startup in college. Give me a step-by-step plan."
          />

          <div className="ai-input-footer">
            <span>Tip: Be specific so the mentor can give you better steps.</span>
            <button
              className={`btn primary ai-ask-btn animated-btn${loading ? " loading" : ""}`}
              onClick={ask}
            >
              {loading ? "Thinking..." : "Ask AI"}
            </button>
          </div>
        </div>

        {answer && (
          <div className="ai-answer-card animated-card">
            <ReactMarkdown>{answer}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
