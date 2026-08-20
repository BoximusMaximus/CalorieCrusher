import axios from 'axios';
import React from 'react'
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

export default function Signup({url}:{url:any}) {
    const api = axios.create({ baseURL: "url.APIUrl"})
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
        const response = await axios.post(`${url.APIUrl}users/signup/`, userData)
        console.log(response.data)

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
            <Button variant='primary' type="submit" >
                Sign Up
            </Button>
        </Form>
    </>
  )
}
