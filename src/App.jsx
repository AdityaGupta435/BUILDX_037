import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import StudentDashboard from "./components/StudentDashboard";
import StudentProfile from "./components/StudentProfile";
import ScholarshipResults from "./components/ScholarshipResults";
import CareerSection from "./components/CareerSection";
import AICareerAssistant from "./components/AICareerAssistant";
import SavedItems from "./components/SavedItems";

import scholarships from "./data/scholarships";
import opportunities from "./data/opportunities";


/* =========================
   HOME PAGE
========================= */

function Home({
  student,
  matchedScholarships,
  findScholarships,
}) {
  return (
    <div className="app">

      <Navbar />

      <Hero />

      <StudentProfile
        onMatch={findScholarships}
      />

      <ScholarshipResults
        scholarships={matchedScholarships}
        student={student}
      />

      <CareerSection
        opportunities={opportunities}
        student={student}
      />

      <AICareerAssistant
  student={student}
/>

    </div>
  );
}


/* =========================
   APP
========================= */

function App() {

  const [student, setStudent] = useState(null);

  const [matchedScholarships, setMatchedScholarships] =
    useState([]);


  /* =========================
     SCHOLARSHIP MATCHING
  ========================= */

  const findScholarships = (profile) => {

    const matches = scholarships.filter(
      (scholarship) => {

        const marksMatch =
          profile.marks >= scholarship.minMarks;

        const incomeMatch =
          profile.income <= scholarship.maxIncome;

        const classMatch =
          scholarship.eligibleClasses.includes(
            profile.classLevel
          );

        const categoryMatch =
          scholarship.category === "General" ||
          scholarship.category === profile.category;

        return (
          marksMatch &&
          incomeMatch &&
          classMatch &&
          categoryMatch
        );
      }
    );

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
    <BrowserRouter>

      <Routes>

        {/* =========================
            HOME
        ========================= */}

        <Route
          path="/"
          element={
            <Home
              student={student}
              matchedScholarships={
                matchedScholarships
              }
              findScholarships={
                findScholarships
              }
            />
          }
        />


        {/* =========================
            FULL DASHBOARD
        ========================= */}

        <Route
          path="/dashboard"
          element={
            <StudentDashboard
              student={student}
              scholarshipCount={
                matchedScholarships.length
              }
              opportunityCount={
                opportunities.length
              }
            />
          }
        />


        {/* =========================
            SCHOLARSHIPS
        ========================= */}

        <Route
          path="/scholarships"
          element={
            <>
              <Navbar />

              <ScholarshipResults
                scholarships={
                  matchedScholarships.length > 0
                    ? matchedScholarships
                    : scholarships
                }
                student={student}
              />
            </>
          }
        />


        {/* =========================
            CAREER
        ========================= */}

        <Route
          path="/career"
          element={
            <>
              <Navbar />

              <CareerSection
                opportunities={opportunities}
                student={student}
              />
            </>
          }
        />


        {/* =========================
            AI ASSISTANT
        ========================= */}

        <Route
          path="/assistant"
          element={
            <>
              <Navbar />

              <AICareerAssistant 
                student={student}
              />
            </>
          }
        />

        <Route
  path="/saved"
  element={
    <>
      <Navbar />

      <SavedItems />
    </>
  }
/>


        {/* =========================
            PROFILE
        ========================= */}

        <Route
          path="/profile"
          element={
            <>
              <Navbar />

              <StudentProfile
                onMatch={findScholarships}
              />
            </>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;