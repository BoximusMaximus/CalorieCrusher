import React from 'react'
import api from '../axiosinterceptors'
import { Button, Form } from 'react-bootstrap'

export default function SearchFatSecret() {

    function HandleSearch(e:any){
        e.preventDefault()
        console.log("Handling Food Data")

        // Read the form data
        const form = e.target
        const formData = new FormData(form)
        const query = formData.get("food_search")

        api.get("items/external/food/search/", 
            {
                params: {
                    query: query
                }
            }).then((response) => {
                console.log(response.data)
            }) .catch((err) => {
                console.log(err)
            }) .finally (() => {
                console.log(query)
                console.log("Seached FatSecret for Food")
            })
    }
    return (
    <>
        <Form onSubmit={HandleSearch}>
            <Form.Group className="mb-3">
            <Form.Label>Food name</Form.Label>

            <Form.Control
                name='food_search'
                placeholder="For example: chicken breast"
            />
            </Form.Group>

            <Button type="submit">Search</Button>
        </Form>
    </>
  )
}
