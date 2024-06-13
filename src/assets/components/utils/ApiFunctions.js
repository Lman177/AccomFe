import axios from "axios"

export const api = axios.create({
    baseURL : "http://localhost:8080"
})

export const getHeader = () => {
	const token = localStorage.getItem("token")
	return {
		Authorization: `Bearer ${token}`,
		"Content-Type": "multipart/form-data"
	}
}


/* This function adds a new room room to the database */
export async function addRoom(photo, roomTypeName, roomPrice, description, roomAddress, roomLocation, roomCapacity) {
	const formData = new FormData()
	formData.append("photo", photo)
	formData.append("roomTypeName", roomTypeName)
	formData.append("roomPrice", roomPrice)
	formData.append("description", description)
	formData.append('roomAddress', roomAddress);
  	formData.append('roomLocation', roomLocation);
	formData.append('roomCapacity', roomCapacity);

	  const response = await api.post("/rooms/add/new-room", formData,{
		headers: getHeader()
	})
	if (response.status === 201) {
		return true
	} else {
		return false
	}
}


/* This function gets all room types from thee database */
export async function getRoomTypes() {
    try {
        const response = await api.get("/room-types/all-room-types");
        return response.data;
    } catch (error) {
        // console.error("Error fetching room types:", error?.response || error.message || error);
        throw new Error("Error fetching room types");
    }
}

export async function getLocation() {
    try {
        const response = await api.get("/locations/all");
        return response.data;
    } catch (error) {
        throw new Error("Error fetching location");
    }
}


/* This function gets all rooms from the database */
export async function getAllRooms() {
	try {
		const result = await api.get("rooms/all-rooms")
		return result.data
	} catch (error) {
		throw new Error("Error fetching rooms")
	}
}

/* This function gets all available rooms from the database */
export async function getAllAvaRooms() {
	try {
		const result = await api.get("rooms/available")
		return result.data
	} catch (error) {
		throw new Error("Error fetching rooms")
	}
}
/** This function deletes a room by the Id */
export async function deleteRoom(roomId){
	try{
		const result = await api.delete(`/rooms/delete/room/${roomId}`)
		return result.data
	}catch(error){
		throw new Error(`Error deleting room & ${error.message}`)
	}
}
// This funtion update a room 
export async function updateRoom(roomId, roomData){
	const formData = new FormData()
	formData.append("roomType", roomData.roomTypeName)
	formData.append("roomPrice", roomData.roomPrice)
	formData.append("photo", roomData.photo)
	formData.append("description", roomData.description)
	formData.append("roomAddress", roomData.roomAddress)
	formData.append("roomLocation", roomData.roomLocation)
	const response = await api.put(`/rooms/update/${roomId}`, formData)
	return response
}

//This function get a room by id
export async function getRoomById(roomId){
	try{
		const result = await api.get(`/rooms/room/${roomId}`)
		return result.data
	} catch(error) {
		throw new Error(`Error fetching room ${error.message}`)

	}
}

/* This function gets all bokings from the database */
export async function getAllBookings() {
	try {
		const result = await api.get("/bookings/all-bookings", {
			// headers: getHeader()
		})
		return result.data
	} catch (error) {
		throw new Error(`Error fetching bookings : ${error.message}`)
	}
}

/* This function get booking by the cnfirmation code */
export async function getBookingByConfirmationCode(confirmationCode) {
	try {
		const result = await api.get(`/bookings/confirmation/${confirmationCode}`)
		return result.data
	} catch (error) {
		if (error.response && error.response.data) {
			throw new Error(error.response.data)
		} else {
			throw new Error(`Error find booking : ${error.message}`)
		}
	}
}

/* This is the function to cancel user booking */
export async function cancelBooking(bookingId) {
	try {
		const result = await api.delete(`/bookings/booking/${bookingId}/delete`)
		return result.data
	} catch (error) {
		throw new Error(`Error cancelling booking :${error.message}`)
	}
}

/* This function gets all availavle rooms from the database with a given date and a room type */
export async function getAvailableRooms(checkInDate, checkOutDate, roomType, roomLocation, minPrice, maxPrice) {
	const result = await api.get(
		`rooms/available-rooms?checkInDate=${checkInDate}
		&checkOutDate=${checkOutDate}&roomType=${roomType}&roomLocation=${roomLocation}&minPrice=${minPrice}&maxPrice=${maxPrice}`
	)
	return result
}
/* This function saves a new booking to the databse */
export async function bookRoom(roomId, booking) {
	try {
		const response = await api.post(`/bookings/room/${roomId}/booking`, booking)
		return response.data
	} catch (error) {
		if (error.response && error.response.data) {
			throw new Error(error.response.data)
		} else {
			throw new Error(`Error booking room : ${error.message}`)
		}
	}
}



/* This function register a new user */
export async function registerUser(registration) {
	try {
		const response = await api.post("/auth/register-user", registration)
		return response.data
	} catch (error) {
		if (error.reeponse && error.response.data) {
			throw new Error(error.response.data)
		} else {
			throw new Error(`User email or phone number already exists`)
		}
	}
}

/* This function login a registered user */
export async function loginUser(login) {
	try {
		const response = await api.post("/auth/login", login)
		if (response.status >= 200 && response.status < 300) {
			return response.data
		} else {
			return null
		}
	} catch (error) {
		console.error(error)
		return null
	}
}

/*  This is function to get the user profile */
export async function getUserProfile(userEmail, token) {
	try {
		const response = await api.get(`users/profile/${userEmail}`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		throw error
	}
}

/* This isthe function to delete a user */
export async function deleteUser(userEmail) {
	try {
		const response = await api.delete(`/users/delete/${userEmail}`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		return error.message
	}
}

/* This is the function to get a single user */
export async function getUser(userEmail, token) {
	try {
		const response = await api.get(`/users/${userEmail}`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		throw error
	}
}

/* This is the function to get user bookings by the user id */
export async function getBookingsByUserId(userEmail, token) {
	try {
		const response = await api.get(`/bookings/user/${userEmail}/bookings`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		console.error("Error fetching bookings:", error.message)
		throw new Error("Failed to fetch bookings")
	}
}

export async function getUserRoom(userId, token ){
	try {
		const response = await api.get(`/rooms/${userId}`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		throw new Error(`Error fetching user room : ${error.message}`)
	}
}



export async function getAllUser() {
	try {
	  const response = await api.get('/users/all', {
		// headers: getHeader()
	  });
	  console.log('API Response:', response);
	  return response.data;
	} catch (error) {
	  console.error('Error fetching user:', error.response);
	  throw new Error(`Error fetching user: ${error.response ? error.response.status : error.message}`);
	}
  }

  export async function getUserOfRoomById(roomId) {
	try {
	  const response = await api.get(`/users/owner/${roomId}`, {
		headers: getHeader()
	  });
	  return response.data;
 	 }
	 catch (error) {
		 new Error(`Error fetching user: ${error.message}`);
	}
}

export async function getBookingOfOwner() {
	try {
		const response = await api.get('/bookings/get', {
			headers: getHeader()
		});
		return response.data;
	} catch (error) {
		throw new Error(`Error fetching booking: ${error.message}`);
	}
}

