import React from "react";
import { Spin } from "antd";
import ChartUI from "../../UI/ChartUI";

/* ================= Icons ================= */
const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#185FA5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const BriefcaseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
  </svg>
);
const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const MapPinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

/* ================= List Item ================= */
const ListItem = ({ icon, title, value }) => (
  <div style={{
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "12px 0", borderBottom: "1px solid rgba(0,0,0,0.06)",
    gap: "12px", flexWrap: "wrap",
  }}>
    {/* Label */}
    <div style={{
      display: "flex", alignItems: "center", gap: "8px",
      fontSize: "13px", fontWeight: "500", color: "#555", flexShrink: 0,
    }}>
      <span style={{ color: "#aaa", display: "flex" }}>{icon}</span>
      {title}
    </div>

    {/* Value */}
    <div style={{ fontSize: "14px", textAlign: "right", wordBreak: "break-word" }}>
      {value
        ? <span style={{ fontWeight: "500", color: "#111" }}>{value}</span>
        : <span style={{ color: "#bbb", fontStyle: "italic" }}>Not provided</span>
      }
    </div>
  </div>
);

/* ================= Main Component ================= */
const ProfileDetails = ({ user }) => (
  <div style={{
    background: "#fff", border: "1px solid rgba(0,0,0,0.1)",
    borderRadius: "12px", padding: "20px 24px", boxSizing: "border-box", width: "100%",
  }}>
    {user ? (
      <>
        {/* Section Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
          <div style={{
            width: "32px", height: "32px", borderRadius: "8px", background: "#E6F1FB",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <UserIcon />
          </div>
          <div>
            <p style={{ margin: 0, fontSize: "15px", fontWeight: "500", color: "#111" }}>Personal Details</p>
            <p style={{ margin: 0, fontSize: "12px", color: "#888" }}>Basic information and profile data</p>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "rgba(24,95,165,0.1)", margin: "14px 0" }} />

        {/* Items */}
        <ListItem icon={<UserIcon />}       title="Full Name"      value={user.name} />
        <ListItem icon={<BriefcaseIcon />}  title="Position"       value={user.position} />
        <ListItem icon={<CalendarIcon />}   title="Date of Birth"  value={user.dateOfBirth?.split("T")[0]} />
        <ListItem icon={<MapPinIcon />}     title="Address"        value={user.address} />

        {/* Leave Chart */}
        {user.leaveDate && (
          <>
            <div style={{ height: "1px", background: "rgba(24,95,165,0.1)", margin: "20px 0 16px" }} />
            <p style={{ margin: "0 0 12px", fontSize: "12px", fontWeight: "600", color: "#185FA5", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Leave History
            </p>
            <ChartUI leaves={user.leaveDate} />
          </>
        )}
      </>
    ) : (
      <div style={{ display: "flex", justifyContent: "center", padding: "24px 0" }}>
        <Spin />
      </div>
    )}
  </div>
);

export default ProfileDetails;