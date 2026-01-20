import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./routes/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import AddProject from "./pages/AddProject";
import Startup from "./pages/Startup";
import AddStartup from "./pages/AddStartup";
import Freelance from "./pages/Freelance";
import AddFreelance from "./pages/AddFreelance";
import Marketplace from "./pages/Marketplace";
import Events from "./pages/Events";
import AddEvent from "./pages/AddEvent";
import Guide from "./pages/Guide";
import AddGuide from "./pages/AddGuide";
import AIMentor from "./pages/AIMentor";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/events" element={<Events />} />
        
        {/* Protected */}
        <Route path="/guide" element={<ProtectedRoute><Guide /></ProtectedRoute>} />
        <Route path="/ai-mentor" element={<ProtectedRoute><AIMentor /></ProtectedRoute>} />

        <Route
          path="/guide/add"
          element={
            <ProtectedRoute>
              <AddGuide />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects/add"
          element={
            <ProtectedRoute>
              <AddProject />
            </ProtectedRoute>
          }
        />

        <Route
          path="/startup"
          element={
            <ProtectedRoute>
              <Startup />
            </ProtectedRoute>
          }
        />

        <Route
          path="/startup/add"
          element={
            <ProtectedRoute>
              <AddStartup />
            </ProtectedRoute>
          }
        />

        <Route
          path="/freelance"
          element={
            <ProtectedRoute>
              <Freelance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/freelance/add"
          element={
            <ProtectedRoute>
              <AddFreelance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/marketplace"
          element={
            <ProtectedRoute>
              <Marketplace />
            </ProtectedRoute>
          }
        />

        <Route
          path="/events/add"
          element={
            <ProtectedRoute>
              <AddEvent />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}
