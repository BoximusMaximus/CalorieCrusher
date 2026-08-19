import React from 'react'
import { Button, FormLabel } from 'react-bootstrap'

export default function CreateFoodTest({url}:{url:string}) {

    function handleSubmit(e:any){
        e.preventDefault();
        // Read the form data
        const form = e.target;
        const formData = new FormData(form);
        const query = {
            food_type:formData.get("food_type"),
            food_name:formData.get("food_name"),
            kcal:formData.get("kcal")
        }
        console.log(query);
    }


  return (
    <>
        <div>
            <form onSubmit={handleSubmit}>
                <label>Food Type:</label>
                <br/>
                <select name="food_type">
                <option value="VE">Vegetable</option>
                <option value="FR">Fruit</option>
                <option value="GR">Grain</option>
                <option value="DA">Dairy</option>
                <option value="PR">Protein</option>
                <option value="OT">Other</option>
                </select>
                <br/>
                <label>Food name</label>
                <br/>
                <input name="food_name" placeholder='Food Name'/>
                <br/>
                <label>Kcal</label>
                <br/>
                <input name="kcal" placeholder='0'/>
                <br/>
                <Button type='submit'>CreateFood</Button>
            </form>
            
        </div>
    </>
  )
}
