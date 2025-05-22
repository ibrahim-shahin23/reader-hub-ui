import React from 'react';
import HomeBanner from '../components/Home/HomeBanner';
import NewReleases from '../components/Home/NewReleases';
import AIRecommendations from '../components/Home/AIRecommendations';
import BestSellers from '../components/Home/BestSellers';

const Home: React.FC = () => {
  return (
    <div style={{ overflowX: 'hidden' }}>
      <HomeBanner />
      <AIRecommendations />
      <NewReleases />
      <BestSellers />
    </div>
  );
};

export default Home;