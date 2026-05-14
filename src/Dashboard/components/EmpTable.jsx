import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

/* ================= Icons ================= */
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const UsersIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#185FA5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const ArrowRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

/* ================= Section Divider ================= */
const SectionHeader = ({ title }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "0 0 1rem" }}>
    <p style={{
      margin: 0, fontSize: "12px", fontWeight: "600", color: "#185FA5",
      textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap",
    }}>
      {title}
    </p>
    <div style={{ flex: 1, height: "1px", background: "rgba(24,95,165,0.15)" }} />
  </div>
);

/* ================= Main Component ================= */
const EmpTable = (props) => {
  const [search, setSearch] = useState("");

  const loadDetails = async (userId) => {
    try {
      const res = await axios.get(`https://office-utility-webapp-v3-backend.vercel.app/api/users/${userId}`);
      console.log("Employee Details:", res.data);
    } catch (error) {
      console.log("Failed to load employee details:", error);
    }
  };

  const filteredEmployees = props.employee.filter((emp) =>
    `${emp.name} ${emp.email}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f3", padding: "clamp(12px, 3vw, 32px) 12px", boxSizing: "border-box" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* ── Page Header ── */}
        <div style={{ marginBottom: "1.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px" }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "8px", background: "#E6F1FB",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <UsersIcon />
            </div>
            <div>
              <p style={{ margin: 0, fontSize: "18px", fontWeight: "500", color: "#111" }}>Employee Directory</p>
              <p style={{ margin: 0, fontSize: "13px", color: "#888" }}>Browse and manage all registered team members.</p>
            </div>
          </div>
        </div>

        {/* ── Card ── */}
        <div style={{
          background: "#fff", border: "1px solid rgba(0,0,0,0.1)",
          borderRadius: "12px", padding: "clamp(12px, 4vw, 32px)", boxSizing: "border-box",
        }}>

          <SectionHeader title="All Employees" />

          {/* Search Row */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
            <div style={{ position: "relative", display: "flex", alignItems: "center", width: "100%", maxWidth: "320px" }}>
              <span style={{ position: "absolute", left: "11px", color: "#aaa", pointerEvents: "none", display: "flex" }}>
                <SearchIcon />
              </span>
              <input
                type="text"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: "100%", boxSizing: "border-box", height: "40px",
                  padding: "0 12px 0 38px",
                  border: "1px solid rgba(0,0,0,0.15)", borderRadius: "8px",
                  fontSize: "14px", color: "#111", outline: "none", background: "#fff",
                }}
              />
            </div>
          </div>

          {/* Table */}
          <div style={{ width: "100%", overflowX: "auto" }}>
            <table style={{ width: "100%", minWidth: "600px", borderCollapse: "collapse" }}>

              {/* Head */}
              <thead>
                <tr style={{ background: "#185FA5" }}>
                  {["Name", "Position", "Email ID", "Action"].map((col, i) => (
                    <th key={col} style={{
                      padding: "12px 16px", textAlign: i === 3 ? "center" : "left",
                      fontSize: "12px", fontWeight: "600", color: "#fff",
                      textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap",
                    }}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Body */}
              <tbody>
                {filteredEmployees.length ? (
                  filteredEmployees.map((emp, idx) => (
                    <tr
                      key={emp._id}
                      style={{
                        borderBottom: "1px solid rgba(0,0,0,0.06)",
                        background: idx % 2 === 0 ? "#fff" : "#fafafa",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = "#F0F7FF"}
                      onMouseLeave={e => e.currentTarget.style.background = idx % 2 === 0 ? "#fff" : "#fafafa"}
                    >
                      <td style={{ padding: "12px 16px", fontSize: "14px", fontWeight: "600", color: "#111" }}>
                        {emp.name}
                      </td>
                      <td style={{ padding: "12px 16px", fontSize: "14px", color: "#555" }}>
                        {emp.position}
                      </td>
                      <td style={{ padding: "12px 16px", fontSize: "14px", color: "#555" }}>
                        {emp.email}
                      </td>
                      <td style={{ padding: "12px 16px", textAlign: "center" }}>
                        <Link
                          to={`/profile/${emp._id}`}
                          onClick={() => loadDetails(emp._id)}
                          style={{
                            display: "inline-flex", alignItems: "center", gap: "6px",
                            padding: "6px 14px", background: "#185FA5", color: "#E6F1FB",
                            borderRadius: "8px", fontSize: "13px", fontWeight: "500",
                            textDecoration: "none", whiteSpace: "nowrap",
                          }}
                        >
                          <ArrowRightIcon />
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ padding: "32px 16px", textAlign: "center" }}>
                      <p style={{ margin: 0, fontSize: "14px", color: "#888" }}>No employee found</p>
                      <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#bbb" }}>Try adjusting your search.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer count */}
          {filteredEmployees.length > 0 && (
            <p style={{ margin: "1rem 0 0", fontSize: "13px", color: "#aaa", textAlign: "right" }}>
              Showing {filteredEmployees.length} of {props.employee.length} employee{props.employee.length !== 1 ? "s" : ""}
            </p>
          )}

        </div>
      </div>
    </div>
  );
};

export default EmpTable;