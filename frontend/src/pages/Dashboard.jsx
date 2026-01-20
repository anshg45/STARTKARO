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

  return (
    <div className="container page-container">
      <h1 className="page-title">Welcome to StartKaro 🚀</h1>
      
      <div className="dashboard-stats">
        <div className="stat-card animated-card">Projects <b>{stats.projects}</b></div>
        <div className="stat-card animated-card">Startups <b>{stats.startups}</b></div>
        <div className="stat-card animated-card">Freelance Gigs <b>{stats.freelance}</b></div>
        <div className="stat-card animated-card">Events <b>{stats.events}</b></div>
        <div className="stat-card animated-card">Students <b>{stats.users}</b></div>
      </div>

      <div className="feature-card animated-card" style={{ textAlign: "left" }}>
        <h3>🚀 StartKaro – An AI-Powered Student Innovation Platform</h3>
        <p style={{ marginTop: "10px", lineHeight: "1.6" }}>
          StartKaro is not just a project management platform — it is an AI-powered mentor ecosystem designed to help students think, build, and launch real-world ideas. The platform brings together projects, startups, freelancing, learning resources, and AI mentorship into one unified experience.
        </p>

        <h4 style={{ marginTop: "20px", color: "#4f6ef7" }}>🔍 Problem Statement</h4>
        <p style={{ marginTop: "5px" }}>Students have ideas but lack:</p>
        <ul style={{ paddingLeft: "20px", marginTop: "10px", lineHeight: "1.6" }}>
          <li>Proper mentorship</li>
          <li>Structured guidance</li>
          <li>A place to showcase and manage their work</li>
          <li>Access to the right resources at the right time</li>
        </ul>

        <p style={{ marginTop: "15px", fontStyle: "italic", color: "#666" }}>
          Most platforms either focus only on learning or only on projects. StartKaro bridges this gap by combining execution, guidance, and intelligence.
        </p>
      </div>

      <br />
      <button className="btn secondary animated-btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
}
