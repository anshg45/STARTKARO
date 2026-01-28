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
    image: "/team/gian.png",
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
    image: "/team/simarpreet.png",
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
    image: "/team/ashmeet.png",
  },
  {
    name: "Bhani Kaur",
    role: "UI/UX Lead",
    responsibility: "Designs intuitive, user-friendly interfaces and ensures great user experience.",
    image: "/team/bhani.png",
  },
  {
    name: "Muhammad Shabib",
    role: "Machine Learning Lead",
    responsibility: "Builds ML models, automation systems, and intelligent features.",
    image: "/team/shabib.png",
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
    image: "/team/harnoor.png",
  },
  {
    name: "Aman Mishra",
    role: "Resources Lead",
    responsibility: "Handles learning resources, documentation, and knowledge sharing.",
    image: "https://ui-avatars.com/api/?name=Aman+Mishra&background=06b6d4&color=fff&size=200",
  },
];

const TeamCard = ({ member }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      width: "220px",
      margin: "0 20px",
      transition: "transform 0.3s ease",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-10px)")}
    onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
  >
    {/* Circular Image */}
    <div
      style={{
        width: "160px",
        height: "160px",
        borderRadius: "50%",
        overflow: "hidden",
        marginBottom: "20px",
        border: "4px solid rgba(255, 255, 255, 0.05)",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
        background: "var(--surface)",
      }}
    >
      <img
        src={member.image}
        alt={member.name}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "all 0.3s ease",
        }}
      />
    </div>

    {/* Name */}
    <h3
      style={{
        margin: "0 0 8px 0",
        fontSize: "1.2rem",
        color: "var(--text)",
        fontWeight: "700",
      }}
    >
      {member.name}
    </h3>

    {/* Role */}
    <p
      style={{
        margin: "0",
        color: "var(--text-muted)",
        fontSize: "0.9rem",
        fontWeight: "500",
      }}
    >
      {member.role}
    </p>
  </div>
);

export default function Team() {
  const president = teamMembers[0];
  const executives = teamMembers.slice(1, 3);
  const leads = teamMembers.slice(3);

  return (
    <div className="container" style={{ padding: "80px 0" }}>
      {/* Header Section */}
      <div style={{ textAlign: "center", marginBottom: "80px" }}>
        <h1
          style={{
            fontSize: "3rem",
            marginBottom: "20px",
            background: "linear-gradient(to right, #fff, #a3a3a3)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "800",
          }}
        >
          Meet the Team
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
          The minds behind strategy, design, and development.
        </p>
      </div>

      {/* 1. President (Top - Center) */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "60px" }}>
        <TeamCard member={president} />
      </div>

      {/* 2. Executives (Middle - 2 people) */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "40px",
          marginBottom: "60px",
        }}
      >
        {executives.map((member, index) => (
          <TeamCard key={index} member={member} />
        ))}
      </div>

      {/* 3. Leads (Bottom - Rest) */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "60px 40px",
        }}
      >
        {leads.map((member, index) => (
          <TeamCard key={index} member={member} />
        ))}
      </div>
    </div>
  );
}
