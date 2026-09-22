function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <span className="logo-icon">🎓</span>
        <span>Scholar<span>Match</span></span>
      </div>

      <div className="nav-links">
        <a href="#home">Home</a>
        <a href="#scholarships">Scholarships</a>
        <a href="#career">Career</a>
        <a href="#assistant">AI Assistant</a>
      </div>

      <button className="profile-btn">
        My Profile
      </button>
    </nav>
  );
}

export default Navbar;