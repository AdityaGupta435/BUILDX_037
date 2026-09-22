import { useEffect, useState } from "react";
import careerAdvice from "../data/careerAdvice";

function AICareerAssistant({ student }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(null);

  /* =========================
     CAREER INTEREST MAPPING
  ========================= */

  const interestAdviceMap = {
    web: "web",
    java: "java",
    data: "data",
    design: "design",
  };

  /* =========================
     FIND ADVICE
  ========================= */

  const findAdvice = (query) => {
    const normalizedQuery = query
      .toLowerCase()
      .trim();

    if (!normalizedQuery) {
      return null;
    }

    let selected = careerAdvice.general;

    for (const key of Object.keys(careerAdvice)) {
      if (key === "general") continue;

      const found = careerAdvice[key].keywords.some(
        (keyword) =>
          normalizedQuery.includes(
            keyword.toLowerCase()
          )
      );

      if (found) {
        selected = careerAdvice[key];
        break;
      }
    }

    return selected;
  };

  /* =========================
     PERSONALIZED INITIAL ADVICE
  ========================= */

  useEffect(() => {
    if (!student?.careerInterest) {
      return;
    }

    const adviceKey =
      interestAdviceMap[
        student.careerInterest
      ];

    if (adviceKey && careerAdvice[adviceKey]) {
      setAnswer(careerAdvice[adviceKey]);
    }
  }, [student]);

  /* =========================
     ASK ASSISTANT
  ========================= */

  const getAdvice = () => {
    const selected = findAdvice(question);

    if (!selected) {
      return;
    }

    setAnswer(selected);
  };

  /* =========================
     QUICK QUESTIONS
  ========================= */

  const quickQuestions = [
    "What should I learn for web development?",
    "How can I start Java?",
    "How do I enter data science?",
    "What skills are needed for UI UX design?",
  ];

  /* =========================
     CAREER NAME
  ========================= */

  const getCareerName = () => {
    if (!student?.careerInterest) {
      return null;
    }

    const names = {
      web: "Web Development",
      java: "Java / Backend Development",
      data: "Data Science / AI",
      design: "UI/UX Design",
    };

    return names[student.careerInterest];
  };

  return (
    <section
      className="ai-section"
      id="assistant"
    >

      {/* =========================
          HEADER
      ========================= */}

      <div className="ai-header">

        <div>

          <span>
            04 — AI Career Assistant
          </span>

          <h2>
            Ask about your career
          </h2>

          <p>
            Get personalized career guidance,
            skills, projects and learning roadmaps.
          </p>

        </div>

        <div className="ai-avatar">
          ✨
        </div>

      </div>


      {/* =========================
          CONTAINER
      ========================= */}

      <div className="ai-container">

        {/* =========================
            CHAT BOX
        ========================= */}

        <div className="chat-box">

          <div className="assistant-message">

            <div className="assistant-icon">
              🤖
            </div>

            <div>

              <strong>
                ScholarMatch AI
              </strong>

              <p>
                {getCareerName()
                  ? `Based on your ${getCareerName()} interest, I can suggest skills, projects and a learning roadmap.`
                  : "Hi! Tell me what career you're interested in and I'll suggest a starting roadmap."}
              </p>

            </div>

          </div>


          {/* =========================
              QUICK QUESTIONS
          ========================= */}

          <div className="quick-questions">

            {quickQuestions.map((item) => (

              <button
                key={item}
                type="button"
                onClick={() => {

                  setQuestion(item);

                  const selected =
                    findAdvice(item);

                  if (selected) {
                    setAnswer(selected);
                  }

                }}
              >
                {item}
              </button>

            ))}

          </div>


          {/* =========================
              QUESTION INPUT
          ========================= */}

          <div className="question-input">

            <input
              type="text"
              placeholder="Ask: What should I learn for web development?"
              value={question}
              onChange={(e) =>
                setQuestion(e.target.value)
              }
              onKeyDown={(e) => {

                if (e.key === "Enter") {
                  getAdvice();
                }

              }}
            />

            <button
              type="button"
              onClick={getAdvice}
            >
              Ask →
            </button>

          </div>

        </div>


        {/* =========================
            ANSWER
        ========================= */}

        {answer && (

          <div className="career-answer">

            {/* =========================
                TITLE
            ========================= */}

            <div className="answer-title">

              <div className="answer-icon">
                🎯
              </div>

              <div>

                <span>
                  Recommended Path
                </span>

                <h3>
                  {answer.title}
                </h3>

              </div>

            </div>


            {/* =========================
                MESSAGE
            ========================= */}

            <p className="answer-message">
              {answer.message}
            </p>


            {/* =========================
                SKILLS
            ========================= */}

            <h4>
              Skills to Learn
            </h4>

            <div className="skill-list">

              {answer.skills.map((skill) => (

                <span key={skill}>
                  {skill}
                </span>

              ))}

            </div>


            {/* =========================
                ROADMAP
            ========================= */}

            <h4>
              Suggested Roadmap
            </h4>

            <div className="roadmap">

              {answer.roadmap.map(
                (step, index) => (

                  <div
                    className="roadmap-step"
                    key={step}
                  >

                    <div className="step-number">
                      {index + 1}
                    </div>

                    <span>
                      {step}
                    </span>

                  </div>

                )
              )}

            </div>


            {/* =========================
                PROJECT IDEAS
            ========================= */}

            {answer.projects &&
              answer.projects.length > 0 && (

                <div className="ai-project-section">

                  <h4>
                    💡 Project Ideas
                  </h4>

                  <div className="ai-project-grid">

                    {answer.projects.map(
                      (project, index) => (

                        <div
                          className="ai-project-card"
                          key={project}
                        >

                          <div className="ai-project-number">
                            {index + 1}
                          </div>

                          <div>
                            <strong>
                              {project}
                            </strong>

                            <p>
                              Build this project
                              to gain practical
                              experience.
                            </p>
                          </div>

                        </div>

                      )
                    )}

                  </div>

                </div>

              )}


            {/* =========================
                CAREER TIP
            ========================= */}

            {answer.careerTip && (

              <div className="ai-career-tip">

                <div className="ai-career-tip-icon">
                  💬
                </div>

                <div>

                  <strong>
                    Career Tip
                  </strong>

                  <p>
                    {answer.careerTip}
                  </p>

                </div>

              </div>

            )}


            {/* =========================
                STUDENT CONTEXT
            ========================= */}

            {student && (

              <div className="ai-profile-context">

                <span>
                  Personalized for
                </span>

                <strong>
                  {student.name}
                </strong>

                <small>
                  Based on your selected career
                  interest
                </small>

              </div>

            )}

          </div>

        )}

      </div>

    </section>
  );
}

export default AICareerAssistant;