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
                <a href={recipeUrl} target="_blank">Click here to visit recipe link</a>
            </Card.Footer>
        </Card.Body>
    </Card>
  )
}
