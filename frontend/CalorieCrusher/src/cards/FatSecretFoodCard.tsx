import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import CreateFood from '../components/CreateFood'

export default function FatSecretFoodCard({food_name, food_brand="", food_description, ReturnFoodData}:{food_name:string, food_brand?:string, food_description:string,ReturnFoodData:any}) {
    const [showFoodEdit, setShowFoodEdit] = useState(false) 



    let calories = "";
    let protein = "";
    let charIterator = 0
    let wordIterator = 0
    let numString = ""
    const checkwords = ["Calories: ", "Protein: "]
    let wordMatch = false

    for (let char of food_description){
        if (wordMatch){
            if (char == "." || isNaN(Number(char))){
                if (wordIterator == 0){
                    calories = numString
                }
                if (wordIterator == 1){
                    protein = numString
                }
                wordMatch = false
                numString = ""
                wordIterator++
                charIterator = 0
            } else {
                numString += char
            }
        } else {
            if (char == checkwords[0][charIterator]){
                if(charIterator == checkwords[0].length - 1){
                    wordMatch = true
                } else {
                    charIterator++
                }
                
            } else if (char == checkwords[1][charIterator]){
                if(charIterator == checkwords[1].length - 1){
                    wordMatch = true
                } else {
                    charIterator++
                }
            } else {
                charIterator = 0
            }
        }
    }
    return (
    <>
        <Card
        bg='dark'
        text='light'
        border='danger'>
            <Card.Body>
                <Card.Title>
                    {food_name}
                </Card.Title>
                <Card.Subtitle>
                    {food_brand}
                </Card.Subtitle>
                <Card.Text>
                    {food_description}
                </Card.Text>
            </Card.Body>
            <Button 
            onClick={() => {setShowFoodEdit(true)}}>
                Create new food from item
            </Button>
        </Card>
        <CreateFood 
        show={showFoodEdit} 
        onHide={() => setShowFoodEdit(false)}
        ReturnFoodData={ReturnFoodData}
        existingFoodName={food_name}
        existingKcal={calories}
        existingProtein={protein}
        />
    </>
  )
}
