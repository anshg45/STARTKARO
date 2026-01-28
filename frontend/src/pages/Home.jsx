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
              Welcome to <span>AURA</span>
            </h1>
            <p className="hero-subtitle" style={{ fontSize: "1.2rem", fontWeight: "500", marginTop: "-10px", color: "var(--text-muted)" }}>
              Association for Unleashing Research & Advancement
            </p>

            <p>
              AURA is a forward-thinking student-driven community built for innovation, research, and real-world impact. We bring together curious minds who believe in learning beyond textbooks and creating solutions that matter.
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
              { label: "🤖 AI Mentor", path: "/ai-mentor", style: { gridColumn: "span 2" } },
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

      {/* WHAT WE STAND FOR */}
      <section className="container section" style={{ padding: "60px 0" }}>
        <h2 className="section-title" style={{ textAlign: "center", marginBottom: "40px" }}>🚀 What We Stand For</h2>
        <div className="feature-grid">
          <div className="feature-card animated-card">
            <h3>💡 Igniting Ideas</h3>
            <p>Turning curiosity into innovation.</p>
          </div>
          <div className="feature-card animated-card">
            <h3>🤝 Building Bonds</h3>
            <p>Strong collaboration, stronger community.</p>
          </div>
          <div className="feature-card animated-card">
            <h3>🛠️ Learning by Doing</h3>
            <p>Hands-on projects, real exposure.</p>
          </div>
          <div className="feature-card animated-card">
            <h3>🏆 Challenging Yourself</h3>
            <p>Competitions, research & leadership.</p>
          </div>
          <div className="feature-card animated-card">
            <h3>🌱 Growing Together</h3>
            <p>Personal, technical, and professional growth.</p>
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: "40px", maxWidth: "800px", margin: "40px auto 0", lineHeight: "1.8" }}>
          <p>
            At AURA, we encourage members to explore, experiment, and excel through research initiatives, technical projects, workshops, events, and collaborative learning. Our goal is to create an ecosystem where ideas are nurtured and students evolve into confident problem-solvers and leaders.
          </p>
          <p style={{ marginTop: "20px", fontWeight: "bold", color: "var(--primary)" }}>
            ✨ Welcome to the AURA family — together, let’s shape ideas into impact and build something truly extraordinary.
          </p>
          <div style={{ marginTop: "30px", fontStyle: "italic" }}>
            <p>Warm Regards</p>
            <p><strong>Anshpreet Singh Bindra</strong></p>
            <p>Founder / President, AURA</p>
          </div>
        </div>
      </section>

      {/* ABOUT US & VISION */}
      <section className="container section" style={{ padding: "80px 0" }}>
        
        {/* ABOUT US */}
        <div style={{ 
          textAlign: "center", 
          maxWidth: "800px", 
          margin: "0 auto 80px", 
          background: "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%)",
          padding: "40px",
          borderRadius: "24px",
          border: "1px solid var(--border)"
        }}>
          <div className="badge" style={{ marginBottom: "20px" }}>About Us</div>
          <h2 style={{ fontSize: "2.5rem", marginBottom: "20px", lineHeight: "1.2" }}>
            Unleashing Research & Advancement
          </h2>
          <p style={{ fontSize: "1.1rem", lineHeight: "1.8", color: "var(--text-muted)", marginBottom: "0" }}>
            AURA is more than just a society—it’s a movement. We are a student-led community dedicated to fostering innovation, research excellence, and hands-on learning. We believe that true growth happens when ideas meet execution, and we are here to bridge that gap.
          </p>
        </div>

        {/* VISION & MISSION GRID */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "30px", justifyContent: "center" }}>
          
          {/* VISION */}
          <div className="feature-card animated-card" style={{ 
            background: "linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(0,0,0,0) 100%)",
            borderColor: "rgba(249, 115, 22, 0.3)"
          }}>
            <div style={{ 
              width: "50px", height: "50px", background: "var(--primary)", borderRadius: "12px", 
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", marginBottom: "20px",
              boxShadow: "0 10px 20px rgba(249, 115, 22, 0.3)"
            }}>
              🌟
            </div>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "15px" }}>Our Vision</h3>
            <p style={{ lineHeight: "1.7", color: "var(--text-muted)" }}>
              To build a dynamic community where students become innovators, researchers, and change-makers, capable of solving real-world problems through knowledge, creativity, and collaboration.
            </p>
          </div>

          {/* MISSION */}
          <div className="feature-card animated-card">
            <div style={{ 
              width: "50px", height: "50px", background: "rgba(255,255,255,0.1)", borderRadius: "12px", 
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", marginBottom: "20px"
            }}>
              🎯
            </div>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "15px" }}>Our Mission</h3>
            <ul style={{ paddingLeft: "20px", lineHeight: "1.8", color: "var(--text-muted)" }}>
              <li style={{ marginBottom: "8px" }}>Promote research-driven thinking & innovation</li>
              <li style={{ marginBottom: "8px" }}>Encourage hands-on learning via projects</li>
              <li style={{ marginBottom: "8px" }}>Build a culture of collaboration & leadership</li>
              <li style={{ marginBottom: "8px" }}>Provide platforms for skill development</li>
              <li>Support transforming ideas into impact</li>
            </ul>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        © 2026 AURA • Association for Unleashing Research & Advancement
      </footer>
    </>
  );
}
