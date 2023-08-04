function getTotalBooksCount(books) {
  // the function returns the length of the array and it represent the total number of books
  return books.length;
}

function getTotalAccountsCount(accounts) {
  // the function returns the length of the array and it represent the total number of accounts
  return accounts.length;
}
function getBooksBorrowedCount(books) {
  return books.filter(book => !book.borrows[0].returned).length;
}

 


function getMostCommonGenres(books) {
  const genres = books.map(book => book.genre);
//This line of code creates a new array called `genres`, which is the result of mapping the `books` array to only include the `genre` property of each book.

const count = {};
  genres.forEach(genre => {
    if (count[genre]) {
      count[genre] += 1;
    } else {
      count[genre] = 1;
    }
  });
//This code creates a new object called `count`, which will store the number of books for each genre. It then iterates over the `genres` array using a `forEach` loop, and for each genre, it checks if that genre already exists as a property in the `count` object. If it does, it increments the value of that property by 1. If it doesn't, it creates a new property with a value of 1.
  
  
  const result = Object.keys(count).map(genre => {
    return { name: genre, count: count[genre] };
  });
  //This code creates a new array called `result`, which is the result of mapping the properties of the `count` object to a new object that has two properties: `name` (which is the genre name) and `count` (which is the number of books for that genre).
  
 return result.sort((a, b) => b.count - a.count).slice(0, 5);
}


//This code sorts the `result` array by the `count` property in descending order (highest to lowest), and then returns only the first 5 elements of the sorted array.
//Overall, this function takes an array of books and returns an array of the five most common genres in the array, along with the number of books for each genre.


function getMostPopularBooks(books, count=5) {
    // organise book data
    const borrows = books.map(book=>({name:book.title, count:book.borrows.length}));
    // sort by borrow count, descending
    borrows.sort((a,b) => b.count - a.count);
    // return top N
    return borrows.slice(0,count);
}




function getMostPopularAuthors(books, authors) {
  
  // we are going to use reduce to get an array of objects that have 
  const authorList = books.reduce((acc, book) => { 
    // grab the authorId and borrows array
    const { authorId, borrows } = book;
    
    // get the authorObj
    const authorObj = authors.find(author => author.id === authorId);
    
    // build the author name from the authorObj
    const name = `${authorObj.name.first} ${authorObj.name.last}`;
    
    // get the number of times this book has been borrowed
    const count = borrows.length;
    
    // see if we already have an entry for this author in the accumulator
    const authExists = acc.find(auth => auth.name === name);
    if(authExists) {
      // if we get in here, then we already have an entry for this author in the accumulator
      // so we need to just add to its borrow count
      authExists.count += count;
    } else {
      // if we get in here, then we don't have an entry for this author, so we need to add it
      const newAuthEntry = {
        name,
        count
      };
      acc.push(newAuthEntry);
    }
    
    // finally, return the acc
    return acc;
  }, []);
  
  // sort in descending order by count
  const sortedAuthorList = authorList.sort((a, b) => b.count - a.count);
  
  // get the top five
  const topFive = sortedAuthorList.slice(0, 5);
  
  // and return the top five
  return topFive;
}


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
}