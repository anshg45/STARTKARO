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
      <section className="container section" style={{ padding: "60px 0", background: "rgba(255,255,255,0.02)", borderRadius: "20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px" }}>
          <div>
            <h2 style={{ marginBottom: "20px" }}>📄 About Us | AURA</h2>
            <p style={{ marginBottom: "15px", lineHeight: "1.7" }}>
              AURA – Association for Unleashing Research & Advancement is a student-led community dedicated to fostering innovation, research excellence, and hands-on learning. We believe true growth happens when ideas meet execution.
            </p>
            <p style={{ marginBottom: "15px", lineHeight: "1.7" }}>
              At AURA, students are encouraged to question, explore, experiment, and build. Through research initiatives, technical projects, events, and collaborations, we create an ecosystem where learning goes beyond classrooms and transforms into real-world impact.
            </p>
            <p style={{ fontStyle: "italic", color: "var(--text-muted)" }}>
              AURA is not just a society — it is a movement of thinkers, makers, and leaders working together to shape the future.
            </p>
          </div>
          <div>
            <h2 style={{ marginBottom: "20px" }}>📄 Vision & Mission | AURA</h2>
            
            <div style={{ marginBottom: "25px" }}>
              <h3 style={{ fontSize: "1.3rem", color: "var(--primary)", marginBottom: "10px" }}>🌟 Our Vision</h3>
              <p style={{ lineHeight: "1.7" }}>
                To build a dynamic community where students become innovators, researchers, and change-makers, capable of solving real-world problems through knowledge, creativity, and collaboration.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: "1.3rem", color: "var(--primary)", marginBottom: "10px" }}>🎯 Our Mission</h3>
              <ul style={{ paddingLeft: "20px", lineHeight: "1.7" }}>
                <li>To promote research-driven thinking and innovation</li>
                <li>To encourage hands-on learning through projects and experimentation</li>
                <li>To build a culture of collaboration, leadership, and excellence</li>
                <li>To provide platforms for skill development, competitions, and exposure</li>
                <li>To support students in transforming ideas into impactful outcomes</li>
              </ul>
            </div>
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
