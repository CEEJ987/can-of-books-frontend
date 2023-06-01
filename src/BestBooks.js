import React from 'react';
import { Carousel } from 'react-bootstrap';
import { useState, useEffect } from 'react';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';


function BestBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Make a GET request to your API to fetch all the books
    fetch('http://localhost:3001/books')
      .then(response => response.json())
      .then(data => {
        setBooks(data); // Update the books state with the fetched data
      })
      .catch(error => {
        console.log('Error fetching books:', error);
      });
  }, []);
  return <>
    <h2>My Essential Lifelong Learning & amp; Formation Shelf</h2>

    {books.length > 0 ? (
      <Carousel>
        {books.map(book => (
          <div key={book._id}>
            <h3>{book.title}</h3>
            <p>{book.description}</p>
            <p>Status: {book.status}</p>
          </div>
        ))}
      </Carousel>
    ) : (
      <h3>No Books Found :</h3>
    )}</>
}


export default BestBooks;
