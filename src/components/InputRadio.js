import React from 'react';
import PropTypes from 'prop-types';

const InputRadio = function InputRadio({options, name, onChange}) {
  const getKey = option => `${option.name}${option.value.toLowerCase()}`;

  const getOptions = () => {
    return options.map(({value, label, checked}) => {
      return (
        <div className='radio-item' key={getKey({name, value})}>
          <input onChange={onChange} id={getKey({name, value})} className='radio-button' type='radio' value={value} name={name} checked={checked} />
          <label className='radio-label' htmlFor={getKey({name, value})}>{label}</label>
        </div>
      );
    });
  };

  return (
    <div className='radio-group'>
      {getOptions()}
    </div>
  );
};

InputRadio.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default InputRadio;