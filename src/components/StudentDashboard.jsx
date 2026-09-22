import { Link } from "react-router-dom";
import "./StudentDashboard.css";

function StudentDashboard({
  student,
  scholarshipCount,
  opportunityCount,
}) {
  const name = student?.name || "Student";

  return (
    <div className="dashboard-page">

      {/* =========================
          SIDEBAR
      ========================= */}

      <aside className="dashboard-sidebar">

        <Link to="/" className="dashboard-logo">
          <span>🎓</span>

          <strong>
            Scholar<span>Match</span>
          </strong>
        </Link>

        <div className="sidebar-label">
          MAIN MENU
        </div>

        <nav className="sidebar-nav">

          <Link
            to="/dashboard"
            className="sidebar-link active"
          >
            <span>▦</span>
            Overview
          </Link>

          <Link
            to="/scholarships"
            className="sidebar-link"
          >
            <span>🎓</span>
            Scholarships
          </Link>

          <Link
            to="/career"
            className="sidebar-link"
          >
            <span>💼</span>
            Career
          </Link>

          <Link
            to="/assistant"
            className="sidebar-link"
          >
            <span>🤖</span>
            AI Assistant
          </Link>

          <Link
  to="/saved"
  className="sidebar-link"
>
  <span>🔖</span>
  Saved Items
</Link>

          <Link
            to="/profile"
            className="sidebar-link"
          >
            <span>👤</span>
            My Profile
          </Link>

        </nav>

        <div className="sidebar-bottom">

          <div className="sidebar-help">

            <div className="help-icon">
              💡
            </div>

            <strong>
              Need help?
            </strong>

            <p>
              Ask our AI assistant for
              career guidance.
            </p>

            <Link to="/assistant">
              Ask AI →
            </Link>

          </div>

          <Link
            to="/"
            className="sidebar-home"
          >
            ← Back to Home
          </Link>

        </div>

      </aside>


      {/* =========================
          MAIN DASHBOARD
      ========================= */}

      <main className="dashboard-main">

        {/* TOP BAR */}

        <header className="dashboard-topbar">

          <div>

            <span className="dashboard-overline">
              STUDENT DASHBOARD
            </span>

            <h1>
              Good morning, {name} 👋
            </h1>

            <p>
              Here's your personalized
              education overview.
            </p>

          </div>


          <div className="dashboard-user">

            <div className="user-avatar">
              {name.charAt(0).toUpperCase()}
            </div>

            <div>

              <strong>
                {name}
              </strong>

              <span>
                {student?.classLevel || "Student"}
              </span>

            </div>

          </div>

        </header>


        {/* =========================
            STAT CARDS
        ========================= */}

        <section className="dashboard-stats">

          <div className="stat-card">

            <div className="stat-icon purple">
              🎓
            </div>

            <div>

              <span>
                Scholarships
              </span>

              <strong>
                {scholarshipCount}
              </strong>

              <small>
                Matching opportunities
              </small>

            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon orange">
              💼
            </div>

            <div>

              <span>
                Opportunities
              </span>

              <strong>
                {opportunityCount}
              </strong>

              <small>
                Jobs, internships & courses
              </small>

            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon green">
              ✓
            </div>

            <div>

              <span>
                Profile Status
              </span>

              <strong>
                {student ? "85%" : "35%"}
              </strong>

              <small>
                {student
                  ? "Profile completed"
                  : "Complete your profile"}
              </small>

            </div>

          </div>

        </section>


        {/* =========================
            PROFILE + JOURNEY
        ========================= */}

        <section className="dashboard-content-grid">


          {/* PROFILE */}

          <div className="dashboard-panel profile-summary-panel">

            <div className="panel-heading">

              <div>

                <span>
                  YOUR PROFILE
                </span>

                <h2>
                  Student Overview
                </h2>

              </div>

              <Link to="/profile">
                Edit
              </Link>

            </div>


            {student ? (

              <div className="student-details">

                <div className="detail-item">

                  <span>Name</span>

                  <strong>
                    {student.name}
                  </strong>

                </div>


                <div className="detail-item">

                  <span>Education</span>

                  <strong>
                    {student.classLevel === "12"
                      ? "Class 12"
                      : "Undergraduate"}
                  </strong>

                </div>


                <div className="detail-item">

                  <span>Marks</span>

                  <strong>
                    {student.marks}%
                  </strong>

                </div>


                <div className="detail-item">

                  <span>Category</span>

                  <strong>
                    {student.category}
                  </strong>

                </div>


                <div className="detail-item">

                  <span>Family Income</span>

                  <strong>
                    ₹
                    {student.income?.toLocaleString(
                      "en-IN"
                    )}
                  </strong>

                </div>

              </div>

            ) : (

              <div className="profile-empty">

                <div>
                  👨‍🎓
                </div>

                <h3>
                  Complete your profile
                </h3>

                <p>
                  Add your academic information
                  to unlock personalized
                  recommendations.
                </p>

                <Link
                  to="/profile"
                  className="dashboard-primary-btn"
                >
                  Create Profile →
                </Link>

              </div>

            )}

          </div>


          {/* JOURNEY */}

          <div className="dashboard-panel journey-panel">

            <div className="panel-heading">

              <div>

                <span>
                  YOUR JOURNEY
                </span>

                <h2>
                  Progress
                </h2>

              </div>

              <strong className="progress-percentage">
                65%
              </strong>

            </div>


            <div className="large-progress">
              <div></div>
            </div>


            <div className="journey-list">

              <div className="journey-item completed">

                <span>✓</span>

                <div>

                  <strong>
                    Student Profile
                  </strong>

                  <small>
                    Completed
                  </small>

                </div>

              </div>


              <div className="journey-item completed">

                <span>✓</span>

                <div>

                  <strong>
                    Scholarship Search
                  </strong>

                  <small>
                    Completed
                  </small>

                </div>

              </div>


              <div className="journey-item current">

                <span>3</span>

                <div>

                  <strong>
                    Career Discovery
                  </strong>

                  <small>
                    Explore opportunities
                  </small>

                </div>

              </div>


              <div className="journey-item">

                <span>4</span>

                <div>

                  <strong>
                    Internship
                  </strong>

                  <small>
                    Find your first experience
                  </small>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =========================
            QUICK ACTIONS
        ========================= */}

        <section className="dashboard-panel quick-panel">

          <div className="panel-heading">

            <div>

              <span>
                QUICK ACTIONS
              </span>

              <h2>
                What would you like to do?
              </h2>

            </div>

          </div>


          <div className="quick-actions">


            <Link to="/scholarships">

              <div className="quick-icon purple">
                🎓
              </div>

              <div>

                <strong>
                  Find Scholarships
                </strong>

                <span>
                  Discover funding opportunities
                </span>

              </div>

              <b>
                →
              </b>

            </Link>


            <Link to="/career">

              <div className="quick-icon orange">
                💼
              </div>

              <div>

                <strong>
                  Explore Careers
                </strong>

                <span>
                  Jobs, internships and courses
                </span>

              </div>

              <b>
                →
              </b>

            </Link>


            <Link to="/assistant">

              <div className="quick-icon blue">
                🤖
              </div>

              <div>

                <strong>
                  Ask AI Assistant
                </strong>

                <span>
                  Get personalized career guidance
                </span>

              </div>

              <b>
                →
              </b>

            </Link>

            <Link to="/saved">

  <div className="quick-icon purple">
    🔖
  </div>

  <div>

    <strong>
      Saved Items
    </strong>

    <span>
      View saved scholarships & opportunities
    </span>

  </div>

  <b>
    →
  </b>

</Link>

          </div>

        </section>


        {/* =========================
            CTA
        ========================= */}

        <section className="dashboard-cta">

          <div>

            <span>
              READY FOR THE NEXT STEP?
            </span>

            <h2>
              Your next opportunity could
              be closer than you think.
            </h2>

            <p>
              Explore internships, jobs and
              learning programs matched to
              your interests.
            </p>

            <Link to="/career">
              Explore Opportunities →
            </Link>

          </div>


          <div className="cta-image">

            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=85"
              alt="Students collaborating"
            />

          </div>

        </section>

      </main>

    </div>
  );
}

export default StudentDashboard;