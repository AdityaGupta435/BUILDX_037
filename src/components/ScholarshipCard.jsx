import { useState } from "react";
import {
  isItemSaved,
  toggleSavedItem,
} from "../utils/savedItems";

function ScholarshipCard({
  scholarship,
  student,
}) {
  const [showDetails, setShowDetails] =
    useState(false);

  const [
    saved,
    setSaved,
  ] = useState(
    isItemSaved(
      scholarship.id,
      "scholarship"
    )
  );

  const hasStudentProfile =
    Boolean(student);

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


  /* =========================
     SAVE SCHOLARSHIP
  ========================= */

  const handleSave = () => {
    toggleSavedItem(
      scholarship,
      "scholarship"
    );

    setSaved((previous) => !previous);
  };


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


          {/* SAVE BUTTON */}

          <button
            type="button"
            className={`save-item-btn ${
              saved ? "saved" : ""
            }`}
            onClick={handleSave}
            aria-label={
              saved
                ? "Remove scholarship from saved items"
                : "Save scholarship"
            }
          >
            {saved ? "🔖" : "♡"}
          </button>

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


          <div className="scholarship-card-actions">

            <button
              type="button"
              className="scholarship-details-btn"
              onClick={() =>
                setShowDetails(true)
              }
            >
              View Details
              <span>→</span>
            </button>

          </div>

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
              onClick={() =>
                setShowDetails(false)
              }
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

                </div>

              )}


              <div className="modal-criteria">

                <div>
                  <span>
                    Minimum Marks
                  </span>

                  <strong>
                    {marksEligible
                      ? "✓ "
                      : "✕ "}
                    {scholarship.minMarks}%
                  </strong>
                </div>


                <div>
                  <span>
                    Maximum Family Income
                  </span>

                  <strong>
                    {incomeEligible
                      ? "✓ "
                      : "✕ "}
                    ₹
                    {scholarship.maxIncome.toLocaleString(
                      "en-IN"
                    )}
                  </strong>
                </div>


                <div>
                  <span>
                    Education Level
                  </span>

                  <strong>
                    {classEligible
                      ? "✓ Eligible"
                      : "✕ Not Eligible"}
                  </strong>
                </div>


                <div>
                  <span>
                    Category
                  </span>

                  <strong>
                    {categoryEligible
                      ? "✓ Eligible"
                      : "✕ Not Eligible"}
                  </strong>
                </div>

              </div>


              <div className="modal-amount">

                <span>
                  Scholarship Amount
                </span>

                <strong>
                  {scholarship.amount}
                </strong>

              </div>


              <div className="scholarship-demo-notice">
                ℹ️ This scholarship is part of
                the ScholarMatch demonstration
                dataset.
              </div>


              <button
                type="button"
                className="scholarship-modal-save"
                onClick={handleSave}
              >
                {saved
                  ? "🔖 Remove from Saved"
                  : "♡ Save Scholarship"}
              </button>


              <button
                type="button"
                className="modal-close-btn"
                onClick={() =>
                  setShowDetails(false)
                }
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