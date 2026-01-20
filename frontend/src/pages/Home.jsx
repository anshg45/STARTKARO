import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      {/* HERO */}
      <section className="hero page-container">
        <div className="container hero-inner">

          {/* LEFT */}
          <div className="hero-text">
            <h1 className="page-title">
              Socho. <span>Banao.</span><br />
              Kamao.
            </h1>

            <p>
              One platform for students to build projects, launch startups,
              freelance, rent tools & grow together.
            </p>

            <div className="hero-buttons">
              <button
                className="btn primary animated-btn"
                onClick={() => navigate("/login")}
              >
                Get Started
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="hero-visual" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            {[
              { label: "🚀 Projects", path: "/projects" },
              { label: "🦄 Startups", path: "/startup" },
              { label: "💼 Freelance", path: "/freelance" },
              { label: "🛒 Rent & Buy", path: "/marketplace" },
              { label: "📅 Events", path: "/events" },
              { label: "📘 Guides", path: "/guide" },
              { label: "🤖 AI Mentor", path: "/ai-mentor", style: { gridColumn: "span 2", background: "rgba(255, 255, 255, 0.95)" } },
            ].map((item) => (
              <div
                key={item.label}
                className="glass-card animated-card"
                onClick={() => navigate(item.path)}
                style={{ 
                  cursor: "pointer", 
                  textAlign: "center", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  ...(item.style || {}) 
                }}
              >
                {item.label}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        © 2026 StartKaro • Built for students
      </footer>
    </>
  );
}
