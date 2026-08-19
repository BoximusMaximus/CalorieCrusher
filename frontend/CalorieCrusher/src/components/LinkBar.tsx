import React from 'react'
import { Container, Nav, NavDropdown } from 'react-bootstrap'
import Navbar from "react-bootstrap/Navbar"

export default function LinkBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" variant='dark' data-bs-theme="dark" >
      <Container color="black">
        <Navbar.Brand href="/">Calorie Crusher</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="apitest">Test</Nav.Link>
            <Nav.Link href="login">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
