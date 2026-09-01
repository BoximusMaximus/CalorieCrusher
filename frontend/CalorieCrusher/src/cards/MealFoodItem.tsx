import React from 'react'
import { Button, Card } from 'react-bootstrap'
import api from '../axiosinterceptors'

export default function MealFoodItem({
    meal_id,
    food_id,
    food_name,
    attached,
    ReloadMealFoods
}:{
    meal_id:number,
    food_id:number,
    food_name:string,
    attached:boolean,
    ReloadMealFoods:any
}) {

    async function CreateFoodItem(){
        await api.post(`items/food_item/meal/${meal_id}/food/${food_id}/`,
            {quantity: 1}
        )
        .then((response) => {
            console.log(response.data)
            ReloadMealFoods()
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            console.log("Food added to meal")
        })
    }
    
    async function HandleDelete(){
        await api.delete(`items/food_item/from_food/${food_id}/`)
        .then((response) => {
            console.log(response.data)
            ReloadMealFoods()
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            console.log("Food removed from meal")
        })
    }

    return (
    <Card>
        <Card.Header>
            {food_name}
        </Card.Header>
        <Card.Footer>
            <Button
                variant={attached ? "outline-danger" : "outline-primary"}
                onClick={attached ? HandleDelete : CreateFoodItem}
                >
                {attached ? "Remove Food" : "Add Food"}
            </Button>
        </Card.Footer>
    </Card>
  )
}
