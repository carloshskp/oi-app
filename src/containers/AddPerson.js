import React, {useState} from 'react';
import axios from '../axios';
import PersonForm from '../components/PersonForm';
import {Link} from 'react-router-dom';
import Dialog from '../components/Dialog';

const AddPerson = function AddPerson() {
  const [type, setType] = useState('PF');
  const [name, setName] = useState('');
  const [uf, setUf] = useState('');
  const [city, setCity] = useState('');
  const [cpf, setCpf] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [phone, setPhone] = useState('');
  const [dialog, setDialog] = useState({
    title: 'Cadastrar pessoa',
    confirmAction: null,
    message: '',
    confirmMessage: '',
  });

  const onDialogClose = () => {
    setDialog({
      ...dialog,
      confirmAction: null,
      message: '',
    });
  };

  const addPerson = async () => {
    try {
      const response = await axios.post('/people', {
        name,
        type,
        uf,
        city,
        birthDate,
        cnpj,
        cpf,
        phone,
      });

      setDialog({...dialog, message: response.status === 201 ? 'Pessoa cadastrada com sucesso!' : response.data.error});
    } catch(error) {
      setDialog({...dialog, message: 'Erro ao cadastrar pessoa, tente novamente mais tarde.'});
    }
  };

  return (
    <div className='app'>
      <header className='app-header'>
        <h1>Gerenciando Pessoas</h1>

        <span>Cadastrar nova Pessoa Física/Jurídica</span>

        <hr/>
      </header>

      <PersonForm
        formTitle=''
        type={type}
        name={name}
        uf={uf}
        city={city}
        cpf={cpf}
        birthDate={birthDate}
        cnpj={cnpj}
        phone={phone}
        onChangeType={e => setType(e.target.value)}
        onChangeName={e => setName(e.target.value)}
        onChangeUf={e => setUf(e.target.value)}
        onChangeCity={e => setCity(e.target.value)}
        onChangeCpf={e => setCpf(e.target.value)}
        onChangeBirthDate={e => setBirthDate(e.target.value)}
        onChangeCnpj={e => setCnpj(e.target.value)}
        onChangePhone={e => setPhone(e.target.value)}
        onSubmit={e => addPerson()}
      />

      <div className='app-footer'>
        <Link className='button md' to='/gerenciar-pessoas'>{'< Voltar para lista de pessoas'}</Link>
      </div>

      {dialog.message && <Dialog message={dialog.message} onClose={onDialogClose} confirmAction={dialog.confirmAction} confirmMessage={dialog.confirmMessage} title={dialog.title} />}
    </div>
  );
};

export default AddPerson;
