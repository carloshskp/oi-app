import React from 'react';
import PropTypes from 'prop-types';
import InputRadio from './InputRadio';

const InputPersonType = function InputPersonType({value, onChange}) {
  return <InputRadio
    name='person'
    options={[
      {
        value: 'PF', label: 'Pessoa Física', checked: value === 'PF',
      },
      {
        value: 'PJ', label: 'Pessoa Jurídica', checked: value === 'PJ',
      }
    ]}
    onChange={onChange}
  />
};

InputPersonType.propTypes = {
  value: PropTypes.oneOf(['PF', 'PJ', '']),
  onChange: PropTypes.func,
};

export default InputPersonType;
