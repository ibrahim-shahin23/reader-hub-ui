import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import FavoritesBookCard from '../components/FavoritesBookCard';

const FavoritesPage = () => {
  // Mock data
  const favoriteBooks = [
    {
      id: '1',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      price: 12.99,
      coverImage: 'https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg',
      rating: 4,
      discount: 10,
    },
    {
      id: '2',
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      price: 9.99,
      coverImage: 'https://m.media-amazon.com/images/I/71FxgtFKcQL._AC_UF1000,1000_QL80_.jpg',
      rating: 5,
    },
  ];

  const handleRemoveFavorite = (bookId: string) => {
    console.log('Remove favorite', bookId);
    // Implement  removal logic 
  };

  const handleAddToCart = (bookId: string) => {
    console.log('Add to cart', bookId);
    // Implement  add to cart logic 
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
                onAddToCart={() => handleAddToCart(book.id)}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default FavoritesPage;