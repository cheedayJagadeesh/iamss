// Function to paginate data
function paginate(items, currentPage, itemsPerPage) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
}

// Function to get total pages
function getTotalPages(items, itemsPerPage) {
    return Math.ceil(items.length / itemsPerPage);
}

// Function to change the page within limits
function changePage(page, totalPages) {
    if (page < 1) return 1;
    if (page > totalPages) return totalPages;
    return page;
}