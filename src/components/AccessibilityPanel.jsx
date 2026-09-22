import { useState } from "react";
import { useAccessibility } from "../context/AccessibilityContext";

function AccessibilityPanel() {
  const [open, setOpen] = useState(false);
  const {
    language,
    setLanguage,
    largeText,
    setLargeText,
    highContrast,
    setHighContrast,
    readAloud,
    t,
  } = useAccessibility();

  return (
    <div className="accessibility-wrap">
      <button
        type="button"
        className="accessibility-toggle"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={t("accessibility")}
      >
        ♿ {t("accessibility")}
      </button>

      {open && (
        <div className="accessibility-panel" role="dialog" aria-label={t("accessibility")}>
          <div className="accessibility-panel-header">
            <strong>{t("accessibility")}</strong>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close">×</button>
          </div>

          <div className="accessibility-language">
            <span>🌐 Language</span>
            <div>
              <button className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")}>{t("english")}</button>
              <button className={language === "hi" ? "active" : ""} onClick={() => setLanguage("hi")}>{t("hindi")}</button>
            </div>
          </div>

          <label className="accessibility-option">
            <span>🔎 {t("largerText")}</span>
            <input type="checkbox" checked={largeText} onChange={(e) => setLargeText(e.target.checked)} />
          </label>

          <label className="accessibility-option">
            <span>◐ {t("highContrast")}</span>
            <input type="checkbox" checked={highContrast} onChange={(e) => setHighContrast(e.target.checked)} />
          </label>

          <button
            type="button"
            className="read-aloud-btn"
            onClick={() => readAloud(document.body.innerText.slice(0, 1200))}
          >
            🔊 {t("readAloud")}
          </button>
        </div>
      )}
    </div>
  );
}

export default AccessibilityPanel;
