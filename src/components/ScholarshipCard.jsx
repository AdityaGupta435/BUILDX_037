function ScholarshipCard({ scholarship }) {
  return (
    <article className="scholarship-card">

      <img
        src={scholarship.image}
        alt={scholarship.name}
      />

      <div className="scholarship-content">

        <div className="match-badge">
          ✓ Eligibility Match
        </div>

        <h3>{scholarship.name}</h3>

        <p className="provider">
          {scholarship.provider}
        </p>

        <div className="scholarship-info">
          <div>
            <span>Scholarship</span>
            <strong>{scholarship.amount}</strong>
          </div>

          <div>
            <span>Deadline</span>
            <strong>{scholarship.deadline}</strong>
          </div>
        </div>

        <button className="apply-btn">
          View Details →
        </button>

      </div>
    </article>
  );
}

export default ScholarshipCard;