import {
  createBrowserRouter,
} from "react-router";
import App from "./App";
import HomePage from "./pages/HomePage";
import APITestPage from "./pages/APITestPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
        {index: true, element:<HomePage/>},
        {path: "apitest", element:<APITestPage/>},
        {path: "login", element:<LoginPage/>},
        {path: "profile/:username", element:<ProfilePage/>}
    ]
  },
]);

export default router