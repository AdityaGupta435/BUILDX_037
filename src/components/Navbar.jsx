import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">

      <Link
        to="/"
        className="logo"
      >
        <span className="logo-icon">
          🎓
        </span>

        <span>
          Scholar<span>Match</span>
        </span>
      </Link>


      <div className="nav-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/scholarships">
          Scholarships
        </Link>

        <Link to="/career">
          Career
        </Link>

        <Link to="/assistant">
          AI Assistant
        </Link>

      </div>


      <Link
        to="/profile"
        className="profile-btn"
      >
        My Profile
      </Link>

    </nav>
  );
}

export default Navbar;