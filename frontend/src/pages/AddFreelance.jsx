import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function AddFreelance() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [budget, setBudget] = useState("");

  const navigate = useNavigate();

  const submit = async () => {
    if (!title || !description || !skills || !budget) {
      alert("All fields required");
      return;
    }

    try {
      await api.post("/freelance", {
        title,
        description,
        skills,
        budget
      });

      navigate("/freelance");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to post gig");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Post Freelance Gig</h2>

        <input
          placeholder="Gig Title (e.g. React Developer)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Budget (e.g. ₹5000)"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />

        <input
          placeholder="Skills Required (comma separated)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />

        <textarea
          placeholder="Job Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
            marginBottom: "16px",
          }}
        />

        <button className="btn primary" onClick={submit}>
          Post Gig
        </button>
      </div>
    </div>
  );
}
