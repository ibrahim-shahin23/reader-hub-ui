import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import logo from '../assets/logo1.png';

function NavbarComponent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check login status when component mounts
    const token = localStorage.getItem('token');
    const loginStatus = !!token; // Convert to boolean
    setIsLoggedIn(loginStatus);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false); // Update state immediately
    window.location.href = '/';
  };

  return (
    <>
      <Navbar expand="lg" className="p-0 bg-body-tertiary mb-3" fixed="top">
        <Container fluid className="ps-0">
          <Navbar.Brand className="p-0" as={Link} to="/">
            <img
              src={logo}
              alt="Logo"
              width="60"
              height="60"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" />
          <Navbar.Offcanvas
            id="offcanvasNavbar-expand-lg"
            aria-labelledby="offcanvasNavbarLabel-expand-lg"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg">
                Reader Hub
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-center flex-grow-1 pe-3">
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                {!isLoggedIn ? (
                  <>
                    <Nav.Link as={Link} to="/login">
                      Login
                    </Nav.Link>
                    <Nav.Link as={Link} to="/signup">
                      Signup
                    </Nav.Link>
                  </>
                ) : (
                  <>
                    {/* <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link> */}
                    <Nav.Link as={Link} to="/about">
                      About
                    </Nav.Link>
                    <Nav.Link as={Link} to="/contact">
                      Contact
                    </Nav.Link>

                    <NavDropdown
                      title="Account"
                      id="offcanvasNavbarDropdown-expand-lg"
                    >
                      <NavDropdown.Item as={Link} to="/profile">
                        Profile
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/cart">
                        Cart
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/myorders">
                        My Orders
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/favorites">
                        Favorites
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={handleLogout}>
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  </>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarComponent;
