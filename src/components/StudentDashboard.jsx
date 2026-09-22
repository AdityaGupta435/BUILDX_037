import { Link } from "react-router-dom";
import "./StudentDashboard.css";
import { useEffect, useState } from "react";
import { getApplications } from "../utils/applicationTracker";
import scholarships from "../data/scholarships";
import opportunities from "../data/opportunities";

function StudentDashboard({
  student,
  scholarshipCount,
  opportunityCount,
}) {
  const name = student?.name || "Student";

  const [applications, setApplications] = useState([]);

  // Load application tracking data
  useEffect(() => {
    setApplications(getApplications());
  }, []);

  // Application statistics
  const applicationCount = applications.length;

  const inReviewCount = applications.filter(
    (item) => item.status === "In Review"
  ).length;

  const acceptedCount = applications.filter(
    (item) => item.status === "Accepted"
  ).length;

  const rejectedCount = applications.filter(
    (item) => item.status === "Rejected"
  ).length;

  const interestSkillMap = {
    web: ["React", "JavaScript", "HTML", "CSS"],
    java: ["Java", "Spring", "Spring Boot"],
    data: ["Python", "Data", "Machine Learning", "Analytics"],
    design: ["Figma", "UI/UX", "Design"],
  };

  const recommendedScholarships = student
    ? scholarships
        .filter((scholarship) => {
          const marksMatch = student.marks >= scholarship.minMarks;
          const incomeMatch = student.income <= scholarship.maxIncome;
          const classMatch = scholarship.eligibleClasses.includes(
            student.classLevel
          );
          const categoryMatch =
            scholarship.category === "General" ||
            scholarship.category === student.category;

          return marksMatch && incomeMatch && classMatch && categoryMatch;
        })
        .slice(0, 3)
    : [];

  const recommendedOpportunities = student?.careerInterest
    ? opportunities
        .filter((opportunity) => {
          const keywords = interestSkillMap[student.careerInterest] || [];
          const text = `${opportunity.title} ${opportunity.organization} ${opportunity.skill}`.toLowerCase();
          return keywords.some((keyword) =>
            text.includes(keyword.toLowerCase())
          );
        })
        .slice(0, 3)
    : [];

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
            APPLICATION TRACKING
        ========================= */}

        <section className="application-overview">

          <div className="application-overview-header">

            <div>

              <span className="dashboard-section-label">
                APPLICATION TRACKING
              </span>

              <h2>
                Your Applications
              </h2>

              <p>
                Track the scholarships and
                opportunities you are following.
              </p>

            </div>

            <Link
              to="/saved"
              className="application-view-all"
            >
              View Saved Items →
            </Link>

          </div>


          <div className="application-stats">

            <div className="application-stat-card">

              <span className="application-stat-icon">
                📌
              </span>

              <div>

                <strong>
                  {applicationCount}
                </strong>

                <span>
                  Total Applications
                </span>

              </div>

            </div>


            <div className="application-stat-card">

              <span className="application-stat-icon">
                🕐
              </span>

              <div>

                <strong>
                  {inReviewCount}
                </strong>

                <span>
                  In Review
                </span>

              </div>

            </div>


            <div className="application-stat-card">

              <span className="application-stat-icon">
                ✅
              </span>

              <div>

                <strong>
                  {acceptedCount}
                </strong>

                <span>
                  Accepted
                </span>

              </div>

            </div>


            <div className="application-stat-card">

              <span className="application-stat-icon">
                ❌
              </span>

              <div>

                <strong>
                  {rejectedCount}
                </strong>

                <span>
                  Rejected
                </span>

              </div>

            </div>

          </div>

        </section>


        {/* =========================
            RECOMMENDED FOR YOU
        ========================= */}

        <section className="dashboard-panel recommendations-panel">

          <div className="panel-heading recommendations-heading">
            <div>
              <span>PERSONALIZED FOR YOU</span>
              <h2>Recommended For You</h2>
            </div>

            {student && (
              <span className="recommendation-profile-note">
                Based on your profile
              </span>
            )}
          </div>

          {!student ? (
            <div className="recommendation-empty">
              <div className="recommendation-empty-icon">🎯</div>
              <div>
                <strong>Complete your profile to unlock recommendations</strong>
                <p>
                  Add your marks, category and career interest to see
                  personalized scholarships and opportunities.
                </p>
              </div>
              <Link to="/profile" className="recommendation-action">
                Complete Profile →
              </Link>
            </div>
          ) : (
            <div className="recommendation-grid">

              <div className="recommendation-column">
                <div className="recommendation-column-header">
                  <span className="recommendation-icon purple">🎓</span>
                  <div>
                    <strong>Scholarships</strong>
                    <small>Matched to your eligibility</small>
                  </div>
                </div>

                {recommendedScholarships.length > 0 ? (
                  <div className="recommendation-list">
                    {recommendedScholarships.map((scholarship) => (
                      <Link
                        to="/scholarships"
                        className="recommendation-item"
                        key={scholarship.id}
                      >
                        <div>
                          <strong>{scholarship.name}</strong>
                          <span>{scholarship.amount}</span>
                        </div>
                        <b>→</b>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="recommendation-no-result">
                    No scholarship matches found yet.
                  </p>
                )}
              </div>

              <div className="recommendation-column">
                <div className="recommendation-column-header">
                  <span className="recommendation-icon orange">💼</span>
                  <div>
                    <strong>Career Opportunities</strong>
                    <small>Based on your career interest</small>
                  </div>
                </div>

                {recommendedOpportunities.length > 0 ? (
                  <div className="recommendation-list">
                    {recommendedOpportunities.map((opportunity) => (
                      <Link
                        to="/career"
                        className="recommendation-item"
                        key={opportunity.id}
                      >
                        <div>
                          <strong>{opportunity.title}</strong>
                          <span>{opportunity.location} · {opportunity.skill}</span>
                        </div>
                        <b>→</b>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="recommendation-no-result">
                    Select a career interest to get recommendations.
                  </p>
                )}
              </div>

            </div>
          )}

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