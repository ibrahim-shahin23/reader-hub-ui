import { useState,useEffect } from 'react';
import BookCard from './BookCard';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import Pagination from './Pagination';
import { useAppDispatch } from '../../redux/hooks';
import { addBookToCart } from '../../redux/slices/cartSlice';
import { addToFavorites } from '../../redux/slices/favoritesSlice';
import { Popup } from '../common/Popup';
import axios from 'axios';

export type Book = {
  _id: string; // Changed from id to _id to match API
  id: string; // Keep id for compatibility if BookCard or other components use it
  title: string;
  author: string;
  coverImage: string;
  category: string;
  price: number;
  rating?: number;
  publisher: string;
  description: string;
  inStock: boolean;
  pageCount?: number;
  language?: string;
  // Add discount if it's part of your Book type for UI
  discount?: number; 
};

// Interface for the book data coming from the API
interface ApiBook {
  _id: string;
  title: string;
  description: string;
  images: string[];
  price: number;
  discount: number;
  publishing_date: string; 
  author_id: {
    _id: string; // Keep _id as it seems to be always present
    firstName?: string; // Make optional
    lastName?: string;  // Make optional
  } | null; // author_id object itself can be null
  publisher_id: {
    _id: string; // Keep _id
    name?: string;    // Make optional
  } | null; // publisher_id object itself can be null
  category_id: {
    _id: string; // Keep _id
    name?: string;    // Make optional
  } | null; // category_id object itself can be null
  status: 'available' | 'out of stock' | 'unpublished';
  pageCount?: number;
  language?: string;
  rating?: number; // If API provides rating
}

// Interface for the API response structure
interface ApiResponse {
  success: boolean;
  data: {
    books: ApiBook[];
    pagination: {
      total: number;
      page: number;
      pages: number;
    };
  };
  message?: string;
}

const categories = [
  'Fiction', 'Non-Fiction', 'Science Fiction', 'Fantasy', 
  'Biography', 'History', 'Self-Help', 'Romance', 
  'Mystery', 'Thriller', 'Horror', 'Young Adult', 
  'Children', 'Poetry', 'Drama'
] as const;

const BOOKS_PER_PAGE = 10;
// const API_BASE_URL = "http://localhost:8000"; 
const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export default function BooksPage() {
  const dispatch = useAppDispatch();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);

  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const params: Record<string, string | number | undefined> = {
          page: currentPage,
          limit: BOOKS_PER_PAGE,
          title: searchQuery || undefined, // Use 'title' for search as per backend
          category: selectedCategory || undefined, // Assuming backend uses 'category' for category name
        };

        // Remove undefined params
        Object.keys(params).forEach(key => params[key] === undefined && delete params[key]);

        const response = await axios.get<ApiResponse>(`${API_BASE_URL}/api/books`, { params });

        if (response.data.success) {
          const transformedBooks: Book[] = response.data.data.books.map(apiBook => ({
            _id: apiBook._id,
            id: apiBook._id, // For compatibility
            title: apiBook.title,
            author: apiBook.author_id && apiBook.author_id.firstName && apiBook.author_id.lastName 
              ? `${apiBook.author_id.firstName} ${apiBook.author_id.lastName}` 
              : 'Unknown Author',
            coverImage: apiBook.images && apiBook.images.length > 0 ? apiBook.images[0] : 'https://via.placeholder.com/150', // Placeholder image
            category: apiBook.category_id && apiBook.category_id.name 
              ? apiBook.category_id.name 
              : 'Uncategorized',
            price: apiBook.price,
            discount: apiBook.discount,
            publisher: apiBook.publisher_id && apiBook.publisher_id.name 
              ? apiBook.publisher_id.name 
              : 'Unknown Publisher',
            description: apiBook.description,
            inStock: apiBook.status === 'available',
            pageCount: apiBook.pageCount,
            language: apiBook.language,
            rating: apiBook.rating, 
          }));
          setBooks(transformedBooks);
          setTotalPages(response.data.data.pagination.pages);
          setTotalBooks(response.data.data.pagination.total);
        } else {
          setError(response.data.message || 'Failed to fetch books.');
        }
      } catch (err) {
        console.error("Error fetching books:", err);
        if (axios.isAxiosError(err) && err.response) {
          setError(err.response.data.message || 'An error occurred while fetching books.');
        } else {
          setError('An unexpected error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [currentPage, searchQuery, selectedCategory]);


  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
  };

  const handleAddToCart = (book: Book) => {
    dispatch(addBookToCart(book));
    setPopupMessage(`${book.title} has been added to your cart!`);
    setSelectedBook(null); // Close modal if open
  };

  const handleAddToFavorite = async (book: Book) => {
    const token = localStorage.getItem('token'); // Example: if token is in localStorage

    if (!book._id) {
      console.error("Book ID is missing.");
      return;
    }

    if (!token) {
      console.error("Authentication token not found.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/favorites/add`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify({ bookId: book._id }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Failed to add to favorites:", data.message || 'Server error');
       
        return;
      }

      console.log("Book added to favorites successfully:", data);
     } catch (error) {
      console.error("Error adding book to favorites:", error);
     
    }
  
    dispatch(addToFavorites(book));
    setPopupMessage(`${book.title} has been added to your favorites!`);
    setSelectedBook(null); // Close modal if open
  };

  const closeModal = () => {
    setSelectedBook(null);
  };

  const closePopup = () => {
    setPopupMessage(null);
  };

  return (
    <div style={{ 
      padding: '15px', 
      maxWidth: '1400px', 
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif',
      minHeight: 'calc(100vh - 100px)',
      position: 'relative' // For Popup positioning context if needed
    }}>
      <h1 style={{ 
        fontSize: '1.8rem', 
        marginBottom: '15px', 
        textAlign: 'center',
        color: '#2c3e50'
      }}>
        Our Book Collection ({totalBooks > 0 ? totalBooks : '...'} books)
      </h1>
      
      <div style={{ 
        margin: '15px 0', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '10px'
      }}>
        {/* <SearchBar onSearch={(query) => {
          setSearchQuery(query);
          setCurrentPage(1); // Reset to first page on new search
        }} /> */}
        
        {/* <CategoryFilter 
          categories={categories} // You might want to fetch categories from API too
          selectedCategory={selectedCategory}
          onSelectCategory={(category) => {
            setSelectedCategory(category);
            setCurrentPage(1); // Reset to first page on category change
          }}
        /> */}
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>Loading books...</div>
      )}
      {error && !loading && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#e53e3e' }}>Error: {error}</div>
      )}
      
      {!loading && !error && (
        <>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '15px',
            margin: '20px 0'
          }}>
            {books.map(book => (
              <BookCard
                key={book._id} // Use _id from API as key
                book={book}
                onBookClick={() => handleBookClick(book)}
                onAddToCart={() => handleAddToCart(book)} // Pass the whole book object
                onAddToFavorite={() => handleAddToFavorite(book)} // Pass the whole book object
              />
            ))}
          </div>
          
          {books.length === 0 && !loading && (
             <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
               No books found matching your criteria.
             </div>
          )}

          {totalPages > 1 && books.length > 0 && (
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              marginTop: '30px',
              padding: '20px 0',
              borderTop: '1px solid #eee'
            }}>
              <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={setCurrentPage} 
              />
            </div>
          )}
        </>
      )}

      {selectedBook && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '10px',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '20px',
            }}>
              <h2 style={{ margin: 0, fontSize: '1.5rem' }}>{selectedBook.title}</h2>
              <button 
                onClick={closeModal}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  color: '#666'
                }}
              >
                ×
              </button>
            </div>

            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
              <img 
                src={selectedBook.coverImage} 
                alt={selectedBook.title}
                style={{
                  width: '180px',
                  height: '240px',
                  objectFit: 'cover',
                  borderRadius: '5px'
                }}
              />
              <div>
                <p style={{ margin: '0 0 10px', fontSize: '1.1rem' }}>
                  <strong>Author:</strong> {selectedBook.author}
                </p>
                <p style={{ margin: '0 0 10px' }}>
                  <strong>Publisher:</strong> {selectedBook.publisher}
                </p>
                <p style={{ margin: '0 0 10px' }}>
                  <strong>Category:</strong> {selectedBook.category}
                </p>
                <p style={{ margin: '0 0 10px' }}>
                  <strong>Pages:</strong> {selectedBook.pageCount || 'N/A'}
                </p>
                <p style={{ margin: '0 0 10px' }}>
                  <strong>Language:</strong> {selectedBook.language || 'English'}
                </p>
                <p style={{ margin: '0 0 10px' }}>
                  <strong>Price:</strong> ${selectedBook.price.toFixed(2)}
                  {selectedBook.discount && selectedBook.discount > 0 && (
                    <span style={{ marginLeft: '10px', color: 'red' }}>
                      ({selectedBook.discount}% off)
                    </span>
                  )}
                </p>
                <p style={{ 
                  margin: '0 0 10px',
                  color: selectedBook.inStock ? 'green' : 'red'
                }}>
                  <strong>Availability:</strong> {selectedBook.inStock ? 'In Stock' : 'Out of Stock'}
                </p>
                {selectedBook.rating && (
                  <p style={{ margin: '0 0 10px' }}>
                    <strong>Rating:</strong> {selectedBook.rating}/5
                  </p>
                )}
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ margin: '0 0 10px' }}>Description</h3>
              <p style={{ margin: 0, lineHeight: '1.5' }}>{selectedBook.description}</p>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => handleAddToCart(selectedBook)}
                disabled={!selectedBook.inStock}
                style={{
                  padding: '10px 20px',
                  backgroundColor: selectedBook.inStock ? '#4CAF50' : '#cccccc',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: selectedBook.inStock ? 'pointer' : 'not-allowed',
                  fontSize: '1rem'
                }}
              >
                Add to Cart
              </button>
              <button
                onClick={() => handleAddToFavorite(selectedBook)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#f0ad4e',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                Add to Favorites
              </button>
            </div>
          </div>
        </div>
      )}

      {popupMessage && (
        <>
          {/* Overlay for popup */}
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 1000 // Ensure overlay is below popup but above other content
          }} onClick={closePopup} />
          <Popup message={popupMessage} onClose={closePopup} />
        </>
      )}
    </div>
  );
}