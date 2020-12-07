import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import PersonForm from '../components/PersonForm';
import {Link} from 'react-router-dom';
import Dialog from '../components/Dialog';
import axios from '../axios';

const ChangePerson = function ChangePerson(props) {
  const [person, setPerson] = useState({
    name: '',
    type: '',
    uf: '',
    city: '',
    cpf: '',
    cnpj: '',
    phone: '',
  });
  const [refresh, setRefresh] = useState(false);
  const [dialog, setDialog] = useState({
    title: 'Cadastrar pessoa',
    confirmAction: null,
    message: '',
    confirmMessage: '',
  });
  const {id} = useParams();

  const onDialogClose = () => {
    setDialog({
      ...dialog,
      confirmAction: null,
      message: '',
    });
  };

  const onSave = async () => {
    try {
      const response = await axios.put(`/people/${id}`, {...person}, {headers: {'content-type': 'application/json'}});
      setDialog({
        ...dialog,
        message: response.data.message || response.data.error,
      });
    } catch (error) {
      setDialog({
        ...dialog,
        message: 'Erro ao alterar pessoa, tente novamente mais tarde.',
      });
    }
  }

  useEffect(() => {
    axios.get(`/people/${id}`)
      .then(response => {
        if (response.status > 200) {
          return setDialog({
            ...dialog,
            message: response.data.error,
          });
        }

        setPerson(response.data);
      })
      .catch(error => error);
  }, [refresh]);

  return (
    <div className='app'>
      <header className='app-header'>
        <h1>Gerenciando Pessoas</h1>

        <span>Alteração de Pessoa Física/Jurídica</span>

        <hr/>
      </header>

      <PersonForm
        formType='CHANGE'
        formTitle=''
        type={person.type}
        name={person.name}
        uf={person.uf}
        city={person.city}
        cpf={person.cpf}
        birthDate={person.birthDate}
        cnpj={person.cnpj}
        phone={person.phone}
        onChangeType={e => setPerson({...person, type: e.target.value})}
        onChangeName={e => setPerson({...person, name: e.target.value})}
        onChangeUf={e => setPerson({...person, uf: e.target.value})}
        onChangeCity={e => setPerson({...person, city: e.target.value})}
        onChangeCpf={e => setPerson({...person, cpf: e.target.value})}
        onChangeBirthDate={e => setPerson({...person, birthDate: e.target.value})}
        onChangeCnpj={e => setPerson({...person, cnpj: e.target.value})}
        onChangePhone={e => setPerson({...person, phone: e.target.value})}
        onSubmit={onSave}
      />

      <div className='app-footer'>
        <Link className='button md' to='/gerenciar-pessoas'>{'< Voltar'}</Link>
      </div>

      {dialog.message && <Dialog message={dialog.message} onClose={onDialogClose} confirmAction={dialog.confirmAction} confirmMessage={dialog.confirmMessage} title={dialog.title} />}
    </div>
  );
};

export default ChangePerson;
