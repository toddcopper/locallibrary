function findAccountById(accounts, id) {
  // use the find() method to search for the account with the matching id
  // if an account is found, its its object is returned. if not, undefined is returned.
  return accounts.find(account => account.id === id);
}

function sortAccountsByLastName(accounts) {
  //Use the sort() method to sort the array of accounts by last name
  // if accountA's last name is > accountB's last name, 1 is returned, otherwise -1 is returned.
  return accounts.sort((accountA, accountB) => accountA.name.last>accountB.name.last ? 1 : -1);
}

function getTotalNumberOfBorrows(account, books) {
  // Use reduce() to count the total number of borrows for a given account
  return books.reduce((acc, book) => {
    // Use filter() to find the borrows that match the given account ID
    const borrows = book.borrows.filter(borrow => borrow.id === account.id);
    // Add the number of borrows for this book to the accumulator
    return acc + borrows.length;
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
  // Filter the books array to only include books that are currently checked out by the provided account
  const booksCheckedOut = books.filter((book) => {
    const recentCheckout = book.borrows[0];
    return !recentCheckout.returned && recentCheckout.id === account.id;
  });
  // Add the corresponding author object to each book object using the authors array
  return booksCheckedOut.map((book) => {
    const author = authors.find((author) => author.id === book.authorId);
    return { ...book, author };
  });
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
