import React from "react";
import img from "../images/logo2.png";

const WelcomeUI = ({ employee }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good Morning";
    if (hour >= 12 && hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <>
      <style>{`
        @media (max-width: 640px) {
          .welcome-card { flex-direction: column !important; text-align: center !important; }
          .welcome-right { justify-content: center !important; margin-top: 16px !important; }
          .welcome-right img { width: 120px !important; }
        }
      `}</style>

      <div className="welcome-card" style={{
        background: "#fff",
        border: "1px solid rgba(0,0,0,0.1)",
        borderRadius: "12px",
        padding: "clamp(16px, 3vw, 28px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxSizing: "border-box",
        width: "100%",
        marginBottom: "20px",
      }}>

        {/* ── Left ── */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {employee && (
            <p style={{ margin: "0 0 4px", fontSize: "13px", color: "#888" }}>
              Hello,{" "}
              <span style={{ color: "#185FA5", fontWeight: "500" }}>
                {employee.name}
              </span>
            </p>
          )}

          <p style={{ margin: "0 0 6px", fontSize: "24px", fontWeight: "500", color: "#111" }}>
            {getGreeting()} 👋
          </p>

          <p style={{ margin: 0, fontSize: "13px", color: "#888" }}>
            Have a productive and great day ahead.
          </p>
        </div>

        {/* ── Right ── */}
        <div className="welcome-right" style={{
          flex: 1, display: "flex", justifyContent: "flex-end",
        }}>
          <img
            src={img}
            alt="Duronto TV"
            style={{ width: "160px", maxWidth: "100%", objectFit: "contain" }}
          />
        </div>

      </div>
    </>
  );
};

export default WelcomeUI;