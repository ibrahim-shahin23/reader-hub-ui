// src/components/Home/NewReleases.tsx

import React, { useState } from 'react';
import { Card, Button, Row, Col, Container, Modal, Image, Alert } from 'react-bootstrap';
import { FaShoppingCart, FaHeart, FaRegHeart } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addBookToCart } from '../../redux/slices/cartSlice';
import { addToFavorites, removeFromFavorites } from '../../redux/slices/favoritesSlice';

interface Book {
  id: string;
  title: string;
  author: string;
  publisher: string;
  price: number;
  coverImage: string;
  description: string;
  category?: string;
  inStock?: boolean;
  pageCount?: number;
  language?: string;
  publicationDate?: string;
}

const NewReleases: React.FC = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(state => state.favorites.books);
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState<'success' | 'info'>('success');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const newReleaseBooks: Book[] = [
    {
      id: 'nr1',
      title: "The Silent Patient",
      author: "Alex Michaelides",
      publisher: "Celadon Books",
      price: 15.99,
      coverImage: "https://diwanegypt.com/wp-content/uploads/2020/08/9781250762481.jpg",
      description: "Alicia Berenson's life is seemingly perfect. A famous painter married to an in-demand fashion photographer, she lives in a grand house with big windows overlooking a park in one of London's most desirable areas. One evening her husband Gabriel returns home late from a fashion shoot, and Alicia shoots him five times in the face, and then never speaks another word.",
      category: "Thriller",
      inStock: true,
      publicationDate: '2019-02-05'
    },
    {
      id: 'nr2',
      title: "Circe",
      author: "Madeline Miller",
      publisher: "Little, Brown and Company",
      price: 18.50,
      coverImage: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1565909496i/35959740.jpg",
      description: "In the house of Helios, god of the sun and mightiest of the Titans, a daughter is born. But Circe is a strange child—not powerful, like her father, nor viciously alluring, like her mother. Turning to the world of mortals, she discovers her true power—witchcraft—and transforms rivals, and even gods, into monsters.",
      category: "Mythology",
      inStock: true,
      publicationDate: '2018-04-10'
    },
    {
      id: 'nr3',
      title: "The Vanishing Half",
      author: "Brit Bennett",
      publisher: "Riverhead Books",
      price: 14.00,
      coverImage: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1577090827l/51791252.jpg",
      description: "The Vignes twin sisters will always be identical. But after growing up together in a small, southern black community and running away at sixteen, it's not just the shape of their daily lives that divides them, but everything: their families, their communities, their very identities.",
      category: "Literary Fiction",
      inStock: true,
      publicationDate: '2020-06-02'
    },
    {
      id: 'nr4',
      title: "The Guest List",
      author: "Lucy Fokley",
      publisher: "William Morrow",
      price: 12.99,
      coverImage: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1591461181i/52656911.jpg",
      description: "The wedding of the year. The island of a lifetime. A mystery that unravels. On a remote island off the coast of Ireland, guests gather for a wedding. But someone doesn't make it to the reception. Someone is dead. And everyone is a suspect.",
      category: "Mystery",
      inStock: true,
      publicationDate: '2020-02-20'
    },
    {
      id: 'nr5',
      title: "Atomic Habits",
      author: "James Clear",
      publisher: "Avery",
      price: 17.50,
      coverImage: "https://www.shoroukbookstores.com/images/Books/original/9781847941831.jpg?random=638835435084013853",
      description: "No matter your goals, Atomic Habits offers a proven framework for improving every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.",
      category: "Self-Help",
      inStock: true,
      publicationDate: '2018-10-16'
    },
  ];

  const handleCardClick = (book: Book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBook(null);
  };

  const showTemporaryAlert = (message: string, variant: 'success' | 'info') => {
    setAlertMessage(message);
    setAlertVariant(variant);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleAddToCart = (book: Book) => {
    dispatch(addBookToCart(book));
    showTemporaryAlert(`${book.title} has been added to your cart!`, 'success');
  };

  const toggleFavorite = (book: Book) => {
    if (isFavorite(book.id)) {
      dispatch(removeFromFavorites(book.id));
      showTemporaryAlert(`${book.title} has been removed from favorites!`, 'info');
    } else {
      dispatch(addToFavorites(book));
      showTemporaryAlert(`${book.title} has been added to favorites!`, 'info');
    }
  };

  const isFavorite = (bookId: string) => {
    return favorites.some(book => book.id === bookId);
  };

  return (
    <Container className="my-5 py-4">
      <h2 className="mb-4 fw-bold text-primary">New Releases</h2>
      <p className="mb-4 text-muted">Discover our latest collection of books</p>

      <Alert 
        show={showAlert} 
        variant={alertVariant} 
        onClose={() => setShowAlert(false)} 
        dismissible 
        className="fade show"
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 9999,
          maxWidth: '300px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          border: 'none',
          borderRadius: '12px',
          transition: 'all 0.3s ease'
        }}
      >
        <div className="d-flex align-items-center">
          {alertVariant === 'success' ? 
            <FaShoppingCart className="me-2" /> : 
            <FaHeart className="me-2 text-danger" />}
          {alertMessage}
        </div>
      </Alert>

      <Row xs={1} sm={2} md={3} lg={5} className="g-4">
        {newReleaseBooks.map((book) => (
          <Col key={book.id}>
            <Card 
              className="h-100 shadow-sm overflow-hidden" // Removed border-0 from here
              onClick={() => handleCardClick(book)}
              style={{ 
                cursor: 'pointer',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                transform: hoveredCard === book.id ? 'translateY(-5px)' : 'none',
                borderRadius: '12px',
                border: '1px solid #e0e0e0' // Added a subtle light grey border here
              }}
              onMouseEnter={() => setHoveredCard(book.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Card.Img 
                variant="top" 
                src={book.coverImage} 
                alt={book.title} 
                style={{ 
                  height: '250px', 
                  objectFit: 'cover',
                  borderBottom: '1px solid rgba(0,0,0,0.1)'
                }} 
              />
              <Card.Body className="d-flex flex-column p-3">
                <Card.Title className="fs-6 fw-bold mb-1">{book.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted small">{book.author}</Card.Subtitle>
                <div className="mt-auto">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-primary fs-5">${book.price.toFixed(2)}</span>
                    <div className="d-flex gap-2">
                      <Button 
                        variant="outline-primary" 
                        size="sm" 
                        className="rounded-circle p-2 d-flex align-items-center justify-content-center"
                        style={{ width: '34px', height: '34px' }}
                        onClick={(e) => { e.stopPropagation(); handleAddToCart(book); }}
                        aria-label="Add to cart"
                      >
                        <FaShoppingCart />
                      </Button>
                      <Button 
                        variant={isFavorite(book.id) ? "danger" : "outline-danger"} 
                        size="sm" 
                        className="rounded-circle p-2 d-flex align-items-center justify-content-center"
                        style={{ width: '34px', height: '34px' }}
                        onClick={(e) => { e.stopPropagation(); toggleFavorite(book); }}
                        aria-label={isFavorite(book.id) ? "Remove from favorites" : "Add to favorites"}
                      >
                        {isFavorite(book.id) ? <FaHeart /> : <FaRegHeart />}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="text-center mt-5">
        <Button 
          variant="primary" 
          size="lg" 
          href="/books"
          className="px-4 py-2 fw-bold"
          style={{
            borderRadius: '50px',
            background: 'linear-gradient(135deg, #0d6efd, #0b5ed7)',
            border: 'none',
            boxShadow: '0 4px 15px rgba(13, 110, 253, 0.3)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(13, 110, 253, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(13, 110, 253, 0.3)';
          }}
        >
          Browse All Books
        </Button>
      </div>

      {selectedBook && (
        <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
          <Modal.Header closeButton className="border-0 pb-0">
            <Modal.Title className="fw-bold">{selectedBook.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="pt-0">
            <Row>
              <Col md={4} className="d-flex align-items-center justify-content-center mb-3 mb-md-0">
                <Image 
                  src={selectedBook.coverImage} 
                  alt={selectedBook.title} 
                  fluid 
                  rounded 
                  style={{ 
                    maxHeight: '350px',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                  }}
                />
              </Col>
              <Col md={8}>
                <div className="mb-3">
                  <h5 className="fw-bold">By {selectedBook.author}</h5>
                  <p className="text-muted mb-1">
                    <span className="fw-semibold">Publisher:</span> {selectedBook.publisher}
                  </p>
                  {selectedBook.category && (
                    <p className="text-muted mb-1">
                      <span className="fw-semibold">Category:</span> {selectedBook.category}
                    </p>
                  )}
                  {selectedBook.publicationDate && (
                    <p className="text-muted">
                      <span className="fw-semibold">Published:</span> {new Date(selectedBook.publicationDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
                
                <p className="mt-3 mb-4" style={{ lineHeight: '1.6' }}>{selectedBook.description}</p>
                
                <div className="d-flex align-items-center mb-4">
                  <h3 className="fw-bold text-primary mb-0">${selectedBook.price.toFixed(2)}</h3>
                </div>
                
                <div className="d-flex gap-3">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    onClick={() => handleAddToCart(selectedBook)}
                    className="flex-grow-1 d-flex align-items-center justify-content-center"
                    style={{ borderRadius: '8px' }}
                  >
                    <FaShoppingCart className="me-2" /> Add to Cart
                  </Button>
                  <Button 
                    variant={isFavorite(selectedBook.id) ? "danger" : "outline-danger"} 
                    size="lg" 
                    onClick={() => toggleFavorite(selectedBook)}
                    className="flex-grow-1 d-flex align-items-center justify-content-center"
                    style={{ borderRadius: '8px' }}
                  >
                    {isFavorite(selectedBook.id) ? (
                      <>
                        <FaHeart className="me-2" /> Remove from Favorites
                      </>
                    ) : (
                      <>
                        <FaRegHeart className="me-2" /> Add to Favorites
                      </>
                    )}
                  </Button>
                </div>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className="border-0">
            <Button 
              variant="outline-secondary" 
              onClick={handleCloseModal}
              style={{ borderRadius: '8px' }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default NewReleases;