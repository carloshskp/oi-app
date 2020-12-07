import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import MaskedInput from 'react-text-mask';
import SelectUf from '../components/SelectUf';
import SelectCities from '../components/SelectCities';
import InputPersonType from '../components/InputPersonType';
import axios from '../axios';
import Dialog from '../components/Dialog'

const Search = function Search(props) {
  const [type, setType] = useState('PF');
  const [cpf, setCpf] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [uf, setUf] = useState('');
  const [city, setCity] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [dialog, setDialog] = useState({
    title: 'Lista pública de pessoas',
    confirmAction: null,
    message: '',
    confirmMessage: '',
  });

  const onSearch = async e => {
    const {data} = await axios.get(`/people/search?type=${type}&cpf=${cpf}&cnpj=${cnpj}&uf=${uf}&city=${city}`);

    if (!Boolean(data.length)) {
      setDialog({
        ...dialog,
        message: 'Nenhuma pessoa encontrada',
      });

      return setSearchResult([]);
    }

    setSearchResult(data);
  };

  return (
    <div className='app'>
      <header className='app-header'>
        <h1>Lista pública de telefone</h1>

        <span>Selecione o tipo de busca e informe os dados para encontrar o número de telefone</span>

        <hr/>
      </header>

      <div className='search-form'>
        <InputPersonType
          value={type}
          onChange={e => setType(e.target.value)}
        />

        {
          type === 'PF' &&
          <MaskedInput
            mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
            value={cpf}
            className='input-text'
            type='text'
            name='cpf'
            placeholder='CPF'
            onChange={e => setCpf(e.target.value)}
          />
        }

        {
          type === 'PJ' &&
          <MaskedInput
            mask={[/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
            value={cnpj}
            className='input-text'
            type='text'
            name='cnpj'
            placeholder='CNPJ'
            onChange={e => setCnpj(e.target.value)}
          />
        }

        <SelectUf
          value={uf}
          onChange={e => setUf(e.target.value)}
        />

        <SelectCities
          value={city}
          uf={uf}
          onChange={e => setCity(e.target.value)}
        />

        <button onClick={onSearch} className='button xlg full-width info'>buscar</button>
      </div>

      <div className='search-result'>
        {
          Boolean(searchResult.length) &&
          <React.Fragment>
            <div className='name'><strong>Nome/Razão Social</strong></div>
            <div className='cpf-cnpj'><strong>CPF/CNPJ</strong></div>
            <div className='uf'><strong>UF</strong></div>
            <div className='city'><strong>Cidade</strong></div>
            <div className='phone'><strong>Telefone</strong></div>

            {searchResult.map((person, index) => (
              <React.Fragment key={index}>
                <div className='name'>{person.name}</div>
                <div className='cpf-cnpj'>{person.cpf || person.cnpj}</div>
                <div className='uf'>{person.uf}</div>
                <div className='city'>{person.city}</div>
                <div className='phone'>{person.phone}</div>
              </React.Fragment>
            ))}
          </React.Fragment>
        }
      </div>

      <div className='app-footer'>
        <Link className='button md' to='/gerenciar-pessoas'>{'> Gerenciar Pessoas'}</Link>
      </div>

      {dialog.message && <Dialog message={dialog.message} onClose={e => setDialog({...dialog, message: ''})} confirmAction={dialog.confirmAction} confirmMessage={dialog.confirmMessage} title={dialog.title} />}
    </div>
  );
};

export default Search;
