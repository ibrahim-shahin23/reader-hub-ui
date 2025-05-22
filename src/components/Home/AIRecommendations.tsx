import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaTimes } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addBookToCart } from '../../redux/slices/cartSlice';
import { addToFavorites, removeFromFavorites } from '../../redux/slices/favoritesSlice';

interface Book {
  id: string;
  title: string;
  author: string;
  publisher: string;
  description: string;
  coverImage: string;
  price: number;
  inStock: boolean;
  category?: string;
  pageCount?: number;
  language?: string;
  rating?: number;
}

const AIRecommendations: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const favoriteBooks = useAppSelector((state) => state.favorites.books);
  const cartItems = useAppSelector((state) => state.cart.items);
  
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'cart' | 'favorites' | 'removed'>('cart');

  const recommendedBooks: Book[] = [
    {
      id: '1',
      title: 'The AI Revolution: How Artificial Intelligence is Changing Everything',
      author: 'Dr. Samantha Chen',
      publisher: 'Tech Publishing Inc.',
      description: 'A comprehensive guide to the AI revolution and its impact on society, business, and technology.',
      coverImage: 'https://books.google.com.eg/books/publisher/content?id=ziZAEQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE737U_W8o4mfIUDGH_zuaFnq3LP6EqAEj46JCEH5stTGQIbJ6ZdKdgoI65QmWF-v1m8dWseG1z0sj09flGdmhk6YrtGUy0DIaQrA_YTGwZHqeQeeEbGl5ysw619_PlXxwiLJuCyh',
      price: 28.99,
      inStock: true,
      category: 'AI & Technology',
      pageCount: 400, language: 'English', rating: 4.5
    },
    {
      id: '2',
      title: 'Machine Learning Yearning: Technical Strategy for AI Engineers',
      author: 'Andrew Ng',
      publisher: 'Computer Science Press',
      description: 'Fundamentals of machine learning algorithms and their practical applications in various fields.',
      coverImage: 'https://printrado.com/wp-content/uploads/2025/01/Google-Machine-Learning-and-Generative-AI-for-Solutions-Architects-768x947.jpg.webp',
      price: 24.50,
      inStock: true,
      category: 'AI & Technology',
      pageCount: 250, language: 'English', rating: 4.7
    },
    {
      id: '3',
      title: 'Deep Learning: A Comprehensive Guide to Neural Networks',
      author: 'Ian Goodfellow',
      publisher: 'Deep Learning Media',
      description: 'Detailed exploration of neural network architectures and their implementation in modern AI systems.',
      coverImage: 'https://images-na.ssl-images-amazon.com/images/I/61fim5QqaqL._SX373_BO1,204,203,200_.jpg',
      price: 26.75,
      inStock: true,
      category: 'AI & Technology',
      pageCount: 700, language: 'English', rating: 4.8
    },
    {
      id: '4',
      title: 'Life 3.0: Being Human in the Age of Artificial Intelligence',
      author: 'Max Tegmark',
      publisher: 'Future Tech Publications',
      description: 'A visionary look at how artificial intelligence will shape our future in the coming decades.',
      coverImage: 'https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg',
      price: 29.99,
      inStock: true,
      category: 'AI & Technology',
      pageCount: 380, language: 'English', rating: 4.6
    },
    {
      id: '5',
      title: 'Superintelligence: Paths, Dangers, Strategies',
      author: 'Nick Bostrom',
      publisher: 'AI Academic Press',
      description: 'The definitive textbook on deep learning methods and their theoretical foundations.',
      coverImage: 'https://printrado.com/wp-content/uploads/2025/02/Introduction-to-Artificial-Intelligence-679x1030.jpg.webp',
      price: 32.50,
      inStock: true,
      category: 'AI & Technology',
      pageCount: 350, language: 'English', rating: 4.9 
    }
  ];

  const isBookInFavorites = (bookId: string) => {
    return favoriteBooks.some(book => book.id === bookId);
  };

  const isBookInCart = (bookId: string) => {
    return cartItems.some(item => item.id === bookId);
  };

  const handleAddToCart = (book: Book, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
    }
    dispatch(addBookToCart(book));
    setAlertMessage(`${book.title} has been added to your cart!`);
    setAlertType('cart');
    setShowSuccessAlert(true);
  };

  const handleToggleFavorites = (book: Book, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
    }
    if (isBookInFavorites(book.id)) {
      dispatch(removeFromFavorites(book.id));
      setAlertMessage(`${book.title} has been removed from your favorites.`);
      setAlertType('removed');
    } else {
      dispatch(addToFavorites(book));
      setAlertMessage(`${book.title} has been added to your favorites!`);
      setAlertType('favorites');
    }
    setShowSuccessAlert(true);
  };

  const openModal = (book: Book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeAlert = () => {
    setShowSuccessAlert(false);
  };

  const styles = {
    section: {
      padding: '3rem 1.5rem',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      maxWidth: '1400px',
      margin: '0 auto',
      textAlign: 'center' as const,
      borderRadius: '24px',
      marginTop: '2rem',
      marginBottom: '2rem',
      '@media (max-width: 768px)': {
        padding: '2rem 1rem',
        borderRadius: '0',
        marginTop: '1rem',
        marginBottom: '1rem'
      }
    },
    heading: {
      fontSize: '2.5rem',
      fontWeight: '700' as const,
      marginBottom: '3rem',
      color: '#ffffff',
      textShadow: '0 2px 4px rgba(0,0,0,0.1)',
      letterSpacing: '-0.025em',
      '@media (max-width: 768px)': {
        fontSize: '2rem',
        marginBottom: '2rem'
      },
      '@media (max-width: 480px)': {
        fontSize: '1.75rem'
      }
    },
    gridContainer: {
      width: '100%',
      overflowX: 'auto', 
      paddingBottom: '1rem',
      '@media (max-width: 768px)': {
        paddingBottom: '0.5rem'
      }
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, minmax(200px, 1fr))',
      gap: '1.5rem',
      padding: '0 1rem',
      margin: '0 auto',
      width: 'fit-content', 
      minWidth: '100%', 
      '@media (max-width: 1200px)': {
        gridTemplateColumns: 'repeat(4, minmax(180px, 1fr))'
      },
      '@media (max-width: 992px)': {
        gridTemplateColumns: 'repeat(3, minmax(160px, 1fr))'
      },
      '@media (max-width: 768px)': {
        gridTemplateColumns: 'repeat(2, minmax(140px, 1fr))',
        gap: '1rem'
      },
      '@media (max-width: 480px)': {
        gridTemplateColumns: 'repeat(1, minmax(140px, 1fr))'
      }
    },
    bookCard: {
      cursor: 'pointer',
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1), 0 4px 10px rgba(0,0,0,0.05)',
      textAlign: 'center' as const,
      width: '100%',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      border: '1px solid rgba(255,255,255,0.2)',
      transform: 'translateY(0)',

      '@media (max-width: 768px)': {
        borderRadius: '12px'
      }
    },
    bookImage: {
      width: '100%',
      height: '220px',
      objectFit: 'cover' as const,
      borderBottom: '1px solid #f1f5f9',
      '@media (max-width: 768px)': {
        height: '180px'
      }
    },
    bookInfo: {
      padding: '1.25rem 1rem',
      position: 'relative' as const,
      minHeight: '180px',
      display: 'flex',
      flexDirection: 'column' as const,
      '@media (max-width: 768px)': {
        padding: '1rem',
        minHeight: '160px'
      }
    },
    bookTitle: {
      fontSize: '1rem',
      fontWeight: '600' as const,
      margin: '0 0 0.5rem',
      color: '#1e293b',
      lineHeight: '1.4',
      wordWrap: 'break-word' as const,
      whiteSpace: 'normal' as const,
      textAlign: 'center' as const,
      flexGrow: 1,
      '@media (max-width: 768px)': {
        fontSize: '0.9375rem'
      }
    },
    bookAuthor: {
      fontSize: '0.875rem',
      color: '#64748b',
      margin: '0 0 0.75rem',
      fontWeight: '500' as const,
      '@media (max-width: 768px)': {
        fontSize: '0.8125rem',
        marginBottom: '0.5rem'
      }
    },
    bookPrice: {
      fontSize: '1.125rem',
      fontWeight: '700' as const,
      color: '#2563eb',
      background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      margin: '0.75rem 0 1rem',
      '@media (max-width: 768px)': {
        fontSize: '1rem',
        margin: '0.5rem 0'
      }
    },
    iconContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '1rem',
      marginTop: 'auto',
      '@media (max-width: 768px)': {
        gap: '0.75rem'
      }
    },
    iconButton: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s ease',
      fontSize: '1rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      '@media (max-width: 768px)': {
        width: '36px',
        height: '36px',
        fontSize: '0.875rem'
      }
    },
    cartButton: {
      backgroundColor: '#f1f5f9',
      color: '#64748b'
    },
    cartButtonActive: {
      backgroundColor: '#10b981',
      color: '#ffffff'
    },
    favoriteButton: {
      backgroundColor: '#f1f5f9',
      color: '#64748b'
    },
    favoriteButtonActive: {
      backgroundColor: '#ef4444',
      color: '#ffffff'
    },
    button: {
      display: 'inline-block',
      margin: '3rem auto 0',
      padding: '1rem 2rem',
      fontSize: '1rem',
      fontWeight: '600' as const,
      background: 'linear-gradient(135deg, #ffffff, #f8fafc)',
      color: '#4f46e5',
      border: 'none',
      borderRadius: '50px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      backdropFilter: 'blur(10px)',
      '@media (max-width: 768px)': {
        padding: '0.875rem 1.75rem',
        fontSize: '0.9375rem',
        marginTop: '2rem'
      }
    },
    modalOverlay: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      '@media (max-width: 768px)': {
      }
    },
    modalContent: {
      backgroundColor: '#ffffff',
      borderRadius: '20px',
      padding: '2.5rem',
      maxWidth: '600px',
      width: '90%', 
      maxHeight: '90vh', 
      overflowY: 'auto' as const,
      position: 'relative' as const,
      boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
      border: '1px solid rgba(255,255,255,0.2)',
      '@media (max-width: 768px)': {
        padding: '1.5rem',
        borderRadius: '16px'
      }
    },
    modalClose: {
      position: 'absolute' as const,
      top: '1.5rem',
      right: '1.5rem',
      cursor: 'pointer',
      fontSize: '1.5rem',
      color: '#64748b',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f8fafc',
      transition: 'all 0.2s ease',
      '@media (max-width: 768px)': {
        top: '1rem',
        right: '1rem',
        width: '36px',
        height: '36px',
        fontSize: '1.25rem'
      }
    },
    modalImage: {
      width: '220px',
      height: '280px',
      objectFit: 'cover' as const,
      margin: '0 auto 1.5rem',
      display: 'block', 
      borderRadius: '12px',
      boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
      '@media (max-width: 768px)': {
        width: '180px',
        height: '240px'
      }
    },
    modalTitle: {
      fontSize: '1.75rem',
      fontWeight: '700' as const,
      marginBottom: '0.75rem',
      color: '#1e293b',
      lineHeight: '1.3',
      '@media (max-width: 768px)': {
        fontSize: '1.5rem'
      }
    },
    modalAuthor: {
      fontSize: '1.125rem',
      color: '#64748b',
      marginBottom: '0.5rem',
      fontWeight: '500' as const,
      '@media (max-width: 768px)': {
        fontSize: '1rem'
      }
    },
    modalPublisher: {
      fontSize: '1rem',
      color: '#94a3b8',
      marginBottom: '1.5rem',
      fontWeight: '400' as const,
      '@media (max-width: 768px)': {
        fontSize: '0.875rem',
        marginBottom: '1rem'
      }
    },
    modalDescription: {
      fontSize: '1rem',
      color: '#475569',
      lineHeight: '1.7',
      marginBottom: '2rem',
      textAlign: 'left' as const,
      '@media (max-width: 768px)': {
        fontSize: '0.9375rem',
        marginBottom: '1.5rem'
      }
    },
    modalActions: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '2rem',
      paddingTop: '1.5rem',
      borderTop: '1px solid #e2e8f0',
      '@media (max-width: 768px)': {
        marginTop: '1.5rem',
        paddingTop: '1rem',
        flexDirection: 'column' as const, 
        gap: '1rem', 
      }
    },
    modalPrice: {
      fontSize: '1.5rem',
      fontWeight: '700' as const,
      background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      '@media (max-width: 768px)': {
        fontSize: '1.25rem',
        marginBottom: '1rem', 
      }
    },
    modalIcons: {
      display: 'flex',
      gap: '1rem',
      '@media (max-width: 768px)': {
        gap: '0.75rem',
        width: '100%',
        justifyContent: 'center', 
      }
    },
    modalIconButton: {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s ease',
      fontSize: '1.25rem',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      '@media (max-width: 768px)': {
        width: '44px',
        height: '44px',
        fontSize: '1.125rem'
      }
    },
    modalCartButton: {
      backgroundColor: '#f1f5f9',
      color: '#64748b'
    },
    modalCartButtonActive: {
      backgroundColor: '#10b981',
      color: '#ffffff'
    },
    modalFavoriteButton: {
      backgroundColor: '#f1f5f9',
      color: '#64748b'
    },
    modalFavoriteButtonActive: {
      backgroundColor: '#ef4444',
      color: '#ffffff'
    },
    alert: { 
      position: 'fixed' as const,
      top: '10vh',
      right: '20px',
      backgroundColor: '#ffffff',
      border: 'none',
      borderRadius: '12px',
      padding: '1rem 1.5rem',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15), 0 4px 20px rgba(0, 0, 0, 0.1)',
      zIndex: 1001,
      maxWidth: '400px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.2)',
      '@media (max-width: 768px)': {
        top: '5vh', 
        right: '10px',
        left: '10px', 
        maxWidth: 'none',
        padding: '0.875rem 1.25rem'
      }
    },
    alertSuccess: {
      borderLeft: '4px solid #10b981'
    },
    alertMessage: {
      fontSize: '0.9375rem',
      color: '#1e293b',
      margin: 0,
      paddingRight: '1rem',
      fontWeight: '500' as const,
      '@media (max-width: 768px)': {
        fontSize: '0.875rem',
        paddingRight: '0.75rem'
      }
    },
    alertClose: {
      cursor: 'pointer',
      fontSize: '1rem',
      color: '#64748b',
      background: 'none',
      border: 'none',
      padding: '4px',
      borderRadius: '4px',
      transition: 'all 0.2s ease',
      '@media (max-width: 768px)': {
        fontSize: '0.875rem'
      }
    }
  };

  return (
    <>
      <section style={styles.section}>
        <h2 style={styles.heading}>✨ Recommended by AI</h2>
        <div style={styles.gridContainer}>
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
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x220/f3f4f6/64748b?text=Book+Cover';
                  }}
                />
                <div style={styles.bookInfo}>
                  <h3 style={styles.bookTitle}>{book.title}</h3>
                  <p style={styles.bookAuthor}>by {book.author}</p>
                  <div style={styles.bookPrice}>${book.price.toFixed(2)}</div>
                  <div style={styles.iconContainer}>
                    <button 
                      style={{
                        ...styles.iconButton,
                        ...(isBookInCart(book.id) ? styles.cartButtonActive : styles.cartButton)
                      }} 
                      onClick={(e) => handleAddToCart(book, e)}
                    >
                      <FaShoppingCart />
                    </button>
                    <button 
                      style={{
                        ...styles.iconButton,
                        ...(isBookInFavorites(book.id) ? styles.favoriteButtonActive : styles.favoriteButton)
                      }} 
                      onClick={(e) => handleToggleFavorites(book, e)}
                    >
                      <FaHeart />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button 
          style={styles.button}
          onClick={() => navigate('/recommendations')}
        >
          Browse All Recommendations
        </button>

        {showModal && selectedBook && (
          <div style={styles.modalOverlay} onClick={closeModal}>
            <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <div style={styles.modalClose} onClick={closeModal}>
                <FaTimes />
              </div>
              <img 
                src={selectedBook.coverImage} 
                alt={selectedBook.title} 
                style={styles.modalImage}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/220x280/f3f4f6/64748b?text=Book+Cover';
                }}
              />
              <h2 style={styles.modalTitle}>{selectedBook.title}</h2>
              <p style={styles.modalAuthor}>by {selectedBook.author}</p>
              <p style={styles.modalPublisher}>Publisher: {selectedBook.publisher}</p>
              <p style={styles.modalDescription}>{selectedBook.description}</p>
              <div style={styles.modalActions}>
                <div style={styles.modalPrice}>${selectedBook.price.toFixed(2)}</div>
                <div style={styles.modalIcons}>
                  <button 
                    style={{
                      ...styles.modalIconButton,
                      ...(selectedBook.inStock && isBookInCart(selectedBook.id) ? styles.modalCartButtonActive : styles.modalCartButton), // Only active if in stock and in cart
                      cursor: selectedBook.inStock ? 'pointer' : 'not-allowed', // Make cursor indicate disabled
                      opacity: selectedBook.inStock ? 1 : 0.6, // Dim if disabled
                    }} 
                    onClick={() => handleAddToCart(selectedBook)}
                    disabled={!selectedBook.inStock} // Disable if out of stock
                  >
                    <FaShoppingCart />
                  </button>
                  <button 
                    style={{
                      ...styles.modalIconButton,
                      ...(isBookInFavorites(selectedBook.id) ? styles.modalFavoriteButtonActive : styles.modalFavoriteButton)
                    }} 
                    onClick={() => handleToggleFavorites(selectedBook)}
                  >
                    <FaHeart />
                  </button>
                </div>
              </div>
              {/* Added more details for consistency with BooksPage modal */}
              <div style={{ textAlign: 'left', marginTop: '1rem', color: '#475569', fontSize: '0.9rem' }}>
                <p><strong>Category:</strong> {selectedBook.category || 'N/A'}</p>
                <p><strong>Pages:</strong> {selectedBook.pageCount || 'N/A'}</p>
                <p><strong>Language:</strong> {selectedBook.language || 'N/A'}</p>
                <p style={{ color: selectedBook.inStock ? 'green' : 'red' }}>
                  <strong>Availability:</strong> {selectedBook.inStock ? 'In Stock' : 'Out of Stock'}
                </p>
                {selectedBook.rating && <p><strong>Rating:</strong> {selectedBook.rating}/5</p>}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Success Alert */}
      {showSuccessAlert && (
        <div style={{ ...styles.alert, ...styles.alertSuccess }}>
          <p style={styles.alertMessage}>{alertMessage}</p>
          <button style={styles.alertClose} onClick={closeAlert}>
            <FaTimes />
          </button>
        </div>
      )}
    </>
  );
};

export default AIRecommendations;