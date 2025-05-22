import React from 'react';
import { useNavigate } from 'react-router-dom';
import bannerImage from '../../assets/bannerImage.png';

const HomeBanner: React.FC = () => {
  const navigate = useNavigate();

  const styles = {
    banner: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0 0',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      margin: '0 0',
      flexWrap: 'wrap' as const,
      width: '100vw',
      height: '85vh',
      marginLeft: 'calc(50% - 50vw)',
      marginRight: 'calc(50% - 50vw)',
      borderRadius: '0',
      boxShadow: '0 20px 40px rgba(102, 126, 234, 0.15)',
      position: 'relative' as const,
      overflow: 'hidden'
    },
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap' as const,
      maxWidth: '1200px',
      margin: '0 auto',
      width: '100%'
    },
    backgroundPattern: {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `
        radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.08) 0%, transparent 50%),
        radial-gradient(circle at 40% 80%, rgba(255, 255, 255, 0.06) 0%, transparent 50%)
      `,
      pointerEvents: 'none'
    },
    content: {
      flex: '1',
      padding: '0 2rem',
      minWidth: '300px',
      maxWidth: '600px',
      textAlign: 'center' as const,
      position: 'relative' as const,
      zIndex: 2
    },
    heading: {
      fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
      color: '#ffffff',
      marginBottom: '1.5rem',
      fontWeight: '800' as const,
      lineHeight: '1.2',
      textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      letterSpacing: '-0.02em'
    },
    text: {
      fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
      color: 'rgba(255, 255, 255, 0.9)',
      marginBottom: '2.5rem',
      lineHeight: '1.7',
      fontWeight: '400' as const
    },
    button: {
      padding: '16px 36px',
      fontSize: '1.1rem',
      fontWeight: '600' as const,
      letterSpacing: '0.5px',
      textTransform: 'uppercase' as const,
      background: 'linear-gradient(135deg, #ff6b6b 0%, #ffa726 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '50px',
      cursor: 'pointer',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      margin: '0 auto',
      boxShadow: '0 8px 25px rgba(255, 107, 107, 0.3)',
      position: 'relative' as const,
      overflow: 'hidden',
      zIndex: 1
    },
    buttonRipple: {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 100%)',
      transform: 'translateX(-100%)',
      transition: 'transform 0.6s ease',
      zIndex: -1
    },
    imageContainer: {
      flex: '1',
      minWidth: '300px',
      maxWidth: '500px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem',
      position: 'relative' as const,
      zIndex: 2
    },
    image: {
      maxWidth: '100%',
      height: 'auto',
      maxHeight: '400px',
      objectFit: 'contain' as const,
      filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.2))',
      transition: 'transform 0.3s ease'
    },
    '@media (max-width: 768px)': {
      banner: {
        padding: '3rem 1.5rem',
        borderRadius: '0'
      },
      container: {
        flexDirection: 'column'
      },
      content: {
        padding: '0',
        marginBottom: '2rem'
      },
      imageContainer: {
        padding: '1rem'
      },
      heading: {
        marginBottom: '1rem'
      },
      text: {
        marginBottom: '2rem'
      }
    }
  };

  const handleMouseOver = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
    e.currentTarget.style.boxShadow = '0 12px 35px rgba(255, 107, 107, 0.4)';
    const ripple = e.currentTarget.querySelector('.button-ripple') as HTMLElement;
    if (ripple) {
      ripple.style.transform = 'translateX(0)';
    }
  };

  const handleMouseOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = 'translateY(0) scale(1)';
    e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 107, 107, 0.3)';
    const ripple = e.currentTarget.querySelector('.button-ripple') as HTMLElement;
    if (ripple) {
      ripple.style.transform = 'translateX(-100%)';
    }
  };

  const handleImageHover = (e: React.MouseEvent<HTMLImageElement>) => {
    e.currentTarget.style.transform = 'scale(1.05) rotate(1deg)';
  };

  const handleImageLeave = (e: React.MouseEvent<HTMLImageElement>) => {
    e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
  };

  return (
    <div style={styles.banner}>
      <div style={styles.backgroundPattern}></div>
      
      <div style={styles.container}>
        <div style={styles.content}>
          <h1 style={styles.heading}>READER HUB</h1>
          <p style={styles.text}>
          Connecting publishers, authors, and readers in a seamless virtual environment
          </p>
          <button 
            onClick={() => navigate('/books')}
            style={styles.button}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            <span className="button-ripple" style={styles.buttonRipple}></span>
              BROWSE BOOKS
          </button>
        </div>
        
        <div style={styles.imageContainer}>
          <img 
            src={bannerImage} 
            alt="Book fair illustration" 
            style={styles.image}
            onMouseOver={handleImageHover}
            onMouseOut={handleImageLeave}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;