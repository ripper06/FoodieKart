import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Profile.css";

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user")); // token + user
    console.log(user);
  return (
    <div className="profile-container">
      <div onClick={() => setOpen(!open)} className="profile-icon">
        👤
      </div>

      {open && (
        <div className="dropdown">
          {!user ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <>
              <p>Name : {user.name}</p>
              <p>Email : {user.email}</p>
              
              <button
                onClick={() => {
                  localStorage.removeItem("user");
                  window.location.reload();
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;