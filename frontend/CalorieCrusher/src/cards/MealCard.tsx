import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import api from '../axiosinterceptors'
import EditMeal from '../components/EditMeal'

export default function MealCard({meal_id, meal_name, RefreshMeals, total_calories=0}:{meal_id:number, meal_name:string, RefreshMeals:any, total_calories?:number}) {

  const [showEditMeal, setShowEditMeal] = useState(false)

  async function DeleteMeal(){
    await api.delete(`items/meal/${meal_id}/`)
    .then((response) => {
      console.log(response.data)
      console.log("Meal deleted")
      RefreshMeals()
    }).catch((err) => {
      console.log(err)
    })
  }
  async function HandleEditMeal(mealData:string){
    await api.put(`items/meal/${meal_id}/`, mealData)
    .then((response) => {
      console.log(response.data)
      console.log("Meal edited")
      RefreshMeals()
    }).catch((err) => {
      console.log(err)
    })
  }

  

  return (
    <>
      <Card
      text='light'>
        <Card.Body>
          <Card.Title>
            {meal_name}
          </Card.Title>
          <Card.Subtitle>
            Calories:{total_calories}
          </Card.Subtitle>
          <Button variant='outline-primary' onClick={() => {setShowEditMeal(true)}}>Manage Foods</Button>
          <Button variant='outline-danger' onClick={DeleteMeal}>Delete</Button>
        </Card.Body>
      </Card>
      <EditMeal meal_id={meal_id} show={showEditMeal} onHide={() => {setShowEditMeal(false)}} existingMealName={meal_name} ReturnMealData={HandleEditMeal}/>
    </>
  )
}
