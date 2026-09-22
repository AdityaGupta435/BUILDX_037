import { useState } from "react";
import OpportunityCard from "./OpportunityCard";

function CareerSection({ opportunities }) {
  const [filter, setFilter] = useState("All");

  const filteredOpportunities =
    filter === "All"
      ? opportunities
      : opportunities.filter(
          (item) => item.type === filter
        );

  return (
    <section className="career-section" id="career">

      <div className="career-heading">
        <div>
          <span>03 — Career Opportunities</span>

          <h2>
            Find your next opportunity
          </h2>

          <p>
            Explore internships, jobs, courses and skill
            development opportunities designed for students.
          </p>
        </div>

        <div className="career-icon">
          💼
        </div>
      </div>

      <div className="career-filters">

        {["All", "Internship", "Job", "Course"].map(
          (item) => (
            <button
              key={item}
              className={
                filter === item
                  ? "filter-btn active"
                  : "filter-btn"
              }
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          )
        )}

      </div>

      <div className="opportunity-grid">

        {filteredOpportunities.map((opportunity) => (
          <OpportunityCard
            key={opportunity.id}
            opportunity={opportunity}
          />
        ))}

      </div>

    </section>
  );
}

export default CareerSection;