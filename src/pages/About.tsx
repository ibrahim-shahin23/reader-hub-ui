import { useState } from "react";
import { Book, Users, ShoppingCart, Award, Settings, BarChart3, Heart, Search, Star } from "lucide-react";
import "../styles/about.css";

export default function About() {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <div className="container">
      {/* Hero Section */}
      <div className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to <span className="highlight">Reader Hub</span>
          </h1>
          <p className="hero-subtitle">
            Connecting publishers, authors, and readers in a seamless virtual environment
          </p>
          <div className="tab-buttons">
            <button 
              onClick={() => setActiveTab("about")}
              className={activeTab === "about" ? "tab-button active" : "tab-button"}
            >
              About Us
            </button>
            <button 
              onClick={() => setActiveTab("features")}
              className={activeTab === "features" ? "tab-button active" : "tab-button"}
            >
              Our Features
            </button>
            <button 
              onClick={() => setActiveTab("policy")}
              className={activeTab === "policy" ? "tab-button active" : "tab-button"}
            >
              Usage Policy
            </button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="content-section">
        {/* About Us Content */}
        {activeTab === "about" && (
          <div className="animate-fadeIn">
            <div className="section-header">
              <h2 className="section-title">Our Mission</h2>
              <p className="section-description">
                At Reader Hub, we're revolutionizing how people discover, access, and experience books in the digital age. 
                Our platform serves as the perfect bridge between publishers seeking to showcase their work and readers 
                hungry for their next great read.
              </p>
            </div>

            <div className="card-grid">
              <div className="card">
                <div className="card-icon publisher">
                  <Book className="icon" />
                </div>
                <h3 className="card-title">For Publishers</h3>
                <p className="card-description">
                  We provide intuitive tools for publishers to showcase their catalog, manage sales, 
                  and connect directly with their audience through our dedicated Publisher Dashboard.
                </p>
              </div>
              
              <div className="card">
                <div className="card-icon reader">
                  <Users className="icon" />
                </div>
                <h3 className="card-title">For Readers</h3>
                <p className="card-description">
                  Discover your next favorite book with our intuitive browsing experience, personalized 
                  recommendations, and vibrant community of fellow book lovers.
                </p>
              </div>
              
              <div className="card">
                <div className="card-icon author">
                  <Award className="icon" />
                </div>
                <h3 className="card-title">For Authors</h3>
                <p className="card-description">
                  Authors gain visibility through dedicated profiles, connecting their works with 
                  readers who will appreciate their unique voice and perspective.
                </p>
              </div>
            </div>

            <div className="team-section">
              <h3 className="team-title">Our Team</h3>
              <div className="team-grid">
                {["Ibrahim Saeed Mousa Shahin", "Mostafa Mohammed", "Ahmed Khaled", "Mohammed Moawwad Gad"].map((member, index) => (
                  <div key={index} className="team-member">
                    <div className="member-avatar">
                      <span className="member-initial">{member.charAt(0)}</span>
                    </div>
                    <p className="member-name">{member}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Features Content */}
        {activeTab === "features" && (
          <div className="animate-fadeIn">
            <div className="section-header">
              <h2 className="section-title">Our Innovative Features</h2>
              <p className="section-description">
                Reader Hub combines powerful functionality with an intuitive user experience to create 
                the ultimate virtual book fair platform.
              </p>
            </div>

            <div className="features-container">
              {/* User Features */}
              <div className="feature-section">
                <h3 className="feature-section-title">
                  <Users className="feature-icon" /> For Readers
                </h3>
                <div className="feature-grid">
                  <div className="feature-card">
                    <Search className="feature-card-icon reader-icon" />
                    <h4 className="feature-card-title">Advanced Search & Filters</h4>
                    <p className="feature-card-description">Find books by name, publisher, category, price, author, rating, or publication date.</p>
                  </div>
                  <div className="feature-card">
                    <ShoppingCart className="feature-card-icon reader-icon" />
                    <h4 className="feature-card-title">Seamless Shopping Experience</h4>
                    <p className="feature-card-description">Easy cart management, multiple payment options, and order tracking.</p>
                  </div>
                  <div className="feature-card">
                    <Heart className="feature-card-icon reader-icon" />
                    <h4 className="feature-card-title">Wishlist & Favorites</h4>
                    <p className="feature-card-description">Save books for later and share recommendations with friends.</p>
                  </div>
                </div>
              </div>

              {/* Publisher Features */}
              <div className="feature-section">
                <h3 className="feature-section-title">
                  <Book className="feature-icon" /> For Publishers
                </h3>
                <div className="feature-grid">
                  <div className="feature-card">
                    <Settings className="feature-card-icon publisher-icon" />
                    <h4 className="feature-card-title">Book Management</h4>
                    <p className="feature-card-description">Add, edit, and manage book listings with comprehensive details.</p>
                  </div>
                  <div className="feature-card">
                    <ShoppingCart className="feature-card-icon publisher-icon" />
                    <h4 className="feature-card-title">Order Fulfillment</h4>
                    <p className="feature-card-description">Track and manage user orders through their entire lifecycle.</p>
                  </div>
                  <div className="feature-card">
                    <BarChart3 className="feature-card-icon publisher-icon" />
                    <h4 className="feature-card-title">Analytics & Reports</h4>
                    <p className="feature-card-description">Comprehensive performance insights for better business decisions.</p>
                  </div>
                </div>
              </div>

              {/* AI Features */}
              <div className="ai-section">
                <h3 className="ai-section-title">
                  <Star className="feature-icon" /> AI-Powered Innovation
                </h3>
                <div className="ai-grid">
                  <div className="ai-card">
                    <h4 className="ai-card-title">AI-Generated Summaries</h4>
                    <p className="ai-card-description">
                      Access AI-generated summaries of your purchased books with key insights, chapter highlights, 
                      and main takeaways at different detail levels.
                    </p>
                  </div>
                  <div className="ai-card">
                    <h4 className="ai-card-title">Personalized Recommendations</h4>
                    <p className="ai-card-description">
                      Our AI-driven recommendation engine suggests books based on your reading history, 
                      preferences, and community insights.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Usage Policy Content */}
        {activeTab === "policy" && (
          <div className="animate-fadeIn">
            <div className="section-header">
              <h2 className="section-title">Usage Policy</h2>
              <p className="section-description">
                Our platform operates with clear guidelines to ensure a positive experience for all users.
              </p>
            </div>

            <div className="policy-card">
              <h3 className="policy-title">For Publishers</h3>
              <div className="policy-items">
                <div className="policy-item">
                  <div className="policy-marker publisher-marker"></div>
                  <p className="policy-text">
                    All content submitted must adhere to our content guidelines, free from plagiarism and inappropriate material.
                  </p>
                </div>
                <div className="policy-item">
                  <div className="policy-marker publisher-marker"></div>
                  <p className="policy-text">
                    Book information must be accurate and complete, including pricing, availability, and descriptions.
                  </p>
                </div>
                <div className="policy-item">
                  <div className="policy-marker publisher-marker"></div>
                  <p className="policy-text">
                    Publishers are responsible for fulfilling orders promptly and updating order statuses accordingly.
                  </p>
                </div>
                <div className="policy-item">
                  <div className="policy-marker publisher-marker"></div>
                  <p className="policy-text">
                    Publisher accounts undergo verification to ensure legitimacy and maintain platform quality.
                  </p>
                </div>
              </div>
            </div>

            <div className="policy-card">
              <h3 className="policy-title">For Users</h3>
              <div className="policy-items">
                <div className="policy-item">
                  <div className="policy-marker reader-marker"></div>
                  <p className="policy-text">
                    Users must provide accurate personal information for account creation and orders.
                  </p>
                </div>
                <div className="policy-item">
                  <div className="policy-marker reader-marker"></div>
                  <p className="policy-text">
                    Reviews must be genuine and based on actual experiences with the purchased books.
                  </p>
                </div>
                <div className="policy-item">
                  <div className="policy-marker reader-marker"></div>
                  <p className="policy-text">
                    Users agree not to engage in activities that may disrupt the platform's functionality.
                  </p>
                </div>
                <div className="policy-item">
                  <div className="policy-marker reader-marker"></div>
                  <p className="policy-text">
                    Users may not redistribute or share purchased digital content beyond personal use.
                  </p>
                </div>
              </div>
            </div>

            <div className="policy-card">
              <h3 className="policy-title">Privacy & Data</h3>
              <div className="policy-items">
                <div className="policy-item">
                  <div className="policy-marker privacy-marker"></div>
                  <p className="policy-text">
                    Reader Hub collects only necessary data to provide our services and improve user experience.
                  </p>
                </div>
                <div className="policy-item">
                  <div className="policy-marker privacy-marker"></div>
                  <p className="policy-text">
                    User data is securely stored and never shared with unauthorized third parties.
                  </p>
                </div>
                <div className="policy-item">
                  <div className="policy-marker privacy-marker"></div>
                  <p className="policy-text">
                    Users may request access to their data or its deletion as per applicable privacy laws.
                  </p>
                </div>
                <div className="policy-item">
                  <div className="policy-marker privacy-marker"></div>
                  <p className="policy-text">
                    AI features use data anonymously to improve recommendations and summaries.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-grid">
            <div className="footer-section">
              <h4 className="footer-heading">Reader Hub</h4>
              <p className="footer-text">
                Connecting publishers, authors, and readers in a seamless virtual environment.
              </p>
            </div>
            <div className="footer-section">
              <h4 className="footer-heading">Contact</h4>
              <p className="footer-text">support@readerhub.com</p>
              <p className="footer-text">+1 (555) 123-4567</p>
            </div>
            <div className="footer-section">
              <h4 className="footer-heading">Follow Us</h4>
              <div className="social-links">
                <a href="#" className="social-link">
                  <span className="sr-only">Facebook</span>
                  <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="social-link">
                  <span className="sr-only">Twitter</span>
                  <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="social-link">
                  <span className="sr-only">Instagram</span>
                  <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          {/* <div className="footer-copyright">
            <p>&copy; {new Date().getFullYear()} Reader Hub. All rights reserved.</p>
          </div> */}
        </div>
      </footer>
    </div>
  );
}