import React from 'react';

const PolicyContent: React.FC = () => (
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

      /* Policy Content */
      .about-container .policy-card {
        background-color: white;
        border-radius: 0.75rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        padding: 2rem;
        margin-bottom: 2rem;
      }

      .about-container .policy-title {
        font-size: 1.25rem;
        font-weight: 700;
        color: #312e81;
        margin-bottom: 1rem;
      }

      .about-container .policy-items {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .about-container .policy-item {
        display: flex;
        align-items: flex-start;
      }

      .about-container .policy-marker {
        flex-shrink: 0;
        height: 1.25rem;
        width: 1.25rem;
        border-radius: 9999px;
        margin-top: 0.25rem;
      }

      .about-container .policy-marker.publisher-marker {
        background-color: #f59e0b;
      }

      .about-container .policy-marker.reader-marker {
        background-color: #4f46e5;
      }

      .about-container .policy-marker.privacy-marker {
        background-color: #10b981;
      }

      .about-container .policy-text {
        margin-left: 0.75rem;
        color: #4b5563;
      }
    `}</style>
    <div className="content-section">
      <div className="animate-fadeIn">
        <div className="section-header">
          <h2 className="section-title">Usage Policy</h2>
          <p className="section-description">
            Our platform operates with clear guidelines to ensure a positive
            experience for all users.
          </p>
        </div>

        <div className="policy-card">
          <h3 className="policy-title">For Publishers</h3>
          <div className="policy-items">
            <div className="policy-item">
              <div className="policy-marker publisher-marker"></div>
              <p className="policy-text">
                All content submitted must adhere to our content guidelines,
                free from plagiarism and inappropriate material.
              </p>
            </div>
            <div className="policy-item">
              <div className="policy-marker publisher-marker"></div>
              <p className="policy-text">
                Book information must be accurate and complete, including
                pricing, availability, and descriptions.
              </p>
            </div>
            <div className="policy-item">
              <div className="policy-marker publisher-marker"></div>
              <p className="policy-text">
                Publishers are responsible for fulfilling orders promptly
                and updating order statuses accordingly.
              </p>
            </div>
            <div className="policy-item">
              <div className="policy-marker publisher-marker"></div>
              <p className="policy-text">
                Publisher accounts undergo verification to ensure legitimacy
                and maintain platform quality.
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
                Users must provide accurate personal information for account
                creation and orders.
              </p>
            </div>
            <div className="policy-item">
              <div className="policy-marker reader-marker"></div>
              <p className="policy-text">
                Reviews must be genuine and based on actual experiences with
                the purchased books.
              </p>
            </div>
            <div className="policy-item">
              <div className="policy-marker reader-marker"></div>
              <p className="policy-text">
                Users agree not to engage in activities that may disrupt the
                platform's functionality.
              </p>
            </div>
            <div className="policy-item">
              <div className="policy-marker reader-marker"></div>
              <p className="policy-text">
                Users may not redistribute or share purchased digital
                content beyond personal use.
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
                Reader Hub collects only necessary data to provide our
                services and improve user experience.
              </p>
            </div>
            <div className="policy-item">
              <div className="policy-marker privacy-marker"></div>
              <p className="policy-text">
                User data is securely stored and never shared with
                unauthorized third parties.
              </p>
            </div>
            <div className="policy-item">
              <div className="policy-marker privacy-marker"></div>
              <p className="policy-text">
                Users may request access to their data or its deletion as
                per applicable privacy laws.
              </p>
            </div>
            <div className="policy-item">
              <div className="policy-marker privacy-marker"></div>
              <p className="policy-text">
                AI features use data anonymously to improve recommendations
                and summaries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default PolicyContent;