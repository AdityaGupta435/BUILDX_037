import { useMemo, useState } from "react";
import ScholarshipCard from "./ScholarshipCard";

function ScholarshipResults({ scholarships = [], student }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  const categories = [
    "All",
    "General",
    "OBC",
    "SC",
    "ST",
  ];

  const filteredScholarships = useMemo(() => {
    let result = scholarships.filter((scholarship) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        scholarship.name.toLowerCase().includes(searchText) ||
        scholarship.provider.toLowerCase().includes(searchText);

      const matchesCategory =
        category === "All" ||
        scholarship.category === category;

      return matchesSearch && matchesCategory;
    });

    if (sortBy === "marks") {
      result = [...result].sort(
        (a, b) => a.minMarks - b.minMarks
      );
    }

    if (sortBy === "amount") {
      result = [...result].sort((a, b) => {
        const amountA = parseInt(
          a.amount.replace(/\D/g, ""),
          10
        );

        const amountB = parseInt(
          b.amount.replace(/\D/g, ""),
          10
        );

        return amountB - amountA;
      });
    }

    return result;
  }, [scholarships, search, category, sortBy]);

  return (
    <section
      className="results-section"
      id="scholarships"
    >
      <div className="results-header">

        <div>
          <span>02 — Scholarship Discovery</span>

          <h2>
            {student
              ? `Scholarships for ${student.name}`
              : "Discover Scholarships"}
          </h2>

          <p>
            {student
              ? `We found ${scholarships.length} opportunities based on your profile.`
              : "Explore scholarships and funding opportunities available to students."}
          </p>
        </div>

        {student && (
          <div className="profile-summary">

            <strong>{student.marks}%</strong>
            <span>Marks</span>

            <strong>
              ₹{student.income.toLocaleString("en-IN")}
            </strong>
            <span>Family Income</span>

          </div>
        )}

      </div>


      {/* SEARCH + FILTERS */}

      <div className="scholarship-toolbar">

        <div className="scholarship-search">

          <span>🔎</span>

          <input
            type="text"
            placeholder="Search scholarships..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>


        <div className="category-filters">

          {categories.map((item) => (
            <button
              key={item}
              className={
                category === item
                  ? "filter-btn active"
                  : "filter-btn"
              }
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}

        </div>


        <select
          className="scholarship-sort"
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value)
          }
        >
          <option value="default">
            Sort By
          </option>

          <option value="marks">
            Minimum Marks
          </option>

          <option value="amount">
            Scholarship Amount
          </option>
        </select>

      </div>


      {/* RESULT COUNT */}

      <div className="scholarship-result-count">
        Showing{" "}
        <strong>
          {filteredScholarships.length}
        </strong>{" "}
        scholarship
        {filteredScholarships.length !== 1
          ? "s"
          : ""}
      </div>


      {/* SCHOLARSHIP CARDS */}

      {filteredScholarships.length > 0 ? (

        <div className="scholarship-grid">

          {filteredScholarships.map(
            (scholarship) => (
              <ScholarshipCard
  key={scholarship.id}
  scholarship={scholarship}
  student={student}
/>
            )
          )}

        </div>

      ) : (

        <div className="empty-state">

          <div>🔎</div>

          <h3>
            No scholarships found
          </h3>

          <p>
            Try a different search term
            or category.
          </p>

          <button
            className="clear-filter-btn"
            onClick={() => {
              setSearch("");
              setCategory("All");
              setSortBy("default");
            }}
          >
            Clear Filters
          </button>

        </div>

      )}

    </section>
  );
}

export default ScholarshipResults;