import React, { useContext, useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { message } from "antd";
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
const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
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
const ChevronIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);
const EyeOffIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);
const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

/* ================= Shared Field Components ================= */

// Text / email / tel / date input
const InputField = ({ id, label, type = "text", placeholder, icon, register, errors, required, readOnly, disabled, children }) => (
  <div style={{ marginBottom: "1rem", width: "100%", boxSizing: "border-box", minWidth: 0 }}>
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
        id={id}
        type={type}
        placeholder={placeholder}
        readOnly={readOnly}
        disabled={disabled}
        style={{
          width: "100%", boxSizing: "border-box", height: "40px",
          padding: icon ? "0 38px" : "0 12px",
          paddingRight: children ? "38px" : (icon ? "38px" : "12px"),
          border: errors ? "1px solid #c0392b" : "1px solid rgba(0,0,0,0.15)",
          borderRadius: "8px", fontSize: "14px", color: "#111",
          background: readOnly || disabled ? "#f9f9f8" : "#fff", outline: "none",
        }}
        {...register(id, { required: required && "This field is required." })}
      />
      {children}
    </div>
    {errors?.message && (
      <p style={{ fontSize: "12px", color: "#c0392b", margin: "5px 0 0" }}>{errors.message}</p>
    )}
  </div>
);

// Select dropdown
const SelectField = ({ id, label, icon, register, errors, required, options, placeholder }) => (
  <div style={{ marginBottom: "1rem", width: "100%", boxSizing: "border-box", minWidth: 0 }}>
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
        id={id}
        style={{
          width: "100%", boxSizing: "border-box", height: "40px",
          padding: icon ? "0 36px 0 38px" : "0 36px 0 12px",
          border: errors ? "1px solid #c0392b" : "1px solid rgba(0,0,0,0.15)",
          borderRadius: "8px", fontSize: "14px", color: "#111",
          background: "#fff", outline: "none",
          appearance: "none", WebkitAppearance: "none", cursor: "pointer",
        }}
        {...register(id, { required: required && "This field is required." })}
      >
        <option value="">{placeholder || "Select"}</option>
        {options?.map((opt, i) => (
          <option key={i} value={opt}>{opt}</option>
        ))}
      </select>
      <span style={{ position: "absolute", right: "11px", color: "#aaa", pointerEvents: "none", display: "flex" }}>
        <ChevronIcon />
      </span>
    </div>
    {errors?.message && (
      <p style={{ fontSize: "12px", color: "#c0392b", margin: "5px 0 0" }}>{errors.message}</p>
    )}
  </div>
);

// Section divider
const SectionHeader = ({ title }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "1.5rem 0 1rem" }}>
    <p style={{ margin: 0, fontSize: "12px", fontWeight: "600", color: "#185FA5", textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>
      {title}
    </p>
    <div style={{ flex: 1, height: "1px", background: "rgba(24,95,165,0.15)" }} />
  </div>
);

/* ================= Main Component ================= */
const NewUser = () => {
  const authUser = useContext(userContext) || {};
  const [allEmployees, setAllEmployees] = useState([]);
  const [employeesByDepartment, setEmployeesByDepartment] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const employeesList = [];
    const deptEmployees = {};
    Object.entries(departmentData).forEach(([dept, deptInfo]) => {
      deptEmployees[dept] = [];
      Object.entries(deptInfo.employees).forEach(([position, names]) => {
        names.forEach(name => {
          const obj = { name: name.trim(), department: dept, position };
          employeesList.push(obj);
          deptEmployees[dept].push(obj);
        });
      });
      deptEmployees[dept].sort((a, b) => a.name.localeCompare(b.name));
    });
    employeesList.sort((a, b) => a.name.localeCompare(b.name));
    setAllEmployees(employeesList);
    setEmployeesByDepartment(deptEmployees);
  }, []);

  const generateEmailFromName = useMemo(() => (name) => {
    if (!name) return "";
    const ignored = ["md", "md.", "mr", "mr.", "ms", "ms.", "mrs", "mrs."];
    const parts = name.toLowerCase().replace(/\./g, "").split(" ").filter(w => w && !ignored.includes(w));
    if (parts.length < 2) return "";
    return `${parts[0]}.${parts[parts.length - 1]}@duronto.tv`;
  }, []);

  const { register, handleSubmit, watch, setValue, resetField, formState: { errors } } = useForm();

  const watchedName = watch("name");
  const selectedDepartment = watch("department");
  const selectedPosition = watch("position");
  const personInCharge = watch("personInCharge");
  const reportingTo = watch("reportingTo");

  useEffect(() => {
    const email = generateEmailFromName(watchedName);
    if (email) setValue("email", email, { shouldValidate: true, shouldDirty: true });
  }, [watchedName, generateEmailFromName, setValue]);

  useEffect(() => {
    if (selectedDepartment && selectedDepartment !== "Other (Type manually)") {
      ["position","customPosition","personInCharge","reportingTo","personInChargePosition",
       "reportingToPosition","customPersonInCharge","customReportingTo",
       "customPersonInChargePosition","customReportingToPosition"].forEach(f => resetField(f));
    }
  }, [selectedDepartment, resetField]);

  useEffect(() => {
    if (selectedDepartment !== "Other (Type manually)") resetField("customDepartment");
  }, [selectedDepartment, resetField]);

  useEffect(() => {
    if (selectedPosition !== "Other (Type manually)") resetField("customPosition");
  }, [selectedPosition, resetField]);

  useEffect(() => {
    if (personInCharge !== "Other (Type manually)") {
      resetField("customPersonInCharge");
      resetField("customPersonInChargePosition");
    }
  }, [personInCharge, resetField]);

  useEffect(() => {
    if (reportingTo !== "Other (Type manually)") {
      resetField("customReportingTo");
      resetField("customReportingToPosition");
    }
  }, [reportingTo, resetField]);

  useEffect(() => {
    if (personInCharge && personInCharge !== "Other (Type manually)") {
      const emp = allEmployees.find(e => e.name === personInCharge);
      if (emp) setValue("personInChargePosition", emp.position, { shouldValidate: true, shouldDirty: true });
    }
  }, [personInCharge, allEmployees, setValue]);

  useEffect(() => {
    if (reportingTo && reportingTo !== "Other (Type manually)") {
      const emp = allEmployees.find(e => e.name === reportingTo);
      if (emp) setValue("reportingToPosition", emp.position, { shouldValidate: true, shouldDirty: true });
    }
  }, [reportingTo, allEmployees, setValue]);

  const departmentOptions = useMemo(() => [...Object.keys(departmentData), "Other (Type manually)"], []);

  const positionOptions = useMemo(() => {
    if (!selectedDepartment || selectedDepartment === "Other (Type manually)") return ["Other (Type manually)"];
    return [...(departmentData[selectedDepartment]?.positions || []), "Other (Type manually)"];
  }, [selectedDepartment]);

  const personInChargeOptions = useMemo(() => {
    if (!selectedDepartment || selectedDepartment === "Other (Type manually)") return ["Other (Type manually)"];
    return [...(employeesByDepartment[selectedDepartment]?.map(e => e.name) || []), "Other (Type manually)"];
  }, [selectedDepartment, employeesByDepartment]);

  const reportingToOptions = useMemo(() => {
    if (!selectedDepartment || selectedDepartment === "Other (Type manually)") return ["Other (Type manually)"];
    return [...(employeesByDepartment[selectedDepartment]?.map(e => e.name) || []), "Other (Type manually)"];
  }, [selectedDepartment, employeesByDepartment]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        name: data.name,
        employeeId: data.employeeId,
        department: data.department === "Other (Type manually)" ? data.customDepartment : data.department,
        position: data.position === "Other (Type manually)" ? data.customPosition : data.position,
        email: data.email,
        password: data.password,
        dateOfBirth: data.dateOfBirth,
        phone: data.tel,
        personInCharge: data.personInCharge === "Other (Type manually)" ? data.customPersonInCharge : data.personInCharge,
        personInChargePosition: data.personInCharge === "Other (Type manually)" ? data.customPersonInChargePosition : data.personInChargePosition,
        reportingTo: data.reportingTo === "Other (Type manually)" ? data.customReportingTo : data.reportingTo,
        reportingToPosition: data.reportingTo === "Other (Type manually)" ? data.customReportingToPosition : data.reportingToPosition,
        isSuperUser: data.superuser,
      };

      const res = await axios.post(`${API_BASE_URL}/api/superuser/signup`, payload, {
        headers: { Authorization: "Bearer " + authUser.token },
      });
      message.success(res.data.message);
    } catch (err) {
      message.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f3", padding: "clamp(12px, 3vw, 32px) 12px", boxSizing: "border-box" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>

        {/* Page Header */}
        <div style={{ marginBottom: "1.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px" }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "8px", background: "#E6F1FB",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#185FA5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/>
              </svg>
            </div>
            <div>
              <p style={{ margin: 0, fontSize: "18px", fontWeight: "500", color: "#111" }}>Add New Employee</p>
              <p style={{ margin: 0, fontSize: "13px", color: "#888" }}>Fill in the details below to register a new team member.</p>
            </div>
          </div>
        </div>

        {/* Card */}
        <div style={{
          background: "#fff", border: "1px solid rgba(0,0,0,0.1)",
          borderRadius: "12px", padding: "clamp(12px, 4vw, 32px)", boxSizing: "border-box", width: "100%",
        }}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ width: "100%", padding: "2rem" }}>

            {/* ── Personal Information ── */}
            <SectionHeader title="Personal Information" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "0 1.5rem", width: "100%" }}>
              <InputField id="name" label="Full Name" placeholder="e.g. Md. Rafiqul Islam" icon={<UserIcon />}
                register={register} errors={errors.name} required />
              <InputField id="employeeId" label="Employee ID" placeholder="e.g. DTV-042" icon={<IdIcon />}
                register={register} errors={errors.employeeId} required />
              <InputField id="dateOfBirth" label="Date of Birth" type="date" icon={<CalendarIcon />}
                register={register} errors={errors.dateOfBirth} required />
              <InputField id="tel" label="Phone Number" type="tel" placeholder="e.g. 01700000000" icon={<PhoneIcon />}
                register={register} errors={errors.tel} required />
            </div>

            {/* ── Department & Role ── */}
            <SectionHeader title="Department & Role" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem", width: "100%" }}>
              <SelectField id="department" label="Department" icon={<BuildingIcon />} placeholder="Select department"
                register={register} errors={errors.department} required options={departmentOptions} />
              <SelectField id="position" label="Position" icon={<BriefcaseIcon />} placeholder="Select position"
                register={register} errors={errors.position} required options={positionOptions} />

              {selectedDepartment === "Other (Type manually)" && (
                <InputField id="customDepartment" label="Custom Department" placeholder="Type department name"
                  icon={<BuildingIcon />} register={register} errors={errors.customDepartment} required />
              )}
              {selectedPosition === "Other (Type manually)" && (
                <InputField id="customPosition" label="Custom Position" placeholder="Type position title"
                  icon={<BriefcaseIcon />} register={register} errors={errors.customPosition} required />
              )}
            </div>

            {/* ── Reporting Structure ── */}
            <SectionHeader title="Reporting Structure" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem", width: "100%" }}>
              <div>
                <SelectField id="personInCharge" label="Person In-Charge" icon={<UserIcon />} placeholder="Select person"
                  register={register} errors={errors.personInCharge} required options={personInChargeOptions} />
                {personInCharge === "Other (Type manually)" ? (
                  <>
                    <InputField id="customPersonInCharge" label="Custom Person In-Charge" placeholder="Full name"
                      icon={<UserIcon />} register={register} errors={errors.customPersonInCharge} required />
                    <InputField id="customPersonInChargePosition" label="Their Position" placeholder="Position title"
                      icon={<BriefcaseIcon />} register={register} errors={errors.customPersonInChargePosition} required />
                  </>
                ) : personInCharge && (
                  <InputField id="personInChargePosition" label="Person In-Charge Position"
                    icon={<BriefcaseIcon />} register={register} errors={errors.personInChargePosition} required readOnly />
                )}
              </div>

              <div>
                <SelectField id="reportingTo" label="Reporting To" icon={<UserIcon />} placeholder="Select person"
                  register={register} errors={errors.reportingTo} required options={reportingToOptions} />
                {reportingTo === "Other (Type manually)" ? (
                  <>
                    <InputField id="customReportingTo" label="Custom Reporting To" placeholder="Full name"
                      icon={<UserIcon />} register={register} errors={errors.customReportingTo} required />
                    <InputField id="customReportingToPosition" label="Their Position" placeholder="Position title"
                      icon={<BriefcaseIcon />} register={register} errors={errors.customReportingToPosition} required />
                  </>
                ) : watch("reportingToPosition") && (
                  <InputField id="reportingToPosition" label="Reporting To Position"
                    icon={<BriefcaseIcon />} register={register} errors={errors.reportingToPosition} required readOnly />
                )}
              </div>
            </div>

            {/* ── Account Credentials ── */}
            <SectionHeader title="Account Credentials" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem", width: "100%" }}>
              <InputField id="email" label="Email Address" type="email" placeholder="firstname.lastname@duronto.tv"
                icon={<MailIcon />} register={register} errors={errors.email} required />

              <InputField id="password" label="Password" type={showPassword ? "text" : "password"}
                placeholder="Min. 8 characters" icon={<LockIcon />}
                register={register} errors={errors.password} required>
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  style={{
                    position: "absolute", right: "11px", background: "none", border: "none",
                    padding: 0, cursor: "pointer", color: "#aaa", display: "flex", alignItems: "center",
                  }}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </InputField>
            </div>

            {/* Admin rights checkbox */}
            <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", marginTop: "0.5rem", marginBottom: "1.75rem" }}>
              <input
                type="checkbox"
                {...register("superuser")}
                style={{ width: "16px", height: "16px", accentColor: "#185FA5", cursor: "pointer" }}
              />
              <span style={{ fontSize: "13px", color: "#444", fontWeight: "500" }}>Grant admin rights to this account</span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              style={{
                width: "100%", height: "40px", background: "#185FA5", border: "none",
                borderRadius: "8px", color: "#E6F1FB", fontSize: "14px", fontWeight: "500",
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
              }}
            >
              <ArrowRightIcon />
              Add Employee
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default NewUser;
