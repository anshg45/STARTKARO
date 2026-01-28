import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import Card from "../components/Card";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    api.get("/projects").then((res) => {
      setProjects(res.data);
    });
  };

  const handleDelete = async (id) => {
    if (!id) {
      alert("Error: Project ID is missing!");
      return;
    }

    try {
      await api.delete(`/projects/${id}`);
      setProjects(projects.filter((p) => p._id !== id));
      alert("Project deleted successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete project");
    }
  };

  return (
    <div className="container page-container" style={{ padding: "80px 0" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 className="page-title">📂 All Projects</h1>

        <Link to="/projects/add" className="btn primary animated-btn">
          + Add Project
        </Link>
      </div>

      {projects.length === 0 && <p>No projects added yet.</p>}

      <div className="feature-grid">
        {projects.map((p) => (
          <div
            key={p._id}
            className="feature-card animated-card"
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {p.image && (
              <img
                src={p.image}
                alt={p.title}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            )}

            <div>
              <h3 style={{ marginBottom: "5px" }}>{p.title}</h3>
              <p style={{ color: "#666", fontSize: "0.95rem" }}>{p.description}</p>
            </div>

            <div
              style={{
                background: "rgba(0,0,0,0.03)",
                padding: "12px",
                borderRadius: "8px",
                fontSize: "0.9rem",
              }}
            >
              <div style={{ marginBottom: "5px" }}>
                <strong>👥 Members:</strong> {p.members || 1}
              </div>
              <div style={{ marginBottom: "5px" }}>
                <strong>🔍 Looking for:</strong> {p.positions || "Open to all"}
              </div>
              <div>
                <strong>👤 Created by:</strong> {p.user?.name || "Unknown"}
              </div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "auto" }}>
              <button
                className="btn secondary"
                style={{ flex: 1, fontSize: "0.8rem", padding: "8px" }}
                onClick={() => window.open(p.githubUrl, "_blank")}
              >
                GitHub Repo
              </button>

              {p.whatsapp && (
                <button
                  className="btn ghost"
                  style={{ flex: 1, fontSize: "0.8rem", padding: "8px" }}
                  onClick={() => window.open(`https://wa.me/${p.whatsapp.replace(/\D/g, "")}`, "_blank")}
                >
                  WhatsApp
                </button>
              )}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {p.linkedin && (
                <button
                  className="btn ghost"
                  style={{ flex: 1, fontSize: "0.8rem", padding: "8px" }}
                  onClick={() => window.open(p.linkedin, "_blank")}
                >
                  LinkedIn
                </button>
              )}
              {p.githubProfile && (
                <button
                  className="btn ghost"
                  style={{ flex: 1, fontSize: "0.8rem", padding: "8px" }}
                  onClick={() => window.open(p.githubProfile, "_blank")}
                >
                  Creator Profile
                </button>
              )}
            </div>

            {(user?.role === "admin" || user?.email === "admin@startkaro.com" || user?.email?.toLowerCase().trim().startsWith("superadmin") || user?.id === p.user?._id) && (
              <button
                className="btn animated-btn"
                style={{
                  backgroundColor: "#ff4444",
                  color: "white",
                  marginTop: "10px",
                  width: "100%",
                }}
                onClick={() => handleDelete(p._id)}
              >
                🗑️ Delete Project
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
