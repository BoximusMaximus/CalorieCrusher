import React, { useState } from 'react'
import api from '../axiosinterceptors'
import { Button, Form } from 'react-bootstrap'
import FoodItem from '../cards/FoodItem'
import FatSecretFoodCard from '../cards/FatSecretFoodCard'

export default function SearchFatSecret({ReturnFoodData}:{ReturnFoodData:any}) {

    const [foodList, setFoodList] = useState([])

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
                setFoodList(response.data.foods.food.map((food:any) => {
                return {
                  food_name:food.food_name,
                  food_brand:food.brand_name, 
                  food_description: food.food_description
                  }}))
            }) .catch((err) => {
                console.log(err)
            }) .finally (() => {
                console.log(query)
                console.log("Seached FatSecret for Food")
            })
    }

    function ShowFoods(){
        let key = 0
        const listItems = foodList.map((food:any) => <FatSecretFoodCard key={key++} food_name={food.food_name} food_brand={food.food_brand} food_description={food.food_description} ReturnFoodData={ReturnFoodData}/>)
        return <div>{listItems}</div>
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
        <ShowFoods/>
    </>
  )
}
