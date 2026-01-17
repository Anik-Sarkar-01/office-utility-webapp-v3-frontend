import React, { useContext, useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { message } from "antd";
import axios from "axios";
import userContext from "../../context/userContext";

/* ================= Department Data ================= */
const departmentData = {
  /* ================= Management ================= */
  Management: {
    positions: ["Managing Director", "Director"],
    employees: {
      "Managing Director": ["Muhammad Sayeed"],
      "Director": ["Abhijit Chowdhury"],
    },
  },

  /* ================= Programme ================= */
  Programme: {
    positions: [
      "Senior General Manager, Programme",
      "Executive Producer",
      "Senior Producer",
      "Senior Script Editor",
      "Producer",
      "Associate Producer",
      "Assistant Producer",
      "Senior Executive, Programme",
      "Executive, Programme",
      "Trainee Executive, Programme",
      "Production Associate",
    ],
    employees: {
      "Senior General Manager, Programme": ["Sunjida Siddique Sumona"],
      "Executive Producer": ["Md. Monirul Hossain (Shipon)"],
      "Senior Producer": [
        "Farida Aktar Lima",
        "Md. Jamal Hossain (Abir Kiswan)",
        "Partha Protim Halder",
      ],
      "Senior Script Editor": ["Mohammad Monirul Islam Rubel"],
      Producer: ["Mostaque Ahmed Titu", "Mehadi Hasan Sadhin"],
      "Associate Producer": ["Diganta Bahar", "Amina Nowshin Raisa"],
      "Assistant Producer": ["Shahadat Hussain", "Abul Khayer Komal"],
      "Senior Executive, Programme": [
        "Mohsina Afroz",
        "Md. Abir Ahmed",
        "Sumon Chandra Roy",
      ],
      "Executive, Programme": ["Sabiha Sultana Barsha"],
      "Trainee Executive, Programme": ["Mrittika Abedin"],
      "Production Associate": ["Uuliur Rahman"],
    },
  },

  /* ================= Music ================= */
  Music: {
    positions: [
      "Assistant Producer",
      "Senior Executive, Programme",
    ],
    employees: {
      "Assistant Producer": ["Syed Rifat Ahammad"],
      "Senior Executive, Programme": [
        "Md. Abir Ahmed",
        "Sumon Chandra Roy",
      ],
    },
  },

  /* ================= Dubbing ================= */
  Dubbing: {
    positions: [
      "Executive Producer",
      "Associate Producer",
      "Assistant Producer",
    ],
    employees: {
      "Executive Producer": ["Abu Bakar Bakul"],
      "Associate Producer": [
        "Md. Mahbub Alam",
        "Sheyuti Sheen Shahgufta",
      ],
      "Assistant Producer": ["Shajjad Ahmed"],
    },
  },

  /* ================= Graphics & Animation ================= */
  "Graphics & Animation": {
    positions: [
      "Chief Graphic Designer",
      "Assistant Chief Animator",
      "Senior Graphic Designer",
      "Senior Executive, Graphics & Animation",
      "Executive, Graphics & Animation",
      "Trainee Executive, Graphics & Animation",
    ],
    employees: {
      "Chief Graphic Designer": ["Mohammad Adnan Sufian"],
      "Assistant Chief Animator": ["Md. Lutfar Rahman"],
      "Senior Graphic Designer": [
        "Mazharul Hoque",
        "Palash Sarker",
      ],
      "Senior Executive, Graphics & Animation": [
        "Nafiz Imtiaz",
        "Md. Salman Sobhan",
        "Mahmuda Akhter",
      ],
      "Executive, Graphics & Animation": [
        "Saahanaz Akther",
        "Sameen Yeasaar",
        "Reshme Mallick",
        "Zohra Islam Juthi",
        "Ashikul Islam",
        "Md. Mostofa Khondokar",
        "Syeda Tasnim Rahman",
        "Purnata Roy",
      ],
      "Trainee Executive, Graphics & Animation": [
        "Redwan Ahmed",
        "Md. Rowshon Habib",
        "Nusrat Jahan Shaown",
        "Siama Tarannum",
      ],
    },
  },

  /* ================= Video Editing ================= */
  "Video Editing": {
    positions: [
      "Assistant Chief Video Editor",
      "Senior Video Editor",
      "Video Editor",
      "Junior Video Editor",
    ],
    employees: {
      "Assistant Chief Video Editor": [
        "Md. Naimul Islam",
        "Md. Rokon Uddin",
        "Md. Hossanur Rhaman",
      ],
      "Senior Video Editor": [
        "Porikhit Kumar Shovon",
        "Hasibul Hossain Santo",
        "H.M Bakir-Ul-Islam",
        "Nasir Uddin Eskander",
        "M. Latif",
        "M. A. Rashid",
      ],
      "Video Editor": ["Foez Ahamed"],
      "Junior Video Editor": ["Indrani Paul"],
    },
  },

  /* ================= Broadcast Operation & Engineering ================= */
  "Broadcast Operation & Engineering": {
    positions: [
      "Senior Manager, BOE",
      "Manager, BOE",
      "Deputy Manager, BOE",
      "Assistant Manager, BOE",
      "Senior Executive, BOE",
      "Executive, BOE",
      "Trainee Executive, BOE",
      "Senior Maintenance Associate",
      "Maintenance Associate",
    ],
    employees: {
      "Senior Manager, BOE": ["Aminul Islam (Rohan)"],
      "Manager, BOE": ["Mufid Islam"],
      "Deputy Manager, BOE": ["Siddiq Ahmed Chowdhury"],
      "Assistant Manager, BOE": [
        "Md. Nur Alam",
        "Mahmudul Hasan Bulbul",
        "SK. Rakibul Haque Shuvo",
        "Amitav Sarkar",
      ],
      "Senior Executive, BOE": [
        "Md. Touhidur Rahman",
        "S.R. Hasan",
        "Maisha Radeyah Haque",
        "Isabela Oishee",
        "Syed Maniruzzaman",
      ],
      "Executive, BOE": [
        "Mahmudul Haque Fahim",
        "Tamasree Kundu",
        "Biplob Bagchi",
        "Rizvi Ahmed",
        "Al-Amin",
      ],
      "Trainee Executive, BOE": [
        "Md. Asadul Islam",
        "Md. Shakib Monshy",
      ],
      "Senior Maintenance Associate": ["Helal Mia"],
      "Maintenance Associate": ["Md. Hasem Uddin"],
    },
  },
};

/* -------------------- Reusable FormGroup -------------------- */
const FormGroup = ({
  register,
  errors,
  type,
  label,
  id,
  required,
  options,
  placeholder,
  value,
  readOnly,
  disabled,
}) => {
  return (
    <Form.Group className="mb-3" controlId={id}>
      {id === "superuser" ? (
        <Form.Check
          type="checkbox"
          label="Admin rights?"
          {...register(id)}
        />
      ) : (
        <>
          <Form.Label className="fw-bold">{label}</Form.Label>

          {type === "select" ? (
            <Form.Select
              {...register(id, {
                required: required && "This field is required",
              })}
            >
              <option value="">
                {id.includes("department")
                  ? "Select department"
                  : id.includes("position")
                    ? "Select position"
                    : id.includes("person") || id.includes("reporting")
                      ? "Select person"
                      : "Select"}
              </option>
              {options?.map((opt, index) => (
                <option key={index} value={opt}>
                  {opt}
                </option>
              ))}
            </Form.Select>
          ) : (
            <Form.Control
              type={type}
              placeholder={placeholder}
              readOnly={readOnly}
              disabled={disabled}
              {...register(id, {
                required: required && "This field is required",
              })}
            />
          )}
        </>
      )}

      {errors && (
        <Form.Text className="text-danger">{errors.message}</Form.Text>
      )}
    </Form.Group>
  );
};

/* -------------------- Main Component -------------------- */
const NewUser = () => {
  const authUser = useContext(userContext) || {};
  const [allEmployees, setAllEmployees] = useState([]);
  const [employeesByDepartment, setEmployeesByDepartment] = useState({});

  // Generate lists of employees from departmentData
  useEffect(() => {
    const employeesList = [];
    const deptEmployees = {};

    // Loop through each department
    Object.entries(departmentData).forEach(([dept, deptInfo]) => {
      deptEmployees[dept] = [];

      // Loop through each position in the department
      Object.entries(deptInfo.employees).forEach(([position, names]) => {
        // Loop through each employee name
        names.forEach(name => {
          const trimmedName = name.trim();
          const employeeObj = {
            name: trimmedName,
            department: dept,
            position: position
          };

          employeesList.push(employeeObj);
          deptEmployees[dept].push(employeeObj);
        });
      });

      // Sort employees in each department by name
      deptEmployees[dept].sort((a, b) => a.name.localeCompare(b.name));
    });

    // Sort all employees by name
    employeesList.sort((a, b) => a.name.localeCompare(b.name));
    setAllEmployees(employeesList);
    setEmployeesByDepartment(deptEmployees);
  }, []);

  const generateEmailFromName = useMemo(() => (name) => {
    if (!name) return "";

    // Words to ignore
    const ignoredWords = ["md", "md.", "mr", "mr.", "ms", "ms.", "mrs", "mrs."];

    const parts = name
      .toLowerCase()
      .replace(/\./g, "") // remove dots
      .split(" ")
      .filter(word => word && !ignoredWords.includes(word));

    if (parts.length < 2) return "";

    const firstName = parts[0];
    const lastName = parts[parts.length - 1];

    return `${firstName}.${lastName}@duronto.tv`;
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    resetField,
    formState: { errors },
  } = useForm();

  /* -------------------- Watchers -------------------- */
  const watchedName = watch("name");
  const selectedDepartment = watch("department");
  const selectedPosition = watch("position");
  const personInCharge = watch("personInCharge");
  const reportingTo = watch("reportingTo");

  /* -------------------- Reset Logic -------------------- */
  useEffect(() => {
    const generatedEmail = generateEmailFromName(watchedName);
    if (generatedEmail) {
      setValue("email", generatedEmail, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [watchedName, generateEmailFromName, setValue]);

  // Reset fields when department changes
  useEffect(() => {
    if (selectedDepartment && selectedDepartment !== "Other (Type manually)") {
      resetField("position");
      resetField("customPosition");
      resetField("personInCharge");
      resetField("reportingTo");
      resetField("personInChargePosition");
      resetField("reportingToPosition");
      resetField("customPersonInCharge");
      resetField("customReportingTo");
      resetField("customPersonInChargePosition");
      resetField("customReportingToPosition");
    }
  }, [selectedDepartment, resetField]);

  // Reset custom department field
  useEffect(() => {
    if (selectedDepartment !== "Other (Type manually)") {
      resetField("customDepartment");
    }
  }, [selectedDepartment, resetField]);

  // Reset custom position field
  useEffect(() => {
    if (selectedPosition !== "Other (Type manually)") {
      resetField("customPosition");
    }
  }, [selectedPosition, resetField]);

  // Reset custom person fields
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

  // Update position fields when person is selected
  useEffect(() => {
    if (personInCharge && personInCharge !== "Other (Type manually)") {
      const employee = allEmployees.find(emp => emp.name === personInCharge);
      if (employee) {
        setValue("personInChargePosition", employee.position, {
          shouldValidate: true,
          shouldDirty: true,
        });
      }
    }
  }, [personInCharge, allEmployees, setValue]);

  useEffect(() => {
    if (reportingTo && reportingTo !== "Other (Type manually)") {
      const employee = allEmployees.find(emp => emp.name === reportingTo);
      if (employee) {
        setValue("reportingToPosition", employee.position, {
          shouldValidate: true,
          shouldDirty: true,
        });
      }
    }
  }, [reportingTo, allEmployees, setValue]);

  /* -------------------- Options -------------------- */
  // Department options from departmentData + "Other"
  const departmentOptions = useMemo(() => [
    ...Object.keys(departmentData),
    "Other (Type manually)",
  ], []);

  // Position options based on selected department
  const positionOptions = useMemo(() => {
    if (!selectedDepartment || selectedDepartment === "Other (Type manually)") {
      return ["Other (Type manually)"];
    }

    if (departmentData[selectedDepartment]) {
      return [
        ...departmentData[selectedDepartment].positions,
        "Other (Type manually)"
      ];
    }

    return ["Other (Type manually)"];
  }, [selectedDepartment]);

  // Person In-Charge options (filtered by department)
  const personInChargeOptions = useMemo(() => {
    if (!selectedDepartment || selectedDepartment === "Other (Type manually)") {
      return ["Other (Type manually)"];
    }

    if (employeesByDepartment[selectedDepartment]) {
      const employeeNames = employeesByDepartment[selectedDepartment].map(emp => emp.name);
      return [...employeeNames, "Other (Type manually)"];
    }

    return ["Other (Type manually)"];
  }, [selectedDepartment, employeesByDepartment]);

  // Reporting To options (filtered by department)
  const reportingToOptions = useMemo(() => {
    if (!selectedDepartment || selectedDepartment === "Other (Type manually)") {
      return ["Other (Type manually)"];
    }

    if (employeesByDepartment[selectedDepartment]) {
      const employeeNames = employeesByDepartment[selectedDepartment].map(emp => emp.name);
      return [...employeeNames, "Other (Type manually)"];
    }

    return ["Other (Type manually)"];
  }, [selectedDepartment, employeesByDepartment]);

  /* -------------------- Submit -------------------- */
  const onSubmit = async (data) => {
    try {
      const payload = {
        name: data.name,
        employeeId: data.employeeId,
        department:
          data.department === "Other (Type manually)"
            ? data.customDepartment
            : data.department,
        position:
          data.position === "Other (Type manually)"
            ? data.customPosition
            : data.position,
        email: data.email,
        password: data.password,
        joiningDate: data.joinDate,
        dateOfBirth: data.dateOfBirth,
        phone: data.tel,
        address: data.address,
        personInCharge:
          data.personInCharge === "Other (Type manually)"
            ? data.customPersonInCharge
            : data.personInCharge,
        personInChargePosition:
          data.personInCharge === "Other (Type manually)"
            ? data.customPersonInChargePosition
            : data.personInChargePosition,
        reportingTo:
          data.reportingTo === "Other (Type manually)"
            ? data.customReportingTo
            : data.reportingTo,
        reportingToPosition:
          data.reportingTo === "Other (Type manually)"
            ? data.customReportingToPosition
            : data.reportingToPosition,
        isSuperUser: data.superuser,
      };

      const res = await axios.post(
        "https://office-utility-webapp-v3-backend.vercel.app/api/superuser/signup",
        payload,
        {
          headers: {
            Authorization: "Bearer " + authUser.token,
          },
        }
      );

      message.success(res.data.message);
    } catch (err) {
      message.error(err.response?.data?.message || "Something went wrong");
    }
  };

  /* -------------------- JSX -------------------- */
  return (
    <div className="mt-4">
      <h2 className="text-center profile-detail-heading">
        Add New Employee
      </h2>

      <div className="d-flex justify-content-center my-4">
        <Form onSubmit={handleSubmit(onSubmit)} className="px-5 py-4">
          <div className="row">
            {/* Left Column */}
            <div className="col-6">
              <FormGroup
                register={register}
                errors={errors.name}
                type="text"
                label="Full Name"
                id="name"
                required
              />

              <FormGroup
                register={register}
                errors={errors.employeeId}
                type="text"
                label="Employee ID"
                id="employeeId"
                required
              />

              {/* Department */}
              <FormGroup
                register={register}
                errors={errors.department}
                type="select"
                label="Department"
                id="department"
                required
                options={departmentOptions}
              />

              {watch("department") === "Other (Type manually)" && (
                <FormGroup
                  register={register}
                  errors={errors.customDepartment}
                  type="text"
                  label="Custom Department"
                  id="customDepartment"
                  required
                />
              )}

              {watch("position") === "Other (Type manually)" && (
                <FormGroup
                  register={register}
                  errors={errors.customPosition}
                  type="text"
                  label="Custom Position"
                  id="customPosition"
                  required
                />
              )}

              <FormGroup
                register={register}
                errors={errors.email}
                type="email"
                label="Email Address"
                id="email"
                required
              />

              {/* Person In-Charge */}
              <FormGroup
                register={register}
                errors={errors.personInCharge}
                type="select"
                label="Person In-Charge"
                id="personInCharge"
                required
                options={personInChargeOptions}
              />

              {personInCharge === "Other (Type manually)" ? (
                <>
                  <FormGroup
                    register={register}
                    errors={errors.customPersonInCharge}
                    type="text"
                    label="Custom Person In-Charge"
                    id="customPersonInCharge"
                    required
                  />
                  <FormGroup
                    register={register}
                    errors={errors.customPersonInChargePosition}
                    type="text"
                    label="Custom Person In-Charge Position"
                    id="customPersonInChargePosition"
                    required
                  />
                </>
              ) : personInCharge && (
                <>
                  <FormGroup
                    register={register}
                    errors={errors.personInChargePosition}
                    type="text"
                    label="Person In-Charge Position"
                    id="personInChargePosition"
                    required
                  />
                </>
              )}

              <FormGroup
                register={register}
                errors={errors.dateOfBirth}
                type="date"
                label="Date of Birth"
                id="dateOfBirth"
                required
              />

              <FormGroup
                register={register}
                errors={errors.superuser}
                type="checkbox"
                id="superuser"
              />
            </div>

            {/* Right Column */}
            <div className="col-6">
              <FormGroup
                register={register}
                errors={errors.address}
                type="text"
                label="Address"
                id="address"
              />

              <FormGroup
                register={register}
                errors={errors.tel}
                type="tel"
                label="Phone Number"
                id="tel"
                required
              />

              {/* Position */}
              <FormGroup
                register={register}
                errors={errors.position}
                type="select"
                label="Position"
                id="position"
                required
                options={positionOptions}
              />

              <FormGroup
                register={register}
                errors={errors.password}
                type="password"
                label="Password"
                id="password"
                required
              />

              {/* Reporting To */}
              <FormGroup
                register={register}
                errors={errors.reportingTo}
                type="select"
                label="Reporting To"
                id="reportingTo"
                required
                options={reportingToOptions}
              />

              {reportingTo === "Other (Type manually)" ? (
                <>
                  <FormGroup
                    register={register}
                    errors={errors.customReportingTo}
                    type="text"
                    label="Custom Reporting To"
                    id="customReportingTo"
                    required
                  />
                  <FormGroup
                    register={register}
                    errors={errors.customReportingToPosition}
                    type="text"
                    label="Custom Reporting To Position"
                    id="customReportingToPosition"
                    required
                  />
                </>
              ) : watch("reportingToPosition") && (
                <>
                  <FormGroup
                    register={register}
                    errors={errors.reportingToPosition}
                    type="text"
                    label="Reporting To Position"
                    id="reportingToPosition"
                    required
                  />
                </>
              )}

              <FormGroup
                register={register}
                errors={errors.joinDate}
                type="date"
                label="Joining Date"
                id="joinDate"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="custom-button w-100 p-2"
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default NewUser;