import React from 'react'
import GetFoodsTest from '../components/GetFoodsTest'
import CreateFoodTest from '../components/CreateFoodTest'
import { Button } from 'react-bootstrap'
import api from '../axiosinterceptors'
import TestFatSecretTokenGen from '../components/TestFatSecretTokenGen'
// import process from 'node:process'


export default function APITestPage() {
  return (
    <>
        <GetFoodsTest />
        <CreateFoodTest />
        <TestFatSecretTokenGen/>
    </>
  )
}
