import React from 'react';
import {
  Users,
  Book,
  Star,
  Search,
  ShoppingCart,
  Heart,
  Settings,
  BarChart3,
} from 'lucide-react';

const FeaturesContent: React.FC = () => (
  <>
    <style>{`
      /* Content Section */
      .about-container .content-section {
        max-width: 80rem;
        margin-left: auto;
        margin-right: auto;
        padding: 4rem 1rem;
      }

      .about-container .section-header {
        text-align: center;
        margin-bottom: 4rem;
      }

      .about-container .section-title {
        font-size: 1.875rem;
        font-weight: 700;
        color: #312e81;
        margin-bottom: 1rem;
      }

      .about-container .section-description {
        font-size: 1.125rem;
        color: #4b5563;
        max-width: 48rem;
        margin-left: auto;
        margin-right: auto;
      }

      /* Features Content */
      .about-container .features-container {
        display: flex;
        flex-direction: column;
        gap: 4rem;
      }

      .about-container .feature-section-title {
        font-size: 1.5rem;
        font-weight: 700;
        color: #312e81;
        margin-bottom: 1.5rem;
        display: flex;
        align-items: center;
      }

      .about-container .feature-icon {
        height: 1.75rem;
        width: 1.75rem;
        margin-right: 0.5rem;
      }

      .about-container .feature-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      @media (min-width: 768px) {
        .about-container .feature-grid {
          grid-template-columns: repeat(3, 1fr);
        }
      }

      .about-container .feature-card {
        background-color: white;
        border-radius: 0.5rem;
        padding: 1.5rem;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
        transition: box-shadow 0.3s;
      }

      .about-container .feature-card:hover {
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      }

      .about-container .feature-card-icon {
        height: 2rem;
        width: 2rem;
        margin-bottom: 1rem;
      }

      .about-container .feature-card-icon.reader-icon {
        color: #4f46e5;
      }

      .about-container .feature-card-icon.publisher-icon {
        color: #d97706;
      }

      .about-container .feature-card-title {
        font-size: 1.125rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
      }

      .about-container .feature-card-description {
        color: #4b5563;
      }

      /* AI Section */
      .about-container .ai-section {
        background: linear-gradient(to right, #4f46e5, #7e22ce);
        border-radius: 0.75rem;
        padding: 2rem;
        color: white;
      }

      .about-container .ai-section-title {
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 1.5rem;
        display: flex;
        align-items: center;
      }

      .about-container .ai-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      @media (min-width: 768px) {
        .about-container .ai-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      .about-container .ai-card {
        background-color: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(4px);
        border-radius: 0.5rem;
        padding: 1.5rem;
      }

      .about-container .ai-card-title {
        font-size: 1.125rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
      }

      .about-container .ai-card-description {
        color: #e0e7ff;
      }
    `}</style>
    <div className="content-section">
      <div className="animate-fadeIn">
        <div className="section-header">
          <h2 className="section-title">Our Innovative Features</h2>
          <p className="section-description">
            Reader Hub combines powerful functionality with an intuitive
            user experience to create the ultimate virtual book fair
            platform.
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
                <h4 className="feature-card-title">
                  Advanced Search & Filters
                </h4>
                <p className="feature-card-description">
                  Find books by name, publisher, category, price, author,
                  rating, or publication date.
                </p>
              </div>
              <div className="feature-card">
                <ShoppingCart className="feature-card-icon reader-icon" />
                <h4 className="feature-card-title">
                  Seamless Shopping Experience
                </h4>
                <p className="feature-card-description">
                  Easy cart management, multiple payment options, and order
                  tracking.
                </p>
              </div>
              <div className="feature-card">
                <Heart className="feature-card-icon reader-icon" />
                <h4 className="feature-card-title">Wishlist & Favorites</h4>
                <p className="feature-card-description">
                  Save books for later and share recommendations with
                  friends.
                </p>
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
                <p className="feature-card-description">
                  Add, edit, and manage book listings with comprehensive
                  details.
                </p>
              </div>
              <div className="feature-card">
                <ShoppingCart className="feature-card-icon publisher-icon" />
                <h4 className="feature-card-title">Order Fulfillment</h4>
                <p className="feature-card-description">
                  Track and manage user orders through their entire
                  lifecycle.
                </p>
              </div>
              <div className="feature-card">
                <BarChart3 className="feature-card-icon publisher-icon" />
                <h4 className="feature-card-title">Analytics & Reports</h4>
                <p className="feature-card-description">
                  Comprehensive performance insights for better business
                  decisions.
                </p>
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
                  Access AI-generated summaries of your purchased books with
                  key insights, chapter highlights, and main takeaways at
                  different detail levels.
                </p>
              </div>
              <div className="ai-card">
                <h4 className="ai-card-title">
                  Personalized Recommendations
                </h4>
                <p className="ai-card-description">
                  Our AI-driven recommendation engine suggests books based
                  on your reading history, preferences, and community
                  insights.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default FeaturesContent;