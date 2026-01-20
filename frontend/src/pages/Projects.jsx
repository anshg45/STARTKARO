import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import Card from "../components/Card";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("/projects").then((res) => {
      setProjects(res.data);
    });
  }, []);

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
          <Card
            key={p._id}
            title={p.title}
            subtitle={p.description}
            tag="Project"
            action="View Repo"
            image={p.image}
            onAction={() => {
              let url = p.githubUrl;
              if (url && !url.startsWith("http://") && !url.startsWith("https://")) {
                url = "https://" + url;
              }
              window.open(url, "_blank");
            }}
          />
        ))}
      </div>
    </div>
  );
}
