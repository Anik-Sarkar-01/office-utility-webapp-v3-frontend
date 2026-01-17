import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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

  // 🔍 Filter only by name and email
  const filteredEmployees = props.employee.filter((emp) =>
    `${emp.name} ${emp.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div
      className="py-3 table-responsive"
    >
      {/* Search */}
      <div className="mb-3 d-flex justify-content-end">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Name or Email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table
        className="table align-middle"
      >
        <thead>
          <tr className="table-head">
            <th>Name</th>
            <th>Position</th>
            <th>Email ID</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredEmployees.length ? (
            filteredEmployees.map((emp) => (
              <tr key={emp._id}>
                <td className="fw-bold">{emp.name}</td>
                <td>{emp.position}</td>
                <td>{emp.email}</td>
                <td className="text-center">
                  <Link
                    to={`/profile/${emp._id}`}
                    className="btn btn-sm text-white"
                    style={{ backgroundColor: "#FF4C52" }}
                    onClick={() => loadDetails(emp._id)}
                  >
                    Details
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center text-muted py-3">
                No employee found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmpTable;
