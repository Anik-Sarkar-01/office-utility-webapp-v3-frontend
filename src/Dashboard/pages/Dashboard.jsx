import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

import EmpTable from "../components/EmpTable";
import userContext from "../../context/userContext";
import CardUI from "../../UI/CardUI";
import WelcomeUI from "../../UI/WelcomeUI";

import { Spin } from "antd";

const Dashboard = () => {
  const [employee, setEmployee] = useState([]);
  const authUser = useContext(userContext);

  useEffect(() => {
    const getEmployeeDetails = async () => {
      try {
        const response = await axios.get("https://office-utility-webapp-v3-backend.vercel.app/api/users/");
        setEmployee(response.data.user);
      } catch (error) {
        console.log("error is:", error);
      }
    };

    getEmployeeDetails();
    authUser.getUserData();
    // eslint-disable-next-line
  }, []);

  if (!employee || !authUser.currentUser) {
    return <Spin fullscreen />;
  }

  return (
    <div className="container-fluid mt-3">
      <div className="row justify-content-center">
        {/* MAIN COLUMN — SAME WIDTH FOR EVERYTHING */}
        <div className="col-lg-8 col-md-12 d-flex flex-column gap-4">

          {/* Welcome Section */}
          <CardUI width="w-100">
            <WelcomeUI employee={authUser.currentUser} />
          </CardUI>

          {/* Add Employee Button */}
          {authUser.isSuperUser && (
            <div className="d-flex justify-content-end">
              <Link to="/signup">
                <Button className="custom-button">
                  + Add a New Employee
                </Button>
              </Link>
            </div>
          )}

          {/* Employee Table */}
          {authUser.isSuperUser && (
            <CardUI width="w-100">
              <EmpTable employee={employee} />
            </CardUI>
          )}

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
