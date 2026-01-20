import { useState, useEffect } from "react";
import api from "../services/api";
// Animations imported globally in main.jsx

export default function Marketplace() {
  const [activeTab, setActiveTab] = useState("Rent"); // Rent, Buy, My Listings
  const [listings, setListings] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "Electronics",
    type: "Rent",
    image: null
  });

  // Hardcoded dummy data for fallback
  const DUMMY_DATA = [
    // RENT
    { _id: "r1", title: "Gaming Laptop (RTX 3060)", description: "High-end gaming laptop available for rent.", price: "₹800/day", category: "Electronics", type: "Rent", image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
    { _id: "r2", title: "DSLR Camera Canon 200D", description: "Capture your college events with professional quality.", price: "₹500/day", category: "Electronics", type: "Rent", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
    { _id: "r3", title: "Arduino & Sensor Kit", description: "Complete kit for IoT projects.", price: "₹150/day", category: "Electronics", type: "Rent", image: "https://images.unsplash.com/photo-1555664424-778a6902201b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
    // BUY
    { _id: "b1", title: "Scientific Calculator fx-991EX", description: "Barely used scientific calculator.", price: "₹800", category: "Stationery", type: "Buy", image: "https://images.unsplash.com/photo-1594729095022-e2f6d2eece9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
    { _id: "b2", title: "Data Structures Book", description: "Standard CLRS textbook.", price: "₹600", category: "Books", type: "Buy", image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
    { _id: "b3", title: "Drafting Table & Stool", description: "Adjustable drafting table.", price: "₹2,500", category: "Furniture", type: "Buy", image: "https://images.unsplash.com/photo-1581092921461-eab6245b09bed?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" }
  ];

  useEffect(() => {
    fetchListings();
  }, [activeTab]);

  const fetchListings = async () => {
    try {
      let endpoint = "/marketplace";
      if (activeTab === "My Listings") endpoint = "/marketplace/my";
      else endpoint = `/marketplace?type=${activeTab}`;

      const res = await api.get(endpoint);
      if (res.data.length > 0) {
        setListings(res.data);
      } else {
        // Filter dummy data if no real data
        if (activeTab === "Rent") setListings(DUMMY_DATA.filter(i => i.type === "Rent"));
        else if (activeTab === "Buy") setListings(DUMMY_DATA.filter(i => i.type === "Buy"));
        else setListings([]);
      }
    } catch (err) {
      console.error("Failed to fetch listings", err);
      // Fallback
      if (activeTab === "Rent") setListings(DUMMY_DATA.filter(i => i.type === "Rent"));
      else if (activeTab === "Buy") setListings(DUMMY_DATA.filter(i => i.type === "Buy"));
    }
  };

  const handleInputChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("type", formData.type);
      if (formData.image) {
        data.append("image", formData.image);
      }

      await api.post("/marketplace", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      
      alert("Listing created successfully!");
      setShowForm(false);
      fetchListings(); // Refresh
      setFormData({
        title: "",
        description: "",
        price: "",
        category: "Electronics",
        type: "Rent",
        image: null
      });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create listing");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await api.delete(`/marketplace/${id}`);
      fetchListings();
    } catch (err) {
      alert("Failed to delete");
    }
  };

  return (
    <div className="container page-container" style={{ padding: "80px 0" }}>
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h1 className="page-title">🛒 Marketplace</h1>
          <p>Find what you need or list your own items.</p>
        </div>
        <button className="btn animated-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close Form" : "+ Add New Listing"}
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        {["Rent", "Buy", "My Listings"].map((tab) => (
          <button
            key={tab}
            className="tab-button animated-tab"
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "10px 20px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
              backgroundColor: activeTab === tab ? "#6C63FF" : "#eee",
              color: activeTab === tab ? "#fff" : "#333",
              fontWeight: "bold"
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Add Listing Form */}
      {showForm && (
        <div className="card animated-form" style={{ marginBottom: 30, padding: 20 }}>
          <h3>Add New Listing</h3>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 15 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 15 }}>
              <input
                type="text"
                name="title"
                placeholder="Item Name (e.g. MacBook Pro)"
                value={formData.title}
                onChange={handleInputChange}
                required
                style={{ padding: 10, borderRadius: 5, border: "1px solid #ccc" }}
              />
              <input
                type="text"
                name="price"
                placeholder="Price (e.g. ₹500/day or ₹1200)"
                value={formData.price}
                onChange={handleInputChange}
                required
                style={{ padding: 10, borderRadius: 5, border: "1px solid #ccc" }}
              />
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 15 }}>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                style={{ padding: 10, borderRadius: 5, border: "1px solid #ccc" }}
              >
                <option>Electronics</option>
                <option>Books</option>
                <option>Tools</option>
                <option>Other</option>
              </select>

              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                style={{ padding: 10, borderRadius: 5, border: "1px solid #ccc" }}
              >
                <option value="Rent">Rent</option>
                <option value="Buy">Sell (Buy)</option>
              </select>
            </div>

            <textarea
              name="description"
              placeholder="Description..."
              value={formData.description}
              onChange={handleInputChange}
              required
              rows="3"
              style={{ padding: 10, borderRadius: 5, border: "1px solid #ccc" }}
            />

            {/* Image Upload */}
            <input
              type="file"
              name="image"
              onChange={handleInputChange}
              accept="image/*"
              style={{ padding: 10, borderRadius: 5, border: "1px solid #ccc", background: "#fff" }}
            />
            
            <button type="submit" className="btn animated-btn" style={{ width: "fit-content" }}>Post Listing</button>
          </form>
        </div>
      )}

      {/* Listings Grid */}
      <div className="feature-grid">
        {listings.length === 0 ? (
          <p>No listings found. Be the first to add one!</p>
        ) : (
          listings.map((item) => (
            <div key={item._id} className="feature-card animated-card" style={{ textAlign: "left" }}>
              {/* Placeholder Image if none provided */}
              <div className="card-image-container" style={{ 
                height: 150, 
                backgroundColor: "#f0f0f0", 
                borderRadius: "5px 5px 0 0", 
                marginBottom: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#888"
              }}>
                {item.image ? <img src={item.image} alt={item.title} style={{width: '100%', height: '100%', objectFit: 'cover'}} /> : "No Image"}
              </div>

              <span style={{ 
                backgroundColor: item.category === "Electronics" ? "#e0f7fa" : "#fff3e0", 
                color: "#006064", 
                padding: "2px 8px", 
                borderRadius: 10, 
                fontSize: 12 
              }}>
                {item.category}
              </span>

              <h3 style={{ margin: "10px 0 5px" }}>{item.title}</h3>
              <p style={{ fontSize: 14, color: "#666", marginBottom: 10 }}>{item.description}</p>
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <b style={{ fontSize: 18 }}>{item.price}</b>
                {activeTab === "My Listings" ? (
                  <button 
                    className="animated-btn"
                    onClick={() => handleDelete(item._id)}
                    style={{ color: "red", background: "none", border: "none", cursor: "pointer" }}
                  >
                    Remove
                  </button>
                ) : (
                  <button 
                    className="btn secondary animated-btn" 
                    style={{ padding: "5px 10px", fontSize: 12 }}
                    onClick={() => {
                      if (item.owner?.email) {
                        window.location.href = `mailto:${item.owner.email}?subject=Interested in ${item.title}`;
                      } else {
                        alert("Owner contact details not available.");
                      }
                    }}
                  >
                    Contact Owner
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
