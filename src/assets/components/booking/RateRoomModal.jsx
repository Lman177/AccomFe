import React, { useState } from 'react';
import { Modal, Rate, Input, notification } from 'antd';

const RateRoomModal = ({ isVisible, onRate, onCancel, roomId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleRate = async () => {
    try {
      // Assuming you have a function to send the rating to the backend
      await onRate(roomId, rating, comment);
      notification.success({
        message: 'Success',
        description: 'Your review has been added successfully!',
      });
      onCancel(); // Close the modal after submission
    } catch (error) {
      notification.error({
        message: 'Error',
        description: error.message,
      });
    }
  };

  return (
    <Modal
      title="Rate Your Stay"
      visible={isVisible}
      onOk={handleRate}
      onCancel={onCancel}
      okText="Submit Review"
      cancelText="Cancel"
    >
      <div>
        <Rate onChange={setRating} value={rating} />
        <Input.TextArea
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Leave a comment..."
          style={{ marginTop: 16 }}
        />
      </div>
    </Modal>
  );
};

export default RateRoomModal;
