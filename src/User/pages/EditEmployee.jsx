import React, { useContext, useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { message, Spin } from "antd";
import axios from "axios";
import userContext from "../../context/userContext";

const API_BASE_URL = "https://office-utility-webapp-v3-backend.vercel.app";

/* ================= Department Data ================= */
const departmentData = {
  Management: {
    positions: ["Managing Director", "Director"],
    employees: {
      "Managing Director": ["Muhammad Sayeed"],
      Director: ["Abhijit Chowdhury"],
    },
  },
  Programme: {
    positions: [
      "Senior General Manager, Programme","Executive Producer","Senior Producer",
      "Senior Script Editor","Producer","Associate Producer","Assistant Producer",
      "Senior Executive, Programme","Executive, Programme","Trainee Executive, Programme","Production Associate",
    ],
    employees: {
      "Senior General Manager, Programme": ["Sunjida Siddique Sumona"],
      "Executive Producer": ["Md. Monirul Hossain (Shipon)"],
      "Senior Producer": ["Farida Aktar Lima","Md. Jamal Hossain (Abir Kiswan)","Partha Protim Halder"],
      "Senior Script Editor": ["Mohammad Monirul Islam Rubel"],
      Producer: ["Mostaque Ahmed Titu","Mehadi Hasan Sadhin"],
      "Associate Producer": ["Diganta Bahar","Amina Nowshin Raisa"],
      "Assistant Producer": ["Shahadat Hussain","Abul Khayer Komal"],
      "Senior Executive, Programme": ["Mohsina Afroz","Md. Abir Ahmed","Sumon Chandra Roy"],
      "Executive, Programme": ["Sabiha Sultana Barsha"],
      "Trainee Executive, Programme": ["Mrittika Abedin"],
      "Production Associate": ["Uuliur Rahman"],
    },
  },
  Music: {
    positions: ["Assistant Producer","Senior Executive, Programme"],
    employees: {
      "Assistant Producer": ["Syed Rifat Ahammad"],
      "Senior Executive, Programme": ["Md. Abir Ahmed","Sumon Chandra Roy"],
    },
  },
  Dubbing: {
    positions: ["Executive Producer","Associate Producer","Assistant Producer"],
    employees: {
      "Executive Producer": ["Abu Bakar Bakul"],
      "Associate Producer": ["Md. Mahbub Alam","Sheyuti Sheen Shahgufta"],
      "Assistant Producer": ["Shajjad Ahmed"],
    },
  },
  "Graphics & Animation": {
    positions: [
      "Chief Graphic Designer","Assistant Chief Animator","Senior Graphic Designer",
      "Senior Executive, Graphics & Animation","Executive, Graphics & Animation","Trainee Executive, Graphics & Animation",
    ],
    employees: {
      "Chief Graphic Designer": ["Mohammad Adnan Sufian"],
      "Assistant Chief Animator": ["Md. Lutfar Rahman"],
      "Senior Graphic Designer": ["Mazharul Hoque","Palash Sarker"],
      "Senior Executive, Graphics & Animation": ["Nafiz Imtiaz","Md. Salman Sobhan","Mahmuda Akhter"],
      "Executive, Graphics & Animation": ["Saahanaz Akther","Sameen Yeasaar","Reshme Mallick","Zohra Islam Juthi","Ashikul Islam","Md. Mostofa Khondokar","Syeda Tasnim Rahman","Purnata Roy"],
      "Trainee Executive, Graphics & Animation": ["Redwan Ahmed","Md. Rowshon Habib","Nusrat Jahan Shaown","Siama Tarannum"],
    },
  },
  "Video Editing": {
    positions: ["Assistant Chief Video Editor","Senior Video Editor","Video Editor","Junior Video Editor"],
    employees: {
      "Assistant Chief Video Editor": ["Md. Naimul Islam","Md. Rokon Uddin","Md. Hossanur Rhaman"],
      "Senior Video Editor": ["Porikhit Kumar Shovon","Hasibul Hossain Santo","H.M Bakir-Ul-Islam","Nasir Uddin Eskander","M. Latif","M. A. Rashid"],
      "Video Editor": ["Foez Ahamed"],
      "Junior Video Editor": ["Indrani Paul"],
    },
  },
  "Broadcast Operation & Engineering": {
    positions: [
      "Senior Manager, BOE","Manager, BOE","Deputy Manager, BOE","Assistant Manager, BOE",
      "Senior Executive, BOE","Executive, BOE","Trainee Executive, BOE","Senior Maintenance Associate","Maintenance Associate",
    ],
    employees: {
      "Senior Manager, BOE": ["Aminul Islam (Rohan)"],
      "Manager, BOE": ["Mufid Islam"],
      "Deputy Manager, BOE": ["Siddiq Ahmed Chowdhury"],
      "Assistant Manager, BOE": ["Md. Nur Alam","Mahmudul Hasan Bulbul","SK. Rakibul Haque Shuvo","Amitav Sarkar"],
      "Senior Executive, BOE": ["Md. Touhidur Rahman","S.R. Hasan","Maisha Radeyah Haque","Isabela Oishee","Syed Maniruzzaman"],
      "Executive, BOE": ["Mahmudul Haque Fahim","Tamasree Kundu","Biplob Bagchi","Rizvi Ahmed","Al-Amin"],
      "Trainee Executive, BOE": ["Md. Asadul Islam","Md. Shakib Monshy"],
      "Senior Maintenance Associate": ["Helal Mia"],
      "Maintenance Associate": ["Md. Hasem Uddin"],
    },
  },
};

/* ================= Icons ================= */
const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const IdIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3H8a2 2 0 0 0-2 2v2h12V5a2 2 0 0 0-2-2z"/>
  </svg>
);
const BuildingIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/>
  </svg>
);
const BriefcaseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
  </svg>
);
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
const MapPinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);
const UploadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
);
const ChevronIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const SaveIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
  </svg>
);
const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const EditIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#185FA5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

/* ================= Field Components ================= */
const fieldWrap = { marginBottom: "1rem", width: "100%", boxSizing: "border-box", minWidth: 0 };
const inputBase = {
  width: "100%", boxSizing: "border-box", height: "40px",
  border: "1px solid rgba(0,0,0,0.15)", borderRadius: "8px",
  fontSize: "14px", color: "#111", outline: "none", background: "#fff",
};

const InputField = ({ id, name, label, type = "text", placeholder, icon, value, onChange, required, readOnly, error }) => (
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
        value={value ?? ""} onChange={onChange} required={required} readOnly={readOnly}
        style={{
          ...inputBase,
          paddingLeft: icon ? "38px" : "12px", paddingRight: "12px",
          background: readOnly ? "#f9f9f8" : "#fff",
          border: error ? "1px solid #c0392b" : "1px solid rgba(0,0,0,0.15)",
        }}
      />
    </div>
    {error && <p style={{ fontSize: "12px", color: "#c0392b", margin: "5px 0 0" }}>{error}</p>}
  </div>
);

const SelectField = ({ id, label, icon, value, onChange, required, options, placeholder, error }) => (
  <div style={fieldWrap}>
    <label htmlFor={id} style={{ display: "block", fontSize: "13px", fontWeight: "500", color: "#111", marginBottom: "6px" }}>
      {label}{required && <span style={{ color: "#c0392b", marginLeft: "2px" }}>*</span>}
    </label>
    <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
      {icon && (
        <span style={{ position: "absolute", left: "11px", color: "#aaa", pointerEvents: "none", display: "flex", zIndex: 1 }}>
          {icon}
        </span>
      )}
      <select
        id={id} value={value ?? ""} onChange={onChange} required={required}
        style={{
          ...inputBase,
          paddingLeft: icon ? "38px" : "12px", paddingRight: "36px",
          border: error ? "1px solid #c0392b" : "1px solid rgba(0,0,0,0.15)",
          appearance: "none", WebkitAppearance: "none", cursor: "pointer",
        }}
      >
        <option value="">{placeholder || "Select"}</option>
        {options?.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
      </select>
      <span style={{ position: "absolute", right: "11px", color: "#aaa", pointerEvents: "none", display: "flex" }}>
        <ChevronIcon />
      </span>
    </div>
    {error && <p style={{ fontSize: "12px", color: "#c0392b", margin: "5px 0 0" }}>{error}</p>}
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

const gridStyle = (cols = 2) => ({
  display: "grid",
  gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
  gap: "0 20px", width: "100%", boxSizing: "border-box",
});

/* ================= Main Component ================= */
const EditEmployee = ({ user: initialUser, changeMode }) => {
  const auth = useContext(userContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});

  // Flatten employees list for lookup
  const allEmployees = useMemo(() => {
    const list = [];
    Object.entries(departmentData).forEach(([dept, info]) => {
      Object.entries(info.employees).forEach(([position, names]) => {
        names.forEach(name => list.push({ name: name.trim(), department: dept, position }));
      });
    });
    return list;
  }, []);

  const [form, setForm] = useState({
    name: "", employeeId: "", dateOfBirth: "", phone: "",
    email: "", address: "", linkedInId: "",
    department: "", customDepartment: "",
    position: "", customPosition: "",
    personInCharge: "", customPersonInCharge: "", personInChargePosition: "", customPersonInChargePosition: "",
    reportingTo: "", customReportingTo: "", reportingToPosition: "", customReportingToPosition: "",
  });

  // Pre-fill from user prop
  useEffect(() => {
    if (!initialUser) return;
    const dob = initialUser.dateOfBirth?.split("T")[0] ?? "";

    // Detect if current dept/position are in the known lists
    const knownDepts   = Object.keys(departmentData);
    const dept         = knownDepts.includes(initialUser.department) ? initialUser.department : "Other (Type manually)";
    const knownPositions = dept !== "Other (Type manually)" ? departmentData[dept]?.positions ?? [] : [];
    const pos          = knownPositions.includes(initialUser.position) ? initialUser.position : "Other (Type manually)";

    const deptEmployees = dept !== "Other (Type manually)"
      ? Object.entries(departmentData[dept].employees).flatMap(([, names]) => names.map(n => n.trim()))
      : [];

    const pic     = deptEmployees.includes(initialUser.personInCharge)   ? initialUser.personInCharge   : initialUser.personInCharge   ? "Other (Type manually)" : "";
    const repTo   = deptEmployees.includes(initialUser.reportingTo)      ? initialUser.reportingTo      : initialUser.reportingTo      ? "Other (Type manually)" : "";

    setForm({
      name:                       initialUser.name                      ?? "",
      employeeId:                 initialUser.employeeId                ?? "",
      dateOfBirth:                dob,
      phone:                      initialUser.phone                     ?? "",
      email:                      initialUser.email                     ?? "",
      address:                    initialUser.address                   ?? "",
      linkedInId:                 initialUser.linkedInId                ?? "",
      department:                 dept,
      customDepartment:           dept === "Other (Type manually)"      ? initialUser.department         ?? "" : "",
      position:                   pos,
      customPosition:             pos  === "Other (Type manually)"      ? initialUser.position           ?? "" : "",
      personInCharge:             pic,
      customPersonInCharge:       pic  === "Other (Type manually)"      ? initialUser.personInCharge     ?? "" : "",
      personInChargePosition:     initialUser.personInChargePosition    ?? "",
      customPersonInChargePosition: pic === "Other (Type manually)"     ? initialUser.personInChargePosition ?? "" : "",
      reportingTo:                repTo,
      customReportingTo:          repTo === "Other (Type manually)"     ? initialUser.reportingTo        ?? "" : "",
      reportingToPosition:        initialUser.reportingToPosition       ?? "",
      customReportingToPosition:  repTo === "Other (Type manually)"     ? initialUser.reportingToPosition ?? "" : "",
    });
  }, [initialUser]);

  const set = (field) => (e) => {
    const value = e.target.value;
    setForm(prev => {
      const next = { ...prev, [field]: value };

      // Reset dependents when department changes
      if (field === "department") {
        Object.assign(next, {
          position: "", customPosition: "",
          personInCharge: "", customPersonInCharge: "", personInChargePosition: "", customPersonInChargePosition: "",
          reportingTo: "", customReportingTo: "", reportingToPosition: "", customReportingToPosition: "",
        });
      }

      // Auto-fill position for known person in charge
      if (field === "personInCharge" && value !== "Other (Type manually)") {
        const emp = allEmployees.find(e => e.name === value);
        if (emp) next.personInChargePosition = emp.position;
        next.customPersonInCharge = "";
        next.customPersonInChargePosition = "";
      }

      // Auto-fill position for known reporting-to
      if (field === "reportingTo" && value !== "Other (Type manually)") {
        const emp = allEmployees.find(e => e.name === value);
        if (emp) next.reportingToPosition = emp.position;
        next.customReportingTo = "";
        next.customReportingToPosition = "";
      }

      return next;
    });
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  // Derived option lists
  const departmentOptions = useMemo(() => [...Object.keys(departmentData), "Other (Type manually)"], []);

  const positionOptions = useMemo(() => {
    if (!form.department || form.department === "Other (Type manually)") return ["Other (Type manually)"];
    return [...(departmentData[form.department]?.positions ?? []), "Other (Type manually)"];
  }, [form.department]);

  const deptEmployeeNames = useMemo(() => {
    if (!form.department || form.department === "Other (Type manually)") return ["Other (Type manually)"];
    const names = Object.values(departmentData[form.department]?.employees ?? {}).flat().map(n => n.trim());
    return [...names.sort(), "Other (Type manually)"];
  }, [form.department]);

  // Image picker
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      return message.error("Only JPG/PNG files are allowed.");
    }
    if (file.size / 1024 / 1024 > 2) {
      return message.error("Image must be smaller than 2MB.");
    }
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  // Validation
  const validate = () => {
    const e = {};
    if (!form.name.trim())       e.name       = "Required.";
    if (!form.employeeId.trim()) e.employeeId = "Required.";
    if (!form.email.trim())      e.email      = "Required.";
    if (!form.phone.trim())      e.phone      = "Required.";
    if (!form.department)        e.department = "Required.";
    if (!form.position)          e.position   = "Required.";
    if (form.department === "Other (Type manually)" && !form.customDepartment.trim()) e.customDepartment = "Required.";
    if (form.position   === "Other (Type manually)" && !form.customPosition.trim())   e.customPosition   = "Required.";
    if (!form.personInCharge)    e.personInCharge = "Required.";
    if (form.personInCharge === "Other (Type manually)" && !form.customPersonInCharge.trim()) e.customPersonInCharge = "Required.";
    if (!form.reportingTo)       e.reportingTo = "Required.";
    if (form.reportingTo === "Other (Type manually)" && !form.customReportingTo.trim()) e.customReportingTo = "Required.";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      const firstKey = Object.keys(errs)[0];
      document.getElementById(firstKey)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("name",                   form.name);
      fd.append("employeeId",             form.employeeId);
      fd.append("email",                  form.email);
      fd.append("phone",                  form.phone);
      fd.append("address",                form.address);
      fd.append("linkedInId",             form.linkedInId);
      fd.append("dateOfBirth",            form.dateOfBirth);
      fd.append("department",             form.department === "Other (Type manually)" ? form.customDepartment : form.department);
      fd.append("position",               form.position   === "Other (Type manually)" ? form.customPosition   : form.position);
      fd.append("personInCharge",         form.personInCharge === "Other (Type manually)" ? form.customPersonInCharge : form.personInCharge);
      fd.append("personInChargePosition", form.personInCharge === "Other (Type manually)" ? form.customPersonInChargePosition : form.personInChargePosition);
      fd.append("reportingTo",            form.reportingTo === "Other (Type manually)" ? form.customReportingTo : form.reportingTo);
      fd.append("reportingToPosition",    form.reportingTo === "Other (Type manually)" ? form.customReportingToPosition : form.reportingToPosition);
      if (imageFile) fd.append("image", imageFile);

      await axios.patch(`${API_BASE_URL}/api/users/editEmployee/${initialUser._id}`, fd, {
        headers: { Authorization: "Bearer " + auth.token },
      });
      message.success("Profile updated successfully.");
      changeMode?.();
      navigate(`/profile/${initialUser._id}`);
    } catch (err) {
      message.error(err.response?.data?.message || "Could not update. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!initialUser) return <Spin fullscreen />;

  return (
    <>
      <style>{`
        @media (max-width: 640px) {
          .edit-grid-2 { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#f5f5f3", padding: "clamp(12px, 3vw, 32px) 12px", boxSizing: "border-box" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>

          {/* ── Page Header ── */}
          <div style={{ marginBottom: "1.75rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "#E6F1FB", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <EditIcon />
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: "18px", fontWeight: "500", color: "#111" }}>Edit Employee</p>
                  <p style={{ margin: 0, fontSize: "13px", color: "#888" }}>Update the details for {initialUser.name}.</p>
                </div>
              </div>
              <button type="button" onClick={changeMode} style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                height: "36px", padding: "0 14px", background: "#fff",
                border: "1px solid rgba(0,0,0,0.15)", borderRadius: "8px",
                fontSize: "13px", color: "#555", cursor: "pointer", fontWeight: "500", flexShrink: 0,
              }}>
                <XIcon /> Cancel
              </button>
            </div>
          </div>

          {/* ── Card ── */}
          <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "12px", boxSizing: "border-box", width: "100%" }}>
            <form onSubmit={handleSubmit} noValidate style={{ width: "100%", boxSizing: "border-box", padding: "clamp(16px, 4vw, 32px)" }}>

              {/* ── Personal Information ── */}
              <SectionHeader title="Personal Information" />
              <div className="edit-grid-2" style={gridStyle(2)}>
                <InputField id="name"        label="Full Name"     icon={<UserIcon />}     value={form.name}        onChange={set("name")}        required placeholder="e.g. Md. Rafiqul Islam" error={errors.name} />
                <InputField id="employeeId"  label="Employee ID"   icon={<IdIcon />}       value={form.employeeId}  onChange={set("employeeId")}  required placeholder="e.g. DTV-042"           error={errors.employeeId} />
                <InputField id="dateOfBirth" label="Date of Birth" icon={<CalendarIcon />} value={form.dateOfBirth} onChange={set("dateOfBirth")} type="date" />
                <InputField id="phone"       label="Phone Number"  icon={<PhoneIcon />}    value={form.phone}       onChange={set("phone")}       required type="tel" placeholder="e.g. 01700000000" error={errors.phone} />
                <InputField id="address"     label="Address"       icon={<MapPinIcon />}   value={form.address}     onChange={set("address")}     placeholder="e.g. Dhaka, Bangladesh" />
                <InputField id="linkedInId"  label="LinkedIn ID"   icon={<LinkedInIcon />} value={form.linkedInId}  onChange={set("linkedInId")}  placeholder="e.g. md-rafiqul-islam" />
              </div>

              {/* ── Account ── */}
              <SectionHeader title="Account" />
              <div className="edit-grid-2" style={gridStyle(2)}>
                <InputField id="email" label="Email Address" icon={<MailIcon />} value={form.email} onChange={set("email")} required type="email" placeholder="firstname.lastname@duronto.tv" error={errors.email} />
              </div>

              {/* ── Department & Role ── */}
              <SectionHeader title="Department & Role" />
              <div className="edit-grid-2" style={gridStyle(2)}>
                <SelectField id="department" label="Department" icon={<BuildingIcon />} value={form.department}
                  onChange={set("department")} required options={departmentOptions}
                  placeholder="Select department" error={errors.department} />
                <SelectField id="position" label="Position" icon={<BriefcaseIcon />} value={form.position}
                  onChange={set("position")} required options={positionOptions}
                  placeholder="Select position" error={errors.position} />
                {form.department === "Other (Type manually)" && (
                  <InputField id="customDepartment" label="Custom Department" icon={<BuildingIcon />}
                    value={form.customDepartment} onChange={set("customDepartment")}
                    required placeholder="Type department name" error={errors.customDepartment} />
                )}
                {form.position === "Other (Type manually)" && (
                  <InputField id="customPosition" label="Custom Position" icon={<BriefcaseIcon />}
                    value={form.customPosition} onChange={set("customPosition")}
                    required placeholder="Type position title" error={errors.customPosition} />
                )}
              </div>

              {/* ── Reporting Structure ── */}
              <SectionHeader title="Reporting Structure" />
              <div className="edit-grid-2" style={gridStyle(2)}>
                {/* Person In-Charge */}
                <div style={{ minWidth: 0 }}>
                  <SelectField id="personInCharge" label="Person In-Charge" icon={<UserIcon />}
                    value={form.personInCharge} onChange={set("personInCharge")}
                    required options={deptEmployeeNames}
                    placeholder="Select person" error={errors.personInCharge} />
                  {form.personInCharge === "Other (Type manually)" ? (
                    <>
                      <InputField id="customPersonInCharge" label="Custom Person In-Charge"
                        icon={<UserIcon />} value={form.customPersonInCharge}
                        onChange={set("customPersonInCharge")} required
                        placeholder="Full name" error={errors.customPersonInCharge} />
                      <InputField id="customPersonInChargePosition" label="Their Position"
                        icon={<BriefcaseIcon />} value={form.customPersonInChargePosition}
                        onChange={set("customPersonInChargePosition")} placeholder="Position title" />
                    </>
                  ) : form.personInCharge && (
                    <InputField id="personInChargePosition" label="Person In-Charge Position"
                      icon={<BriefcaseIcon />} value={form.personInChargePosition}
                      onChange={set("personInChargePosition")} readOnly />
                  )}
                </div>

                {/* Reporting To */}
                <div style={{ minWidth: 0 }}>
                  <SelectField id="reportingTo" label="Reporting To" icon={<UserIcon />}
                    value={form.reportingTo} onChange={set("reportingTo")}
                    required options={deptEmployeeNames}
                    placeholder="Select person" error={errors.reportingTo} />
                  {form.reportingTo === "Other (Type manually)" ? (
                    <>
                      <InputField id="customReportingTo" label="Custom Reporting To"
                        icon={<UserIcon />} value={form.customReportingTo}
                        onChange={set("customReportingTo")} required
                        placeholder="Full name" error={errors.customReportingTo} />
                      <InputField id="customReportingToPosition" label="Their Position"
                        icon={<BriefcaseIcon />} value={form.customReportingToPosition}
                        onChange={set("customReportingToPosition")} placeholder="Position title" />
                    </>
                  ) : form.reportingTo && (
                    <InputField id="reportingToPosition" label="Reporting To Position"
                      icon={<BriefcaseIcon />} value={form.reportingToPosition}
                      onChange={set("reportingToPosition")} readOnly />
                  )}
                </div>
              </div>

              {/* ── Profile Photo ── */}
              <SectionHeader title="Profile Photo" />
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "1rem", flexWrap: "wrap" }}>
                {/* Preview */}
                <div style={{
                  width: "64px", height: "64px", borderRadius: "10px",
                  border: "1px solid rgba(0,0,0,0.12)", overflow: "hidden",
                  background: "#f9f9f8", flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {previewUrl || initialUser.image ? (
                    <img
                      src={previewUrl || `${API_BASE_URL}/${initialUser.image}`}
                      alt="Preview"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <span style={{ color: "#ccc", display: "flex" }}><UserIcon /></span>
                  )}
                </div>

                {/* Upload trigger */}
                <label htmlFor="photo-upload" style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  height: "40px", padding: "0 16px",
                  border: "1px dashed rgba(0,0,0,0.2)", borderRadius: "8px",
                  fontSize: "13px", color: "#555", fontWeight: "500",
                  cursor: "pointer", background: "#fafafa",
                }}>
                  <UploadIcon /> Choose Photo
                </label>
                <input id="photo-upload" type="file" accept="image/jpeg,image/jpg,image/png"
                  onChange={handleImageChange} style={{ display: "none" }} />

                <p style={{ margin: 0, fontSize: "12px", color: "#aaa" }}>
                  JPG or PNG, max 2MB
                </p>
              </div>

              {/* ── Action Buttons ── */}
              <div style={{ display: "flex", gap: "12px", marginTop: "1.5rem" }}>
                <button type="submit" disabled={loading} style={{
                  flex: 1, height: "40px", background: loading ? "#a0b4c8" : "#185FA5",
                  border: "none", borderRadius: "8px", color: "#E6F1FB",
                  fontSize: "14px", fontWeight: "500",
                  cursor: loading ? "not-allowed" : "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                  transition: "background 0.2s",
                }}>
                  {loading ? (
                    <div style={{ width: "14px", height: "14px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                  ) : <SaveIcon />}
                  {loading ? "Saving…" : "Save Changes"}
                </button>

                <button type="button" onClick={changeMode} style={{
                  height: "40px", padding: "0 20px",
                  background: "#fff", border: "1px solid rgba(0,0,0,0.15)",
                  borderRadius: "8px", fontSize: "14px", fontWeight: "500",
                  color: "#555", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: "6px",
                }}>
                  <XIcon /> Cancel
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
};

export default EditEmployee;