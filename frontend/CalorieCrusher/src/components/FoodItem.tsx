import React from 'react'
import { Button, Card } from 'react-bootstrap'

export default function FoodItem({name, image, nutritionFacts}:{name:string, image:string,  nutritionFacts:any}) {
  return (
    <Card>
        <Card.Img variant="top" src={image} />
        <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>{nutritionFacts}
            </Card.Text>
            <Button variant="primary">Test</Button>
        </Card.Body>
    </Card>
  )
}
