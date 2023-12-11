import { Link } from 'react-router-dom'
import { Nav, Navbar, Button } from 'react-bootstrap'

const NavigationMenu = ({ name, logout }) => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" data-bs-theme="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#" as="span">
            <Link to="/">blogs</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link to="/users">users</Link>
          </Nav.Link>
        </Nav>
        <Navbar.Text>
          {name} logged in &nbsp;
          <Button variant="secondary" onClick={logout}>
            logout
          </Button>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavigationMenu
