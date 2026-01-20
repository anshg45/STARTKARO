export default function AuraLogo({ variant = "vertical" }) {
  const isHorizontal = variant === "horizontal";

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: isHorizontal ? "row" : "column", 
      alignItems: "center", 
      gap: isHorizontal ? "10px" : "5px" 
    }}>
      {/* Icon Section */}
      <div style={{ position: "relative", width: "50px", height: "50px" }}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
          <defs>
            <linearGradient id="gradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF9F43" />
              <stop offset="100%" stopColor="#EE5253" />
            </linearGradient>
            <linearGradient id="gradRight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0ABDE3" />
              <stop offset="100%" stopColor="#2E86DE" />
            </linearGradient>
          </defs>

          {/* Left Head (Orange) */}
          <path 
            d="M48 20 C 30 20, 15 35, 15 55 C 15 75, 30 90, 48 90 L 48 80 C 40 80, 30 70, 30 55 C 30 40, 40 30, 48 30 Z" 
            fill="url(#gradLeft)" 
          />
          <path d="M48 30 L 48 20 C 52 20, 52 25, 48 30 Z" fill="url(#gradLeft)" /> 

          {/* Right Head (Blue) */}
          <path 
            d="M52 20 C 70 20, 85 35, 85 55 C 85 75, 70 90, 52 90 L 52 80 C 60 80, 70 70, 70 55 C 70 40, 60 30, 52 30 Z" 
            fill="url(#gradRight)" 
          />

          {/* Circuit / Brain Connections (Center) */}
          <circle cx="50" cy="40" r="2.5" fill="#F8FAFC" />
          <circle cx="50" cy="55" r="2.5" fill="#F8FAFC" />
          <circle cx="50" cy="70" r="2.5" fill="#F8FAFC" />
          
          <path d="M50 40 L 60 40 L 60 50" stroke="#F8FAFC" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M50 55 L 40 55 L 40 65" stroke="#F8FAFC" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M50 70 L 50 80" stroke="#F8FAFC" strokeWidth="1.5" strokeLinecap="round" />
          
          <circle cx="60" cy="50" r="1.5" fill="#F8FAFC" />
          <circle cx="40" cy="65" r="1.5" fill="#F8FAFC" />
        </svg>
      </div>

      {/* Text Section */}
      <div style={{ textAlign: isHorizontal ? "left" : "center", lineHeight: "1" }}>
        <div style={{ 
          fontSize: "24px", 
          fontWeight: "900", 
          letterSpacing: "2px", 
          color: "var(--text)",
          marginBottom: "2px"
        }}>
          AURA
        </div>
        {!isHorizontal && (
          <div style={{ 
            fontSize: "6px", 
            fontWeight: "700", 
            color: "#FF9F43", 
            letterSpacing: "0.5px", 
            textTransform: "uppercase",
            maxWidth: "180px"
          }}>
            Association for Unleashing Research & Advancement
          </div>
        )}
      </div>
    </div>
  );
}
