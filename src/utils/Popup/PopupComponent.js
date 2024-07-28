import React from 'react';
import './PopupComponent.css';

const PopupComponent = ({ message }) => {
  return (
    <div className="popup">
      {message}
    </div>
  );
};

export default PopupComponent;
