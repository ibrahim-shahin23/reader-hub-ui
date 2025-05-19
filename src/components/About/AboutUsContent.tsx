import React from 'react';
import { Book, Users, Award } from 'lucide-react';

const AboutUsContent: React.FC = () => (
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

      /* Card Grid */
      .about-container .card-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;
        margin-bottom: 4rem;
      }

      @media (min-width: 768px) {
        .about-container .card-grid {
          grid-template-columns: repeat(3, 1fr);
        }
      }

      .about-container .card {
        background-color: white;
        border-radius: 0.75rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        padding: 1.5rem;
        transition: box-shadow 0.3s;
        height: 100%;
      }

      .about-container .card:hover {
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      }

      .about-container .card-icon {
        height: 3rem;
        width: 3rem;
        border-radius: 9999px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1rem;
      }

      .about-container .card-icon.publisher {
        background-color: #e0e7ff;
      }

      .about-container .card-icon.publisher .icon {
        color: #4f46e5;
      }

      .about-container .card-icon.reader {
        background-color: #fef3c7;
      }

      .about-container .card-icon.reader .icon {
        color: #d97706;
      }

      .about-container .card-icon.author {
        background-color: #dcfce7;
      }

      .about-container .card-icon.author .icon {
        color: #16a34a;
      }

      .about-container .card-title {
        font-size: 1.25rem;
        font-weight: 600;
        color: #312e81;
        margin-bottom: 0.5rem;
      }

      .about-container .card-description {
        color: #4b5563;
      }

      /* Team Section */
      .about-container .team-section {
        background-color: #312e81;
        border-radius: 0.75rem;
        padding: 2rem;
        text-align: center;
      }

      .about-container .team-title {
        font-size: 1.5rem;
        font-weight: 700;
        color: white;
        margin-bottom: 1rem;
      }

      .about-container .team-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
      }

      @media (min-width: 768px) {
        .about-container .team-grid {
          grid-template-columns: repeat(4, 1fr);
        }
      }

      .about-container .team-member {
        padding: 1rem;
      }

      .about-container .member-avatar {
        height: 5rem;
        width: 5rem;
        background-color: #4338ca;
        border-radius: 9999px;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 0.75rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .about-container .member-initial {
        color: white;
        font-size: 1.5rem;
        font-weight: 700;
      }

      .about-container .member-name {
        color: #e0e7ff;
        font-weight: 500;
      }
    `}</style>
    <div className="content-section">
      <div className="animate-fadeIn">
        <div className="section-header">
          <h2 className="section-title">Our Mission</h2>
          <p className="section-description">
            At Reader Hub, we're revolutionizing how people discover,
            access, and experience books in the digital age. Our platform
            serves as the perfect bridge between publishers seeking to
            showcase their work and readers hungry for their next great
            read.
          </p>
        </div>

        <div className="card-grid">
          <div className="card">
            <div className="card-icon publisher">
              <Book className="icon" />
            </div>
            <h3 className="card-title">For Publishers</h3>
            <p className="card-description">
              We provide intuitive tools for publishers to showcase their
              catalog, manage sales, and connect directly with their
              audience through our dedicated Publisher Dashboard.
            </p>
          </div>

          <div className="card">
            <div className="card-icon reader">
              <Users className="icon" />
            </div>
            <h3 className="card-title">For Readers</h3>
            <p className="card-description">
              Discover your next favorite book with our intuitive browsing
              experience, personalized recommendations, and vibrant
              community of fellow book lovers.
            </p>
          </div>

          <div className="card">
            <div className="card-icon author">
              <Award className="icon" />
            </div>
            <h3 className="card-title">For Authors</h3>
            <p className="card-description">
              Authors gain visibility through dedicated profiles, connecting
              their works with readers who will appreciate their unique
              voice and perspective.
            </p>
          </div>
        </div>

        <div className="team-section">
          <h3 className="team-title">Our Team</h3>
          <div className="team-grid">
            {[
              'Ibrahim Saeed Mousa Shahin',
              'Mostafa Mohammed',
              'Ahmed Khaled',
              'Mohammed Moawwad Gad',
            ].map((member: string, index: number) => (
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
    </div>
  </>
);

export default AboutUsContent;