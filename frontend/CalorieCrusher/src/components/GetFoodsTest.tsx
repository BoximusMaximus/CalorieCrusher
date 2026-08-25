import React, { useState } from 'react'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import api from '../axiosinterceptors'

export default function GetFoodsTest() {
    const [foods, setFoods] = useState([])
    // const [currentUser, setCurrentUser] = useState([])

    async function GetFoods () {
       await api.get("items/food/")
        .then((response) => {
            console.log(response.data)
            setFoods(response.data.map((food:any) => food.name))
            console.log(foods)
        })
        .catch((error) => {
            console.error("Request failed:", error.message)
        })
        .finally(() => {
            console.log("Request complete")
        })
    }

    // async function DeleteFood(food_id){
    //     pass
    // }

    function ListFoods(){
        let key = 0
        const listItems = foods.map(food => <li key={key++}>{food}</li>)
        return <ul>{listItems}</ul>
    }

  return (
    <>
        <Button onClick={GetFoods}>
            Get Foods
        </Button>
        <div>
            <ListFoods/>
        </div>
    </>
  )
}
