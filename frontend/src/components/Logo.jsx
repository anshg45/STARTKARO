export default function AuraLogo({ variant = "horizontal" }) {
  // Use the image provided by the user (must be saved in public folder)
  // If you haven't saved it yet, please save the image as 'aura-logo.png' in 'frontend/public/'
  
  return (
    <div className="aura-logo-container" style={{ display: "flex", alignItems: "center" }}>
      <img 
        src="/aura-logo.jpeg" 
        alt="AURA Logo" 
        style={{ 
          height: variant === "horizontal" ? "50px" : "80px", // Adjust size based on variant
          width: "auto",
          objectFit: "contain"
        }}
        onError={(e) => {
          // Fallback to text/SVG if image is missing
          e.target.style.display = "none";
          e.target.nextSibling.style.display = "flex";
        }}
      />
      
      {/* Fallback SVG/Text (Hidden if image loads) */}
      <div style={{ display: "none", flexDirection: variant === "horizontal" ? "row" : "column", alignItems: "center", gap: "10px" }}>
        <div style={{ fontSize: "24px", fontWeight: "900", letterSpacing: "2px", color: "var(--text)" }}>
          AURA
        </div>
      </div>
    </div>
  );
}
