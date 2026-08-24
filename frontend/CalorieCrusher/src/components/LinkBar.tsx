import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Container, Nav, NavDropdown } from 'react-bootstrap'
import Navbar from "react-bootstrap/Navbar"
import api from '../axiosinterceptors'
import { GetUserInfo } from '../utils'

export default function LinkBar() {
  const [loggedIn, setLoggedIn] = useState(false)

  async function CheckForUser(){
    const userInfo = await GetUserInfo()
    if (userInfo){
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
  }

  async function Logout(){
    api.post("users/logout/")
    .finally(() => {
      setLoggedIn(false)
      window.sessionStorage.setItem("access_token","")
      console.log("User was logged out")
    })
    
  }

  function DynamicSignIn(){
    if (loggedIn){
      return <Button  variant="outline-danger" onClick={Logout}>Logout</Button>
    } else {
      return <Nav.Link href="login">Login</Nav.Link>
    }
  }

  useEffect(() => {
    console.log("Checking if user logged in")
    CheckForUser()
  },[])



  

  return (
    <Navbar expand="lg" className="bg-body-tertiary" variant='dark' data-bs-theme="dark" >
      <Container color="black">
        <Navbar.Brand href="/">Calorie Crusher</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="apitest">Test</Nav.Link>
            <DynamicSignIn/>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
