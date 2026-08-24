import React from 'react'
import Login from '../components/Login'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Signup from '../components/Signup';
import { useState } from 'react';
import { useOutletContext } from 'react-router';


export default function LoginPage({ccURL}:{ccURL:string}) {
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
            <Login ccURL={ccURL}/>
        </Tab>
        <Tab eventKey="signup" title="Sign Up">
            <Signup ccURL={ccURL}/>
        </Tab>
    </Tabs>
    
    </>
  )
}
