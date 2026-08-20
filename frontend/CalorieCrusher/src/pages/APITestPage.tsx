import React from 'react'
import GetFoodsTest from '../components/GetFoodsTest'
import CreateFoodTest from '../components/CreateFoodTest'
import { useOutletContext } from 'react-router'


export default function APITestPage() {
  const APIContext:string = useOutletContext()
  return (
    <>
        <GetFoodsTest url={APIContext}/>
        <CreateFoodTest url={APIContext}/>
    </>
  )
}
