function OpportunityCard({ opportunity }) {
  return (
    <article className="opportunity-card">

      <div className="opportunity-image">
        <img
          src={opportunity.image}
          alt={opportunity.title}
        />

        <span className="opportunity-type">
          {opportunity.type}
        </span>
      </div>

      <div className="opportunity-content">

        <div className="organization">
          {opportunity.organization}
        </div>

        <h3>
          {opportunity.title}
        </h3>

        <div className="opportunity-meta">

          <span>📍 {opportunity.location}</span>

          <span>💻 {opportunity.mode}</span>

          <span>⏱ {opportunity.duration}</span>

        </div>

        <div className="skill-row">

          <span>
            {opportunity.skill}
          </span>

          <button>
            Explore →
          </button>

        </div>

      </div>

    </article>
  );
}

export default OpportunityCard;