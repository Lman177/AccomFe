import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { getRoomReviews } from '../utils/ApiFunctions';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const ReviewBlock = ({ roomId }) => {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRoomReviews = async () => {
            try {
                const response = await getRoomReviews(roomId);
                setReviews(response);
                setIsLoading(false);
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
            }
        };
        fetchRoomReviews();
    }, [roomId]);

    if (isLoading) return <p>Loading review information...</p>;
    if (error) return <p>Error: {error}</p>;

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className="reviews-container mt-5">
            <h4>Room Reviews</h4>
            <Slider {...settings}>
                {reviews.length > 0 ? (
                    reviews.map((review, index) => (
                        <div className="review-block" key={index}>
                            <div className="review-header">
                                <h5>{review.guestName}</h5>
                                <p className="review-date">{new Date(review.createdDate.join('-')).toLocaleDateString()}</p>
                            </div>
                            <div className="review-body">
                                <p><strong>Review:</strong> {review.comment}</p>
                                <div className="rating">
                                    <strong>Rating: </strong>
                                    {Array(5).fill(0).map((_, idx) => (
                                        <FontAwesomeIcon 
                                            key={idx} 
                                            icon={faStar} 
                                            className={idx < review.rating ? "star-rated" : "star-unrated"} 
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No reviews available for this room.</p>
                )}
            </Slider>
            <style jsx>{`
                .reviews-container {
                    width: 90%;
                    margin: 0 auto;
                    margin-bottom: 50px;
                }
                .review-block {
                    border: 1px solid #ddd;
                    padding: 20px;
                    border-radius: 10px;
                    background-color: white;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    margin: 10px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    position: relative;
                }
                .review-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 10px;
                }
                .review-header h5 {
                    margin: 0;
                    font-size: 1.2em;
                    color: #333;
                }
                .review-date {
                    font-size: 0.9em;
                    color: #888;
                }
                .review-body p {
                    margin: 5px 0;
                }
                .slick-slide {
                    display: flex;
                    justify-content: center;
                }
                .rating {
                    display: flex;
                    align-items: center;
                }
                .star-rated {
                    color: gold;
                }
                .star-unrated {
                    color: #ccc;
                }
            `}</style>
        </div>
    );
};

export default ReviewBlock;
