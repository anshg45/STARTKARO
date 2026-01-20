import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Card from "../components/Card";

export default function Guide() {
  const [guides, setGuides] = useState([]);

  useEffect(() => {
    fetchGuides();
  }, []);

  const fetchGuides = async () => {
    try {
      const res = await api.get("/guides");
      setGuides(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container page-container" style={{ padding: "80px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h1 className="page-title">📘 Guides & Resources</h1>
          <p>Step-by-step guidance for students.</p>
        </div>
        <Link to="/guide/add" className="btn animated-btn">
          + Share a Guide
        </Link>
      </div>

      <div className="feature-grid">
        {guides.map((g) => (
          <Card
            key={g._id}
            title={g.title}
            subtitle={g.content.substring(0, 100) + "..."}
            tag={g.category}
            action={g.file ? "View File" : "Read"}
            onAction={() => {
              if (g.file) {
                window.open(g.file, "_blank");
              } else {
                alert(g.content);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}
