import React, { useState, useEffect } from 'react';
import { getRoomReviews } from '../utils/ApiFunctions';
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

    useEffect(() => {
        const interval = setInterval(() => {
            setReviews((prevReviews) => {
                if (prevReviews.length > 0) {
                    const [first, ...rest] = prevReviews;
                    return [...rest, first];
                }
                return prevReviews;
            });
        }, 3000); // Change slide every 3 seconds
        return () => clearInterval(interval);
    }, [reviews]);

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (reviews.length === 0) {
        return <div>This room has not been reviewed yet.</div>;
    }

    return (
        <div className="review-block">
            <div className="review-container">
                {reviews.concat(reviews).map((review, index) => (
                    <div key={index} className="review-card">
                        <p className="review-guest"><strong>Guest Name:</strong> {review.guestName}</p>
                        <div className="rating">
                            {Array(5).fill(0).map((_, idx) => (
                                <FontAwesomeIcon 
                                    key={idx} 
                                    icon={faStar} 
                                    className={idx < review.rating ? "star-rated" : "star-unrated"} 
                                />
                            ))}
                        </div>
                        <p className="review-comment"><strong>Comment:</strong> {truncateText(review.comment, 100)}</p>
                        <p className="review-date"><strong>Date:</strong> {new Date(review.createdDate).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>

            <style jsx>{`
                .review-block {
                    display: flex;
                    align-items: center;
                    overflow: hidden;
                    width: 100%;
                    position: relative;
                    margin: 1em 0;
                    margin-bottom: 2em;
                }

                .review-container {
                    display: flex;
                    width: 100%;
                    animation: slide 40s linear infinite;
                }

                @keyframes slide {
                    0% { transform: translateX(0%); }
                    50% { transform: translateX(-50%); }
                    100% { transform: translateX(-100%); }
                }

                .review-card {
                    min-width: 200px;
                    box-sizing: border-box;
                    padding: 1em;
                    border: 1px solid #ccc;
                    margin: 0 0.5em;
                    background-color: #fff;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    flex: 0 0 auto;
                }

                .review-guest,
                .review-rating,
                .review-comment,
                .review-date {
                    margin: 0.5em 0;
                }

                .review-guest {
                    font-weight: bold;
                    font-size: 1.1em;
                }

                .review-rating {
                    display: flex;
                    align-items: center;
                }

                .star-rated {
                    color: gold;
                }

                .star-unrated {
                    color: #ccc;
                }

                .review-comment {
                    font-style: italic;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 3; /* number of lines to show */
                    -webkit-box-orient: vertical;
                }

                .review-date {
                    color: #95a5a6;
                    font-size: 0.9em;
                    text-align: right;
                }

                @media (min-width: 768px) {
                    .review-card {
                        min-width: 300px;
                    }
                }
            `}</style>
        </div>
    );
};

export default ReviewBlock;
