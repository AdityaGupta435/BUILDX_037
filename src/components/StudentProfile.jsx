import { useState } from "react";

function StudentProfile({ onMatch }) {
  const [form, setForm] = useState({
    name: "",
    marks: "",
    income: "",
    category: "General",
    classLevel: "12",
    careerInterest: "",
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
    <section
      className="profile-section"
      id="profile"
    >
      <div className="section-heading">

        <span>
          01 — Student Profile
        </span>

        <h2>
          Tell us about yourself
        </h2>

        <p>
          Enter your academic information and
          career interest to get personalized
          scholarship and career recommendations.
        </p>

      </div>


      <form
        className="profile-form"
        onSubmit={handleSubmit}
      >

        {/* STUDENT NAME */}

        <div className="form-group">

          <label>
            Student Name *
          </label>

          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
          />

        </div>


        {/* MARKS */}

        <div className="form-group">

          <label>
            Academic Marks (%) *
          </label>

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


        {/* INCOME */}

        <div className="form-group">

          <label>
            Annual Family Income (₹) *
          </label>

          <input
            type="number"
            name="income"
            placeholder="e.g. 180000"
            min="0"
            value={form.income}
            onChange={handleChange}
          />

        </div>


        {/* CATEGORY */}

        <div className="form-group">

          <label>
            Category
          </label>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option value="General">
              General
            </option>

            <option value="OBC">
              OBC
            </option>

            <option value="SC">
              SC
            </option>

            <option value="ST">
              ST
            </option>

          </select>

        </div>


        {/* EDUCATION */}

        <div className="form-group">

          <label>
            Current Education
          </label>

          <select
            name="classLevel"
            value={form.classLevel}
            onChange={handleChange}
          >

            <option value="12">
              Class 12
            </option>

            <option value="UG">
              Undergraduate
            </option>

          </select>

        </div>


        {/* CAREER INTEREST */}

        <div className="form-group">

          <label htmlFor="careerInterest">
            Career Interest
          </label>

          <select
            id="careerInterest"
            name="careerInterest"
            value={form.careerInterest}
            onChange={handleChange}
          >

            <option value="">
              Select your interest
            </option>

            <option value="web">
              Web Development
            </option>

            <option value="java">
              Java / Backend Development
            </option>

            <option value="data">
              Data Science / AI
            </option>

            <option value="design">
              UI/UX Design
            </option>

          </select>

        </div>


        {/* SUBMIT */}

        <button
          className="match-btn"
          type="submit"
        >
          Find My Scholarships →
        </button>

      </form>

    </section>
  );
}

export default StudentProfile;