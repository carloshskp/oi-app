import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import axios from '../axios';

const SelectCities = function SelectCities(props) {
  const {value, onChange, uf} = props;
  const [cities, setCities] = useState([]);

  useEffect(() => {
    if (!Boolean(uf.length)) {
      setCities([]);

      return;
    }

    axios.get(`/uf/${uf}/cities/`)
      .then(({data}) => setCities(data))
      .catch(console.error);
  }, [uf]);

  return (
    <select value={value} className='select' onChange={onChange}>
      <option>Selecione a cidade</option>
      {cities.map((option, index) => <option key={`cities-${index}`} value={option}>{option}</option>)}
    </select>
  );
};

SelectCities.propTypes = {
  value: PropTypes.string,
  uf: PropTypes.string,
  onChange: PropTypes.func,
};

export default SelectCities;
