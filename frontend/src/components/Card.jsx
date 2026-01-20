import { useNavigate } from "react-router-dom";

export default function Card({
  id,
  type,
  title,
  subtitle,
  tag,
  action,
  onAction,
  image,
  ...props // ✅ Accept extra props like onDelete
}) {
  const navigate = useNavigate();

  return (
    <div
      className="feature-card animated-card"
      style={{ cursor: "pointer" }}
      onClick={() => {
        // agar onAction diya hai (GitHub repo etc)
        if (!type && onAction) return;
        navigate(`/detail/${type}/${id}`);
      }}
    >
      {image && (
        <img
          src={image}
          alt={title}
          style={{
            width: "100%",
            height: "150px",
            objectFit: "cover",
            borderRadius: "8px",
            marginBottom: "12px",
          }}
        />
      )}

      {tag && <span className="badge">{tag}</span>}

      <h3>{title}</h3>
      <p>{subtitle}</p>

      {action && (
        <button
          className="btn secondary animated-btn"
          onClick={(e) => {
            e.stopPropagation(); // 🔥 card click block
            if (onAction) onAction();
          }}
        >
          {action}
        </button>
      )}

      {props.onDelete && (
        <button
          className="btn animated-btn"
          style={{ 
            backgroundColor: "#ff4444", 
            color: "white", 
            marginTop: "10px",
            width: "100%"
          }}
          onClick={(e) => {
            e.stopPropagation();
            if (window.confirm("Are you sure you want to delete this item?")) {
              props.onDelete();
            }
          }}
        >
          🗑️ Delete
        </button>
      )}
    </div>
  );
}
