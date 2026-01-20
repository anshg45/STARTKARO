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
          <Card
            key={g._id}
            title={g.title}
            subtitle={g.description}
            tag={`₹${g.budget}`}
            action="Apply Now"
            onAction={() => {
              if (g.client?.email) {
                window.location.href = `mailto:${g.client.email}?subject=Application for ${g.title}`;
              } else {
                alert("Client contact not available.");
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}
