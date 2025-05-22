import { CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface ContactMessage {
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

const styles = {
  all: {
    fontFamily: '"Helvetica", Arial, sans-serif',
  },
  container: {
    maxWidth: '1000px',
    margin: '50px auto',
    padding: '20px',
    boxShadow: '10px 10px 20px 5px #298eb9',
    borderRadius: '5px',
    justifyContent: 'center',
  },
  containerHover: {
    boxShadow: '5px 5px 20px 2px rgb(102, 144, 222)',
  },
  heading: {
    textAlign: 'center' as const,
    textDecoration: 'underline',
  },
  contactInfo: {
    textAlign: 'center' as const,
    marginBottom: '30px',
  },
  contactInfoParagraph: {
    margin: '10px 0',
    fontSize: '1.2rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
  },
  formInput: {
    width: '90%',
    padding: '5px',
    margin: '10px 0',
    textAlign: 'center' as const,
    fontSize: '1.2rem',
    justifyContent: 'center',
  },
  formButton: {
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1.2rem',
  },
  strong: {
    color: '#07415c',
    padding: '8px',
  },
  body: {
    overflowX: 'hidden' as const,
    fontFamily: "'Times New Roman', Times, serif",
    paddingTop: '50px',
  },
  iconLinks: {
    display: 'flex',
    alignItems: 'center',
    color: 'black',
  },
  logo: {
    maxWidth: '100%',
    height: 'auto',
  },
  navLink: {
    padding: '0 20px',
  },
  search: {
    width: '300px',
    padding: '5px 10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  searchResults: {
    maxHeight: '300px',
    overflowY: 'auto' as const,
    backgroundColor: 'white',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    padding: 0,
    listStyleType: 'none',
    margin: 0,
    zIndex: 1000,
  },
  searchResultsItem: {
    cursor: 'pointer',
  },
  searchResultsItemHover: {
    backgroundColor: '#f8f9fa',
  },
  login: {
    display: 'none',
  },
  footer: {
    backgroundColor: 'rgb(0, 0, 0)',
    width: '100%',
    height: '100px',
    textAlign: 'center' as const,
    color: 'white',
  },
  footIcon: {
    marginTop: '20px',
    marginRight: '2px',
  },
  icons: {
    color: 'black',
  },
};

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const submitMessage = () => {
    // Basic form validation
    if (!name || !email || !message) {
      return;
    }

    const newMessage: ContactMessage = {
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
    };

    // Get existing messages from localStorage or initialize empty array
    const messages: ContactMessage[] = JSON.parse(
      localStorage.getItem('contactMessages') || '[]'
    );

    // Add new message
    messages.push(newMessage);

    // Save updated messages to localStorage
    localStorage.setItem('contactMessages', JSON.stringify(messages));

    // Reset form
    setName('');
    setEmail('');
    setMessage('');

    // Show toast notification instead of alert
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  return (
    <div style={styles.body}>
      {/* Toast Notification */}
      {showToast && (
        <div 
          style={{
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9999,
            animation: 'fadeIn 0.3s ease-out'
          }}
        >
          <div 
            style={{
              backgroundColor: '#16a34a',
              color: 'white',
              padding: '16px 24px',
              borderRadius: '8px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              maxWidth: '400px',
              minWidth: '350px'
            }}
          >
            <CheckCircle size={40} style={{ color: '#bbf7d0' }} />
            <div>
              <p style={{ 
                fontWeight: '500', 
                fontSize: '20px', 
                margin: 0,
                lineHeight: '1.4'
              }}>
                Your message has been sent to Admin. Thank you for your concern!
              </p>
            </div>
          </div>
        </div>
      )}

      <div
        className="row"
        style={{ textAlign: 'center', margin: '20px 0' }}
        id="map"
      >
        <h2
          className="col-12 col-sm-12 col-md-12 col-lg-12"
          style={styles.heading}
        >
          OUR LOCATION
        </h2>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2756.5788545091714!2d31.21943913137829!3d30.04852984050769!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145841f8040e981b%3A0x4a430b65203befe9!2z2YXYr9iu2YQg2YXYsdmD2LIg2LTYqNin2Kgg2KfZhNis2LLZitix2KkgKNin2YTYs9io2KfYrdipKQ!5e1!3m2!1sen!2seg!4v1747920625035!5m2!1sen!2seg"
          width="200"
          height="650"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Location Map"
        />
      </div>

      <div
        id="container"
        className="row"
        style={{
          ...styles.container,
          ...(isHovered ? styles.containerHover : {}),
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h1
          className="col-12 col-sm-12 col-md-12 col-lg-12"
          style={styles.heading}
        >
          CONTACT US
        </h1>
        <div
          className="contact-info col-12 col-sm-12 col-md-12 col-lg-12"
          style={styles.contactInfo}
        >
          <p style={styles.contactInfoParagraph}>
            <i className="fa-solid fa-envelope"></i>
            <strong style={styles.strong}>Email:</strong> reader_hub@DEBI.com
          </p>
          <p style={styles.contactInfoParagraph}>
            <i className="fa-solid fa-phone"></i>
            <strong style={styles.strong}>Phone:</strong> +201115362939
          </p>
          <p style={styles.contactInfoParagraph}>
            <i className="fas fa-clock icon"></i>
            <strong style={styles.strong}>Customer Service Hours:</strong> 24
            hours
          </p>
        </div>

        <div id="contact-form" style={styles.form}>
          <input
            style={styles.formInput}
            className="form-control"
            type="text"
            id="name"
            placeholder="Enter your name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            style={styles.formInput}
            className="form-control"
            type="email"
            id="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            style={styles.formInput}
            className="form-control"
            id="message"
            rows={5}
            placeholder="Enter your message"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="bg-primary"
            type="button"
            style={styles.formButton}
            onClick={submitMessage}
          >
            <div style={{ color: 'white' }}>Send Message</div>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;