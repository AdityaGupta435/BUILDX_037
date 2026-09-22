import { useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import StudentProfile from "./components/StudentProfile";
import ScholarshipResults from "./components/ScholarshipResults";

import scholarships from "./data/scholarships";

function App() {
  const [student, setStudent] = useState(null);
  const [matchedScholarships, setMatchedScholarships] = useState([]);

  const findScholarships = (profile) => {
    const matches = scholarships.filter((scholarship) => {
      const marksMatch =
        profile.marks >= scholarship.minMarks;

      const incomeMatch =
        profile.income <= scholarship.maxIncome;

      const classMatch =
        scholarship.eligibleClasses.includes(profile.classLevel);

      const categoryMatch =
        scholarship.category === "General" ||
        scholarship.category === profile.category;

      return (
        marksMatch &&
        incomeMatch &&
        classMatch &&
        categoryMatch
      );
    });

    setStudent(profile);
    setMatchedScholarships(matches);

    setTimeout(() => {
      document
        .getElementById("scholarships")
        ?.scrollIntoView({
          behavior: "smooth",
        });
    }, 100);
  };

  return (
    <div className="app">

      <Navbar />

      <Hero />

      <StudentProfile onMatch={findScholarships} />

      <ScholarshipResults
        scholarships={matchedScholarships}
        student={student}
      />

    </div>
  );
}

export default App;