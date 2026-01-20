import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuraLogo from "./Logo";

export default function Navbar() {
  const auth = useAuth(); // 🔒 safe access
  const user = auth?.user;
  const logout = auth?.logout;

  return (
    <nav className="navbar">
      {/* container SECOND me */}
      <div className="nav-inner container">
        {/* Logo */}
        <Link to="/" className="logo" style={{ textDecoration: "none" }}>
          <AuraLogo variant="horizontal" />
        </Link>

        {/* Links */}
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/events">Events</Link>

          {user && (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/projects">Projects</Link>
              <Link to="/startup">Startup</Link>
              <Link to="/freelance">Freelance</Link>
              <Link to="/marketplace">Rent & Buy</Link>
              <Link to="/guide">Guide</Link>
              <Link to="/ai-mentor">AI Mentor</Link>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="nav-actions">
          {!user ? (
            <>
              <Link to="/login" className="btn secondary">
                Login
              </Link>
              <Link to="/signup" className="btn primary">
                Join Now
              </Link>
            </>
          ) : (
            <>
              <span style={{ fontWeight: 600 }}>
                Hi, {user.name}
              </span>
              <button onClick={logout} className="btn ghost">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
