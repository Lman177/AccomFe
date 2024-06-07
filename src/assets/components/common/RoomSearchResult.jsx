import React, { useState } from "react";
import RoomCard from "../room/RoomCard";
import { Button } from "react-bootstrap";
import { Pagination, Carousel } from "antd";

const RoomSearchResults = ({ results, onClearSearch }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 4;
  const totalResults = results.length;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const paginatedResults = results.slice(startIndex, endIndex);

  return (
    <div className="results-container">
      {results.length > 0 ? (
        <>
          <h5 className="text-center mt-5">Search Results</h5>
          <Carousel
            dots
            arrows
            infinite={false}
            afterChange={(currentSlide) => handlePageChange(currentSlide + 1)}
          >
            {results.map((room, index) => (
              <div key={room.id} className="carousel-slide">
                <RoomCard room={room} />
              </div>
            ))}
          </Carousel>

          {totalResults > resultsPerPage && (
            <Pagination
              current={currentPage}
              total={totalResults}
              pageSize={resultsPerPage}
              onChange={handlePageChange}
              className="mb-3"
            />
          )}
          <Button variant="secondary" onClick={onClearSearch}>
            Clear Search
          </Button>
        </>
      ) : (
        <p>No results found</p>
      )}
      <style jsx>{`
        .results-container {
          width: 100%;
          max-width: 1400px; /* Increased max-width for larger container */
          margin: 0 auto; /* Center align */
          padding: 20px;
          border-radius: 8px;
        }

        .results-container h5 {
          margin-bottom: 20px;
        }

        .carousel-slide {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .results-container .ant-pagination {
          display: flex;
          justify-content: center;
        }

        .results-container .btn {
          display: block;
          margin: 20px auto;
        }
      `}</style>
    </div>
  );
};

export default RoomSearchResults;
