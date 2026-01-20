import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function AddStartup() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sector, setSector] = useState("");
  const [logo, setLogo] = useState(null);

  const navigate = useNavigate();

  const submit = async () => {
    if (!name || !description || !sector) {
      alert("All fields required");
      return;
    }

    try {
      const data = new FormData();
      data.append("name", name);
      data.append("description", description);
      data.append("sector", sector);
      if (logo) data.append("logo", logo);

      await api.post("/startups", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      navigate("/startup");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add startup");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Register Startup</h2>

        <input
          placeholder="Startup Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Sector (e.g. EdTech, FinTech)"
          value={sector}
          onChange={(e) => setSector(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setLogo(e.target.files[0])}
          style={{
            width: "100%",
            padding: "14px",
            background: "#fff",
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
            marginBottom: "16px",
          }}
        />

        <textarea
          placeholder="Startup Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
            marginBottom: "16px",
          }}
        />

        <button className="btn primary" onClick={submit}>
          Register Startup
        </button>
      </div>
    </div>
  );
}
