import { useState } from 'react'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "/node_modules/bootstrap/dist/js/bootstrap.min.js"
import AddRoom from './assets/components/room/AddRoom'
import ExistingRooms from './assets/components/room/ExistingRooms'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"


function App() {
  return (
<Router>
  <AddRoom />
  <ExistingRooms/>
</Router>
  )
}

export default App
