import React from "react";
import { Spin } from "antd";

/* ================= Icons ================= */
const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);
const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.5a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);
const ShareIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#185FA5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
  </svg>
);

/* ================= List Item ================= */
const ListItem = ({ icon, title, value, isLink, linkPrefix }) => (
  <div style={{
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "12px 0", borderBottom: "1px solid rgba(0,0,0,0.06)",
    gap: "12px", flexWrap: "wrap",
  }}>
    {/* Label */}
    <div style={{
      display: "flex", alignItems: "center", gap: "8px",
      fontSize: "13px", fontWeight: "500", color: "#555",
      flexShrink: 0,
    }}>
      <span style={{ color: "#aaa", display: "flex" }}>{icon}</span>
      {title}
    </div>

    {/* Value */}
    <div style={{ fontSize: "14px", color: "#111", wordBreak: "break-all", textAlign: "right" }}>
      {value
        ? isLink
          ? <a href={`${linkPrefix}${value}`} target="_blank" rel="noreferrer"
              style={{ color: "#185FA5", textDecoration: "none", fontWeight: "500" }}>
              {value}
            </a>
          : <span style={{ fontWeight: "500" }}>{value}</span>
        : <span style={{ color: "#bbb", fontStyle: "italic" }}>Not provided</span>
      }
    </div>
  </div>
);

/* ================= Main Component ================= */
const ProfileLinks = ({ user }) => (
  <div style={{
    background: "#fff", border: "1px solid rgba(0,0,0,0.1)",
    borderRadius: "12px", padding: "20px 24px", boxSizing: "border-box",
  }}>
    {user ? (
      <>
        {/* Section Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
          <div style={{
            width: "32px", height: "32px", borderRadius: "8px", background: "#E6F1FB",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <ShareIcon />
          </div>
          <div>
            <p style={{ margin: 0, fontSize: "15px", fontWeight: "500", color: "#111" }}>Social Profiles</p>
            <p style={{ margin: 0, fontSize: "12px", color: "#888" }}>Contact and social links</p>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "rgba(24,95,165,0.1)", margin: "14px 0" }} />

        {/* Items */}
        <ListItem icon={<MailIcon />}     title="Email"        value={user.email}      isLink linkPrefix="mailto:" />
        <ListItem icon={<LinkedInIcon />} title="LinkedIn"     value={user.linkedInId} isLink linkPrefix="https://linkedin.com/in/" />
        <ListItem icon={<PhoneIcon />}    title="Phone Number" value={user.phone}      isLink linkPrefix="tel:" />
      </>
    ) : (
      <div style={{ display: "flex", justifyContent: "center", padding: "24px 0" }}>
        <Spin />
      </div>
    )}
  </div>
);

export default ProfileLinks;