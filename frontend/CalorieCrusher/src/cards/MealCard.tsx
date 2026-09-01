import  { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import api from '../axiosinterceptors'
import EditMeal from '../components/EditMeal'

export default function MealCard({meal_id, meal_name, RefreshMeals, }:{meal_id:number, meal_name:string, RefreshMeals:any}) {

  const [showEditMeal, setShowEditMeal] = useState(false)
  const [totalCalories, setTotalCalories] = useState(0)

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
 async function GetTotalCalories() {
    let attachedFoodItems:any = []

    await api.get(`items/food_item/by_meal/${meal_id}/`)
      .then((response) => {
        attachedFoodItems = response.data
      })
      .catch((err) => {
        console.log(err)
      })

    await api.get("items/food/")
      .then((response) => {
        const allFoods = response.data
        let calorieTotal = 0

        attachedFoodItems.forEach((foodItem: any) => {
          const attachedFood = allFoods.find(
            (food: any) => food.id === foodItem.food
          )

          if (attachedFood) {
            calorieTotal += attachedFood.kcal * foodItem.quantity
          }
        })

        setTotalCalories(calorieTotal)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    GetTotalCalories()
  },[])

  return (
    <>
      <Card
      text='light'>
        <Card.Body>
          <Card.Title>
            {meal_name}
          </Card.Title>
          <Card.Subtitle>
            Calories:{totalCalories}
          </Card.Subtitle>
          <Button variant='outline-primary' onClick={() => {setShowEditMeal(true)}}>Manage Foods</Button>
          <Button variant='outline-danger' onClick={DeleteMeal}>Delete</Button>
        </Card.Body>
      </Card>
      <EditMeal meal_id={meal_id} show={showEditMeal} onHide={() => {setShowEditMeal(false)}} existingMealName={meal_name} ReturnMealData={HandleEditMeal}/>
    </>
  )
}
