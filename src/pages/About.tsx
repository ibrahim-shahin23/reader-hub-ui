import { useState } from 'react';
import SharedStyles from '../components/About/SharedStyles';
import HeroSection from '../components/About/HeroSection';
import AboutUsContent from '../components/About/AboutUsContent';
import FeaturesContent from '../components/About/FeaturesContent';
import PolicyContent from '../components/About/PolicyContent';
import Footer from '../components/About/Footer';

type Tab = 'about' | 'features' | 'policy';

const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('about');

  return (
    <div className="about-container">
      <SharedStyles />
      <HeroSection activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'about' && <AboutUsContent />}
      {activeTab === 'features' && <FeaturesContent />}
      {activeTab === 'policy' && <PolicyContent />}
      <Footer />
    </div>
  );
};

export default About;