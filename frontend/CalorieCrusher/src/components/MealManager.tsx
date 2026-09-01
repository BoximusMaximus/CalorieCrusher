import React, { useEffect, useState } from 'react'
import api from '../axiosinterceptors'
import { Button } from 'react-bootstrap'
import EditMeal from './EditMeal'
import MealCard from '../cards/MealCard'

export default function MealManager() {
  const [showMealCreator, setShowMealCreator] = useState(false)
  const [newMealData, setNewMealData] = useState({})
  const [allMeals, setAllMeals] = useState([])


  async function CreateMeal(){
    await api.post("items/meal/create/", {name: newMealData.name})
    .then((response) => {
      console.log(response.data)
    }) .catch((err) => {
      console.log(err)
    }) .finally(() => {
      console.log("Meal Created")
      GetMeals()
    })
  }

  async function GetMeals(){
    await api.get("items/meal/")
    .then((response) => {
      console.log(response.data)
      setAllMeals(response.data)
      ShowMeals()
    }) .catch((err) => {
      console.log(err)
    }) .finally(() => {
      console.log("Meal Created")
    })
  }

  useEffect(() => {
    CreateMeal()
    GetMeals()
  },[newMealData])

  useEffect(() => {
    GetMeals()
  },[])

  function ShowMeals(){
    let key = 0
    const listItems = allMeals.map((meal:any) => <MealCard key={key++} meal_id={meal.id} meal_name={meal.name} RefreshMeals={GetMeals} />)
    return <div>{listItems}</div>
  }

  return (
    <>
      <Button onClick={() => {setShowMealCreator(true)}}>
        Create Meal
      </Button>
      <Button onClick={GetMeals}>
        Refresh Meals
      </Button>
      <ShowMeals/>
      <EditMeal show={showMealCreator} onHide={() => {setShowMealCreator(false)}} ReturnMealData={setNewMealData}/>
    </>
  )
}
