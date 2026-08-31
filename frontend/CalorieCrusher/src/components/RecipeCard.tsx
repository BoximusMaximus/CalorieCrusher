import React from 'react'
import { Card } from 'react-bootstrap'

export default function RecipeCard({recipeName, recipeImageUrl, recipeUrl}:{recipeName:string, recipeImageUrl:string, recipeUrl:string}) {
  return (
    <Card style={{ maxWidth: '20rem' }}>
        <Card.Body>
            <Card.Header>
                {recipeName}
            </Card.Header>
            <Card.Img src={recipeImageUrl}/>
            <Card.Footer>
                {recipeUrl}
            </Card.Footer>
        </Card.Body>
    </Card>
  )
}
