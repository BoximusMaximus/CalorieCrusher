import React, { useState } from 'react'
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

export default function Login({url}:{url:any}) {

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
        console.log(userData, url)
        await axios.post(`${url.APIUrl}users/login/`, userData)
        .then((response) => {
            localStorage.setItem("client",response.data.client)
            localStorage.setItem("accessToken",response.data.token)
            console.log(response.data)
            console.log("i am .then!!!")
        }).catch((err) => {
            setErrorMessage("account not found")
            console.log(err)
        }).finally(() => {
            console.log("post complete")
        })

        
        

        // if (!response)

    }

    function ShowErrorMessage(){
        return <h4>{errorMessage}</h4>
    }

    function PrintLocalStorage(){
      const userData = {
        username:localStorage.getItem("client"),
        token:localStorage.getItem("accessToken")
      }
      console.log(JSON.stringify(userData))
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
        <Button onClick={PrintLocalStorage}>See User Data</Button>
    </>
  )
}
