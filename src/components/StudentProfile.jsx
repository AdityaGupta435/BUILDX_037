import { useState } from "react";

function StudentProfile({ onMatch }) {
  const [form, setForm] = useState({
    name: "",
    marks: "",
    income: "",
    category: "General",
    classLevel: "12",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.marks || !form.income) {
      alert("Please fill all required fields.");
      return;
    }

    onMatch({
      ...form,
      marks: Number(form.marks),
      income: Number(form.income),
    });
  };

  return (
    <section className="profile-section" id="profile">
      <div className="section-heading">
        <span>01 — Student Profile</span>
        <h2>Tell us about yourself</h2>
        <p>
          Enter your basic academic information and we'll find matching
          scholarship opportunities.
        </p>
      </div>

      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Student Name *</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Academic Marks (%) *</label>
          <input
            type="number"
            name="marks"
            placeholder="e.g. 84"
            min="0"
            max="100"
            value={form.marks}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Annual Family Income (₹) *</label>
          <input
            type="number"
            name="income"
            placeholder="e.g. 180000"
            min="0"
            value={form.income}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option>General</option>
            <option>OBC</option>
            <option>SC</option>
            <option>ST</option>
          </select>
        </div>

        <div className="form-group">
          <label>Current Education</label>
          <select
            name="classLevel"
            value={form.classLevel}
            onChange={handleChange}
          >
            <option value="12">Class 12</option>
            <option value="UG">Undergraduate</option>
          </select>
        </div>

        <button className="match-btn" type="submit">
          Find My Scholarships →
        </button>
      </form>
    </section>
  );
}

export default StudentProfile;

