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
          placeholder="GitHub Repository URL (Project)"
          value={githubUrl}
          onChange={(e) => setGithubUrl(e.target.value)}
        />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          <input
            type="number"
            placeholder="Team Size (Members)"
            min="1"
            value={members}
            onChange={(e) => setMembers(e.target.value)}
          />
          <input
            placeholder="Open Positions (e.g. Frontend, UI)"
            value={positions}
            onChange={(e) => setPositions(e.target.value)}
          />
        </div>

        <h3>Contact Details (Compulsory)</h3>
        <input
          placeholder="Your Name / GitHub Profile URL"
          value={githubProfile}
          onChange={(e) => setGithubProfile(e.target.value)}
        />
        <input
          placeholder="WhatsApp Number"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
        />
        <input
          placeholder="LinkedIn Profile URL"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
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
