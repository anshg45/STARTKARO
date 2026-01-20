import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <nav className="navbar">
        <div className="container nav-inner">
          <div className="logo">
            <span className="logo-icon">🚀</span>
            <span>StartKaro</span>
          </div>

          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/dashboard">Dashboard</Link>

            <Link to="/projects">Projects</Link>
            <Link to="/startup">Startup</Link>
            <Link to="/freelance">Freelance</Link>
            <Link to="/marketplace">Rent & Buy</Link>
            <Link to="/guide">Guide</Link>
            <Link to="/events">Events</Link>
          </div>

          <div className="nav-actions">
            <button className="btn ghost">Login</button>
            <button className="btn primary">Join Now</button>
          </div>
        </div>
      </nav>

      <Outlet />

      <footer className="footer">
        © 2026 StartKaro • Built for students
      </footer>
    </>
  );
}
