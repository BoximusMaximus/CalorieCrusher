import React from 'react'
import { Button, Col, FloatingLabel, FormControl, Modal, Row } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';

export default function CreateFood({
        show, 
        onHide, 
        ReturnFoodData, 
        existingFoodName="", 
        existingFoodType="OT",
        existingKcal="", 
        existingSaturatedFat="",
        existingTransFat="",
        existingCholesterol="",
        existingFiber="",
        existingSugar="",
        existingProtein=""
    }:{
        show:boolean, 
        onHide:any, 
        ReturnFoodData:Function,
        existingFoodName?:string, 
        existingFoodType?:string,
        existingKcal?:string, 
        existingSaturatedFat?:string,
        existingTransFat?:string,
        existingCholesterol?:string,
        existingFiber?:string,
        existingSugar?:string,
        existingProtein?:string}) {


    function HandleFoodData(e:any){
        e.preventDefault()
        console.log("Handling Food Data")

        // Read the form data
        const form = e.target
        const formData = new FormData(form)
        const foodData = {
            name:formData.get("food_name"),
            food_type:formData.get("food_type"),
            kcal:formData.get("kcal"),
            saturated_fat:formData.get("saturated_fat"),
            trans_fat:formData.get("trans_fat"),
            cholesterol:formData.get("cholesterol"),
            fiber:formData.get("fiber"),
            sugar:formData.get("sugar"),
            protein:formData.get("protein"),
        }
        ReturnFoodData(foodData)
        onHide()
    }

    return (
    <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        data-bs-theme="dark">
        <Modal.Header >
            <Modal.Title>Food</Modal.Title>
        </Modal.Header>
        
        <Form onSubmit={HandleFoodData}>
            <Row>
            <Col>
            <FloatingLabel
            controlId='foodName'
            label="Food Name:"
            className="mb-3">
                <FormControl defaultValue={existingFoodName}name="food_name" type="textarea"/>
            </FloatingLabel>
            </Col>
            <Col>
            <FloatingLabel
            controlId='foodType'
            label="Food Type:"
            className="mb-3">
                <Form.Select defaultValue={existingFoodType}name="food_type">
                    <option value="OT">Other</option>
                    <option value="FR">Fruit</option>
                    <option value="VE">Vegetable</option>
                    <option value="GR">Grain</option>
                    <option value="DA">Dairy</option>
                    <option value="PR">Protein</option>
                </Form.Select>
            </FloatingLabel>
                </Col>
            </Row>

            <FloatingLabel
                controlId='kcal'
                label="Calories:"
                className="mb-3">
                    <FormControl defaultValue={existingKcal}name="kcal" type="textarea"/>
            </FloatingLabel>    

            <FloatingLabel
                controlId='saturated_fat'
                label="Saturated Fat:"
                className="mb-3">
                    <FormControl defaultValue={existingSaturatedFat}name="saturated_fat" type="textarea"/>
            </FloatingLabel>

            <FloatingLabel
                controlId='trans_fat'
                label="Trans Fat:"
                className="mb-3">
                    <FormControl defaultValue={existingTransFat}name="trans_fat" type="textarea"/>
            </FloatingLabel>

            <FloatingLabel
                controlId='cholesterol'
                label="Cholesterol:"
                className="mb-3">
                    <FormControl defaultValue={existingCholesterol}name="cholesterol" type="textarea"/>
            </FloatingLabel>

            <FloatingLabel
                controlId='fiber'
                label="Fiber:"
                className="mb-3">
                    <FormControl defaultValue={existingFiber} name="fiber" type="textarea"/>
            </FloatingLabel>

            <FloatingLabel
                controlId='sugar'
                label="Sugar:"
                className="mb-3">
                    <FormControl defaultValue={existingSugar}name="sugar" type="textarea"/>
            </FloatingLabel>

            <FloatingLabel
                controlId='protein'
                label="Protein:"
                className="mb-3">
                    <FormControl defaultValue={existingProtein} name="protein" type="textarea"/>
            </FloatingLabel>



        <Modal.Footer>
            <Button variant='secondary' onClick={onHide}>Close</Button>
            <Button variant='primary' type='submit'>Save</Button>
        </Modal.Footer>
        </Form>
    </Modal>
  )
}
