import { useState } from "react";
import {
  isItemSaved,
  toggleSavedItem,
} from "../utils/savedItems";

function OpportunityCard({
  opportunity,
}) {
  const [showDetails, setShowDetails] =
    useState(false);

  const [
    saved,
    setSaved,
  ] = useState(
    isItemSaved(
      opportunity.id,
      "opportunity"
    )
  );

  const closeDetails = () => {
    setShowDetails(false);
  };


  /* =========================
     SAVE OPPORTUNITY
  ========================= */

  const handleSave = () => {
    toggleSavedItem(
      opportunity,
      "opportunity"
    );

    setSaved((previous) => !previous);
  };


  return (
    <>
      <article className="opportunity-card">

        <div className="opportunity-image-wrapper">

          <img
            src={opportunity.image}
            alt={opportunity.title}
            className="opportunity-image"
          />

          <span className="opportunity-type">
            {opportunity.type}
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
                ? "Remove opportunity from saved items"
                : "Save opportunity"
            }
          >
            {saved ? "🔖" : "♡"}
          </button>

        </div>


        <div className="opportunity-card-body">

          <p className="opportunity-organization">
            {opportunity.organization}
          </p>

          <h3>
            {opportunity.title}
          </h3>


          <div className="opportunity-info">

            <div>
              <span>Location</span>

              <strong>
                📍 {opportunity.location}
              </strong>
            </div>


            <div>
              <span>Mode</span>

              <strong>
                💻 {opportunity.mode}
              </strong>
            </div>


            <div>
              <span>Duration</span>

              <strong>
                ⏱ {opportunity.duration}
              </strong>
            </div>


            <div>
              <span>Type</span>

              <strong>
                {opportunity.type}
              </strong>
            </div>

          </div>


          <div className="opportunity-skill">
            💡 {opportunity.skill}
          </div>


          <div className="opportunity-card-actions">

            <button
              type="button"
              className="opportunity-action"
              onClick={() =>
                setShowDetails(true)
              }
            >
              View Details →
            </button>

          </div>

        </div>

      </article>


      {/* =========================
          DETAILS MODAL
      ========================= */}

      {showDetails && (

        <div
          className="opportunity-modal-overlay"
          onClick={closeDetails}
        >

          <div
            className="opportunity-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              type="button"
              className="opportunity-modal-close"
              onClick={closeDetails}
              aria-label="Close opportunity details"
            >
              ×
            </button>


            <img
              src={opportunity.image}
              alt={opportunity.title}
              className="opportunity-modal-image"
            />


            <div className="opportunity-modal-content">

              <span className="opportunity-modal-type">
                {opportunity.type}
              </span>


              <h2>
                {opportunity.title}
              </h2>


              <p className="opportunity-modal-organization">
                {opportunity.organization}
              </p>


              <div className="opportunity-highlights">

                <div>
                  <span>Location</span>

                  <strong>
                    📍 {opportunity.location}
                  </strong>
                </div>


                <div>
                  <span>Mode</span>

                  <strong>
                    💻 {opportunity.mode}
                  </strong>
                </div>


                <div>
                  <span>Duration</span>

                  <strong>
                    ⏱ {opportunity.duration}
                  </strong>
                </div>


                <div>
                  <span>Required Skill</span>

                  <strong>
                    💡 {opportunity.skill}
                  </strong>
                </div>

              </div>


              <div className="opportunity-description">

                <h3>
                  About this opportunity
                </h3>

                <p>
                  This is a demonstration
                  opportunity listed on
                  ScholarMatch. Explore the
                  role details and check whether
                  the opportunity matches your
                  interests and career goals.
                </p>

              </div>


              <div className="opportunity-demo-notice">
                ℹ️ This opportunity is part of
                the ScholarMatch demonstration
                dataset.
              </div>


              <button
                type="button"
                className="opportunity-modal-save"
                onClick={handleSave}
              >
                {saved
                  ? "🔖 Remove from Saved"
                  : "♡ Save Opportunity"}
              </button>


              <button
                type="button"
                className="opportunity-modal-button"
                onClick={closeDetails}
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

export default OpportunityCard;