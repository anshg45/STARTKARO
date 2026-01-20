import { useEffect, useState } from "react";
import { logout } from "../utils/auth";
import api from "../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    startups: 0,
    freelance: 0,
    events: 0,
    users: 0
  });

  const [passData, setPassData] = useState({ oldPassword: "", newPassword: "" });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/dashboard/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
      }
    };
    fetchStats();
  }, []);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      await api.post("/auth/change-password", passData);
      setMsg("✅ Password updated successfully!");
      setPassData({ oldPassword: "", newPassword: "" });
    } catch (err) {
      setMsg("❌ " + (err.response?.data?.message || "Failed to update password"));
    }
  };

  return (
    <div className="container page-container">
      <h1 className="page-title">Welcome to AURA 🌟</h1>
      
      <div className="dashboard-stats">
        <div className="stat-card animated-card">Projects <b>{stats.projects}</b></div>
        <div className="stat-card animated-card">Startups <b>{stats.startups}</b></div>
        <div className="stat-card animated-card">Freelance Gigs <b>{stats.freelance}</b></div>
        <div className="stat-card animated-card">Events <b>{stats.events}</b></div>
        <div className="stat-card animated-card">Students <b>{stats.users}</b></div>
      </div>

      <div className="feature-card animated-card" style={{ textAlign: "left" }}>
        <h3>🚀 AURA – An AI-Powered Student Innovation Platform</h3>
        <p style={{ marginTop: "10px", lineHeight: "1.6" }}>
          AURA is not just a project management platform — it is an AI-powered mentor ecosystem designed to help students think, build, and launch real-world ideas. The platform brings together projects, startups, freelancing, learning resources, and AI mentorship into one unified experience.
        </p>

        <h4 style={{ marginTop: "20px", color: "#4f6ef7" }}>🔍 Problem Statement</h4>
        <p style={{ marginTop: "5px" }}>Students have ideas but lack:</p>
        <ul style={{ paddingLeft: "20px", marginTop: "10px", lineHeight: "1.6" }}>
          <li>Proper mentorship</li>
          <li>Structured guidance</li>
          <li>A place to showcase and manage their work</li>
          <li>Access to the right resources at the right time</li>
        </ul>

        <p style={{ marginTop: "15px", fontStyle: "italic", color: "var(--text-muted)" }}>
          Most platforms either focus only on learning or only on projects. AURA bridges this gap by combining execution, guidance, and intelligence.
        </p>
      </div>

      <div className="feature-card animated-card" style={{ marginTop: "20px", textAlign: "left" }}>
        <h3>🔒 Change Password</h3>
        <form onSubmit={handleChangePassword} style={{ marginTop: "15px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <input
            type="password"
            placeholder="Old Password"
            className="input-field"
            value={passData.oldPassword}
            onChange={(e) => setPassData({ ...passData, oldPassword: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="New Password"
            className="input-field"
            value={passData.newPassword}
            onChange={(e) => setPassData({ ...passData, newPassword: e.target.value })}
            required
          />
          <button type="submit" className="btn primary">Update</button>
        </form>
        {msg && <p style={{ marginTop: "10px", fontWeight: "bold" }}>{msg}</p>}
      </div>

      <br />
      <button className="btn secondary animated-btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
}
