import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert, Modal, Button, Spinner } from 'react-bootstrap';
import axios from 'axios'; 
import FavoritesBookCard from '../components/FavoritesBookCard';
import { useAppDispatch } from '../redux/hooks'; 
import { removeFromFavorites } from '../redux/slices/favoritesSlice';
import { addToCart } from '../redux/slices/cartSlice';

const baseUrl = import.meta.env.VITE_BASE_URL;

interface ApiFavoriteBookItem {
  _id: string;
  title: string;
  images: string[];
  price: number;
  discount?: number;
  author_id: string; 
}


interface DisplayableBookData {
  id: string;
  title: string;
  coverImage: string;
  author: string;
  price: number;
  discount?: number;
}

const FavoritesPage = () => {
  const dispatch = useAppDispatch();
  const [books, setBooks] = useState<DisplayableBookData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [showAddToCartAlert, setShowAddToCartAlert] = useState(false);
  const [showRemoveAlert, setShowRemoveAlert] = useState(false);
  const [currentBookTitle, setCurrentBookTitle] = useState('');
  const [removeFavoriteError, setRemoveFavoriteError] = useState<string | null>(null); // For remove error

  useEffect(() => {
    const fetchFavorites = async () => {
      setIsLoading(true);
      setFetchError(null);
      try {
        // Get token from localStorage
        const token = localStorage.getItem('token');
        
        const response = await axios.get<{ success: boolean, data: ApiFavoriteBookItem[], message?: string }>(
          `${baseUrl}/api/auth/favorites`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (response.data.success && Array.isArray(response.data.data)) {
          const transformedBooks = response.data.data.map((apiBook): DisplayableBookData => {
            let coverImg = 'https://via.placeholder.com/150x200.png?text=No+Image';
            if (apiBook.images && apiBook.images.length > 0 && typeof apiBook.images[0] === 'string') {
              coverImg = apiBook.images[0].trim().replace(/`/g, '');
            }
            return {
              id: apiBook._id,
              title: apiBook.title || 'Untitled Book',
              coverImage: coverImg,
              author: 'Unknown Author',
              price: apiBook.price || 0,
              discount: apiBook.discount,
            };
          });
          setBooks(transformedBooks);
        } else {
          setFetchError(response.data.message || 'Failed to fetch favorites: Unexpected response structure.');
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setFetchError(error.response?.data?.message || error.message || 'An error occurred while fetching favorites.');
        } else {
          setFetchError('An unexpected error occurred.');
        }
        console.error("Error fetching favorites:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, []); // Empty dependency array to run once on mount

  const handleRemoveFavorite = async (bookId: string, bookTitle: string) => {
    setRemoveFavoriteError(null); // Reset error on new attempt
    const token = localStorage.getItem('token');

    if (!token) {
      setRemoveFavoriteError("Authentication token not found. Please log in.");
      // Optionally, redirect to login or show a more prominent error
      return;
    }

    try {
      // API call to remove from favorites
      const response = await axios.delete(`${baseUrl}/api/auth/favorites/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        // Dispatch Redux action (if still needed for other parts of the app)
        dispatch(removeFromFavorites(bookId));
        
        // Update local state to reflect removal immediately
        setBooks(prevBooks => prevBooks.filter(b => b.id !== bookId));
        
        setCurrentBookTitle(bookTitle);
        setShowRemoveAlert(true);
      } else {
        setRemoveFavoriteError(response.data.message || "Failed to remove book from favorites.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setRemoveFavoriteError(error.response?.data?.message || error.message || "An error occurred while removing the book.");
      } else {
        setRemoveFavoriteError("An unexpected error occurred during removal.");
      }
      console.error("Error removing favorite:", error);
      // Optionally, show an error alert/modal here instead of just setting state
    }
  };

  const handleAddToCart = (book: DisplayableBookData) => { // Changed type from any
    // Ensure the book object passed to addToCart matches what cartSlice expects
    // This might require mapping `DisplayableBookData` to the cart item structure
    dispatch(addToCart({
        id: book.id,
        title: book.title,
        price: book.price,
        quantity: 1, // Default quantity
        author: book.author,
        publisher: 'Unknown Publisher', // Since publisher is not in DisplayableBookData
        coverImage: book.coverImage,
        // image: book.coverImage, // Assuming cart item needs an image
        // Add other fields as required by your cartSlice's addToCart payload
    }));
    setCurrentBookTitle(book.title);
    setShowAddToCartAlert(true);
  };

  if (isLoading) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-2">Loading your favorite books...</p>
      </Container>
    );
  }

  if (fetchError) {
    return (
      <Container className="my-5">
        <Alert variant="danger" className="text-center">
          Error: {fetchError}
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h2 className="mb-4">Your Favorite Books</h2>

      {/* Alert for removal error */}
      {removeFavoriteError && (
        <Alert variant="danger" onClose={() => setRemoveFavoriteError(null)} dismissible>
          {removeFavoriteError}
        </Alert>
      )}
      
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

      {books.length === 0 && !isLoading ? ( // Ensure not to show "empty" during initial load
        <div className="text-center py-5">
          <h4>Your favorites list is empty</h4>
          <p>Browse our collection and add books to your favorites!</p>
        </div>
      ) : (
        <Row>
          {books.map((book) => (
            <Col key={book.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <FavoritesBookCard 
                book={book} // Passing the transformed book object
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