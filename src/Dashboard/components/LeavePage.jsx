// LeavePage.jsx
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Spin } from "antd";
import userContext from "../../context/userContext";
import logo from "../../images/logo2.png"

/* ================= Icons ================= */
const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);
const IdIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 3H8a2 2 0 0 0-2 2v2h12V5a2 2 0 0 0-2-2z" />
  </svg>
);
const BuildingIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
  </svg>
);
const BriefcaseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
  </svg>
);
const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.5a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const MapPinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
const ClipboardIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="8" y="2" width="8" height="4" rx="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
  </svg>
);
const HashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="9" x2="20" y2="9" /><line x1="4" y1="15" x2="20" y2="15" />
    <line x1="10" y1="3" x2="8" y2="21" /><line x1="16" y1="3" x2="14" y2="21" />
  </svg>
);
const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);
const LeaveIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#185FA5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
  </svg>
);
const BackIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
  </svg>
);

/* ================= Helpers ================= */
const countDays = (from, to) => {
  if (!from || !to) return "";
  const a = new Date(from);
  const b = new Date(to);
  if (b < a) return "";
  return String(Math.round((b - a) / (1000 * 60 * 60 * 24)) + 1);
};

/* ================= Loading Overlay ================= */
const LoadingOverlay = () => (
  <div style={{
    position: "fixed", inset: 0, zIndex: 9999,
    background: "rgba(255,255,255,0.96)",
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center", gap: "28px",
  }}>
    <style>{`
      @keyframes pulse-logo { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.08);opacity:0.85} }
      @keyframes spin-ring  { to{transform:rotate(360deg)} }
      @keyframes fade-dot   { 0%,80%,100%{opacity:0.2} 40%{opacity:1} }
    `}</style>

    {/* Logo with pulse */}
    <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Spinning ring behind logo */}
      <div style={{
        position: "absolute",
        width: "96px", height: "96px",
        borderRadius: "50%",
        border: "3px solid #E6F1FB",
        borderTopColor: "#185FA5",
        animation: "spin-ring 1.1s linear infinite",
      }} />
      {/* Logo card */}
      <div style={{
        width: "100px", height: "100px", borderRadius: "50px",
        background: "#fff", border: "1px solid rgba(0,0,0,0.08)",
        display: "flex", alignItems: "center", justifyContent: "center",
        animation: "pulse-logo 2s ease-in-out infinite",
        boxShadow: "0 4px 20px rgba(24,95,165,0.12)",
      }}>
        {/* 
          Replace the src below with your actual logo path, e.g.:
          src="/logo.png"  or  src={logo}  after  import logo from "../../assets/logo.png"
        */}
        <img
          src={logo}
          alt="Duronto TV"
          style={{
            width: "100%",      // fill the container fully
            height: "100%",     // fill the container fully
            objectFit: "fill", // scale down proportionally, never crop
            padding: "20px",     // breathing room so logo doesn't touch the edges
            boxSizing: "border-box",
            borderRadius: "10px"
          }}
          onError={e => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
        {/* Fallback text mark — hidden by default */}
        <span style={{
          display: "none", fontSize: "13px", fontWeight: "700",
          color: "#185FA5", letterSpacing: "0.03em", textAlign: "center",
        }}>
          Duronto TV
        </span>
      </div>
    </div>

    {/* Text + animated dots */}
    <div style={{ textAlign: "center" }}>
      <p style={{ margin: "0 0 6px", fontSize: "16px", fontWeight: "500", color: "#111" }}>
        Generating your leave form
      </p>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5px" }}>
        {[0, 0.2, 0.4].map((delay, i) => (
          <span key={i} style={{
            display: "inline-block", width: "6px", height: "6px",
            borderRadius: "50%", background: "#185FA5",
            animation: `fade-dot 1.2s ease-in-out ${delay}s infinite`,
          }} />
        ))}
      </div>
      <p style={{ margin: "10px 0 0", fontSize: "13px", color: "#aaa" }}>
        Please wait, your PDF will download automatically.
      </p>
    </div>
  </div>
);

/* ================= Field Components ================= */
const fieldWrap = { width: "100%", boxSizing: "border-box", minWidth: 0, marginBottom: "16px" };
const inputBase = {
  width: "100%", boxSizing: "border-box", height: "40px",
  border: "1px solid rgba(0,0,0,0.15)", borderRadius: "8px",
  fontSize: "14px", color: "#111", outline: "none", background: "#fff",
};

const InputField = ({ id, name, label, type = "text", placeholder, icon, value, onChange, required, readOnly, disabled, error, step }) => (
  <div style={fieldWrap}>
    <label htmlFor={id} style={{ display: "block", fontSize: "13px", fontWeight: "500", color: "#111", marginBottom: "6px" }}>
      {label}{required && <span style={{ color: "#c0392b", marginLeft: "2px" }}>*</span>}
    </label>
    <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
      {icon && (
        <span style={{ position: "absolute", left: "11px", color: "#aaa", pointerEvents: "none", display: "flex" }}>
          {icon}
        </span>
      )}
      <input
        id={id} name={name || id} type={type} placeholder={placeholder}
        value={value} onChange={onChange} required={required}
        readOnly={readOnly} disabled={disabled} step={step}
        style={{
          ...inputBase,
          paddingLeft: icon ? "38px" : "12px", paddingRight: "12px",
          background: readOnly || disabled ? "#f9f9f8" : "#fff",
          border: error ? "1px solid #c0392b" : "1px solid rgba(0,0,0,0.15)",
        }}
      />
    </div>
    {error && <p style={{ margin: "5px 0 0", fontSize: "12px", color: "#c0392b" }}>{error}</p>}
  </div>
);

const TextareaField = ({ id, name, label, placeholder, value, onChange, required, rows = 3, error }) => (
  <div style={fieldWrap}>
    <label htmlFor={id} style={{ display: "block", fontSize: "13px", fontWeight: "500", color: "#111", marginBottom: "6px" }}>
      {label}{required && <span style={{ color: "#c0392b", marginLeft: "2px" }}>*</span>}
    </label>
    <div style={{ position: "relative" }}>
      <span style={{ position: "absolute", left: "11px", top: "11px", color: "#aaa", pointerEvents: "none", display: "flex" }}>
        <ClipboardIcon />
      </span>
      <textarea
        id={id} name={name || id} value={value} onChange={onChange}
        required={required} rows={rows} placeholder={placeholder}
        style={{
          width: "100%", boxSizing: "border-box", padding: "10px 12px 10px 38px",
          border: error ? "1px solid #c0392b" : "1px solid rgba(0,0,0,0.15)",
          borderRadius: "8px", fontSize: "14px", color: "#111",
          background: "#fff", outline: "none", resize: "vertical",
          lineHeight: "1.6", fontFamily: "inherit",
        }}
      />
    </div>
    {error && <p style={{ margin: "5px 0 0", fontSize: "12px", color: "#c0392b" }}>{error}</p>}
  </div>
);

const RadioGroup = ({ label, name, options, value, onChange, required, error }) => (
  <div style={{ ...fieldWrap, marginBottom: "20px" }}>
    <p style={{ fontSize: "13px", fontWeight: "500", color: "#111", margin: "0 0 10px" }}>
      {label}{required && <span style={{ color: "#c0392b", marginLeft: "2px" }}>*</span>}
    </p>
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
      {options.map((opt) => (
        <label key={opt} style={{
          display: "inline-flex", alignItems: "center", gap: "7px",
          padding: "7px 14px",
          border: `1px solid ${value === opt ? "#185FA5" : (error ? "#c0392b" : "rgba(0,0,0,0.15)")}`,
          borderRadius: "8px", cursor: "pointer",
          background: value === opt ? "#E6F1FB" : "#fff",
          fontSize: "13px", color: value === opt ? "#185FA5" : "#444",
          fontWeight: value === opt ? "500" : "400",
          transition: "all 0.15s", userSelect: "none",
        }}>
          <input
            type="radio" name={name} value={opt}
            checked={value === opt} onChange={onChange}
            style={{ accentColor: "#185FA5", width: "14px", height: "14px", margin: 0 }}
          />
          {opt}
        </label>
      ))}
    </div>
    {error && <p style={{ margin: "6px 0 0", fontSize: "12px", color: "#c0392b" }}>{error}</p>}
  </div>
);

const SectionHeader = ({ title }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "1.5rem 0 1rem" }}>
    <p style={{ margin: 0, fontSize: "12px", fontWeight: "600", color: "#185FA5", textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>
      {title}
    </p>
    <div style={{ flex: 1, height: "1px", background: "rgba(24,95,165,0.15)" }} />
  </div>
);

const gridStyle = (cols) => ({
  display: "grid",
  gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
  gap: "0 20px",
  width: "100%",
  boxSizing: "border-box",
});

/* ================= Validation ================= */
const validate = (formData) => {
  const e = {};
  if (!formData.applicantName.trim()) e.applicantName = "Required.";
  if (!formData.employeeId.trim()) e.employeeId = "Required.";
  if (!formData.designation.trim()) e.designation = "Required.";
  if (!formData.department.trim()) e.department = "Required.";
  if (!formData.date) e.date = "Required.";
  if (!formData.leaveFrom) e.leaveFrom = "Required.";
  if (!formData.leaveTo) e.leaveTo = "Required.";
  if (!formData.leaveDays) e.leaveDays = "Required.";
  if (formData.leaveTo && formData.leaveFrom && new Date(formData.leaveTo) < new Date(formData.leaveFrom))
    e.leaveTo = "End date must be after start date.";
  if (!formData.leaveType) e.leaveType = "Please select a leave type.";
  if (!formData.station.trim()) e.station = "Required.";
  if (!formData.contact.trim()) e.contact = "Required.";
  if (!formData.personInCharge.trim()) e.personInCharge = "Required.";
  if (!formData.reportingTo.trim()) e.reportingTo = "Required.";
  if (!formData.reason.trim()) e.reason = "Required.";
  return e;
};

/* ================= Main Component ================= */
export default function LeavePage() {
  const auth = useContext(userContext);
  const [loading, setLoading] = useState(false);
  const [fetchingUser, setFetchingUser] = useState(true);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false); // track if user tried to submit

  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    date: today,
    applicantName: "", employeeId: "", designation: "", department: "",
    leaveDays: "", leaveFrom: "", leaveTo: "",
    halfDay: "Not Required", leaveType: "",
    availableCasual: "", availableSick: "", availableAnnual: "", availableReplacement: "",
    station: "", contact: "", personInCharge: "", reportingTo: "", reason: "",
  });

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await axios.get(`https://office-utility-webapp-v3-backend.vercel.app/api/users/${auth.userId}`);
        const user = res.data.user;
        setFormData(prev => ({
          ...prev,
          applicantName: user.name || "",
          employeeId: user.employeeId || "",
          designation: user.position || "",
          department: user.department || "",
          contact: user.phone || "",
          date: today,
        }));
      } catch (err) {
        console.error("Error fetching user data:", err);
      } finally {
        setFetchingUser(false);
      }
    };
    if (auth.userId) getUserData();
  }, [auth.userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      // Auto-calculate days when either date changes
      if (name === "leaveFrom" || name === "leaveTo") {
        const from = name === "leaveFrom" ? value : prev.leaveFrom;
        const to = name === "leaveTo" ? value : prev.leaveTo;
        const auto = countDays(from, to);
        if (auto) updated.leaveDays = auto;
      }
      return updated;
    });
    // Re-validate live after first submit attempt
    if (submitted) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const errs = validate(formData);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      // Scroll to first error
      const firstKey = Object.keys(errs)[0];
      document.getElementById(firstKey)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      const res = await axios.post("/api/leaves/generate-form", formData, { responseType: "blob" });
      const blob = res.data;
      if (blob.size === 0) throw new Error("Received empty PDF");
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Leave_Application_${formData.applicantName.replace(/\s+/g, "_")}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (fetchingUser) return <Spin fullscreen />;

  return (
    <>
      <style>{`
        @media (max-width: 640px) {
          .lg2 { grid-template-columns: 1fr !important; }
          .lg3 { grid-template-columns: 1fr !important; }
          .lg4 { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      {/* Branded loading overlay */}
      {loading && <LoadingOverlay />}

      <div style={{ minHeight: "100vh", background: "#f5f5f3", padding: "clamp(12px, 3vw, 32px) 16px", boxSizing: "border-box" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>

          {/* ── Page Header ── */}
          <div style={{ marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "#E6F1FB", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <LeaveIcon />
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: "18px", fontWeight: "500", color: "#111" }}>Leave Application</p>
                  <p style={{ margin: 0, fontSize: "13px", color: "#888" }}>All fields marked <span style={{ color: "#c0392b" }}>*</span> are required before downloading.</p>
                </div>
              </div>
              <button type="button" onClick={() => window.history.back()} style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                height: "36px", padding: "0 14px", background: "#fff",
                border: "1px solid rgba(0,0,0,0.15)", borderRadius: "8px",
                fontSize: "13px", color: "#555", cursor: "pointer",
                fontWeight: "500", flexShrink: 0,
              }}>
                <BackIcon /> Back
              </button>
            </div>
          </div>

          {/* ── Card ── */}
          <div style={{
            background: "#fff", border: "1px solid rgba(0,0,0,0.1)",
            borderRadius: "12px", boxSizing: "border-box", width: "100%",
          }}>
            <form onSubmit={handleSubmit} noValidate style={{ width: "100%", boxSizing: "border-box", padding: "clamp(16px, 4vw, 32px)" }}>

              {/* ── Applicant Details ── */}
              <SectionHeader title="Applicant Details" />
              <div className="lg2" style={gridStyle(2)}>
                <InputField id="applicantName" label="Applicant Name" icon={<UserIcon />}
                  value={formData.applicantName} onChange={handleChange} required readOnly error={errors.applicantName} />
                <InputField id="employeeId" label="Employee ID" icon={<IdIcon />}
                  value={formData.employeeId} onChange={handleChange} required readOnly error={errors.employeeId} />
                <InputField id="designation" label="Designation" icon={<BriefcaseIcon />}
                  value={formData.designation} onChange={handleChange} required readOnly error={errors.designation} />
                <InputField id="department" label="Department" icon={<BuildingIcon />}
                  value={formData.department} onChange={handleChange} required readOnly error={errors.department} />
                <InputField id="date" name="date" label="Application Date" type="date" icon={<CalendarIcon />}
                  value={formData.date} onChange={handleChange} required error={errors.date} />
              </div>

              {/* ── Leave Details ── */}
              <SectionHeader title="Details of Requesting Leave" />
              <div className="lg3" style={gridStyle(3)}>
                <InputField id="leaveFrom" name="leaveFrom" label="From" type="date" icon={<CalendarIcon />}
                  value={formData.leaveFrom} onChange={handleChange} required error={errors.leaveFrom} />
                <InputField id="leaveTo" name="leaveTo" label="To" type="date" icon={<CalendarIcon />}
                  value={formData.leaveTo} onChange={handleChange} required error={errors.leaveTo} />
                <InputField id="leaveDays" name="leaveDays" label="No. of Day(s)" type="number"
                  placeholder="Auto or type e.g. 0.5" icon={<HashIcon />} step="0.5"
                  value={formData.leaveDays} onChange={handleChange} required error={errors.leaveDays} />
              </div>

              {formData.leaveFrom && formData.leaveTo && formData.leaveDays && !errors.leaveTo && (
                <p style={{ margin: "-4px 0 16px", fontSize: "12px", color: "#185FA5" }}>
                  ✓ {formData.leaveDays} day{formData.leaveDays !== "1" ? "s" : ""} — {formData.leaveFrom} to {formData.leaveTo}
                </p>
              )}

              <RadioGroup label="If Half Day" name="halfDay"
                options={["Not Required", "Morning", "Evening"]}
                value={formData.halfDay} onChange={handleChange} />

              <RadioGroup label="Leave Type" name="leaveType"
                options={["Casual", "Sick", "Annual", "Replacement", "Without Pay"]}
                value={formData.leaveType} onChange={handleChange}
                required error={errors.leaveType} />

              {/* ── Available Leave Balance ── */}
              <SectionHeader title="Available Leave Balance" />
              <div className="lg4" style={gridStyle(4)}>
                <InputField id="availableCasual" name="availableCasual" label="Casual" type="number"
                  placeholder="days" icon={<HashIcon />} step="0.5"
                  value={formData.availableCasual} onChange={handleChange} />
                <InputField id="availableSick" name="availableSick" label="Sick" type="number"
                  placeholder="days" icon={<HashIcon />} step="0.5"
                  value={formData.availableSick} onChange={handleChange} />
                <InputField id="availableAnnual" name="availableAnnual" label="Annual" type="number"
                  placeholder="days" icon={<HashIcon />} step="0.5"
                  value={formData.availableAnnual} onChange={handleChange} />
                <InputField id="availableReplacement" name="availableReplacement" label="Replacement" type="number"
                  placeholder="days" icon={<HashIcon />} step="0.5"
                  value={formData.availableReplacement} onChange={handleChange} />
              </div>

              {/* ── Contact & Coverage ── */}
              <SectionHeader title="Contact & Coverage" />
              <div className="lg2" style={gridStyle(2)}>
                <InputField id="station" name="station" label="Station During Leave" placeholder="e.g. Dhaka"
                  icon={<MapPinIcon />} value={formData.station} onChange={handleChange} required error={errors.station} />
                <InputField id="contact" name="contact" label="Contact During Leave" type="tel"
                  placeholder="e.g. 01700000000" icon={<PhoneIcon />}
                  value={formData.contact} onChange={handleChange} required error={errors.contact} />
                <InputField id="personInCharge" name="personInCharge" label="Person In-Charge During Leave"
                  placeholder="Full name" icon={<UserIcon />}
                  value={formData.personInCharge} onChange={handleChange} required error={errors.personInCharge} />
                <InputField id="reportingTo" name="reportingTo" label="Reporting To"
                  placeholder="Full name" icon={<UserIcon />}
                  value={formData.reportingTo} onChange={handleChange} required error={errors.reportingTo} />
              </div>

              {/* ── Reason ── */}
              <SectionHeader title="Reason" />
              <TextareaField id="reason" name="reason" label="Reason of Leave"
                placeholder="Briefly describe your reason for leave..."
                value={formData.reason} onChange={handleChange} required rows={3} error={errors.reason} />

              {/* Summary error banner */}
              {submitted && Object.keys(errors).length > 0 && (
                <div style={{
                  margin: "0 0 16px", padding: "12px 16px",
                  background: "#fff5f5", border: "1px solid #fca5a5",
                  borderRadius: "8px", fontSize: "13px", color: "#c0392b",
                }}>
                  Please fill in all required fields before generating the form.
                </div>
              )}

              {/* ── Submit ── */}
              <button type="submit" disabled={loading} style={{
                width: "100%", height: "40px", marginTop: "4px",
                background: "#185FA5", border: "none", borderRadius: "8px",
                color: "#E6F1FB", fontSize: "14px", fontWeight: "500",
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                opacity: loading ? 0.7 : 1, transition: "opacity 0.2s",
              }}>
                <ArrowRightIcon /> Generate Leave Form
              </button>

            </form>
          </div>

        </div>
      </div>
    </>
  );
}