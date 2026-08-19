import './App.css'
import { Outlet } from "react-router"
import LinkBar from './components/LinkBar'
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  return (
    <>
      <LinkBar/>
      <Outlet />
    </>
  )
}

export default App
