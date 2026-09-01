import React from 'react'
import { Button, Card } from 'react-bootstrap'

export default function MealCard({meal_id, meal_name, total_calories=0}:{meal_id:number, meal_name:string, total_calories?:number}) {
  return (
    <>
      <Card
      text='light'>
        <Card.Body>
          <Card.Title>
            {meal_name}
          </Card.Title>
          <Card.Subtitle>
            Calories:{total_calories}
          </Card.Subtitle>
          <Button variant='outline-primary'>Edit</Button>
          <Button variant='outline-danger'>Delete</Button>
        </Card.Body>
      </Card>
    </>
  )
}
