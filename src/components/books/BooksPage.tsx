import { useState } from 'react';
import BookCard from './BookCard';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import Pagination from './Pagination';
import { useAppDispatch } from '../../redux/hooks';
import { addBookToCart } from '../../redux/slices/cartSlice';
import { addToFavorites } from '../../redux/slices/favoritesSlice';
import { Popup } from '../common/Popup';

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
  },
  {
    id: '6',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    coverImage: 'https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg',
    category: 'Fiction',
    price: 11.99,
    rating: 4.3,
    publisher: 'Scribner',
    description: 'A story of wealth, love, and the American Dream in the Roaring Twenties.',
    inStock: true,
    pageCount: 180,
    language: 'English'
  },
  {
    id: '7',
    title: 'Moby Dick',
    author: 'Herman Melville',
    coverImage: 'https://m.media-amazon.com/images/I/91I5S+2XkVL._AC_UF1000,1000_QL80_.jpg',
    category: 'Adventure',
    price: 14.50,
    rating: 4.0,
    publisher: 'Harper & Brothers',
    description: 'The voyage of the whaling ship Pequod and its captain Ahab, who seeks revenge on the white whale Moby Dick.',
    inStock: true,
    pageCount: 635,
    language: 'English'
  },
  {
    id: '8',
    title: 'War and Peace',
    author: 'Leo Tolstoy',
    coverImage: 'https://m.media-amazon.com/images/I/91OqYLJQNJL._AC_UF1000,1000_QL80_.jpg',
    category: 'Historical Fiction',
    price: 16.99,
    rating: 4.7,
    publisher: 'The Russian Messenger',
    description: 'A masterpiece that chronicles the French invasion of Russia and the impact of the Napoleonic era on Tsarist society.',
    inStock: true,
    pageCount: 1225,
    language: 'Russian'
  },
  {
    id: '9',
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    coverImage: 'https://m.media-amazon.com/images/I/91HPG31dTwL._AC_UF1000,1000_QL80_.jpg',
    category: 'Fiction',
    price: 10.25,
    rating: 3.8,
    publisher: 'Little, Brown and Company',
    description: 'The story of Holden Caulfield and his experiences in New York City after being expelled from prep school.',
    inStock: true,
    pageCount: 234,
    language: 'English'
  },
  {
    id: '10',
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    coverImage: 'https://m.media-amazon.com/images/I/71jLBXtWJWL._AC_UF1000,1000_QL80_.jpg',
    category: 'Fantasy',
    price: 22.99,
    rating: 4.9,
    publisher: 'Allen & Unwin',
    description: 'The epic high fantasy trilogy about the struggle to destroy the One Ring and defeat the Dark Lord Sauron.',
    inStock: true,
    pageCount: 1178,
    language: 'English'
  },
  {
    id: '11',
    title: 'Crime and Punishment',
    author: 'Fyodor Dostoevsky',
    coverImage: 'https://m.media-amazon.com/images/I/71YHjVXyR0L._AC_UF1000,1000_QL80_.jpg',
    category: 'Psychological Fiction',
    price: 12.75,
    rating: 4.5,
    publisher: 'The Russian Messenger',
    description: 'A novel about the mental anguish and moral dilemmas of an impoverished ex-student who murders a pawnbroker.',
    inStock: true,
    pageCount: 430,
    language: 'Russian'
  },
  {
    id: '12',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    coverImage: 'https://m.media-amazon.com/images/I/71aFt4+OTOL._AC_UF1000,1000_QL80_.jpg',
    category: 'Self-Help',
    price: 9.99,
    rating: 3.9,
    publisher: 'HarperTorch',
    description: 'A shepherd boy travels from Spain to Egypt in search of treasure and discovers his personal legend.',
    inStock: true,
    pageCount: 208,
    language: 'Portuguese'
  },
  {
    id: '13',
    title: 'The Diary of a Young Girl',
    author: 'Anne Frank',
    coverImage: 'https://m.media-amazon.com/images/I/71M7Z6hZRjL._AC_UF1000,1000_QL80_.jpg',
    category: 'Biography',
    price: 8.25,
    rating: 4.7,
    publisher: 'Contact Publishing',
    description: 'The diary of Anne Frank, a Jewish girl who chronicled her life in hiding during the German occupation of the Netherlands.',
    inStock: true,
    pageCount: 283,
    language: 'Dutch'
  },
  {
    id: '14',
    title: 'The Little Prince',
    author: 'Antoine de Saint-Exupéry',
    coverImage: 'https://m.media-amazon.com/images/I/81HZ9p+3M5L._AC_UF1000,1000_QL80_.jpg',
    category: 'Children',
    price: 7.50,
    rating: 4.8,
    publisher: 'Reynal & Hitchcock',
    description: 'A poetic tale about a young prince who travels the universe and learns about love, loss, and human nature.',
    inStock: true,
    pageCount: 96,
    language: 'French'
  },
  {
    id: '15',
    title: 'Don Quixote',
    author: 'Miguel de Cervantes',
    coverImage: 'https://m.media-amazon.com/images/I/91Q5dC+9QhL._AC_UF1000,1000_QL80_.jpg',
    category: 'Adventure',
    price: 13.99,
    rating: 4.2,
    publisher: 'Francisco de Robles',
    description: 'The story of a man who reads so many chivalric romances that he decides to become a knight-errant.',
    inStock: true,
    pageCount: 863,
    language: 'Spanish'
  },
  {
    id: '16',
    title: 'The Odyssey',
    author: 'Homer',
    coverImage: 'https://m.media-amazon.com/images/I/91b5Y9GqY1L._AC_UF1000,1000_QL80_.jpg',
    category: 'Epic Poetry',
    price: 10.99,
    rating: 4.1,
    publisher: 'Various',
    description: 'The ancient Greek epic poem about Odysseus\'s long journey home after the fall of Troy.',
    inStock: true,
    pageCount: 541,
    language: 'Ancient Greek'
  },
  {
    id: '17',
    title: 'Frankenstein',
    author: 'Mary Shelley',
    coverImage: 'https://m.media-amazon.com/images/I/71E4WQKz3TL._AC_UF1000,1000_QL80_.jpg',
    category: 'Gothic Fiction',
    price: 9.25,
    rating: 4.0,
    publisher: 'Lackington, Hughes',
    description: 'A scientist creates a sapient creature in an unorthodox scientific experiment.',
    inStock: true,
    pageCount: 280,
    language: 'English'
  },
  {
    id: '18',
    title: 'The Picture of Dorian Gray',
    author: 'Oscar Wilde',
    coverImage: 'https://m.media-amazon.com/images/I/71QN2Xx3VVL._AC_UF1000,1000_QL80_.jpg',
    category: 'Gothic Fiction',
    price: 8.99,
    rating: 4.2,
    publisher: 'Lippincott\'s Monthly Magazine',
    description: 'A story of a man who remains eternally young while his portrait ages and reflects his moral decay.',
    inStock: true,
    pageCount: 254,
    language: 'English'
  },
  {
    id: '19',
    title: 'Wuthering Heights',
    author: 'Emily Brontë',
    coverImage: 'https://m.media-amazon.com/images/I/71Jk3baR3RL._AC_UF1000,1000_QL80_.jpg',
    category: 'Gothic Fiction',
    price: 10.50,
    rating: 4.0,
    publisher: 'Thomas Cautley Newby',
    description: 'A story of the intense, passionate, but ultimately doomed love between Catherine Earnshaw and Heathcliff.',
    inStock: true,
    pageCount: 348,
    language: 'English'
  },
  {
    id: '20',
    title: 'The Brothers Karamazov',
    author: 'Fyodor Dostoevsky',
    coverImage: 'https://m.media-amazon.com/images/I/91QdSMZ0X5L._AC_UF1000,1000_QL80_.jpg',
    category: 'Philosophical Fiction',
    price: 15.99,
    rating: 4.6,
    publisher: 'The Russian Messenger',
    description: 'A passionate philosophical novel set in 19th-century Russia that enters deeply into debates about God, free will, and morality.',
    inStock: true,
    pageCount: 796,
    language: 'Russian'
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
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);

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

  const handleAddToCart = (book: Book) => {
    dispatch(addBookToCart(book));
    setPopupMessage(`${book.title} has been added to your cart!`);
    setSelectedBook(null);
  };

  const handleAddToFavorite = (book: Book) => {
    dispatch(addToFavorites(book));
    setPopupMessage(`${book.title} has been added to your favorites!`);
    setSelectedBook(null);
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
      position: 'relative'
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
            onAddToCart={() => handleAddToCart(book)}
            onAddToFavorite={() => handleAddToFavorite(book)}
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
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 1000
          }} onClick={closePopup} />
          <Popup message={popupMessage} onClose={closePopup} />
        </>
      )}
    </div>
  );
}