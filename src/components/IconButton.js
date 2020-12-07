import React from 'react';

const IconButton = function IconButton({onClick, icon, title, ...props}) {
  return (
    <button {...props} className='icon-button' onClick={onClick}>
      <img className='icon' src={icon} alt={title} />
    </button>
  );
};

export default IconButton;
