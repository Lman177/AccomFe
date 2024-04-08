import React, {useState} from 'react'
import { getRoomById, updateRoom } from '../utils/ApiFunctions'

const EditRoom = () => {

    const AddRoom = () => {
        const [newRoom, setRoom] = useState({
            photo: null,
            roomType: "",
            roomPrice: ""
        })
    
        const [successMessage, setSuccessMessage] = useState("")
        const [errorMessage, setErrorMessage] = useState("")
        const [imagePreview, setImagePreview] = useState("")
  
        const handleImageChange = (e) => {
            const selectedImage = e.target.files[0]
            setRoom({ ...room, photo: selectedImage })
            setImagePreview(URL.createObjectURL(selectedImage))
        }
        const handleInputChange = (e) => {
            const {name, value} = e.target
            setRoom({ ...room, [name]: value })
        }

        const handleSubmit = async (e) => {
            e.preventDefault()
            try {
                const success = await updateRoom(roomId, room)
                if (Response.status === 200) {
                    setSuccessMessage("Room updated successfully!")
                    const updateRoomData = await getRoomById(roomId)
                    setRoom(updatedRoomData)
                    setImagePreview(updateRoomData.photo)
                    setErrorMessage("")
                } else {
                    setErrorMessage("Error updating room")
                }
            } catch (error) {
                console.log(error)
                setErrorMessage(error.message)
            }
            
        }

                return (
            <div>
                <h2>
                    Edit Room
                </h2>
            </div>
        )
    }
}
export default EditRoom