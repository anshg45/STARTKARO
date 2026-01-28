import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll Animation Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('scroll-hidden')) entry.target.classList.add('scroll-visible');
          if (entry.target.classList.contains('zoom-hidden')) entry.target.classList.add('zoom-visible');
          if (entry.target.classList.contains('slide-left-hidden')) entry.target.classList.add('slide-left-visible');
          if (entry.target.classList.contains('slide-right-hidden')) entry.target.classList.add('slide-right-visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-hidden, .zoom-hidden, .slide-left-hidden, .slide-right-hidden').forEach((el) => observer.observe(el));

    // Parallax Effect
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const blob = document.querySelector('.parallax-blob');
      if (blob) {
        blob.style.transform = `translate(-50%, calc(-50% + ${scrollY * 0.2}px))`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="hero page-container">
        <div className="container hero-inner">

          {/* LEFT */}
          <div className="hero-text">
            <h1 className="page-title slide-left-hidden">
              Welcome to <span>AURA</span>
            </h1>
            <p className="hero-subtitle slide-left-hidden delay-100" style={{ fontSize: "1.2rem", fontWeight: "500", marginTop: "-10px", color: "var(--text-muted)" }}>
              Association for Unleashing Research & Advancement
            </p>

            <p className="slide-left-hidden delay-200">
              AURA is a forward-thinking student-driven community built for innovation, research, and real-world impact. We bring together curious minds who believe in learning beyond textbooks and creating solutions that matter.
            </p>

            <div className="hero-buttons slide-left-hidden delay-300">
              <button
                className="btn primary animated-btn btn-pulse"
                onClick={() => navigate("/login")}
              >
                Get Started
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="hero-visual">
            <div className="hero-nav-grid">
              <button onClick={() => navigate("/projects")} className="nav-card gradient-1 card-hover-wiggle">
                <span className="nav-icon icon-wiggle">🚀</span> Projects
              </button>
              <button onClick={() => navigate("/startup")} className="nav-card gradient-2 card-hover-wiggle">
                <span className="nav-icon icon-wiggle">🦄</span> Startups
              </button>
              <button onClick={() => navigate("/freelance")} className="nav-card gradient-3 card-hover-wiggle">
                <span className="nav-icon icon-wiggle">💼</span> Freelance
              </button>
              <button onClick={() => navigate("/marketplace")} className="nav-card gradient-4 card-hover-wiggle">
                <span className="nav-icon icon-wiggle">🛒</span> Marketplace
              </button>
              <button onClick={() => navigate("/events")} className="nav-card gradient-5 card-hover-wiggle">
                <span className="nav-icon icon-wiggle">📅</span> Events
              </button>
              <button onClick={() => navigate("/guide")} className="nav-card gradient-6 card-hover-wiggle">
                <span className="nav-icon icon-wiggle">📘</span> Guides
              </button>
              <button onClick={() => navigate("/ai-mentor")} className="nav-card gradient-7 full-width card-hover-wiggle">
                <span className="nav-icon icon-wiggle">🤖</span> AI Mentor
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* WHAT WE STAND FOR */}
      <section className="container section" style={{ padding: "100px 0", position: "relative" }}>
        {/* Background Blob */}
        <div className="parallax-blob" style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)",
          zIndex: -1,
          pointerEvents: "none",
          transition: "transform 0.1s linear"
        }}></div>

        <h2 className="section-title scroll-hidden" style={{ textAlign: "center", marginBottom: "60px", fontSize: "2.5rem" }}>
          🚀 What We Stand For
        </h2>
        
        <div className="feature-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px" }}>
          <div className="feature-card animated-card zoom-hidden" style={{ textAlign: "center", padding: "40px 30px" }}>
            <div style={{ fontSize: "40px", marginBottom: "20px" }}>💡</div>
            <h3 style={{ fontSize: "1.5rem" }}>Igniting Ideas</h3>
            <p style={{ fontSize: "1rem" }}>Turning curiosity into innovation through brainstorming and mentorship.</p>
          </div>
          <div className="feature-card animated-card zoom-hidden delay-100" style={{ textAlign: "center", padding: "40px 30px" }}>
             <div style={{ fontSize: "40px", marginBottom: "20px" }}>🤝</div>
            <h3 style={{ fontSize: "1.5rem" }}>Building Bonds</h3>
            <p style={{ fontSize: "1rem" }}>Creating a strong community of like-minded individuals.</p>
          </div>
          <div className="feature-card animated-card zoom-hidden delay-200" style={{ textAlign: "center", padding: "40px 30px" }}>
             <div style={{ fontSize: "40px", marginBottom: "20px" }}>🛠️</div>
            <h3 style={{ fontSize: "1.5rem" }}>Learning by Doing</h3>
            <p style={{ fontSize: "1rem" }}>Hands-on projects and real-world exposure over theory.</p>
          </div>
          <div className="feature-card animated-card zoom-hidden delay-300" style={{ textAlign: "center", padding: "40px 30px" }}>
             <div style={{ fontSize: "40px", marginBottom: "20px" }}>🏆</div>
            <h3 style={{ fontSize: "1.5rem" }}>Challenging Yourself</h3>
            <p style={{ fontSize: "1rem" }}>Pushing boundaries through competitions and leadership roles.</p>
          </div>
          <div className="feature-card animated-card" style={{ textAlign: "center", padding: "40px 30px" }}>
             <div style={{ fontSize: "40px", marginBottom: "20px" }}>🌱</div>
            <h3 style={{ fontSize: "1.5rem" }}>Growing Together</h3>
            <p style={{ fontSize: "1rem" }}>Fostering personal, technical, and professional growth.</p>
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
