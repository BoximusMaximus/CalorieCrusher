import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import api from '../axiosinterceptors'
import CreateFood from '../components/CreateFood'

export default function FoodItem({food_id, food_name, food_data, ReloadFoods}:{food_id:string, food_name:string, food_data:any, ReloadFoods:any}) {
  const [showFoodEdit, setShowFoodEdit] = useState(false)
  const [editedFoodData, setEditedFoodData] = useState({})

  async function HandleDelete(){
    api.delete(`items/food/${food_id}/`)
      .then((response) => {
        console.log(response.data)
        ReloadFoods()
      }) .catch((err) => {
        console.log(err)
      }) .finally(()=>{
        console.log("Food Deleted")
      })
  }

  async function HandleEdit(){
    if (Object.keys(editedFoodData).length == 0){
      console.log("Editedfood value is now empty")
      return
    }
    api.put(`items/food/${food_id}/`, editedFoodData)
      .then((response) => {
        console.log(response)
        ReloadFoods()
      }) .catch((err) => {
        console.log(err)
      }) .finally (() => {
        console.log("finished edit food request")
      })
  }

  useEffect(() => {
      console.log(`My Edited Food Data:`)
      console.log(editedFoodData)
      HandleEdit()
    },[editedFoodData])
  
  return (
    <Card
    bg='dark'
    text='light'
    border='danger'>
        <Card.Body>
          <Card.Title>{food_name}</Card.Title>
            <ul>
              <li>{`kcal: ${food_data[0].kcal}`}</li>
              <li>{`food_type: ${food_data[0].food_type}`}</li>
              <li>{`saturated_fat: ${food_data[0].saturated_fat}g`}</li>
              <li>{`trans_fat: ${food_data[0].trans_fat}g`}</li>
              <li>{`cholesterol: ${food_data[0].cholesterol}g`}</li>
              <li>{`fiber: ${food_data[0].fiber}g`}</li>
              <li>{`sugar: ${food_data[0].sugar}g`}</li>
              <li>{`protein: ${food_data[0].protein}g`}</li>
            </ul>  
              
            <Button variant='outline-primary' onClick={() => {setShowFoodEdit(true)}}>Edit Food</Button>
            <Button variant='outline-danger' onClick={HandleDelete}>Delete</Button>
            <CreateFood 
              show={showFoodEdit} 
              onHide={() => setShowFoodEdit(false)} 
              ReturnFoodData={setEditedFoodData}
              existingFoodName={food_name}
              existingKcal={food_data[0].kcal}
              existingFoodType={food_data[0].food_type}
              existingSaturatedFat={food_data[0].saturated_fat}
              existingTransFat={food_data[0].trans_fat}
              existingCholesterol={food_data[0].cholesterol}
              existingFiber={food_data[0].fiber}
              existingSugar={food_data[0].sugar}
              existingProtein={food_data[0].protein}
            />
        </Card.Body>
    </Card>
  )
}
