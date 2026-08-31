import React from 'react'
import api from '../axiosinterceptors'

export default function MealManager() {
  async function CreateMeal(){
    api.post("items/meal/create/", )
  }

  return (
    <>
        
    </>
  )
}
