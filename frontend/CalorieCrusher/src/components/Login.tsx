import React, { useState } from 'react'
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import api from "../axiosinterceptors"
import { useNavigate } from 'react-router';

export default function Login({ccURL}:{ccURL:string}) {
    let navigate = useNavigate()

    const [errorMessage, setErrorMessage] = useState("")
    async function HandleSubmit(e:any){
        e.preventDefault();

        // Read the form data
        const form = e.target;
        const formData = new FormData(form);
        const userData = {
            username:formData.get("username"),
            email:formData.get("email"),
            password:formData.get("password")
        }
        console.log(userData, ccURL)
        await api.post("users/login/", userData)
            .then((response:any) => {
                window.sessionStorage.setItem("access_token",response.data.token)
                console.log(response.data)
                console.log("i am .then!!!")
                navigate("/")
            }).catch((err:any) => {
                setErrorMessage("account not found")
                console.log(err)
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
                <Form.Label>Password : </Form.Label>
                <Form.Control name="password" type='password' placeholder='Passsword'/>
            </Form.Group>
            <Button variant='primary' type="submit" >
                Sign In
            </Button>
            <ShowErrorMessage/>
        </Form>
        <Button onClick={PrintUser}>See User Data (DEVELOPER)</Button>
    </>
  )
}
