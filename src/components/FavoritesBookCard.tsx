import React from 'react';
import { Card, Button } from 'react-bootstrap';

interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  coverImage: string;
}

interface FavoritesBookCardProps {
  book: Book;
  onRemoveFavorite: () => void;
  onAddToCart: () => void;
}

const FavoritesBookCard: React.FC<FavoritesBookCardProps> = ({ 
  book, 
  onRemoveFavorite, 
  onAddToCart 
}) => {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Img 
        variant="top" 
        src={book.coverImage} 
        alt={book.title}
        style={{ height: '200px', objectFit: 'cover' }} 
      />
      
      <Card.Body className="d-flex flex-column">
        <Card.Title className="fs-6 text-truncate">{book.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted small">{book.author}</Card.Subtitle>
        
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-bold">${book.price.toFixed(2)}</span>
          </div>
          
          <div className="d-grid gap-2">
            <Button 
              variant="primary" 
              size="sm"
              onClick={onAddToCart}
            >
              Add to Cart
            </Button>
            <Button 
              variant="outline-danger" 
              size="sm"
              onClick={onRemoveFavorite}
            >
              Remove from Favorites
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default FavoritesBookCard;