import React from 'react'
import Login from '../components/Login'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Signup from '../components/Signup';
import { useState } from 'react';


export default function LoginPage() {
    const [key, setKey] = useState("signin")

  return (
    <>
    <Tabs
    data-bs-theme="dark"
    activeKey={key}
    onSelect={(k:any) => setKey(k)}
    id="Login or Signup"
    className="mb-3"
    fill> 
        <Tab eventKey="signin" title="Sign In" >
            <Login/>
        </Tab>
        <Tab eventKey="signup" title="Sign Up">
            <Signup/>
        </Tab>
    </Tabs>
    
    </>
  )
}
