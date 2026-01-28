export default function AuraLogo({ variant = "horizontal" }) {
  // Use the image provided by the user (must be saved in public folder)
  // If you haven't saved it yet, please save the image as 'aura-logo.png' in 'frontend/public/'
  
  return (
    <div className="aura-logo-container" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <img 
        src="/aura-logo.jpeg" 
        alt="AURA Logo" 
        style={{ 
          height: variant === "horizontal" ? "45px" : "80px", // Slightly adjusted size
          width: "auto",
          objectFit: "contain"
        }}
        onError={(e) => {
          e.target.style.display = "none";
          // If image fails, we might want to show a fallback icon, but for now just hiding it
        }}
      />
      
      {/* Always visible text */}
      <div style={{ 
        fontSize: "26px", 
        fontWeight: "800", 
        letterSpacing: "1.5px", 
        color: "var(--text, #fff)", // Fallback to white if var not found
        fontFamily: "'Inter', sans-serif"
      }}>
        AURA
      </div>

      {/* Fallback SVG/Text container removed as we are now explicitly showing text next to image */ }
    </div>
  );
}
