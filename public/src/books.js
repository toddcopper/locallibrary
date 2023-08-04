function findAuthorById(authors, id) {
  // using the find() method to search for the author with the matching ID
  // if an author is found, their object is retruned. if not, undefined is return
  return authors.find(author => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

// This function partitions an array of books by their borrowed status.
function partitionBooksByBorrowedStatus(books) {
  // Initialize two arrays to hold the borrowed and available books
  const borrowedBooks = [];
  const availableBooks = [];
  
  // This helper function gets the latest borrow record for a book
  function getLatestBorrow(book) {
    // Destructure the `borrows` array to get the latest borrow record
    const [latestBorrow] = book.borrows;
    return latestBorrow;
  }
  
  // Loop through each book in the array
  books.forEach((book) => {
    // Get the latest borrow record for the book
    const latestBorrow = getLatestBorrow(book);
    // If the book has been returned, add it to the available books array
    // Otherwise, add it to the borrowed books array
    (latestBorrow.returned ? availableBooks : borrowedBooks).push(book);
  });
  
  // Return an array containing the borrowed books array and the available books array
  return [borrowedBooks, availableBooks];
}

  
function getBorrowersForBook(book, accounts) {
  // Get the borrow records for the book
  const { borrows } = book;
  // Add the corresponding user info to each borrow record
  const borrowers = borrows.map(({ id, returned, ...record }) => {
    const { name, picture, age, company, email, registered, address } = accounts.find((account) => account.id === id);
    return {
      ...record,
      id,
      returned,
      name,
      picture,
      age,
      company,
      email,
      registered,
      address,
    };
  });
  // Return the first ten borrowers
  return borrowers.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
