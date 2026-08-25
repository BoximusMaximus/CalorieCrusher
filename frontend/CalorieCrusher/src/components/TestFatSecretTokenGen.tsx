import React from 'react'
import api from '../axiosinterceptors'
import { Button } from 'react-bootstrap'

export default function TestFatSecretTokenGen() {

    function HandleSubmit(){
        api.post("users/gentoken/", {})
        .then((response) => {
            console.log(response.data)
        }) .catch((err) => {
            console.log(err)
        }) .finally(() => {
            console.log("fatsecret token request complete")
        })
    }

  return (
    <>
        <Button onClick={HandleSubmit}>Gen Token</Button>
    </>
  )
}
