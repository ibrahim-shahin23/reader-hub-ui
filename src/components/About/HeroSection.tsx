import React from 'react';

type Tab = 'about' | 'features' | 'policy';

interface HeroSectionProps {
  activeTab: Tab;
  setActiveTab: React.Dispatch<React.SetStateAction<Tab>>;
}

const HeroSection: React.FC<HeroSectionProps> = ({ activeTab, setActiveTab }) => (
  <>
    <style>{`
      /* Hero Section */
      .about-container .hero {
        position: relative;
        overflow: hidden;
      }

      .about-container .hero-overlay {
        position: absolute;
        inset: 0;
        background-color: #312e81;
        opacity: 0.9;
      }

      .about-container .hero-content {
        position: relative;
        max-width: 80rem;
        margin-left: auto;
        margin-right: auto;
        padding: 6rem 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .about-container .hero-title {
        font-size: 2.25rem;
        font-weight: 800;
        color: white;
        text-align: center;
        letter-spacing: -0.025em;
      }

      @media (min-width: 768px) {
        .about-container .hero-title {
          font-size: 3.75rem;
        }
      }

      .about-container .hero-title .highlight {
        color: #fbbf24;
      }

      .about-container .hero-subtitle {
        margin-top: 1.5rem;
        font-size: 1.25rem;
        color: #e0e7ff;
        text-align: center;
        max-width: 48rem;
      }

      .about-container .tab-buttons {
        margin-top: 2rem;
        display: flex;
        gap: 0.5rem;
      }

      .about-container .tab-button {
        padding: 0.75rem 1.5rem;
        border-radius: 9999px;
        font-weight: 500;
        font-size: 0.875rem;
        border: none;
        cursor: pointer;
        transition: background-color 0.2s;
        background-color: white;
        color: #312e81;
      }

      .about-container .tab-button:hover {
        background-color: #eef2ff;
      }

      .about-container .tab-button.active {
        background-color: #f59e0b;
        color: white;
      }
    `}</style>
    <div className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">
          Welcome to <span className="highlight">Reader Hub</span>
        </h1>
        <p className="hero-subtitle">
          Connecting publishers, authors, and readers in a seamless virtual
          environment
        </p>
        <div className="tab-buttons">
          <button
            onClick={() => setActiveTab('about')}
            className={activeTab === 'about' ? 'tab-button active' : 'tab-button'}
          >
            About Us
          </button>
          <button
            onClick={() => setActiveTab('features')}
            className={activeTab === 'features' ? 'tab-button active' : 'tab-button'}
          >
            Our Features
          </button>
          <button
            onClick={() => setActiveTab('policy')}
            className={activeTab === 'policy' ? 'tab-button active' : 'tab-button'}
          >
            Usage Policy
          </button>
        </div>
      </div>
    </div>
  </>
);

export default HeroSection;