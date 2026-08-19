import './App.css'
import { Outlet } from "react-router"
import LinkBar from './components/LinkBar'

function App() {
  return (
    <>
      <LinkBar/>
      <Outlet/>
    </>
  )
}

export default App
