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
}

const AIRecommendations: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  // Get favorites and cart from Redux store
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
      title: 'The AI Revolution',
      author: 'Dr. Samantha Chen',
      publisher: 'Tech Publishing Inc.',
      description: 'A comprehensive guide to the AI revolution and its impact on society, business, and technology.',
      coverImage: 'https://books.google.com.eg/books/publisher/content?id=ziZAEQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE737U_W8o4mfIUDGH_zuaFnq3LP6EqAEj46JCEH5stTGQIbJ6ZdKdgoI65QmWF-v1m8dWseG1z0sj09flGdmhk6YrtGUy0DIaQrA_YTGwZHqeQeeEbGl5ysw619_PlXxwiLJuCyh',
      price: 28.99,
      inStock: true
    },
    {
      id: '2',
      title: 'Machine Learning Yearning',
      author: 'Andrew Ng',
      publisher: 'Computer Science Press',
      description: 'Fundamentals of machine learning algorithms and their practical applications in various fields.',
      coverImage: 'https://printrado.com/wp-content/uploads/2025/01/Google-Machine-Learning-and-Generative-AI-for-Solutions-Architects-768x947.jpg.webp',
      price: 24.50,
      inStock: true
    },
    {
      id: '3',
      title: 'Deep Learning',
      author: 'Ian Goodfellow',
      publisher: 'Deep Learning Media',
      description: 'Detailed exploration of neural network architectures and their implementation in modern AI systems.',
      coverImage: 'https://images-na.ssl-images-amazon.com/images/I/61fim5QqaqL._SX373_BO1,204,203,200_.jpg',
      price: 26.75,
      inStock: true
    },
    {
      id: '4',
      title: 'Life 3.0',
      author: 'Max Tegmark',
      publisher: 'Future Tech Publications',
      description: 'A visionary look at how artificial intelligence will shape our future in the coming decades.',
      coverImage: 'https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg',
      price: 29.99,
      inStock: true
    },
    {
      id: '5',
      title: 'Superintelligence',
      author: 'Nick Bostrom',
      publisher: 'AI Academic Press',
      description: 'The definitive textbook on deep learning methods and their theoretical foundations.',
      coverImage: 'https://printrado.com/wp-content/uploads/2025/02/Introduction-to-Artificial-Intelligence-679x1030.jpg.webp',
      price: 32.50,
      inStock: true
    }
  ];

  // Check if a book is in favorites
  const isBookInFavorites = (bookId: string) => {
    return favoriteBooks.some(book => book.id === bookId);
  };

  // Check if a book is in cart
  const isBookInCart = (bookId: string) => {
    return cartItems.some(item => item.id === bookId);
  };

  // Handle adding book to cart
  const handleAddToCart = (book: Book, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
    }

    // Convert Book to the format expected by Redux
    const bookForCart = {
      id: book.id,
      title: book.title,
      author: book.author,
      publisher: book.publisher,
      price: book.price,
      coverImage: book.coverImage,
      description: book.description,
      inStock: book.inStock,
      category: 'AI & Technology', // Default category for AI recommendations
      pageCount: 300, // Default page count
      language: 'English', // Default language
      rating: 4.5 // Default rating
    };

    dispatch(addBookToCart(bookForCart));
    setAlertMessage(`${book.title} has been added to your cart!`);
    setAlertType('cart');
    setShowSuccessAlert(true);
  };

  // Handle adding/removing book from favorites
  const handleToggleFavorites = (book: Book, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
    }

    const bookForFavorites = {
      id: book.id,
      title: book.title,
      author: book.author,
      publisher: book.publisher,
      price: book.price,
      coverImage: book.coverImage,
      description: book.description,
      inStock: book.inStock,
      category: 'AI & Technology',
      pageCount: 300,
      language: 'English',
      rating: 4.5
    };

    if (isBookInFavorites(book.id)) {
      dispatch(removeFromFavorites(book.id));
      setAlertMessage(`${book.title} has been removed from your favorites.`);
      setAlertType('removed');
    } else {
      dispatch(addToFavorites(bookForFavorites));
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
      marginBottom: '2rem'
    },
    heading: {
      fontSize: '2.5rem',
      fontWeight: '700' as const,
      marginBottom: '3rem',
      color: '#ffffff',
      textShadow: '0 2px 4px rgba(0,0,0,0.1)',
      letterSpacing: '-0.025em'
    },
    grid: {
      display: 'flex',
      justifyContent: 'center',
      gap: '1.5rem',
      padding: '0 1rem',
      margin: '0 auto',
      overflowX: 'auto',
      scrollbarWidth: 'none' as const,
      paddingBottom: '1rem'
    },
    bookCard: {
      cursor: 'pointer',
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1), 0 4px 10px rgba(0,0,0,0.05)',
      textAlign: 'center' as const,
      minWidth: '200px',
      flexShrink: 0,
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      border: '1px solid rgba(255,255,255,0.2)',
      transform: 'translateY(0)',
      '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.15), 0 8px 20px rgba(0,0,0,0.1)'
      }
    },
    bookImage: {
      width: '100%',
      height: '220px',
      objectFit: 'cover' as const,
      borderBottom: '1px solid #f1f5f9'
    },
    bookInfo: {
      padding: '1.25rem 1rem',
      position: 'relative' as const
    },
    bookTitle: {
      fontSize: '1rem',
      fontWeight: '600' as const,
      margin: '0 0 0.5rem',
      color: '#1e293b',
      lineHeight: '1.4',
      display: '-webkit-box',
      WebkitLineClamp: 2 as const,
      WebkitBoxOrient: 'vertical' as const,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      minHeight: '2.8rem'
    },
    bookAuthor: {
      fontSize: '0.875rem',
      color: '#64748b',
      margin: '0 0 0.75rem',
      fontWeight: '500' as const
    },
    bookPrice: {
      fontSize: '1.125rem',
      fontWeight: '700' as const,
      color: '#2563eb',
      margin: '0.75rem 0 1rem',
      background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    iconContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '1rem',
      marginTop: '1rem'
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
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
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
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
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
      animation: 'fadeIn 0.3s ease'
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
      border: '1px solid rgba(255,255,255,0.2)'
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
      transition: 'all 0.2s ease'
    },
    modalImage: {
      width: '220px',
      height: '280px',
      objectFit: 'cover' as const,
      margin: '0 auto 1.5rem',
      display: 'block',
      borderRadius: '12px',
      boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
    },
    modalTitle: {
      fontSize: '1.75rem',
      fontWeight: '700' as const,
      marginBottom: '0.75rem',
      color: '#1e293b',
      lineHeight: '1.3'
    },
    modalAuthor: {
      fontSize: '1.125rem',
      color: '#64748b',
      marginBottom: '0.5rem',
      fontWeight: '500' as const
    },
    modalPublisher: {
      fontSize: '1rem',
      color: '#94a3b8',
      marginBottom: '1.5rem',
      fontWeight: '400' as const
    },
    modalDescription: {
      fontSize: '1rem',
      color: '#475569',
      lineHeight: '1.7',
      marginBottom: '2rem',
      textAlign: 'left' as const
    },
    modalActions: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '2rem',
      paddingTop: '1.5rem',
      borderTop: '1px solid #e2e8f0'
    },
    modalPrice: {
      fontSize: '1.5rem',
      fontWeight: '700' as const,
      background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    modalIcons: {
      display: 'flex',
      gap: '1rem'
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
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
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
      animation: 'slideIn 0.3s ease',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.2)'
    },
    alertSuccess: {
      borderLeft: '4px solid #10b981'
    },
    alertMessage: {
      fontSize: '0.9375rem',
      color: '#1e293b',
      margin: 0,
      paddingRight: '1rem',
      fontWeight: '500' as const
    },
    alertClose: {
      cursor: 'pointer',
      fontSize: '1rem',
      color: '#64748b',
      background: 'none',
      border: 'none',
      padding: '4px',
      borderRadius: '4px',
      transition: 'all 0.2s ease'
    }
  };

  return (
    <>
      <section style={styles.section}>
        <h2 style={styles.heading}>✨ Recommended by AI</h2>
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
                      ...(isBookInCart(selectedBook.id) ? styles.modalCartButtonActive : styles.modalCartButton)
                    }} 
                    onClick={() => handleAddToCart(selectedBook)}
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