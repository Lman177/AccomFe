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
import Bookings from './assets/components/booking/Booking'
import FindBooking from './assets/components/booking/FindBooking'
import { AuthProvider } from './assets/components/auth/AuthProvider'
import Login from "./assets/components/auth/Login"
import Registration from "./assets/components/auth/Registration"
import Profile from "./assets/components/auth/Profile"
import RequireAuth from "./assets/components/auth/RequireAuth"
import AdminPanel from "./assets/components/admin/AdminPanel"
// import Footer from './assets/components/layout/Footer'


function App() {
  return (
	<AuthProvider>
	<main>
		<Router>
			<NavBar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/edit-room/:roomId" element={<EditRoom />} />
				<Route path="/existing-rooms" element={<ExistingRooms />} />
				<Route path="/add-room" element={<AddRoom />} />

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
				<Route path="/admin-panel" element={<AdminPanel />} />

				<Route path="/booking-success" element={<BookingSuccess />} />
				<Route path="/existing-bookings" element={<Bookings />} />
				<Route path="/find-booking" element={<FindBooking />} />

				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Registration />} />

				<Route path="/profile" element={<Profile />} />
				<Route path="/logout" element={<FindBooking />} />
			</Routes>
		</Router>
		
	</main>
</AuthProvider>
  )
}

export default App
