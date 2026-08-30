import {
  createBrowserRouter,
} from "react-router";
import App from "./App";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import MealTrackerPage from "./pages/MealTrackerPage";
import DemoMealTrackerPage from "./pages/DemoMealTrackerPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
        {index: true, element:<HomePage/>},
        {path: "login", element:<LoginPage/>},
        {path: "profile/:username", element:<ProfilePage/>},
        {path: "mealtracker/:username", element:<MealTrackerPage/>},
        {path: "mealtrackerdemo", element:<DemoMealTrackerPage/>}
    ]
  },
]);

export default router