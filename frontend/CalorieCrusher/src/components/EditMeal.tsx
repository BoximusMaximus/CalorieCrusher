import React from 'react'
import { Button, Col, FloatingLabel, Form, FormControl, Modal, Row } from 'react-bootstrap'

export default function EditMeal({show, onHide, ReturnMealData, existingMealName=""}:{show:any, onHide:any, ReturnMealData:any, existingMealName?:string}) {
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
                    
                </Col>
                <Col>
                    
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
