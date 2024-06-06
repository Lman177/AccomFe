import React, { useContext } from "react"
import MainHeader from "../layout/MainHeader"
import HotelService from "../common/HotelService"
import Parallax from "../common/Parallax"
import RoomCarousel from "../common/RoomCarousel"
import RoomCarousel2 from "../common/RoomCarousel2"
import RoomSearch from "../common/RoomSearch"
import { useLocation } from "react-router-dom"
import { useAuth } from "../auth/AuthProvider"
const Home = () => {
	const location = useLocation()

	const message = location.state && location.state.message
	const currentUser = localStorage.getItem("userEmail")
	return (
		<section>
			{/* {message && <p className="text-warning px-5">{message}</p>}
			{currentUser && (
				<h6 className="text-success text-center"> You are logged-In as {currentUser}</h6>
			)} */}
			<MainHeader />
			<div className="container">
				<RoomSearch />
				<RoomCarousel2 />
				<RoomCarousel />
				{/* <Parallax />
				<HotelService />
				<Parallax /> */}
				
			</div>
		</section>
	)
}

export default Home