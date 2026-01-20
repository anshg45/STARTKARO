import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function AddProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const submit = async () => {
    if (!title || !description || !githubUrl) {
      alert("All fields required");
      return;
    }

    try {
      const data = new FormData();
      data.append("title", title);
      data.append("description", description);
      data.append("githubUrl", githubUrl);
      if (image) data.append("image", image);

      await api.post("/projects", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      navigate("/projects");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add project");
    }
  };

  return (
    <div className="auth-page page-container">
      <div className="auth-card animated-card">
        <h2>Add Project</h2>

        <input
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="GitHub Repository URL"
          value={githubUrl}
          onChange={(e) => setGithubUrl(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
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
          placeholder="Project Description"
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

        <button className="btn primary animated-btn" onClick={submit}>
          Create Project
        </button>
      </div>
    </div>
  );
}
