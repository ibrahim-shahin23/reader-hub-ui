import { useState } from 'react';
import BookCard from './BookCard';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import Pagination from './Pagination';

export type Book = {
  id: string;
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
};

const mockBooks: Book[] = [
  {
    id: '1',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    coverImage: 'https://m.media-amazon.com/images/I/710+HcoP38L._AC_UF1000,1000_QL80_.jpg',
    category: 'Fantasy',
    price: 12.99,
    rating: 4.8,
    publisher: 'Allen & Unwin',
    description: 'The Hobbit is a tale of high adventure, undertaken by a company of dwarves, in search of dragon-guarded gold.',
    inStock: true,
    pageCount: 310,
    language: 'English'
  },
  {
    id: '2',
    title: 'Dune',
    author: 'Frank Herbert',
    coverImage: 'https://m.media-amazon.com/images/I/81ym3QUd3KL._AC_UF1000,1000_QL80_.jpg',
    category: 'Science Fiction',
    price: 15.99,
    rating: 4.7,
    publisher: 'Chilton Books',
    description: 'Dune is a 1965 science fiction novel by Frank Herbert about the son of a noble family entrusted with the protection of the most valuable asset in the galaxy.',
    inStock: true,
    pageCount: 412,
    language: 'English'
  },
  {
    id: '3',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    coverImage: 'https://m.media-amazon.com/images/I/71FxgtFKcQL._AC_UF1000,1000_QL80_.jpg',
    category: 'Fiction',
    price: 10.99,
    rating: 4.9,
    publisher: 'J. B. Lippincott & Co.',
    description: 'The story of a young girl and her family living in a racially divided Alabama town during the Great Depression.',
    inStock: false,
    pageCount: 281,
    language: 'English'
  },
  {
    id: '4',
    title: '1984',
    author: 'George Orwell',
    coverImage: 'https://m.media-amazon.com/images/I/71kxa1-0mfL._AC_UF1000,1000_QL80_.jpg',
    category: 'Dystopian',
    price: 9.99,
    rating: 4.6,
    publisher: 'Secker & Warburg',
    description: 'A dystopian novel set in a totalitarian society ruled by the Party, which has total control over every aspect of people\'s lives.',
    inStock: true,
    pageCount: 328,
    language: 'English'
  },
  {
    id: '5',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    coverImage: 'https://m.media-amazon.com/images/I/71Q1tPupKjL._AC_UF1000,1000_QL80_.jpg',
    category: 'Romance',
    price: 8.50,
    rating: 4.5,
    publisher: 'T. Egerton, Whitehall',
    description: 'The romantic clash between the opinionated Elizabeth Bennet and the proud Mr. Darcy.',
    inStock: true,
    pageCount: 279,
    language: 'English'
  }
];

const categories = [
  'Fiction', 'Non-Fiction', 'Science Fiction', 'Fantasy', 
  'Biography', 'History', 'Self-Help', 'Romance', 
  'Mystery', 'Thriller', 'Horror', 'Young Adult', 
  'Children', 'Poetry', 'Drama'
] as const;

const BOOKS_PER_PAGE = 10;

export default function BooksPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const filteredBooks = mockBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredBooks.length / BOOKS_PER_PAGE);
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * BOOKS_PER_PAGE,
    currentPage * BOOKS_PER_PAGE
  );

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
  };

  const handleAddToCart = (id: string) => {
    console.log(`Added book ${id} to cart`);
    // Close modal after adding to cart
    setSelectedBook(null);
  };

  const handleAddToFavorite = (id: string) => {
    console.log(`Added book ${id} to favorites`);
    // Close modal after adding to favorites
    setSelectedBook(null);
  };

  const closeModal = () => {
    setSelectedBook(null);
  };

  return (
    <div style={{ 
      padding: '15px', 
      maxWidth: '1400px', 
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif',
      minHeight: 'calc(100vh - 100px)'
    }}>
      <h1 style={{ 
        fontSize: '1.8rem', 
        marginBottom: '15px', 
        textAlign: 'center',
        color: '#2c3e50'
      }}>
        Our Book Collection ({filteredBooks.length} books)
      </h1>
      
      <div style={{ 
        margin: '15px 0', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '10px'
      }}>
        <SearchBar onSearch={(query) => {
          setSearchQuery(query);
          setCurrentPage(1);
        }} />
        
        <CategoryFilter 
          categories={categories} 
          selectedCategory={selectedCategory}
          onSelectCategory={(category) => {
            setSelectedCategory(category);
            setCurrentPage(1);
          }}
        />
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: '15px',
        margin: '20px 0'
      }}>
        {paginatedBooks.map(book => (
          <BookCard
            key={book.id}
            book={book}
            onBookClick={() => handleBookClick(book)}
            onAddToCart={handleAddToCart}
            onAddToFavorite={handleAddToFavorite}
          />
        ))}
      </div>
      
      {filteredBooks.length > 0 ? (
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
      ) : (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          No books found matching your criteria
        </div>
      )}

      {/* Book Details Modal */}
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
                onClick={() => handleAddToCart(selectedBook.id)}
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
                onClick={() => handleAddToFavorite(selectedBook.id)}
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
    </div>
  );
}