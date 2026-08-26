import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import api from '../axiosinterceptors';
import { useNavigate } from 'react-router';

export default function Signup() {
    let navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState("")
    async function HandleSubmit(e:any){
        e.preventDefault();

        // Read the form data
        const form = e.target;
        const formData = new FormData(form);
        if (formData.get("password") !== formData.get("passwordrepeat")){
            setErrorMessage("passwords do not match")
            return null
        }
        const userData = {
            username:formData.get("username"),
            email:formData.get("email"),
            password:formData.get("password")
        }
        console.log(userData)
        await api.post("users/signup/", userData)
        .then((response) => {
            window.sessionStorage.setItem("access_token",response.data.token)
            console.log("i am .then!!!")
            navigate(`/profile/${userData.username}`)
        }).catch((err) => {
            setErrorMessage("account already created")
        }).finally(() => {
            console.log("post complete")
        })
    }

    function ShowErrorMessage(){
        return <h4>{errorMessage}</h4>
    }

    async function PrintUser(){
        await api.get("/users/me/")
        .then((response) => {
            console.log(response.data)
        }) .catch((err) => {
            console.log(err)
        }) .finally(() => {
            console.log("finished fetching user data")
        })
    }

  return (
    <>
        <Form data-bs-theme="dark" onSubmit={HandleSubmit}>
            <Form.Group>
                <Form.Label>Username : </Form.Label>
                <Form.Control name="username"  type='username' placeholder='Username'/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Email : </Form.Label>
                <Form.Control name="email" type='email' placeholder='Email'/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Password : </Form.Label>
                <Form.Control name="password" type='password' placeholder='Passsword'/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Repeat Password : </Form.Label>
                <Form.Control name="passwordrepeat" type='password' placeholder='Passsword'/>
            </Form.Group>
            <Button variant='primary' type="submit" >
                Sign Up
            </Button>
            <ShowErrorMessage/>
        </Form>
        <Button onClick={PrintUser}>See User Data (DEVELOPER)</Button>
    </>
  )
}
