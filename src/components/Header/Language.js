import NavDropdown from "react-bootstrap/NavDropdown";

const Language = () => {
  return (
    <>
      <NavDropdown
        title="Viet Nam"
        id="basic-nav-dropdown2"
        className="languages"
      >
        <NavDropdown.Item href="/profile">English</NavDropdown.Item>
        <NavDropdown.Item>Viet Nam</NavDropdown.Item>
      </NavDropdown>
    </>
  );
};

export default Language;
