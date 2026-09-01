import { useEffect, useState } from 'react'
import { Button, Container, Nav } from 'react-bootstrap'
import Navbar from "react-bootstrap/Navbar"
import api from '../axiosinterceptors'
import { GetUserInfo } from '../utils'
import { useNavigate } from 'react-router'

export default function LinkBar() {
  let navigate = useNavigate()

  const [loggedIn, setLoggedIn] = useState(false)
  const [username, setUsername] = useState("")

  async function CheckForUser(){
    const userInfo = await GetUserInfo()
    if (userInfo){
      setUsername(userInfo.username)
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
      navigate("/")
    })
    
  }

  function DynamicLinks(){
    if (loggedIn){
      return (
        <>
          <Nav.Link href={`/mealtracker/${username}`}>MealTracker</Nav.Link>
          <Nav.Link href={`/profile/${username}`}>MyProfile</Nav.Link>
          <Button variant="outline-danger" onClick={Logout}>Logout</Button>
        </>
      )
    } else {
      return (
      <>
        <Nav.Link href={`/mealtrackerdemo/`}>MealTracker</Nav.Link>
        <Nav.Link href="/login">Login</Nav.Link>
      </>
      )
    }
  }

  useEffect(() => {
    console.log("Checking if user logged in")
    CheckForUser()
  },)



  

  return (
    <Navbar expand="lg" className="bg-body-tertiary" variant='dark' data-bs-theme="dark" >
      <Container color="black">
        <Navbar.Brand href="/">Calorie Crusher</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/recipes/">Recipe Finder</Nav.Link>
            
            <DynamicLinks/>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
