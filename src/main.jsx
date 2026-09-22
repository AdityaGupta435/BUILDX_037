import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Register Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const registration = await navigator.serviceWorker.register(
        "/sw.js",
        {
          updateViaCache: "none",
        }
      );

      console.log(
        "ScholarMatch Service Worker registered:",
        registration.scope
      );

      // Check for a newer service worker
      registration.update();

    } catch (error) {
      console.error(
        "ScholarMatch service worker registration failed:",
        error
      );
    }
  });
}