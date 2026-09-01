import { useEffect, useState } from 'react'
import { Button, Col, Row, Tab, Tabs } from 'react-bootstrap'
import CreateFood from '../components/CreateFood'
import api from '../axiosinterceptors'
import FoodItem from '../cards/FoodItem'
import SearchFatSecret from '../components/SearchFatSecret'
import MealManager from '../components/MealManager'

export default function MealTrackerPage() {
  const [newFoodData, setNewFoodData] = useState({})
  const [showFoodCreator, setShowFoodCreator] = useState(false)
  const [allFoods, setAllFoods] = useState<any>([])
  const [key, setKey] = useState("myfood")

  async function GetFoods () {
    await api.get("items/food/")
      .then((response) => {
          console.log(response.data)
          setAllFoods(response.data.map((food:any) => {
            return {
              food_id:food.id, 
              food_name:food.name, 
              food_data: [
                {
                  kcal:food.kcal,
                  food_type:food.food_type,
                  saturated_fat:food.saturated_fat,
                  trans_fat:food.trans_fat,
                  cholesterol:food.cholesterol,
                  fiber:food.fiber,
                  sugar:food.sugar,
                  protein:food.protein
                }
              ]
              }}))
      })
      .catch((error) => {
          console.error("Request failed:", error.message)
      })
      .finally(() => {
          console.log("Request complete")
      })
  }

  async function PostFood(){
    if (Object.keys(newFoodData).length == 0){
      return
    }
    await api.post("items/food/create/", newFoodData)
      .then((response) => {
        console.log(response)
        setNewFoodData({})
      }) .catch ((err) => {
        console.log(err)
      }) .finally(() => {
        console.log("sent post request for new food")
      })
  }

  function ShowFoods(){
    let key = 0
    const listItems = allFoods.map((food:any) => <FoodItem key={key++} food_data={food.food_data} food_name={food.food_name} food_id={food.food_id} ReloadFoods={GetFoods}/>)
    return <div>{listItems}</div>
  }

  useEffect(() => {
    PostFood()
    GetFoods()
  },[newFoodData])

  useEffect(() => {
    GetFoods()
  },[])


  return (
    <>
    <Row>
        <Col>
          <Tabs
          activeKey={key}
          onSelect={(k:any) => setKey(k)}
          id="Login or Signup"
          className="mb-4"
          fill> 
          <Tab eventKey="myfood" title="MyFood" >
            <Button size='lg' onClick={GetFoods}>Refresh Foods</Button>
            <Button size='lg' onClick={() => {setShowFoodCreator(true)}}>Create New Food</Button>
            <hr className="my-2" />
            <h1>My Foods</h1>
            <hr className="my-2" />
            <ShowFoods/>
          </Tab>
          <Tab eventKey="findfood" title="Find Food">
              <SearchFatSecret ReturnFoodData={setNewFoodData}/>
          </Tab>
        </Tabs>
          
          
        </Col>
        <Col xs={5}>
          
        </Col>
        <Col>
          <MealManager/>
        </Col>
    </Row>
    <CreateFood show={showFoodCreator} onHide={() => setShowFoodCreator(false)} ReturnFoodData={setNewFoodData}/>
    </>
  )
}
