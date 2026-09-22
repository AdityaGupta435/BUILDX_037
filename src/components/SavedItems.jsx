import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getSavedItems,
  removeSavedItem,
} from "../utils/savedItems";

import {
  getApplications,
  getApplicationStatus,
  updateApplicationStatus,
} from "../utils/applicationTracker";

function SavedItems() {
  const [savedItems, setSavedItems] =
    useState([]);

  const [filter, setFilter] =
    useState("All");

  const [applications, setApplications] = useState([]);


  /* =========================
     LOAD SAVED ITEMS
  ========================= */

  useEffect(() => {
    setSavedItems(getSavedItems());
    setApplications(getApplications());
  }, []);


  /* =========================
     REMOVE
  ========================= */

  const handleRemove = (id, type) => {
    const updated = removeSavedItem(
      id,
      type
    );

    setSavedItems(updated);
  };

  const handleStatusChange = (item, status) => {
  const updatedApplications = updateApplicationStatus(
    item,
    status
  );

  setApplications(updatedApplications);
};

const getStatus = (item) => {
  const application = applications.find(
    (application) =>
      application.id === item.id &&
      application.type === item.type
  );

  return application?.status || "Saved";
};


  const filteredItems =
    filter === "All"
      ? savedItems
      : savedItems.filter(
          (item) => item.type === filter
        );


  return (
    <div className="saved-page">

      <div className="saved-page-header">

        <div>

          <span className="section-label">
            SAVED ITEMS
          </span>

          <h1>
            Your Saved Items
          </h1>

          <p>
            Keep track of scholarships and
            career opportunities you want to
            explore later.
          </p>

        </div>


        <div className="saved-count">

          <strong>
            {savedItems.length}
          </strong>

          <span>
            Saved
          </span>

        </div>

      </div>


      {/* FILTER */}

      <div className="saved-filter-bar">

        {["All", "scholarship", "opportunity"].map(
          (item) => {

            const label =
              item === "All"
                ? "All"
                : item === "scholarship"
                ? "🎓 Scholarships"
                : "💼 Opportunities";

            return (
              <button
                key={item}
                type="button"
                className={
                  filter === item
                    ? "saved-filter active"
                    : "saved-filter"
                }
                onClick={() =>
                  setFilter(item)
                }
              >
                {label}
              </button>
            );
          }
        )}

      </div>


      {/* EMPTY */}

      {filteredItems.length === 0 ? (

        <div className="saved-empty">

          <div className="saved-empty-icon">
            🔖
          </div>

          <h2>
            No saved items yet
          </h2>

          <p>
            Save scholarships and career
            opportunities that you want to
            revisit later.
          </p>

          <div className="saved-empty-actions">

            <Link to="/scholarships">
              Explore Scholarships →
            </Link>

            <Link to="/career">
              Explore Careers →
            </Link>

          </div>

        </div>

      ) : (

        <div className="saved-grid">

          {filteredItems.map((item) => (

            <article
              className="saved-card"
              key={`${item.type}-${item.id}`}
            >

              <div className="saved-image-wrapper">

                <img
                  src={item.image}
                  alt={
                    item.name ||
                    item.title
                  }
                />

                <span>
                  {item.type ===
                  "scholarship"
                    ? "Scholarship"
                    : "Opportunity"}
                </span>

              </div>


              <div className="saved-card-body">

                <h3>
                  {item.name ||
                    item.title}
                </h3>


                <p>
                  {item.provider ||
                    item.organization}
                </p>


                {item.type ===
                "scholarship" ? (

                  <>
                    <div className="saved-card-meta">

                      <span>
                        Amount
                      </span>

                      <strong>
                        {item.amount}
                      </strong>

                    </div>

                    <div className="saved-card-meta">

                      <span>
                        Deadline
                      </span>

                      <strong>
                        {item.deadline}
                      </strong>

                    </div>
                  </>

                ) : (

                  <>
                    <div className="saved-card-meta">

                      <span>
                        Location
                      </span>

                      <strong>
                        📍 {item.location}
                      </strong>

                    </div>

                    <div className="saved-card-meta">

                      <span>
                        Skill
                      </span>

                      <strong>
                        {item.skill}
                      </strong>

                    </div>
                  </>

                )}

  <div className="application-tracker">
  <div className="application-status-row">
    <span>Application Status</span>

    <span
      className={`application-status ${getStatus(item)
        .toLowerCase()
        .replace(" ", "-")}`}
    >
      {getStatus(item)}
    </span>
  </div>

  <select
    value={getStatus(item)}
    onChange={(e) =>
      handleStatusChange(item, e.target.value)
    }
    className="application-status-select"
  >
    <option value="Saved">Saved</option>
    <option value="Applied">Applied</option>
    <option value="In Review">In Review</option>
    <option value="Accepted">Accepted</option>
    <option value="Rejected">Rejected</option>
  </select>
</div>


                <button
                  type="button"
                  className="saved-remove-btn"
                  onClick={() =>
                    handleRemove(
                      item.id,
                      item.type
                    )
                  }
                >
                  Remove Saved
                </button>

              </div>

            </article>

          ))}

        </div>

      )}

    </div>
  );
}

export default SavedItems;