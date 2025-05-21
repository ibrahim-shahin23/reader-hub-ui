import React, { useState } from 'react';
import { Container, Row, Col, Alert, Modal, Button } from 'react-bootstrap';
import FavoritesBookCard from '../components/FavoritesBookCard';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { removeFromFavorites } from '../redux/slices/favoritesSlice';
import { addToCart } from '../redux/slices/cartSlice';

const FavoritesPage = () => {
  const dispatch = useAppDispatch();
  const favoriteBooks = useAppSelector((state) => state.favorites.books);
  const [showAddToCartAlert, setShowAddToCartAlert] = useState(false);
  const [showRemoveAlert, setShowRemoveAlert] = useState(false);
  const [currentBookTitle, setCurrentBookTitle] = useState('');

  const handleRemoveFavorite = (bookId: string, bookTitle: string) => {
    dispatch(removeFromFavorites(bookId));
    setCurrentBookTitle(bookTitle);
    setShowRemoveAlert(true);
  };

  const handleAddToCart = (book: any) => {
    dispatch(addToCart(book));
    setCurrentBookTitle(book.title);
    setShowAddToCartAlert(true);
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4">Your Favorite Books</h2>
      
      {/* Add to Cart Success Modal */}
      <Modal show={showAddToCartAlert} onHide={() => setShowAddToCartAlert(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{currentBookTitle} has been added to your cart!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowAddToCartAlert(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Remove from Favorites Success Modal */}
      <Modal show={showRemoveAlert} onHide={() => setShowRemoveAlert(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Removed</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{currentBookTitle} has been removed from your favorites.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowRemoveAlert(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>

      {favoriteBooks.length === 0 ? (
        <div className="text-center py-5">
          <h4>Your favorites list is empty</h4>
          <p>Browse our collection and add books to your favorites!</p>
        </div>
      ) : (
        <Row>
          {favoriteBooks.map((book) => (
            <Col key={book.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <FavoritesBookCard 
                book={book}
                onRemoveFavorite={() => handleRemoveFavorite(book.id, book.title)}
                onAddToCart={() => handleAddToCart(book)}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default FavoritesPage;