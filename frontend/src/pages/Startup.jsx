import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import Card from "../components/Card";

export default function Startup() {
  const [startups, setStartups] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    fetchStartups();
  }, []);

  const fetchStartups = async () => {
    try {
      const res = await api.get("/startups");
      setStartups(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/startups/${id}`);
      setStartups(startups.filter((s) => s._id !== id));
      alert("Startup deleted successfully!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete startup");
    }
  };

  return (
    <div className="container page-container" style={{ padding: "80px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h1 className="page-title">🚀 Student Startups</h1>
          <p>Discover startups built by students.</p>
        </div>
        <Link to="/startup/add" className="btn animated-btn">
          + Register Startup
        </Link>
      </div>

      <div className="feature-grid">
        {startups.map((s) => (
          <Card
            key={s._id}
            title={s.name}
            subtitle={s.description}
            tag={s.sector}
            action="Contact Founder"
            image={s.logo}
            onAction={() => {
              if (s.founder?.email) {
                window.location.href = `mailto:${s.founder.email}?subject=Inquiry about ${s.name}`;
              } else {
                alert(`Founded by ${s.founder?.name || "Unknown"}`);
              }
            }}
            onDelete={(user?.role === "admin" || user?.email === "admin@startkaro.com" || user?.email?.toLowerCase().trim().startsWith("superadmin") || user?.id === s.founder?._id) ? () => handleDelete(s._id) : null}
          />
        ))}
      </div>
    </div>
  );
}
