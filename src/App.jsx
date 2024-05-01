import { useState } from 'react'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "/node_modules/bootstrap/dist/js/bootstrap.min.js"
import AddRoom from './assets/components/room/AddRoom'
import ExistingRooms from './assets/components/room/ExistingRooms'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import EditRoom from './assets/components/room/EditRoom'
import Home from './assets/components/home/Home'
import NavBar from './assets/components/layout/NavBar'
import RoomListing from './assets/components/room/RoomListing'
import Admin from './assets/components/admin/Admin'
import Checkout from './assets/components/booking/Checkout'
import BookingSuccess from './assets/components/booking/BookingSuccess'


function App() {
  return (
    <>
      <main>
        <Router>
          <NavBar/>
          <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/edit-room/:roomId" element={<EditRoom />} />
              <Route path="/existing-rooms" element={<ExistingRooms />} />
              <Route path="/add-room" element={<AddRoom />} />
              <Route path="/book-room/:roomId" element={<Checkout />} />
              <Route path="/browse-all-rooms" element={<RoomListing />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/booking-success" element={<BookingSuccess />} />

          
          </Routes>
          
        </Router>
        
      </main>
      
     
    </>
  )
}

export default App
