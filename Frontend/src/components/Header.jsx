import { Link } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";

const Header = () => {
  return (
    <header style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "12px 28px",
      backgroundColor: "blue",
      color: "white",
      position: "sticky",
      top: 0,
      zIndex: 100,
      boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
    }}>
      <h2 style={{ color: "white", fontSize: "1.3rem" }}>🍲 FoodieKart</h2>

      <nav style={{ display: "flex", gap: "20px" }}>
        <Link to="/" style={{ color: "#ccc", textDecoration: "none", fontSize: "0.95rem" }}>Home</Link>
        <Link to="/about" style={{ color: "#ccc", textDecoration: "none", fontSize: "0.95rem" }}>About</Link>
        <Link to="/contact" style={{ color: "#ccc", textDecoration: "none", fontSize: "0.95rem" }}>Contact</Link>
      </nav>

      <ProfileDropdown />
    </header>
  );
};

export default Header;