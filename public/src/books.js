function findAuthorById(authors, id) {
  // using the find() method to search for the author with the matching ID
  // if an author is found, their object is retruned. if not, undefined is return
  return authors.find(author => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const borrowedBooks = [];
  const availableBooks = [];
  
  // Loop through each book in the array
  books.forEach(({ borrows: [latestBorrow], ...book }) => {
    // Get the latest borrow record for the book
    // Destructure the `borrows` array in the function argument to extract the first item as `latestBorrow`
    // This avoids having to extract `latestBorrow` separately within the function body
    
    // Check if the book has been returned
    (latestBorrow.returned ? availableBooks : borrowedBooks).push(book);
    // If the book has been returned, add it to the available books array
    // Otherwise, add it to the borrowed books array
    // The ternary operator is used to choose which array to push the book to
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
