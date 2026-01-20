import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function AddGuide() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("General");
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const submit = async () => {
    if (!title || !content) {
      alert("All fields required");
      return;
    }

    try {
      const data = new FormData();
      data.append("title", title);
      data.append("content", content);
      data.append("category", category);
      if (file) data.append("file", file);

      await api.post("/guides", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      navigate("/guide");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to share guide");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Share a Guide</h2>

        <input
          placeholder="Guide Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
            marginBottom: "16px",
          }}
        >
          <option value="General">General</option>
          <option value="Startup">Startup</option>
          <option value="Freelance">Freelance</option>
          <option value="Projects">Projects</option>
          <option value="Career">Career</option>
        </select>

        <input
          type="file"
          accept=".pdf,.doc,.docx,.ppt,.pptx"
          onChange={(e) => setFile(e.target.files[0])}
          style={{
            width: "100%",
            padding: "14px",
            background: "#fff",
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
            marginBottom: "16px",
          }}
        />

        <textarea
          placeholder="Guide Content (Markdown supported)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{
            width: "100%",
            height: "200px",
            padding: "14px",
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
            marginBottom: "16px",
            resize: "vertical",
          }}
        />

        <button className="btn primary" onClick={submit}>
          Publish Guide
        </button>
      </div>
    </div>
  );
}
