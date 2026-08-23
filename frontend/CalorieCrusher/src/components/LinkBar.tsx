import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container, Nav, NavDropdown } from 'react-bootstrap'
import Navbar from "react-bootstrap/Navbar"

export default function LinkBar({url}:{url:any}) {
  // const [loggedIn, setLoggedIn] = useState(false)

  // useEffect(() => {
  //   if (window.sessionStorage.getItem("token") == undefined){
  //     setLoggedIn(false)
  //     console.log("user is logged in")
  //   } else {
  //     setLoggedIn(true)
  //     console.log("user is logged in")
  //   }
  // },[])

  // async function Logout(){
  //   axios.post(url, )
  // }

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
