// src/components/Home/BestSellers.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  rating?: number;
  discount?: number;
  publicationDate?: string;
}

const BestSellers: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(state => state.favorites.books);

  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState<'success' | 'info'>('success');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Mock data for best sellers
  const bestSellers: Book[] = [
    {
      id: '1',
      title: 'Atomic Habits',
      author: 'James Clear',
      publisher: 'Avery',
      coverImage: 'https://www.shoroukbookstores.com/images/Books/original/9781847941831.jpg?random=638835435084013853',
      description: "No matter your goals, Atomic Habits offers a proven framework for improving every day. James Clear, one of the world’s leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.",
      price: 27.99,
      rating: 4.8,
      category: "Self-Help",
      publicationDate: '2018-10-16'
    },
    {
      id: '2',
      title: 'The Psychology of Money',
      author: 'Morgan Housel',
      publisher: 'Harriman House',
      coverImage: 'https://diwanegypt.com/wp-content/uploads/2022/02/9780857197689.jpg',
      description: "Doing well with money isn’t necessarily about what you know. It’s about how you behave. And behavior is hard to teach, even to really smart people. This book helps you think about your approach to money.",
      price: 23.99,
      rating: 4.7,
      category: "Finance",
      publicationDate: '2020-09-08'
    },
    {
      id: '3',
      title: 'The Stoic Path to Wealth',
      author: 'Darius Fourox',
      publisher: 'Atria Books',
      coverImage: 'https://diwanegypt.com/wp-content/uploads/2024/08/9781529146707.jpg',
      description: "The Stoics understood that if you can control your reactions and manage your emotions, you can achieve success. The same principles apply to our financial lives today.",
      price: 19.99,
      rating: 4.6,
      category: "Business",
      publicationDate: '2012-09-05'
    },
    {
      id: '4',
      title: 'The 48 Laws of Power',
      author: 'Robert Greene',
      publisher: 'Penguin Books',
      coverImage: 'https://upload.wikimedia.org/wikipedia/en/9/9d/GreeneRobert-48LawsOfPower.jpg', 
      description: "Amoral, cunning, ruthless, and instructive, this New York Times bestseller is the definitive manual for anyone interested in gaining, or defending against, ultimate control.",
      price: 25.50,
      rating: 4.7,
      category: "Self-Help",
      publicationDate: '1998-09-01'
    },
    {
      id: '5',
      title: 'The Subtle Art of Not Giving a F*ck',
      author: 'Mark Manson',
      publisher: 'HarperOne',
      coverImage: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1591461181i/52656911.jpg', 
      description: "In this generation-defining self-help guide, a superstar blogger cuts through the crap to show us how to stop trying to be 'positive' all the time so that we can truly become better, happier people.",
      price: 22.99,
      rating: 4.5,
      category: "Self-Help",
      publicationDate: '2016-09-13'
    }
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
      {/* Header is left-aligned by default */}
      <h2 className="mb-4 fw-bold text-dark">Best Sellers</h2>
      <p className="mb-4 text-muted">Explore our most popular books</p>

      {/* Global Alert for Cart/Favorites actions - fixed top-right */}
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
        {bestSellers.map((book) => (
          <Col key={book.id}>
            <Card 
              className="h-100 shadow-sm overflow-hidden" // Removed border-0 from here
              onClick={() => handleCardClick(book)}
              style={{ 
                cursor: 'pointer',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                transform: hoveredCard === book.id ? 'translateY(-5px)' : 'none', 
                borderRadius: '12px',
                border: '1px solid #e0e0e0' // Added border here
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
                onError={(e) => { 
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/250x250?text=Book+Cover';
                }}
              />
              <Card.Body className="d-flex flex-column p-3">
                <Card.Title className="fs-6 fw-bold mb-1">{book.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted small">{book.author}</Card.Subtitle>
                <p className="text-muted small">Publisher: {book.publisher}</p> 
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

export default BestSellers;