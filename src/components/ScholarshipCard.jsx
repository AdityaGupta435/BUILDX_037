import { useState } from "react";

function ScholarshipCard({ scholarship, student }) {
  const [showDetails, setShowDetails] = useState(false);

  const hasStudentProfile = Boolean(student);

  const marksEligible =
    !hasStudentProfile ||
    student.marks >= scholarship.minMarks;

  const incomeEligible =
    !hasStudentProfile ||
    student.income <= scholarship.maxIncome;

  const classEligible =
    !hasStudentProfile ||
    scholarship.eligibleClasses.includes(
      student.classLevel
    );

  const categoryEligible =
    !hasStudentProfile ||
    scholarship.category === "General" ||
    scholarship.category === student.category;

  const isEligible =
    marksEligible &&
    incomeEligible &&
    classEligible &&
    categoryEligible;

  const getStatus = () => {
    if (!hasStudentProfile) {
      return {
        text: "Check Eligibility",
        className: "check",
        icon: "!",
      };
    }

    if (isEligible) {
      return {
        text: "Eligible",
        className: "eligible",
        icon: "✓",
      };
    }

    return {
      text: "Not Eligible",
      className: "not-eligible",
      icon: "×",
    };
  };

  const status = getStatus();

  return (
    <>
      <article className="scholarship-card">

        <div className="scholarship-image-wrapper">

          <img
            src={scholarship.image}
            alt={scholarship.name}
            className="scholarship-image"
          />

          <span
            className={`eligibility-badge ${status.className}`}
          >
            {status.icon} {status.text}
          </span>

        </div>


        <div className="scholarship-card-body">

          <div className="scholarship-card-top">

            <span className="scholarship-category">
              {scholarship.category}
            </span>

            <span className="scholarship-deadline">
              Deadline: {scholarship.deadline}
            </span>

          </div>


          <h3>
            {scholarship.name}
          </h3>


          <p className="scholarship-provider">
            {scholarship.provider}
          </p>


          <div className="scholarship-amount">

            <span>
              Scholarship Amount
            </span>

            <strong>
              {scholarship.amount}
            </strong>

          </div>


          <div className="scholarship-meta">

            <div>

              <span>
                Minimum Marks
              </span>

              <strong>
                {scholarship.minMarks}%
              </strong>

            </div>


            <div>

              <span>
                Income Limit
              </span>

              <strong>
                ₹
                {scholarship.maxIncome.toLocaleString(
                  "en-IN"
                )}
              </strong>

            </div>

          </div>


          {/* PERSONALIZED STATUS */}

          {hasStudentProfile && (
            <div
              className={`eligibility-summary ${
                isEligible
                  ? "eligible"
                  : "not-eligible"
              }`}
            >

              {isEligible ? (
                <>
                  <strong>
                    ✓ You appear eligible
                  </strong>

                  <span>
                    Your profile matches the
                    basic eligibility criteria.
                  </span>
                </>
              ) : (
                <>
                  <strong>
                    ⚠ Eligibility criteria not met
                  </strong>

                  <span>
                    Check the details below.
                  </span>
                </>
              )}

            </div>
          )}


          <button
            type="button"
            className="scholarship-details-btn"
            onClick={() => setShowDetails(true)}
          >
            View Details
            <span>→</span>
          </button>

        </div>

      </article>


      {/* =========================
          DETAILS MODAL
      ========================= */}

      {showDetails && (
        <div className="scholarship-modal-overlay">

          <div className="scholarship-modal">

            <button
              type="button"
              className="modal-close"
              onClick={() => setShowDetails(false)}
            >
              ×
            </button>


            <img
              src={scholarship.image}
              alt={scholarship.name}
              className="modal-image"
            />


            <div className="modal-content">

              <span className="scholarship-category">
                {scholarship.category}
              </span>


              <h2>
                {scholarship.name}
              </h2>


              <p className="modal-provider">
                Offered by {scholarship.provider}
              </p>


              {/* ELIGIBILITY RESULT */}

              {hasStudentProfile && (
                <div
                  className={`modal-status ${
                    isEligible
                      ? "eligible"
                      : "not-eligible"
                  }`}
                >

                  <strong>
                    {isEligible
                      ? "✓ You appear eligible"
                      : "⚠ You may not meet all criteria"}
                  </strong>

                  <span>
                    Based on your current
                    student profile.
                  </span>

                </div>
              )}


              <div className="modal-highlight">

                <div>

                  <span>
                    Scholarship Amount
                  </span>

                  <strong>
                    {scholarship.amount}
                  </strong>

                </div>


                <div>

                  <span>
                    Application Deadline
                  </span>

                  <strong>
                    {scholarship.deadline}
                  </strong>

                </div>

              </div>


              <h3>
                Eligibility Criteria
              </h3>


              <ul className="eligibility-list">

                <li>
                  {marksEligible ? "✓" : "✕"}{" "}
                  Minimum marks:{" "}
                  <strong>
                    {scholarship.minMarks}%
                  </strong>
                </li>


                <li>
                  {incomeEligible ? "✓" : "✕"}{" "}
                  Maximum family income:{" "}
                  <strong>
                    ₹
                    {scholarship.maxIncome.toLocaleString(
                      "en-IN"
                    )}
                  </strong>
                </li>


                <li>
                  {classEligible ? "✓" : "✕"}{" "}
                  Eligible class:{" "}
                  <strong>
                    {scholarship.eligibleClasses.join(
                      ", "
                    )}
                  </strong>
                </li>


                <li>
                  {categoryEligible ? "✓" : "✕"}{" "}
                  Category:{" "}
                  <strong>
                    {scholarship.category}
                  </strong>
                </li>

              </ul>


              <div className="demo-notice">
                ℹ️ This scholarship information is
                currently part of the ScholarMatch
                demonstration dataset.
              </div>


              <button
                type="button"
                className="modal-action-btn"
                onClick={() => setShowDetails(false)}
              >
                Close
              </button>

            </div>

          </div>

        </div>
      )}

    </>
  );
}

export default ScholarshipCard;