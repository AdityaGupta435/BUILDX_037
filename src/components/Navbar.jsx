import { Link } from "react-router-dom";
import { useAccessibility } from "../context/AccessibilityContext";

function Navbar() {
  const { t } = useAccessibility();

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
          {t("home")}
        </Link>

        <Link to="/dashboard">
          {t("dashboard")}
        </Link>

        <Link to="/scholarships">
          {t("scholarships")}
        </Link>

        <Link to="/career">
          {t("career")}
        </Link>

        <Link to="/assistant">
          {t("assistant")}
        </Link>

      </div>


      <Link
        to="/profile"
        className="profile-btn"
      >
        {t("profile")}
      </Link>

    </nav>
  );
}

export default Navbar;