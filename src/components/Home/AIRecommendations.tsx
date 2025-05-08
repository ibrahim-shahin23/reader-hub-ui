import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaTimes } from 'react-icons/fa';

interface Book {
  id: string;
  title: string;
  author: string;
  publisher: string;
  description: string;
  coverImage: string;
  price: number;
  inStock: boolean;
}

const AIRecommendations: React.FC = () => {
  const navigate = useNavigate();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showModal, setShowModal] = useState(false);

  const recommendedBooks: Book[] = [
    {
      id: '1',
      title: 'The AI Revolution',
      author: 'Dr. Samantha Chen',
      publisher: 'Tech Publishing Inc.',
      description: 'A comprehensive guide to the AI revolution and its impact on society, business, and technology.',
      coverImage: 'https://m.media-amazon.com/images/I/71sBtM3Yi5L._SY425_.jpg',
      price: 28.99,
      inStock: true
    },
    {
      id: '2',
      title: 'Machine Learning',
      author: 'Prof. Alan Turing',
      publisher: 'Computer Science Press',
      description: 'Fundamentals of machine learning algorithms and their practical applications in various fields.',
      coverImage: 'https://m.media-amazon.com/images/I/71sBtM3Yi5L._SY425_.jpg',
      price: 24.50,
      inStock: true
    },
    {
      id: '3',
      title: 'Neural Networks',
      author: 'Dr. Yann LeCun',
      publisher: 'Deep Learning Media',
      description: 'Detailed exploration of neural network architectures and their implementation in modern AI systems.',
      coverImage: 'https://m.media-amazon.com/images/I/71sBtM3Yi5L._SY425_.jpg',
      price: 26.75,
      inStock: false
    },
    {
      id: '4',
      title: 'AI Future',
      author: 'Elaine Musk',
      publisher: 'Future Tech Publications',
      description: 'A visionary look at how artificial intelligence will shape our future in the coming decades.',
      coverImage: 'https://m.media-amazon.com/images/I/71sBtM3Yi5L._SY425_.jpg',
      price: 29.99,
      inStock: true
    },
    {
      id: '5',
      title: 'Deep Learning',
      author: 'Ian Goodfellow',
      publisher: 'AI Academic Press',
      description: 'The definitive textbook on deep learning methods and their theoretical foundations.',
      coverImage: 'https://m.media-amazon.com/images/I/71sBtM3Yi5L._SY425_.jpg',
      price: 32.50,
      inStock: true
    }
  ];

  const openModal = (book: Book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const styles = {
    section: {
      padding: '2rem 1rem',
      backgroundColor: '#f8fafc',
      fontFamily: "'Inter', sans-serif",
      maxWidth: '1200px',
      margin: '0 auto',
      textAlign: 'center' as const
    },
    heading: {
      fontSize: '1.5rem',
      fontWeight: '600' as const,
      marginBottom: '1.5rem',
      color: '#1e293b'
    },
    grid: {
      display: 'flex',
      justifyContent: 'center',
      gap: '1rem',
      padding: '0 1rem',
      margin: '0 auto',
      overflowX: 'auto',
      scrollbarWidth: 'none' as const,
      '&::-webkit-scrollbar': {
        display: 'none'
      }
    },
    bookCard: {
      cursor: 'pointer',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      textAlign: 'center' as const,
      minWidth: '180px',
      flexShrink: 0
    },
    bookImage: {
      width: '100%',
      height: '180px',
      objectFit: 'cover' as const,
      borderBottom: '1px solid #f1f5f9'
    },
    bookInfo: {
      padding: '0.75rem 0.5rem',
      position: 'relative'
    },
    bookTitle: {
      fontSize: '0.9375rem',
      fontWeight: '600' as const,
      margin: '0 0 0.25rem',
      color: '#1e293b',
      lineHeight: '1.3',
      display: '-webkit-box',
      WebkitLineClamp: 2 as const,
      WebkitBoxOrient: 'vertical' as const,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      minHeight: '2.5rem'
    },
    bookAuthor: {
      fontSize: '0.8125rem',
      color: '#64748b',
      margin: '0 0 0.25rem'
    },
    bookPrice: {
      fontSize: '0.9375rem',
      fontWeight: '700' as const,
      color: '#3b82f6',
      margin: '0.5rem 0 0'
    },
    stockStatus: {
      fontSize: '0.75rem',
      fontWeight: '600' as const,
      color: '#ffffff',
      backgroundColor: '#22c55e',
      padding: '0.125rem 0.5rem',
      borderRadius: '12px',
      display: 'inline-block',
      marginTop: '0.25rem'
    },
    outOfStock: {
      backgroundColor: '#ef4444'
    },
    iconContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '0.5rem'
    },
    icon: {
      color: '#64748b',
      cursor: 'pointer',
      fontSize: '1rem',
      '&:hover': {
        color: '#3b82f6'
      }
    },
    button: {
      display: 'inline-block',
      margin: '1.5rem auto 0',
      padding: '0.625rem 1.5rem',
      fontSize: '0.9375rem',
      fontWeight: '600' as const,
      backgroundColor: '#3b82f6',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      '&:hover': {
        backgroundColor: '#2563eb'
      }
    },
    modalOverlay: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    },
    modalContent: {
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      padding: '2rem',
      maxWidth: '600px',
      width: '90%',
      maxHeight: '90vh',
      overflowY: 'auto' as const,
      position: 'relative' as const
    },
    modalClose: {
      position: 'absolute' as const,
      top: '1rem',
      right: '1rem',
      cursor: 'pointer',
      fontSize: '1.5rem',
      color: '#64748b'
    },
    modalImage: {
      width: '200px',
      height: '250px',
      objectFit: 'cover' as const,
      margin: '0 auto 1rem',
      display: 'block'
    },
    modalTitle: {
      fontSize: '1.5rem',
      fontWeight: '600' as const,
      marginBottom: '0.5rem',
      color: '#1e293b'
    },
    modalAuthor: {
      fontSize: '1.125rem',
      color: '#64748b',
      marginBottom: '1rem'
    },
    modalPublisher: {
      fontSize: '1rem',
      color: '#64748b',
      marginBottom: '1rem'
    },
    modalDescription: {
      fontSize: '1rem',
      color: '#334155',
      lineHeight: '1.6',
      marginBottom: '1.5rem'
    },
    modalActions: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '1.5rem'
    },
    modalPrice: {
      fontSize: '1.25rem',
      fontWeight: '700' as const,
      color: '#3b82f6'
    },
    modalIcons: {
      display: 'flex',
      gap: '1rem'
    },
    modalIcon: {
      fontSize: '1.5rem',
      cursor: 'pointer',
      color: '#64748b',
      '&:hover': {
        color: '#3b82f6'
      }
    }
  };

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>Recommended by AI</h2>
      <div style={styles.grid}>
        {recommendedBooks.map((book) => (
          <div 
            key={book.id} 
            style={styles.bookCard}
            onClick={() => openModal(book)}
          >
            <img 
              src={book.coverImage} 
              alt={book.title} 
              style={styles.bookImage}
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/160x180/f3f4f6/64748b?text=Book+Cover';
              }}
            />
            <div style={styles.bookInfo}>
              <h3 style={styles.bookTitle}>{book.title}</h3>
              <p style={styles.bookAuthor}>by {book.author}</p>
              <div style={styles.bookPrice}>${book.price.toFixed(2)}</div>
              <div style={{ ...styles.stockStatus, ...(!book.inStock && styles.outOfStock) }}>
                {book.inStock ? 'In Stock' : 'Out of Stock'}
              </div>
              <div style={styles.iconContainer}>
                <FaShoppingCart style={styles.icon} onClick={(e) => {
                  e.stopPropagation();
                  // Add to cart logic here
                }} />
                <FaHeart style={styles.icon} onClick={(e) => {
                  e.stopPropagation();
                  // Add to favorites logic here
                }} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <button 
        style={styles.button}
        onClick={() => navigate('/recommendations')}
      >
        Browse Recommendations
      </button>

      {showModal && selectedBook && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <FaTimes style={styles.modalClose} onClick={closeModal} />
            <img 
              src={selectedBook.coverImage} 
              alt={selectedBook.title} 
              style={styles.modalImage}
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x250/f3f4f6/64748b?text=Book+Cover';
              }}
            />
            <h2 style={styles.modalTitle}>{selectedBook.title}</h2>
            <p style={styles.modalAuthor}>by {selectedBook.author}</p>
            <p style={styles.modalPublisher}>Publisher: {selectedBook.publisher}</p>
            <p style={styles.modalDescription}>{selectedBook.description}</p>
            <div style={{ ...styles.stockStatus, ...(!selectedBook.inStock && styles.outOfStock) }}>
              {selectedBook.inStock ? 'In Stock' : 'Out of Stock'}
            </div>
            <div style={styles.modalActions}>
              <div style={styles.modalPrice}>${selectedBook.price.toFixed(2)}</div>
              <div style={styles.modalIcons}>
                <FaShoppingCart 
                  style={styles.modalIcon} 
                  onClick={() => {
                    // Add to cart logic here
                  }}
                />
                <FaHeart 
                  style={styles.modalIcon} 
                  onClick={() => {
                    // Add to favorites logic here
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AIRecommendations;