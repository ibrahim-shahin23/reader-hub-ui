import { useState } from 'react';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import FavoritesBookCard from '../components/FavoritesBookCard';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { removeFromFavorites } from '../redux/slices/favoritesSlice';
import { addBookToCart } from '../redux/slices/cartSlice'; 
interface Book { 
  id: string;
  title: string;
  author: string;
  publisher?: string; 
  price: number;
  coverImage: string;
  description?: string; 
  category?: string;
  inStock?: boolean;
  pageCount?: number;
  language?: string;
  rating?: number;
  discount?: number;
  publicationDate?: string;
}

const FavoritesPage = () => {
  const dispatch = useAppDispatch();
  const favoriteBooks = useAppSelector((state) => state.favorites.books);
  
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const handleRemoveFavorite = (bookId: string, bookTitle: string) => {
    dispatch(removeFromFavorites(bookId));
    setModalTitle('Removed');
    setModalMessage(`${bookTitle} has been removed from your favorites.`);
    setShowModal(true);
  };

  const handleAddToCart = (book: Book) => {
    dispatch(addBookToCart(book));
    setModalTitle('Success');
    setModalMessage(`${book.title} has been added to your cart!`);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <Container 
      className="mb-5" // Kept mb-5 for consistency with bottom margin
      style={{ marginTop: '70px' }} // Added 70px margin to the top of the container
    >
      <h2 className="mb-4">Your Favorite Books</h2>
      
      {/* General Purpose Confirmation Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{modalMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>

      {favoriteBooks.length === 0 ? (
        <div className="text-center py-5">
          <h4>Your favorites list is empty</h4>
          <p>Browse our collection and add books to your favorites!</p>
          <Button variant="primary" href="/">Go to Homepage</Button> {/* Link to homepage */}
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