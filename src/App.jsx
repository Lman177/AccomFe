import { useState } from 'react'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "/node_modules/bootstrap/dist/js/bootstrap.min.js"
import AddRoom from './assets/components/room/AddRoom'
import ExistingRooms from './assets/components/room/ExistingRooms'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import EditRoom from './assets/components/room/EditRoom'
import Home from './assets/components/home/Home'


function App() {
  return (
    <>
      <main>
        <Router>
          <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/edit-room/:roomId" element={<EditRoom />} />
              <Route path="/existing-rooms" element={<ExistingRooms />} />
              
          
          </Routes>
        </Router>
      </main>
      
     
    </>
  )
}

export default App
