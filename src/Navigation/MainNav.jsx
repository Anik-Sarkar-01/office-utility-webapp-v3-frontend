import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import userContext from "../context/userContext";

import { NavDropdown } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

import MainHeader from "./MainHeader";
import getIcon from "../utils/getIcon";

// 👉 import logo
import logo from "../images/logo2.png";

/* -------------------- */
/* Reusable Nav Link */
/* -------------------- */
const NavLinks = ({ link, navIcon, navText }) => {
  return (
    <Nav.Link
      as={Link}
      to={link}
      className="d-flex align-items-center gap-1 text-white ms-2 me-2"
    >
      {getIcon(navIcon)}
      <span>{navText}</span>
    </Nav.Link>
  );
};

function MainNav() {
  const authUser = useContext(userContext);
  const navigate = useNavigate();

  /* Redirect if not logged in */
  useEffect(() => {
    if (!authUser.isLoggedIn) {
      navigate("/login");
    }
  }, [authUser.isLoggedIn, navigate]);

  /* Fetch user on load */
  useEffect(() => {
    authUser.getUserData();
    // eslint-disable-next-line
  }, []);

  return (
    <MainHeader>
      <Navbar expand="lg" bg="dark" variant="dark" className="shadow-lg">
        <Container>
          {/* Logo + Brand */}
          <Navbar.Brand as={Link} to={authUser.isLoggedIn ? "/" : "/login"}>
            <div className="d-flex align-items-center gap-2">
              <img
                src={logo}
                alt="DEMS Logo"
                height="32"
                className="d-inline-block align-top"
              />
              <span className="fw-bold text-white">DEMS</span>
            </div>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-navbar-nav" />

          <Navbar.Collapse id="main-navbar-nav">
            {/* Left Links */}
            <Nav className="me-auto">
              {authUser.isLoggedIn && (
                <>
                  <NavLinks
                    link={`/ask-for-leave/${authUser.userId}`}
                    navIcon="leave"
                    navText="Apply Leave"
                  />
                  <NavLinks
                    link={`/profile/${authUser.userId}`}
                    navIcon="profile"
                    navText="Profile"
                  />
                </>
              )}
            </Nav>

            {/* Right Dropdown */}
            {authUser.token && authUser.currentUser && (
              <Nav>
                <NavDropdown
                  align="end"
                  title={authUser.currentUser.name}
                  id="user-nav-dropdown"
                >
                  <NavDropdown.Item onClick={authUser.logout}>
                    Log Out
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </MainHeader>
  );
}

export default MainNav;
