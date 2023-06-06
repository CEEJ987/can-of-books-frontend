import React, { Component } from "react";
import { Carousel } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {button} from 'bootstrap'
// import 'react-responsive-carousel/lib/styles/carousel.min.css';


function BestBooks() {
  const [books, setBooks] = useState([]);
  const [bookId, setbookId] = useState("");
  const [editBookData, setEditBookData] = useState("");
  const [showEditModal, setShowEditModal] = useState([]);

  useEffect(() => {
    // Make a GET request to your API to fetch all the books
    fetch('https://canofbooksbackend.onrender.com/books')
      .then(response => response.json())
      .then(data => {
        setBooks(data); // Update the books state with the fetched data
      })
      .catch(error => {
        console.log('Error fetching books:', error);
      });
  }, []);
  const fetchBooks = () => {
    // Make a GET request to fetch all the books
    axios.get('https://canofbooksbackend.onrender.com/books/')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error('Failed to fetch books:', error);
      });
  };
  const deleteBook = (bookId) => {
    // Make a DELETE request to delete a book by ID
    console.log(bookId, "lol")
    axios.delete(`https://canofbooksbackend.onrender.com/books/` + bookId)
      .then(response => {
        console.log('Book deleted successfully');
        fetchBooks(); // Fetch updated book list after deletion
      })
      .catch(error => {
        console.error('Failed to delete book:', error);
      });
  };
  const handleEditFormSubmit = (e) => {
    e.preventDefault();
  
    // Make a PUT request to update the book data
    fetch(`/books/${editBookData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editBookData),
    })
      .then((response) => response.json())
      .then((updatedBook) => {
        // Find the updated book in the books array and update its data
        const updatedBooks = books.map((book) => {
          if (book.id === updatedBook.id) {
            return updatedBook;
          }
          return book;
        });
        setBooks(updatedBooks);
        setShowEditModal(false);
      })
      .catch((error) => {
        console.error('Failed to update book:', error);
      });
  };
  
  return (
    <div>
      <h2>My Books</h2>
      {books.length > 0 ? (

        <ul>
          {books.map(book => (
            <>
              {console.log(book)}
              <li key={book._id}>

                <h3>{book.title}</h3>
                <p>{book.description}</p>
                <button onClick={() => { deleteBook(book._id) }}>Delete</button>
              </li>
            </>
          ))}

        </ul>

      ) : (
        <p>No books found. The book collection is empty.</p>
      )}
    </div>
  );

  return  <>
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
    )}
    <div>
      {/* Book carousel code... */}
      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Book Details</h3>
            <form onSubmit={handleEditFormSubmit}>
              <label>
                Title:
                <input
                  type="text"
                  value={editBookData.title}
                  onChange={(e) => setEditBookData({ ...editBookData, title: e.target.value })}
                />
              </label>
              <label>
                Description:
                <textarea
                  value={editBookData.description}
                  onChange={(e) => setEditBookData({ ...editBookData, description: e.target.value })}
                ></textarea>
              </label>
              <button type="submit">Save</button>
              <button onClick={() => setShowEditModal(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  </>
}



export default BestBooks;
