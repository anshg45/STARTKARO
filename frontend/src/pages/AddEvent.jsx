import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function AddEvent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const submit = async () => {
    if (!title || !description || !date || !location) {
      alert("All fields required");
      return;
    }

    try {
      const data = new FormData();
      data.append("title", title);
      data.append("description", description);
      data.append("date", date);
      data.append("location", location);
      if (image) data.append("image", image);

      await api.post("/events", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      navigate("/events");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add event");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Add Event</h2>

        <input
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="date"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          placeholder="Location (e.g. Auditorium / Zoom)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
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
          placeholder="Event Description"
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
          Create Event
        </button>
      </div>
    </div>
  );
}
