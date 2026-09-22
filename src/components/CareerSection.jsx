import { useMemo, useState } from "react";
import OpportunityCard from "./OpportunityCard";

function CareerSection({ opportunities = [], student }) {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [mode, setMode] = useState("All");
  const [skill, setSkill] = useState("All");

  const types = ["All", "Internship", "Job", "Course"];
  const modes = ["All", "Online", "Hybrid", "On-site"];

  const skills = [
    "All",
    ...new Set(
      opportunities.map(
        (opportunity) => opportunity.skill
      )
    ),
  ];

  /* =========================
     CAREER INTEREST MAPPING
  ========================= */

  const interestSkillMap = {
    web: [
      "React",
      "JavaScript",
      "HTML",
      "CSS",
    ],

    java: [
      "Java",
      "Spring",
      "Spring Boot",
    ],

    data: [
      "Python",
      "Data",
      "Machine Learning",
      "Analytics",
    ],

    design: [
      "Figma",
      "UI/UX",
      "Design",
    ],
  };

  /* =========================
     PERSONALIZED RECOMMENDATIONS
  ========================= */

  const recommendedOpportunities = useMemo(() => {
    if (!student?.careerInterest) {
      return [];
    }

    const keywords =
      interestSkillMap[student.careerInterest] || [];

    return opportunities.filter((opportunity) => {
      const opportunityText = `
        ${opportunity.title}
        ${opportunity.organization}
        ${opportunity.skill}
      `.toLowerCase();

      return keywords.some((keyword) =>
        opportunityText.includes(
          keyword.toLowerCase()
        )
      );
    });
  }, [opportunities, student]);

  /* =========================
     FILTERED OPPORTUNITIES
  ========================= */

  const filteredOpportunities = useMemo(() => {
    const searchText = search
      .toLowerCase()
      .trim();

    return opportunities.filter((opportunity) => {
      const matchesSearch =
        !searchText ||
        opportunity.title
          .toLowerCase()
          .includes(searchText) ||
        opportunity.organization
          .toLowerCase()
          .includes(searchText) ||
        opportunity.skill
          .toLowerCase()
          .includes(searchText) ||
        opportunity.location
          .toLowerCase()
          .includes(searchText);

      const matchesType =
        type === "All" ||
        opportunity.type === type;

      const matchesMode =
        mode === "All" ||
        opportunity.mode === mode;

      const matchesSkill =
        skill === "All" ||
        opportunity.skill === skill;

      return (
        matchesSearch &&
        matchesType &&
        matchesMode &&
        matchesSkill
      );
    });
  }, [
    opportunities,
    search,
    type,
    mode,
    skill,
  ]);

  /* =========================
     CLEAR FILTERS
  ========================= */

  const clearFilters = () => {
    setSearch("");
    setType("All");
    setMode("All");
    setSkill("All");
  };

  return (
    <section className="career-section">

      {/* =========================
          HEADER
      ========================= */}

      <div className="career-header">

        <div>

          <span className="section-label">
            03 — Career Discovery
          </span>

          <h2>
            Explore Your Next Opportunity
          </h2>

          <p>
            Discover internships, jobs and learning
            programs that can help you build your career.
          </p>

        </div>

        <div className="career-header-stat">

          <strong>
            {filteredOpportunities.length}
          </strong>

          <span>
            Opportunities
          </span>

        </div>

      </div>


      {/* =========================
          PERSONALIZED RECOMMENDATIONS
      ========================= */}

      {student?.careerInterest &&
        recommendedOpportunities.length > 0 && (

          <div className="recommended-career-section">

            <div className="recommended-career-heading">

              <div>

                <span>
                  PERSONALIZED FOR YOU
                </span>

                <h3>
                  ⭐ Recommended Opportunities
                </h3>

                <p>
                  Based on your selected career interest.
                </p>

              </div>

              <strong>
                {recommendedOpportunities.length} match
                {recommendedOpportunities.length !== 1
                  ? "es"
                  : ""}
              </strong>

            </div>


            <div className="career-grid">

              {recommendedOpportunities.map(
                (opportunity) => (

                  <div
                    key={`recommended-${opportunity.id}`}
                    className="recommended-opportunity-card"
                  >

                    <span className="recommended-badge">
                      ⭐ Recommended
                    </span>

                    <OpportunityCard
                      opportunity={opportunity}
                    />

                  </div>

                )
              )}

            </div>

          </div>

        )}


      {/* =========================
          SEARCH + FILTERS
      ========================= */}

      <div className="career-toolbar">

        <div className="career-search">

          <span>🔎</span>

          <input
            type="text"
            placeholder="Search jobs, internships, skills..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>


        {/* TYPE */}

        <div className="career-filter-group">

          {types.map((item) => (

            <button
              key={item}
              type="button"
              className={
                type === item
                  ? "career-filter active"
                  : "career-filter"
              }
              onClick={() => setType(item)}
            >
              {item}
            </button>

          ))}

        </div>


        {/* MODE */}

        <select
          className="career-select"
          value={mode}
          onChange={(e) =>
            setMode(e.target.value)
          }
        >

          {modes.map((item) => (

            <option
              key={item}
              value={item}
            >
              {item === "All"
                ? "All Modes"
                : item}
            </option>

          ))}

        </select>


        {/* SKILL */}

        <select
          className="career-select"
          value={skill}
          onChange={(e) =>
            setSkill(e.target.value)
          }
        >

          {skills.map((item) => (

            <option
              key={item}
              value={item}
            >
              {item === "All"
                ? "All Skills"
                : item}
            </option>

          ))}

        </select>

      </div>


      {/* =========================
          RESULT COUNT
      ========================= */}

      <div className="career-result-count">

        Showing{" "}

        <strong>
          {filteredOpportunities.length}
        </strong>{" "}

        opportunities

      </div>


      {/* =========================
          ALL OPPORTUNITIES
      ========================= */}

      {filteredOpportunities.length > 0 ? (

        <div className="career-grid">

          {filteredOpportunities.map(
            (opportunity) => (

              <OpportunityCard
                key={opportunity.id}
                opportunity={opportunity}
              />

            )
          )}

        </div>

      ) : (

        <div className="career-empty">

          <div>
            🔎
          </div>

          <h3>
            No opportunities found
          </h3>

          <p>
            Try changing your search or filters.
          </p>

          <button
            type="button"
            onClick={clearFilters}
          >
            Clear Filters
          </button>

        </div>

      )}

    </section>
  );
}

export default CareerSection;