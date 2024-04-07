import React from 'react'

const RoomPaginator = ({currentPage, totalPages, onPageChange}) => {
    const pageNumber = Array.from({length : totalPages})
  return (
    <nav>
      <ul className='pagination, justify-content-center'>
        {pageNumber.map((pageNumber) => (
          <li key={pageNumber}
            className={`page-item ${currentPage === pageNumber ? "active" : "empty"}`}>
              <button className='page-link' onClick={() => onPageChange(pageNumber)}>
                {pageNumber}
              </button>
            </li>
        ))}


      </ul>
    </nav>
  )
}

export default RoomPaginator