import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Card from "../components/Card";
import { useAuth } from "../context/AuthContext";

export default function Events() {
  const [events, setEvents] = useState([]);
  const { user } = useAuth();

  // Fallback Dummy Data
  const DUMMY_EVENTS = [
    {
      _id: "e1",
      title: "AURA Hackathon 2026",
      description: "A 48-hour national level hackathon.",
      date: "2026-03-15",
      location: "Main Auditorium, DTU"
    },
    {
      _id: "e2",
      title: "AI & Future Tech Workshop",
      description: "Hands-on workshop on Generative AI.",
      date: "2026-02-10",
      location: "Seminar Hall 2"
    },
    {
      _id: "e3",
      title: "Startup Pitch Day",
      description: "Pitch your startup idea to top VCs.",
      date: "2026-04-05",
      location: "Innovation Hub, IIT Delhi"
    },
    {
      _id: "e4",
      title: "Open Source Sprint",
      description: "Contribute to open source projects.",
      date: "2026-02-28",
      location: "Computer Lab 1"
    }
  ];

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await api.get("/events");
      if (res.data.length > 0) {
        setEvents(res.data);
      } else {
        setEvents(DUMMY_EVENTS); // Fallback if empty
      }
    } catch (err) {
      console.error("Failed to fetch events, using dummy data", err);
      setEvents(DUMMY_EVENTS); // Fallback on error
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await api.delete(`/events/${id}`);
      setEvents(events.filter((e) => e._id !== id));
      alert("Event deleted successfully!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete event");
    }
  };

  return (
    <div className="container page-container" style={{ padding: "80px 0" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <div>
          <h1 className="page-title">📅 Events & Announcements</h1>
          <p>Participate, learn & network.</p>
        </div>

        <Link to="/events/add" className="btn primary animated-btn">
          + Add Event
        </Link>
      </div>

      {events.length === 0 && <p>No events found. Be the first to add one!</p>}

      <div className="feature-grid">
        {events.map((ev) => (
          <Card
            key={ev._id}
            title={ev.title}
            subtitle={`${new Date(ev.date).toLocaleDateString()} • ${ev.location}`}
            tag="Event"
            action="View Details"
            image={ev.image}
            onAction={() => alert(`Event: ${ev.title}\n\n${ev.description}\n\nLocation: ${ev.location}\nDate: ${new Date(ev.date).toDateString()}\n\nOrganizer: ${ev.organizer?.name || "Unknown"}`)}
            onDelete={(user?.role === "admin" || user?.email === "admin@startkaro.com" || user?.email?.toLowerCase().trim().startsWith("superadmin") || user?.id === ev.organizer?._id) ? () => handleDelete(ev._id) : null}
          />
        ))}
      </div>
    </div>
  );
}
