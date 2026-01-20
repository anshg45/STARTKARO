import { useParams } from "react-router-dom";

export default function Detail() {
  const { type, id } = useParams();

  return (
    <div className="container page-container" style={{ padding: "80px 0" }}>
      <h1 className="page-title">Detail Page</h1>
      <p><b>Type:</b> {type}</p>
      <p><b>ID:</b> {id}</p>

      <div style={{ marginTop: "30px" }}>
        <p>
          This is a placeholder detail page.  
          Later backend se real data yahin load hoga.
        </p>

        <button className="btn primary animated-btn">Take Action</button>
      </div>
    </div>
  );
}
