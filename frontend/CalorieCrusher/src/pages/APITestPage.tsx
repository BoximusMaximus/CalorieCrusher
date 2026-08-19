import React from 'react'
import GetFoodsTest from '../components/GetFoodsTest'
import CreateFoodTest from '../components/CreateFoodTest'

export default function APITestPage() {
    const testingURL = "http://localhost:8000/api/v1/"
  return (
    <>
        <GetFoodsTest url={testingURL}/>
        <CreateFoodTest url={testingURL}/>
    </>
  )
}
