import React from "react";

const teamMembers = [
  {
    name: "Anshpreet Singh Bindra",
    role: "President & Founder",
    responsibility: "Leading vision, strategy, and organizational growth.",
    image: "https://ui-avatars.com/api/?name=Anshpreet+Singh+Bindra&background=f97316&color=fff&size=200",
  },
  {
    name: "Aditi Sharma",
    role: "Head of Design",
    responsibility: "Crafting intuitive and beautiful user experiences.",
    image: "https://ui-avatars.com/api/?name=Aditi+Sharma&background=8b5cf6&color=fff&size=200",
  },
  {
    name: "Rahul Verma",
    role: "Tech Lead",
    responsibility: "Architecting scalable and robust technical solutions.",
    image: "https://ui-avatars.com/api/?name=Rahul+Verma&background=10b981&color=fff&size=200",
  },
  {
    name: "Priya Kapoor",
    role: "Head of Operations",
    responsibility: "Ensuring seamless execution and team synergy.",
    image: "https://ui-avatars.com/api/?name=Priya+Kapoor&background=ec4899&color=fff&size=200",
  },
  {
    name: "Vikram Malhotra",
    role: "Strategy Lead",
    responsibility: "Defining the roadmap for sustainable growth.",
    image: "https://ui-avatars.com/api/?name=Vikram+Malhotra&background=3b82f6&color=fff&size=200",
  },
  {
    name: "Sneha Gupta",
    role: "Community Manager",
    responsibility: "Building and nurturing our vibrant community.",
    image: "https://ui-avatars.com/api/?name=Sneha+Gupta&background=f59e0b&color=fff&size=200",
  },
];

export default function Team() {
  return (
    <div className="container" style={{ padding: "80px 0" }}>
      {/* Header Section */}
      <div style={{ textAlign: "center", marginBottom: "60px" }}>
        <h4
          style={{
            color: "var(--primary)",
            textTransform: "uppercase",
            letterSpacing: "2px",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          Core Team 2025 – 2026
        </h4>
        <h1
          style={{
            fontSize: "3rem",
            marginBottom: "20px",
            background: "linear-gradient(to right, #fff, #a3a3a3)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Our Leadership Team
        </h1>
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "1.2rem",
            maxWidth: "700px",
            margin: "0 auto",
            lineHeight: "1.6",
          }}
        >
          The minds behind strategy, design, and development. <br />
          With a shared vision and diverse expertise, our core team leads
          innovation, collaboration, and impact across every domain.
        </p>
      </div>

      {/* Team Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "30px",
        }}
      >
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="feature-card"
            style={{
              textAlign: "center",
              padding: "40px 20px",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-10px)";
              e.currentTarget.style.boxShadow =
                "0 20px 40px rgba(0,0,0,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                overflow: "hidden",
                margin: "0 auto 20px",
                border: "4px solid rgba(255,255,255,0.1)",
              }}
            >
              <img
                src={member.image}
                alt={member.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <h3 style={{ marginBottom: "5px", fontSize: "1.5rem" }}>
              {member.name}
            </h3>
            <p
              style={{
                color: "var(--primary)",
                fontWeight: "600",
                marginBottom: "15px",
                textTransform: "uppercase",
                fontSize: "0.9rem",
                letterSpacing: "1px",
              }}
            >
              {member.role}
            </p>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "0.95rem",
                lineHeight: "1.5",
              }}
            >
              {member.responsibility}
            </p>
          </div>
        ))}
      </div>

      {/* Footer Line */}
      <div
        style={{
          textAlign: "center",
          marginTop: "80px",
          paddingTop: "40px",
          borderTop: "1px solid var(--border)",
          color: "var(--text-muted)",
          fontSize: "1.1rem",
          fontStyle: "italic",
        }}
      >
        "Together, we build. Together, we lead."
      </div>
    </div>
  );
}
