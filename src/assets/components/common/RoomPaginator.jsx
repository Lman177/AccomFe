import React from 'react';
import { Pagination } from 'antd';

const RoomPaginator = ({ currentPage, totalPages, onPageChange }) => {
  // Handle page change
  const handlePageChange = (page) => {
    onPageChange(page);
  };

  return (
    <nav aria-label="Room pagination">
      <Pagination
        current={currentPage}
        total={totalPages * 10}  // Ant Design requires total number of items, not pages
        onChange={handlePageChange}
        showSizeChanger={false}
        pageSize={10}  // Assuming 10 items per page for simplicity
        className="pagination justify-content-center"
      />
    </nav>
  );
};

export default RoomPaginator;
