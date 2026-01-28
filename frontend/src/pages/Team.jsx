import React from "react";

const teamMembers = [
  {
    name: "Anshpreet Singh Bindra",
    role: "President / Founder",
    responsibility: "Visionary leader and founder, responsible for overall direction, strategy, and growth of the organization.",
    image: "https://ui-avatars.com/api/?name=Anshpreet+Singh+Bindra&background=f97316&color=fff&size=200",
  },
  {
    name: "Gian Kaur",
    role: "Vice President",
    responsibility: "Supports leadership decisions and ensures smooth coordination across teams.",
    image: "https://ui-avatars.com/api/?name=Gian+Kaur&background=8b5cf6&color=fff&size=200",
  },
  {
    name: "Mansimaran Singh",
    role: "General Secretary",
    responsibility: "Manages operations, documentation, communication, and internal coordination.",
    image: "https://ui-avatars.com/api/?name=Mansimaran+Singh&background=10b981&color=fff&size=200",
  },
  {
    name: "Simarpreet Singh",
    role: "Development Lead",
    responsibility: "Leads software development, system architecture, and technical execution.",
    image: "https://ui-avatars.com/api/?name=Simarpreet+Singh&background=3b82f6&color=fff&size=200",
  },
  {
    name: "Pragya",
    role: "Data Analytics Lead",
    responsibility: "Handles data analysis, insights generation, and data-driven decision support.",
    image: "https://ui-avatars.com/api/?name=Pragya&background=ec4899&color=fff&size=200",
  },
  {
    name: "Ashmeet Kaur",
    role: "Data Science Lead",
    responsibility: "Works on data modeling, analytics pipelines, and intelligent systems.",
    image: "https://ui-avatars.com/api/?name=Ashmeet+Kaur&background=f59e0b&color=fff&size=200",
  },
  {
    name: "Bhani Kaur",
    role: "UI/UX Lead",
    responsibility: "Designs intuitive, user-friendly interfaces and ensures great user experience.",
    image: "https://ui-avatars.com/api/?name=Bhani+Kaur&background=6366f1&color=fff&size=200",
  },
  {
    name: "Muhammad Shabib",
    role: "Machine Learning Lead",
    responsibility: "Builds ML models, automation systems, and intelligent features.",
    image: "https://ui-avatars.com/api/?name=Muhammad+Shabib&background=14b8a6&color=fff&size=200",
  },
  {
    name: "Rishav",
    role: "DSA Lead",
    responsibility: "Focuses on algorithms, problem-solving, and coding efficiency.",
    image: "https://ui-avatars.com/api/?name=Rishav&background=ef4444&color=fff&size=200",
  },
  {
    name: "Harnoor Kaur",
    role: "Minor Projects Lead",
    responsibility: "Manages mini projects, mentorship, and practical implementation tasks.",
    image: "https://ui-avatars.com/api/?name=Harnoor+Kaur&background=84cc16&color=fff&size=200",
  },
  {
    name: "Aman Mishra",
    role: "Resources Lead",
    responsibility: "Handles learning resources, documentation, and knowledge sharing.",
    image: "https://ui-avatars.com/api/?name=Aman+Mishra&background=06b6d4&color=fff&size=200",
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
