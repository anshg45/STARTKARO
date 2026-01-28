import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Card from "../components/Card";

export default function Freelance() {
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    fetchGigs();
  }, []);

  const fetchGigs = async () => {
    try {
      const res = await api.get("/freelance");
      setGigs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await api.delete(`/freelance/${id}`);
      setGigs(gigs.filter((g) => g._id !== id));
      alert("Gig deleted successfully!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete gig");
    }
  };

  return (
    <div className="container page-container" style={{ padding: "80px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h1 className="page-title">💼 Freelance Gigs</h1>
          <p>Earn while you learn with verified gigs.</p>
        </div>
        <Link to="/freelance/add" className="btn animated-btn">
          + Post a Gig
        </Link>
      </div>

      <div className="feature-grid">
        {gigs.map((g) => (
          <div
            key={g._id}
            className="feature-card animated-card"
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
              <h3 style={{ margin: 0 }}>{g.title}</h3>
              <span className="badge">₹{g.budget}</span>
            </div>

            <p style={{ color: "#666", fontSize: "0.95rem" }}>{g.description}</p>

            <div
              style={{
                background: "rgba(0,0,0,0.03)",
                padding: "12px",
                borderRadius: "8px",
                fontSize: "0.9rem",
              }}
            >
              <div style={{ marginBottom: "5px" }}>
                <strong>🛠 Skills:</strong> {g.skills?.join(", ")}
              </div>
              <div>
                <strong>👤 Posted by:</strong> {g.client?.name || "Unknown"}
              </div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "auto" }}>
              <button
                className="btn primary"
                style={{ flex: 1, fontSize: "0.8rem", padding: "8px" }}
                onClick={() => {
                  if (g.client?.email) {
                    window.location.href = `mailto:${g.client.email}?subject=Application for ${g.title}`;
                  }
                }}
              >
                Apply (Email)
              </button>

              {g.whatsapp && (
                <button
                  className="btn ghost"
                  style={{ flex: 1, fontSize: "0.8rem", padding: "8px" }}
                  onClick={() => window.open(`https://wa.me/${g.whatsapp.replace(/\D/g, "")}`, "_blank")}
                >
                  WhatsApp
                </button>
              )}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {g.linkedin && (
                <button
                  className="btn ghost"
                  style={{ flex: 1, fontSize: "0.8rem", padding: "8px" }}
                  onClick={() => window.open(g.linkedin, "_blank")}
                >
                  LinkedIn
                </button>
              )}
              {g.githubProfile && (
                <button
                  className="btn ghost"
                  style={{ flex: 1, fontSize: "0.8rem", padding: "8px" }}
                  onClick={() => window.open(g.githubProfile, "_blank")}
                >
                  GitHub
                </button>
              )}
            </div>

            {(user?.role === "admin" || user?.email === "admin@startkaro.com" || user?.id === g.client?._id) && (
              <button
                className="btn animated-btn"
                style={{
                  backgroundColor: "#ff4444",
                  color: "white",
                  marginTop: "10px",
                  width: "100%",
                }}
                onClick={() => handleDelete(g._id)}
              >
                🗑️ Delete Gig
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
