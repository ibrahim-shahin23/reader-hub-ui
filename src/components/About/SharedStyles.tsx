import React from 'react';

const SharedStyles: React.FC = () => (
  <style>{`
    /* Base styles */
    .about-container * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    .about-container {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      line-height: 1.5;
      color: #1e293b;
    }

    .about-container .icon {
      height: 24px;
      width: 24px;
    }

    /* Animations */
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .about-container .animate-fadeIn {
      animation: fadeIn 0.5s ease-out forwards;
    }
  `}</style>
);

export default SharedStyles;