import React, { useState, useEffect } from "react";
import { Carousel, Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BestBooks.css'; // Import the CSS file for custom styling

function BestBooks() {
  const [books, setBooks] = useState([]);
  const [newBookData, setNewBookData] = useState({ title: "", description: "" });
  const [editBookData, setEditBookData] = useState({ id: "", title: "", description: "" });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [headerObject, setHeaderObject] = useState()
  const [server, setServer] = useState(process.env.REACT_APP_PROD);


  const fetchBooks = async () => {
    await axios.get(`${server}/books/`)
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error('Failed to fetch books:', error);
      });
  };

  const addBook = async () => {
    await axios.post(`${server}/books/`, {data : newBookData, headers : headerObject})
      .then(response => {
        console.log('Book added successfully');
        setShowAddModal(false);
        fetchBooks();
      })
      .catch(error => {
        console.error('Failed to add book:', error);
      });
  };

  const deleteBook = async (bookId) => {
   await axios.delete(`${server}/books/${bookId}`)
      .then(response => {
        console.log('Book deleted successfully');
        fetchBooks();
      })
      .catch(error => {
        console.error('Failed to delete book:', error);
      });
  };

  const updateBook = async() => {
    await axios.put(`${server}/books/${editBookData.id}`, {data: editBookData, headers: headerObject})
      .then(response => {
        console.log('Book updated successfully');
        setShowEditModal(false);
        fetchBooks();
      })
      .catch(error => {
        console.error('Failed to update book:', error);
      });
  };

  useEffect(() => {
    if ( window.location.hostname == "localhost") {
      setServer(process.env.REACT_APP_DEV_SERVER)
    } else {
      setServer(process.env.REACT_APP_PROD);
    }
    console.log(server)

    async function fetchData () {
    await SendRequest();
    await fetchBooks();
}
 fetchData()
}, []);


  const openAddModal = () => {
    setNewBookData({ title: "", description: "" });
    setShowAddModal(true);
  };

  const openEditModal = (book) => {
    setEditBookData({ id: book._id, title: book.title, description: book.description });
    setShowEditModal(true);
  };
  
  
  const { isAuthenticated, user, logout, getAccessTokenSilently } = useAuth0()

  async function SendRequest(){
    let accessToken = await getAccessTokenSilently();
    let header = {
      Authorization: `Bearer ${accessToken}`
    }
    setHeaderObject(header)
    console.log(accessToken)
    await axios.get(`${server}/books`, {headers:header}).catch((error) => {
      console.error(error)
    })
  }

  return (
    <div className="book-carousel-container">
      {isAuthenticated && (
        <div>
          <h2>My Essential Lifelong Learning & Formation Shelf</h2>
        </div>
      )}

      {books.length > 0 ? (
        <Carousel>
          {books.map(book => (
            <Carousel.Item key={book._id}>
              <img
                src="https://innovating.capital/wp-content/uploads/2021/05/placeholder-image-dark.jpg"
                alt={book.title}
              />
              <Carousel.Caption>
                <h3>{book.title}</h3>
                <p>{book.description}</p>
                <p>Status: {book.status}</p>
                <Button variant="danger" onClick={() => deleteBook(book._id)}>Delete</Button>
                <Button onClick={() => openEditModal(book)}>Edit</Button>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <h3>No Books Found</h3>
      )}

      <Button onClick={openAddModal}>Add Book</Button>

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <label>
              Title:
              <input
                type="text"
                value={newBookData.title}
                onChange={(e) => setNewBookData({ ...newBookData, title: e.target.value })}
              />
            </label>
            <label>
              Description:
              <textarea
                value={newBookData.description}
                onChange={(e) => setNewBookData({ ...newBookData, description: e.target.value })}
              ></textarea>
            </label>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={addBook}>Add</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
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
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={updateBook}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default BestBooks;