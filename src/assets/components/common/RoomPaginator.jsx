import React from 'react';

const RoomPaginator = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];
    
    // Determine the range of pages to display
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    // Handle click on page number
    const handleClick = (number) => {
        onPageChange(number);
    };

    return (
        <nav aria-label="Room pagination">
            <ul className="pagination justify-content-center">
                {/* Display page numbers */}
                {pageNumbers.map(number => (
                    <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
                        <a className="page-link" href="#!" onClick={() => handleClick(number)}>
                            {number}
                        </a>
                    </li>
                ))}

                
            </ul>
        </nav>
    );
};

export default RoomPaginator;
