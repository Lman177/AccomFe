import { useState } from 'react'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "/node_modules/bootstrap/dist/js/bootstrap.min.js"
import AddRoom from './assets/components/room/AddRoom'
import ExistingRooms2 from './assets/components/room/UsersRoom'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import EditRoom from './assets/components/room/EditRoom'
import Home from './assets/components/home/Home'
import NavBar from './assets/components/layout/NavBar'
import RoomListing from './assets/components/room/RoomListing'
import Admin from './assets/components/admin/Admin'
import Checkout from './assets/components/booking/Checkout'
import BookingSuccess from './assets/components/booking/BookingSuccess'
import Bookings from './assets/components/booking/Booking'
import FindBooking from './assets/components/booking/FindBooking'
import { AuthProvider } from './assets/components/auth/AuthProvider'
import Login from "./assets/components/auth/Login"
import Registration from "./assets/components/auth/Registration"
import Profile from "./assets/components/auth/Profile"
import RequireAuth from "./assets/components/auth/RequireAuth"
import AdminPanel from "./assets/components/admin/AdminPanel"
import AdminRooms from './assets/components/admin/AdminRooms'
// import Footer from './assets/components/layout/Footer'
import RoomDetails from "./assets/components/room/RoomDetails"
import Layout from './assets/components/layout/Layout'
import UserList from './assets/components/User/UserList'
import WelcomePage from './assets/components/home/WelcomePage'
import User from './assets/components/User/User'
import ExistingBookingOfOwner from './assets/components/booking/ExistingBookingOfOwner'
function App() {
  return (
	<AuthProvider>
    <main>
      <Router>
        <Layout>
          <Routes>
          <Route path="/welcome" element={<WelcomePage/>} />
            <Route path="/" element={<Home />} />
            <Route path="/edit-room/:roomId" element={<EditRoom />} />
            <Route path="/existing-rooms" element={<ExistingRooms2 />} />
            <Route path="/add-room" element={<AddRoom />} />
            <Route path="/user" element={<User />} />
            <Route
              path="/book-room/:roomId"
              element={
                <RequireAuth>
                  <Checkout />
                </RequireAuth>
              }
            />
            <Route path="/browse-all-rooms" element={<RoomListing />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin-panel" element={
            <RequireAuth adminOnly={true}>
              <AdminPanel />
            </RequireAuth>
            } />

            <Route path="/admin-rooms" element={
            <RequireAuth>
              <AdminRooms />
            </RequireAuth>
            } />
            <Route path="/booking-success" element={<BookingSuccess /> } />
            <Route path="/existing-bookings" element={<Bookings />} />
            <Route path="/booking-owner" element={<ExistingBookingOfOwner />} />
            <Route path="/find-booking" element={<FindBooking />} />
            <Route path="/view-room/:roomId" element={<RoomDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user-list" element={<UserList />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/logout" element={<FindBooking />} />
          </Routes>
        </Layout>
      </Router>
    </main>
  </AuthProvider>
  )
}

export default App
