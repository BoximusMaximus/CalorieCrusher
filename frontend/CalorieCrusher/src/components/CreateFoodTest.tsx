import React from 'react'
import { Button, FormLabel } from 'react-bootstrap'
import api from '../axiosinterceptors';

export default function CreateFoodTest() {

    async function handleSubmit(e:any){
        e.preventDefault();
        // Read the form data
        const form = e.target;
        const formData = new FormData(form);
        const query = {
            food_type:formData.get("food_type"),
            name:formData.get("food_name"),
            kcal:formData.get("kcal"),
            saturated_fat:formData.get("saturated_fat"),
            trans_fat:formData.get("trans_fat"),
            cholesterol:formData.get("cholesterol"),
            fiber:formData.get("fiber"),
            sugar:formData.get("sugar"),
            protein:formData.get("protein"),
        }
        console.log(query);
        await api.post("items/food/create/", query)
        .then((response) => {
            console.log(response.data)
        }) .catch((err) => {
            console.log(err)
        }) .finally(() => { 
            console.log("finished 'create food' request")
        })
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
                <input name="kcal" placeholder='0' defaultValue={0}/>
                <br/>
                <label>Saturated Fat</label>
                <br/>
                <input name="saturated_fat" placeholder='0' defaultValue={0}/>
                <br/>
                <label>TransFat</label>
                <br/>
                <input name="trans_fat" placeholder='0' defaultValue={0}/>
                <br/>
                <label>Cholesterol</label>
                <br/>
                <input name="cholesterol" placeholder='0' defaultValue={0}/>
                <br/>
                <label>Dietary Fiber</label>
                <br/>
                <input name="fiber" placeholder='0' defaultValue={0}/>
                <br/>
                <label>Total Sugar</label>
                <br/>
                <input name="sugar" placeholder='0' defaultValue={0}/>
                <br/>
                <label>Protein</label>
                <br/>
                <input name="protein" placeholder='0' defaultValue={0}/>
                <br/>


                <Button type='submit'>CreateFood</Button>
            </form>
            
        </div>
    </>
  )
}
