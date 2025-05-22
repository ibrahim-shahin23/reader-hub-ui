import { Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/logo1 editted.png';

function Footer() {
  return (
    <Navbar expand="lg" className="p-0 bg-body-tertiary mt-5" fixed="bottom">
      <Container fluid className='ps-2 pb-2'>
        <Navbar.Brand className='p-0' as={Link} to="/">
          <img src={logo}
            alt="Logo"
            height="60"
            className="d-inline-block align-top" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="footer-navbar" />
        <Navbar.Collapse id="footer-navbar">
          {/* <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
          </Nav> */}
          <div className='rights me-auto mb-1'>
            &copy; 2025 Reader Hub. All rights reserved.
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Footer;