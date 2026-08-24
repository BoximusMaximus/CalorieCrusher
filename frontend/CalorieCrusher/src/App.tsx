import './App.css'
import { Outlet } from "react-router"
import LinkBar from './components/LinkBar'
import "bootstrap/dist/css/bootstrap.min.css"
import { createElement } from 'react'

function App() {
  const calorieCrusherAPIUrl = "http://projects-test:8000/api/v1/"
  return (
    <>
      <LinkBar />
      <Outlet  />
    </>
  )
}

export default App
