import React from 'react';

interface PopupProps {
  message: string;
  onClose: () => void;
}

export const Popup: React.FC<PopupProps> = ({ message, onClose }) => {
  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      zIndex: 1001,
      minWidth: '300px',
      textAlign: 'center'
    }}>
      <p>{message}</p>
      <button 
        onClick={onClose}
        style={{
          marginTop: '15px',
          padding: '8px 16px',
          backgroundColor: '#3182ce',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        OK
      </button>
    </div>
  );
};