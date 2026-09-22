import { createContext, useContext, useEffect, useState } from "react";

const AccessibilityContext = createContext(null);

const translations = {
  en: {
    home: "Home",
    dashboard: "Dashboard",
    scholarships: "Scholarships",
    career: "Career",
    assistant: "AI Assistant",
    profile: "My Profile",
    accessibility: "Accessibility",
    largerText: "Larger Text",
    highContrast: "High Contrast",
    readAloud: "Read Aloud",
    english: "English",
    hindi: "हिंदी",
    offline: "Offline Mode",
    online: "Online",
    usingCached: "Using saved information",
  },
  hi: {
    home: "होम",
    dashboard: "डैशबोर्ड",
    scholarships: "छात्रवृत्तियाँ",
    career: "करियर",
    assistant: "AI सहायक",
    profile: "मेरी प्रोफ़ाइल",
    accessibility: "सुगम्यता",
    largerText: "बड़ा टेक्स्ट",
    highContrast: "हाई कॉन्ट्रास्ट",
    readAloud: "पढ़कर सुनाएँ",
    english: "English",
    hindi: "हिंदी",
    offline: "ऑफलाइन मोड",
    online: "ऑनलाइन",
    usingCached: "सेव की गई जानकारी का उपयोग हो रहा है",
  },
};

export function AccessibilityProvider({ children }) {
  const [language, setLanguage] = useState(
    localStorage.getItem("scholarmatch_language") || "en"
  );
  const [largeText, setLargeText] = useState(
    localStorage.getItem("scholarmatch_large_text") === "true"
  );
  const [highContrast, setHighContrast] = useState(
    localStorage.getItem("scholarmatch_high_contrast") === "true"
  );

  useEffect(() => {
    document.documentElement.lang = language === "hi" ? "hi" : "en";
    document.body.classList.toggle("large-text-mode", largeText);
    document.body.classList.toggle("high-contrast-mode", highContrast);
    localStorage.setItem("scholarmatch_language", language);
    localStorage.setItem("scholarmatch_large_text", String(largeText));
    localStorage.setItem("scholarmatch_high_contrast", String(highContrast));
  }, [language, largeText, highContrast]);

  const t = (key) => translations[language][key] || translations.en[key] || key;

  const readAloud = (text) => {
    if (!text || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === "hi" ? "hi-IN" : "en-IN";
    window.speechSynthesis.speak(utterance);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        language,
        setLanguage,
        largeText,
        setLargeText,
        highContrast,
        setHighContrast,
        readAloud,
        t,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  return useContext(AccessibilityContext);
}
