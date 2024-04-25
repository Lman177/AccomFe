import React from 'react'
import { Card, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const RoomCard = ({room}) => {
  ////TODO: Add room information here
  return (
    <Col>
    
    <Card key={room.id} className='mb-4' xs={12}>
       <Card.Body className='d-flex flex-wrap align-items-center'>
        <div className='flex-shirk-0 mr-3 mb-3 md-0'>
            <Card.Img
            variant='top'
            src={`data:image/png;base64, ${room.photo}`}
            alt='roomPhoto'
            style={{width: '100%', maxWidth: '200px', height: 'auto'}}/>
        </div>
        <div className='flex-grow-1 ml-3 px-5'>
            <Card.Title className='hotel-color'>{room.roomType}</Card.Title>
            <Card.Title className='hotel-color'>{room.roomPrice}</Card.Title>
            <Card.Text>Some room infor goes here</Card.Text> 
        </div>
        <div className='flex-shrink-0 mt-3'>
            <Link to={`booking/${room.id}`} className='btn btn-hotel btn-sm'>
                Book Now
            </Link>

        </div>
       </Card.Body>
    </Card>
    
    </Col>
  )
}

export default RoomCard