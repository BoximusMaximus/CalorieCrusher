import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'

export default function DemoMealTrackerPage() {
  let navigate = useNavigate()
    // This will be for users who are NOT logged in to get a preview of a mealtracker
  return (
    <div>
      <h1>This is the meal tracker page! It appears youre not logged in.</h1>
      <p>Logging in and creating an account allows you to track and CRUSH your calories. Would you like to login now?</p>
      <Button onClick={() => navigate("/login")}>Login?</Button>


    </div>
  )
}
