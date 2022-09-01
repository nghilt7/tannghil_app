import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./Header.scss";

const Header = () => {
  const navigate = useNavigate();

  // redux
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);

  // handle

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link className="navbar-brand" to="/">
          Tannghil
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
            <NavLink className="nav-link" to="/users">
              User
            </NavLink>
            <NavLink className="nav-link" to="/admins">
              Admin
            </NavLink>
          </Nav>
          <Nav>
            {!isAuthenticated ? (
              <>
                <button className="btn-login" onClick={() => handleLogin()}>
                  Log in
                </button>
                <button
                  className="btn-signup"
                  onClick={() => navigate("/register")}
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                {" "}
                <NavDropdown title="Setting" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
