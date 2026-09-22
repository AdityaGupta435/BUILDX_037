function Hero() {
  return (
    <section className="hero" id="home">

      <div className="hero-content">

        <div className="hero-badge">
          🎓 Smart Education Support
        </div>

        <h1>
          Your Education.
          <br />
          <span>Your Opportunities.</span>
        </h1>

        <p>
          Discover scholarships, career opportunities, internships
          and learning paths based on your profile.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn">
            Find Scholarships →
          </button>

          <button className="secondary-btn">
            Explore Careers
          </button>
        </div>

        <div className="hero-stats">
          <div>
            <strong>500+</strong>
            <span>Scholarships</span>
          </div>

          <div>
            <strong>120+</strong>
            <span>Opportunities</span>
          </div>

          <div>
            <strong>50+</strong>
            <span>Courses</span>
          </div>
        </div>

      </div>

      <div className="hero-image-container">
        <img
          src="https://images.unsplash.com/photo-1565598621680-94ac0c22b148?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Students studying together"
          className="hero-image"
        />

        <div className="floating-card scholarship-float">
          <span>🎓</span>
          <div>
            <strong>Scholarship Found</strong>
            <small>You're eligible!</small>
          </div>
        </div>

        <div className="floating-card career-float">
          <span>💼</span>
          <div>
            <strong>Career Match</strong>
            <small>92% profile match</small>
          </div>
        </div>

      </div>

    </section>
  );
}

export default Hero;