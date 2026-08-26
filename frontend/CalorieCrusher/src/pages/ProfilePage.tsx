import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import CreateFood from '../components/CreateFood'
import { Button } from 'react-bootstrap'

export default function ProfilePage() {

  const { username } = useParams()
  const [showFoodEdit, setShowFoodEdit] = useState(false)
  const [foodData, setFoodData] = useState({})

  const GetFoodData = (data:Object) => {
    setFoodData(data)
  }

  useEffect(() => {
    console.log(foodData)
  },[foodData])

  return (
    <>
      <div>{username}</div>
      <Button variant='outline-primary' onClick={() => {setShowFoodEdit(true)}}>Create Food</Button>
      <CreateFood show={showFoodEdit} onHide={() => setShowFoodEdit(false)} foodData={GetFoodData}/>
    </>
  )
}
