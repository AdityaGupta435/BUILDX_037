import ScholarshipCard from "./ScholarshipCard";

function ScholarshipResults({ scholarships, student }) {
  if (!student) {
    return null;
  }

  return (
    <section className="results-section" id="scholarships">

      <div className="results-header">
        <div>
          <span>02 — Your Matches</span>

          <h2>
            Scholarships for {student.name}
          </h2>

          <p>
            We found {scholarships.length} matching opportunities
            based on your profile.
          </p>
        </div>

        <div className="profile-summary">
          <strong>{student.marks}%</strong>
          <span>Marks</span>

          <strong>
            ₹{student.income.toLocaleString("en-IN")}
          </strong>
          <span>Family Income</span>
        </div>
      </div>

      {scholarships.length > 0 ? (
        <div className="scholarship-grid">
          {scholarships.map((scholarship) => (
            <ScholarshipCard
              key={scholarship.id}
              scholarship={scholarship}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div>🔎</div>
          <h3>No matching scholarships found</h3>
          <p>
            Try updating your profile information to find more opportunities.
          </p>
        </div>
      )}

    </section>
  );
}

export default ScholarshipResults;