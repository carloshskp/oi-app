import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import axios from '../axios';

const SelectUf = function SelectUf(props) {
  const {value, onChange} = props;
  const [ufList, setUfList] = useState([]);
  const [refresh] = useState(false);

  useEffect(() => {
    axios.get('/uf')
      .then(({data}) => setUfList(data))
      .catch(console.error);
  }, [refresh]);

  return (
    <select value={value} className='select' placeholder='UF' onChange={onChange}>
      <option>Selecione o estado</option>
      {ufList.map((option, index) => <option key={`uf-${index}`} value={option}>{option}</option>)}
    </select>
  );
};

SelectUf.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default SelectUf;
