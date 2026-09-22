import { useEffect, useState } from "react";
import { useAccessibility } from "../context/AccessibilityContext";

function OfflineIndicator() {
  const [online, setOnline] = useState(navigator.onLine);
  const { t } = useAccessibility();

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div className={`offline-indicator ${online ? "online" : "offline"}`} role="status">
      <span className="offline-dot" />
      <strong>{online ? `🟢 ${t("online")}` : `🟠 ${t("offline")}`}</strong>
      {!online && <span>{t("usingCached")}</span>}
    </div>
  );
}

export default OfflineIndicator;
