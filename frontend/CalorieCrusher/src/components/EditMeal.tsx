import { useEffect, useState } from 'react'
import { Button, Col, FloatingLabel, Form, FormControl, Modal, Row } from 'react-bootstrap'
import api from '../axiosinterceptors'
import MealFoodItem from '../cards/MealFoodItem'

export default function EditMeal({meal_id=-1, show, onHide, ReturnMealData, existingMealName=""}:{meal_id?:number, show:any, onHide:any, ReturnMealData:any, existingMealName?:string}) {
    
    const [allFoods, setAllFoods] = useState<any[]>([])
    const [attachedFoodIds, setAttachedFoodIds] = useState<any[]>([])
    
    function HandleMealData(e:any){
        e.preventDefault()
        console.log("Handling Food Data")

        // Read the form data
        const form = e.target
        const formData = new FormData(form)
        const mealName = {
            name: formData.get("meal_name")
        }
        ReturnMealData(mealName)
        onHide()
    }

    async function GetAllFoods(){
        await api.get("items/food/")
        .then((response) => {
            console.log(response.data)
            setAllFoods(response.data)
        })
        .catch((err) => {
            console.log(err.response?.data)
        })
    }

    async function GetAttachedFoodIds(){
        if (meal_id === -1){
            return
        }
        await api.get(`items/food_item/by_meal/${meal_id}/`)
            .then((response) => {
                const foodIds = response.data.map(
                    (foodItem:any) => foodItem.food
                )

                setAttachedFoodIds(foodIds)
            })
            .catch((err) => {
                console.log(err.response?.data)
            })
    }

    useEffect(() => {
        if (show && meal_id !== -1){
            GetAllFoods()
            GetAttachedFoodIds()
        }
    }, [show, meal_id])

    function ShowUnassignedFoods(){
        if (meal_id === -1){
            return <></>
        }

        const unassignedFoods = allFoods.filter(
            (food:any) => !attachedFoodIds.includes(food.id)
        )

        if (unassignedFoods.length === 0){
            return <p>All foods are assigned to this meal.</p>
        }

        const foodItems = unassignedFoods.map((food:any) => (
            <MealFoodItem
                key={food.id}
                meal_id={meal_id}
                food_id={food.id}
                food_name={food.name}
                attached={false}
                ReloadMealFoods={GetAttachedFoodIds}
            />
        ))

        return <div>{foodItems}</div>
    }

    function ShowAssignedFoods(){
        if (meal_id === -1){
            return <></>
        }

        const assignedFoods = allFoods.filter(
            (food:any) => attachedFoodIds.includes(food.id)
        )

        if (assignedFoods.length === 0){
            return <p>No foods assigned to this meal.</p>
        }

        const foodItems = assignedFoods.map((food:any) => (
            <MealFoodItem
                key={food.id}
                meal_id={meal_id}
                food_id={food.id}
                food_name={food.name}
                attached={true}
                ReloadMealFoods={GetAttachedFoodIds}
            />
        ))

        return <div>{foodItems}</div>
    }

    return (
        <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        data-bs-theme="dark">
        <Modal.Header>
            <Modal.Title>
                Edit Meal
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col>
                    <Form 
                    id="mealNameForm"
                    onSubmit={HandleMealData}>
                        <FloatingLabel
                        controlId='mealName'
                        label="Meal Name:"
                        className="mb-3">
                        <FormControl defaultValue={existingMealName}name="meal_name" type="textarea"/>
                    </FloatingLabel>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h3>{meal_id === -1 ? "" : "Assigned Foods"}</h3>
                    <ShowAssignedFoods/>
                </Col>
                <Col>
                    <h3>{meal_id === -1 ? "" : "Unassigned Foods"}</h3>
                    <ShowUnassignedFoods/>
                </Col>
            </Row>
            
        </Modal.Body>
        <Modal.Footer>
            <Button variant='secondary' onClick={onHide}>Close</Button>
            <Button variant='primary' type='submit' form='mealNameForm'>Save</Button>
        </Modal.Footer>
    </Modal>
  )
}
