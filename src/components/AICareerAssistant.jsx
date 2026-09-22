import { useState } from "react";
import careerAdvice from "../data/careerAdvice";

function AICareerAssistant() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(null);

  const getAdvice = () => {
    const query = question.toLowerCase().trim();

    if (!query) return;

    let selected = careerAdvice.general;

    for (const key of Object.keys(careerAdvice)) {
      if (key === "general") continue;

      const found = careerAdvice[key].keywords.some(
        (keyword) => query.includes(keyword)
      );

      if (found) {
        selected = careerAdvice[key];
        break;
      }
    }

    setAnswer(selected);
  };

  const quickQuestions = [
    "What should I learn for web development?",
    "How can I start Java?",
    "How do I enter data science?",
  ];

  return (
    <section className="ai-section" id="assistant">

      <div className="ai-header">
        <div>
          <span>04 — AI Career Assistant</span>

          <h2>
            Ask about your career
          </h2>

          <p>
            Get a simple learning roadmap based on your
            career interest.
          </p>
        </div>

        <div className="ai-avatar">
          ✨
        </div>
      </div>

      <div className="ai-container">

        <div className="chat-box">

          <div className="assistant-message">
            <div className="assistant-icon">
              🤖
            </div>

            <div>
              <strong>ScholarMatch AI</strong>

              <p>
                Hi! Tell me what career you're interested
                in and I'll suggest a starting roadmap.
              </p>
            </div>
          </div>

          <div className="quick-questions">
            {quickQuestions.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setQuestion(item);
                  setTimeout(getAdvice, 0);
                }}
              >
                {item}
              </button>
            ))}
          </div>

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

            <button onClick={getAdvice}>
              Ask →
            </button>

          </div>

        </div>

        {answer && (
          <div className="career-answer">

            <div className="answer-title">
              <div className="answer-icon">
                🎯
              </div>

              <div>
                <span>Recommended Path</span>
                <h3>{answer.title}</h3>
              </div>
            </div>

            <p className="answer-message">
              {answer.message}
            </p>

            <h4>Skills to learn</h4>

            <div className="skill-list">
              {answer.skills.map((skill) => (
                <span key={skill}>
                  {skill}
                </span>
              ))}
            </div>

            <h4>Suggested Roadmap</h4>

            <div className="roadmap">

              {answer.roadmap.map((step, index) => (
                <div className="roadmap-step" key={step}>

                  <div className="step-number">
                    {index + 1}
                  </div>

                  <span>{step}</span>

                </div>
              ))}

            </div>

          </div>
        )}

      </div>

    </section>
  );
}

export default AICareerAssistant;