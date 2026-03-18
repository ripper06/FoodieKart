import { Link } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";
import "../css/Header.css"

const Header = () => {
  return (
    <header className="header">
      <h2>🍲 FoodieKart</h2>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      <ProfileDropdown />
    </header>
  );
};

export default Header;