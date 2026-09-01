import axios from 'axios'
import { Button, Form } from 'react-bootstrap'
import RecipeCard from '../cards/RecipeCard'
import { useState } from 'react'

export default function FindRecipe() {

    const [recipes, setRecipes] = useState<any>([])

    function HandleSearch(e:any){
        e.preventDefault()
        console.log("Handling Recipe Data")

        // Read the form data
        const form = e.target
        const formData = new FormData(form)
        const query = formData.get("recipe_search")

        axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
            .then((response) => {
                console.log(response.data)
                setRecipes(response.data.meals[0])
                console.log(recipes)
                ShowRecipes()
            }) .catch((err) => {
                console.log(err)
            }) .finally (() => {
                console.log(query)
                console.log("Seached mealdb for recipe")
            })
    }

    function ShowRecipes(){
        return Object.keys(recipes).length > 0 ? <RecipeCard recipeName={recipes.strMeal} recipeImageUrl={recipes.strMealThumb} recipeUrl={recipes.strSource}/> : <></>
    }
    return (
    <>
        <Form onSubmit={HandleSearch}>
            <Form.Group className="mb-3">
            <Form.Label>Recipe Search</Form.Label>

            <Form.Control
                name='recipe_search'
                placeholder="For example: Pasta"
            />
            </Form.Group>

            <Button type="submit">Search</Button>
        </Form>
        <ShowRecipes/>
    </>
  )
}
