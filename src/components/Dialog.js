import React from 'react';
import PropTypes from 'prop-types';

const Dialog = function Dialog({title, message, confirmAction, confirmMessage, onClose}) {
  return (
    <div className={`dialog wrapper ${message ? 'active' : ''}`}>
      <div className='box'>
        <h6 className='box-title'>{title}</h6>
        <div className='box-message'><span>{message}</span></div>
        <div className='box-action'>
          {confirmAction && <button className='box-action-button action' onClick={e => {
            onClose();
            confirmAction(e);
          }}>{confirmMessage}</button>}
          <button className='box-action-button close' onClick={e => {
            onClose();
          }}>Fechar</button>
        </div>
      </div>
    </div>
  );
};

Dialog.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  confirmAction: PropTypes.func,
  confirmMessage: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Dialog;
