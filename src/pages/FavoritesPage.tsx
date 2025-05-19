import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import FavoritesBookCard from '../components/FavoritesBookCard';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { removeFromFavorites } from '../redux/slices/favoritesSlice';
import { addToCart } from '../redux/slices/cartSlice';

const FavoritesPage = () => {
  const dispatch = useAppDispatch();
  const favoriteBooks = useAppSelector((state) => state.favorites.books);

  const handleRemoveFavorite = (bookId: string) => {
    dispatch(removeFromFavorites(bookId));
  };

  const handleAddToCart = (book: any) => {
    dispatch(addToCart(book));
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4">Your Favorite Books</h2>
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
                onRemoveFavorite={() => handleRemoveFavorite(book.id)}
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