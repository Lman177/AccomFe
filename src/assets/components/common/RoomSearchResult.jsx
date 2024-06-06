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
    <>
      {results.length > 0 ? (
        <>
          <h5 className="text-center mt-5">Search Results</h5>
          <Carousel
            dots
            arrows
            infinite={false}
            afterChange={(currentSlide) => setCurrentPage(currentSlide + 1)}
          >
            {paginatedResults.map((room) => (
              <div key={room.id}>
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
    </>
  );
};

export default RoomSearchResults;
