import { useContext, useEffect, useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import userContext from "../context/userContext";
import logo from "../images/logo2.png";

/* ================= Icons ================= */
const LeaveIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const ProfileIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const HomeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const ChevronDownIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const LogOutIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);
const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);
const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

/* ================= Nav Link ================= */
const NavLink = ({ to, icon, label, active }) => (
  <Link to={to} style={{
    display: "inline-flex", alignItems: "center", gap: "7px",
    padding: "7px 12px", borderRadius: "8px", textDecoration: "none",
    fontSize: "13px", fontWeight: "500",
    color: active ? "#185FA5" : "rgba(255,255,255,0.85)",
    background: active ? "#fff" : "transparent",
    transition: "all 0.15s",
  }}
    onMouseEnter={e => { if (!active) e.currentTarget.style.background = "rgba(255,255,255,0.12)"; }}
    onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}
  >
    {icon}{label}
  </Link>
);

/* ================= Mobile Nav Link ================= */
const MobileNavLink = ({ to, icon, label, active, onClick }) => (
  <Link to={to} onClick={onClick} style={{
    display: "flex", alignItems: "center", gap: "10px",
    padding: "11px 16px", borderRadius: "8px", textDecoration: "none",
    fontSize: "14px", fontWeight: "500",
    color: active ? "#185FA5" : "#333",
    background: active ? "#E6F1FB" : "transparent",
    transition: "background 0.15s",
  }}
    onMouseEnter={e => { if (!active) e.currentTarget.style.background = "#f5f5f3"; }}
    onMouseLeave={e => { if (!active) e.currentTarget.style.background = active ? "#E6F1FB" : "transparent"; }}
  >
    <span style={{ color: active ? "#185FA5" : "#888", display: "flex" }}>{icon}</span>
    {label}
  </Link>
);

/* ================= Main Component ================= */
function MainNav() {
  const authUser   = useContext(userContext);
  const navigate   = useNavigate();
  const location   = useLocation();
  const [menuOpen, setMenuOpen]       = useState(false);
  const [dropOpen, setDropOpen]       = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    if (!authUser.isLoggedIn) navigate("/login");
  }, [authUser.isLoggedIn, navigate]);

  useEffect(() => { authUser.getUserData(); }, [authUser]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  const isActive = (path) => location.pathname === path;
  const initials = authUser.currentUser?.name
    ?.split(" ").filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join("") ?? "?";

  return (
    <>
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ── Navbar ── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "#185FA5",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 2px 12px rgba(24,95,165,0.18)",
      }}>
        <div style={{
          maxWidth: "1200px", margin: "0 auto",
          padding: "0 clamp(12px, 3vw, 24px)",
          height: "56px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: "16px",
        }}>

          {/* ── Brand ── */}
          <Link to={authUser.isLoggedIn ? "/" : "/login"} style={{
            display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", flexShrink: 0,
          }}>
            <div style={{
              width: "32px", height: "32px", borderRadius: "7px",
              background: "#fff", padding: "3px", boxSizing: "border-box",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <img src={logo} alt="DEMS" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
            <span style={{ fontSize: "15px", fontWeight: "600", color: "#fff", letterSpacing: "0.02em" }}>
              TeamDuronto
            </span>
          </Link>

          {/* ── Desktop Links ── */}
          {authUser.isLoggedIn && (
            <div style={{ display: "flex", alignItems: "center", gap: "4px", flex: 1 }}
              className="desktop-nav">
              <NavLink to="/"                                icon={<HomeIcon />}    label="Home"        active={isActive("/")} />
              <NavLink to={`/ask-for-leave/${authUser.userId}`} icon={<LeaveIcon />}   label="Apply Leave" active={isActive(`/ask-for-leave/${authUser.userId}`)} />
              <NavLink to={`/profile/${authUser.userId}`}   icon={<ProfileIcon />} label="Profile"     active={isActive(`/profile/${authUser.userId}`)} />
            </div>
          )}

          {/* ── Right Side ── */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>

            {/* User dropdown — desktop */}
            {authUser.token && authUser.currentUser && (
              <div ref={dropRef} style={{ position: "relative" }} className="desktop-nav">
                <button onClick={() => setDropOpen(p => !p)} style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  height: "36px", padding: "0 12px",
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "8px", cursor: "pointer",
                  color: "#fff", fontSize: "13px", fontWeight: "500",
                  transition: "background 0.15s",
                }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}
                >
                  {/* Avatar initials */}
                  <div style={{
                    width: "24px", height: "24px", borderRadius: "50%",
                    background: "#E6F1FB", color: "#185FA5",
                    fontSize: "11px", fontWeight: "700",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    {initials}
                  </div>
                  <span style={{ maxWidth: "120px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {authUser.currentUser.name}
                  </span>
                  <span style={{ opacity: 0.7, display: "flex", transition: "transform 0.2s", transform: dropOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                    <ChevronDownIcon />
                  </span>
                </button>

                {/* Dropdown panel */}
                {dropOpen && (
                  <div style={{
                    position: "absolute", top: "calc(100% + 8px)", right: 0,
                    minWidth: "200px", background: "#fff",
                    border: "1px solid rgba(0,0,0,0.1)", borderRadius: "10px",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                    overflow: "hidden", animation: "slideDown 0.15s ease",
                  }}>
                    {/* User info */}
                    <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
                      <p style={{ margin: 0, fontSize: "13px", fontWeight: "500", color: "#111" }}>
                        {authUser.currentUser.name}
                      </p>
                      <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#888" }}>
                        {authUser.currentUser.position ?? "Employee"}
                      </p>
                    </div>

                    {/* Log out */}
                    <button onClick={() => { setDropOpen(false); authUser.logout(); }} style={{
                      width: "100%", padding: "10px 16px",
                      display: "flex", alignItems: "center", gap: "8px",
                      background: "none", border: "none", cursor: "pointer",
                      fontSize: "13px", fontWeight: "500", color: "#c0392b",
                      textAlign: "left", transition: "background 0.15s",
                    }}
                      onMouseEnter={e => e.currentTarget.style.background = "#fff5f5"}
                      onMouseLeave={e => e.currentTarget.style.background = "none"}
                    >
                      <LogOutIcon /> Log Out
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile hamburger */}
            <button onClick={() => setMenuOpen(p => !p)} style={{
              display: "none", alignItems: "center", justifyContent: "center",
              width: "36px", height: "36px", background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.2)", borderRadius: "8px",
              cursor: "pointer", color: "#fff",
            }} className="mobile-menu-btn">
              {menuOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        {menuOpen && (
          <div style={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            background: "#fff",
            padding: "12px",
            animation: "slideDown 0.15s ease",
          }}>
            {authUser.isLoggedIn && (
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <MobileNavLink to="/"                                    icon={<HomeIcon />}    label="Home"        active={isActive("/")}                                       onClick={() => setMenuOpen(false)} />
                <MobileNavLink to={`/ask-for-leave/${authUser.userId}`}  icon={<LeaveIcon />}   label="Apply Leave" active={isActive(`/ask-for-leave/${authUser.userId}`)}       onClick={() => setMenuOpen(false)} />
                <MobileNavLink to={`/profile/${authUser.userId}`}        icon={<ProfileIcon />} label="Profile"     active={isActive(`/profile/${authUser.userId}`)}             onClick={() => setMenuOpen(false)} />
              </div>
            )}

            {/* Mobile user info + logout */}
            {authUser.token && authUser.currentUser && (
              <>
                <div style={{ height: "1px", background: "rgba(0,0,0,0.07)", margin: "10px 0" }} />
                <div style={{ padding: "8px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <p style={{ margin: 0, fontSize: "13px", fontWeight: "500", color: "#111" }}>
                      {authUser.currentUser.name}
                    </p>
                    <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#888" }}>
                      {authUser.currentUser.position ?? "Employee"}
                    </p>
                  </div>
                  <button onClick={() => { setMenuOpen(false); authUser.logout(); }} style={{
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    height: "34px", padding: "0 12px",
                    background: "#fff5f5", border: "1px solid #fca5a5",
                    borderRadius: "8px", cursor: "pointer",
                    fontSize: "13px", fontWeight: "500", color: "#c0392b",
                  }}>
                    <LogOutIcon /> Log Out
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </nav>

      {/* Hide/show helpers */}
      <style>{`
        .desktop-nav { display: flex !important; }
        .mobile-menu-btn { display: none !important; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}

export default MainNav;