import React, {useState, useEffect} from 'react';
import axios from '../axios';
import {Link, useLocation, useHistory} from 'react-router-dom';
import IconButton from '../components/IconButton';
import Dialog from '../components/Dialog';
import EditIcon from '../images/edit-icon.svg';
import DeleteIcon from '../images/delete-icon.svg';

const ListPeople = function ListPeople() {
  const history = useHistory();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const [people, setPeople] = useState([]);
  const [actual, setActual] = useState(query.get('page') || 1);
  const [pagination, setPagination] = useState({});
  const [dialog, setDialog] = useState({
    title: 'Remover pessoa',
    confirmAction: null,
    message: '',
    confirmMessage: 'Confirmar',
  });

  const getPeople = () => {
    axios.get(`/people?page=${actual}`)
      .then(({data}) => {
        const paginationData = {
          page: data.page,
          limit: data.limit,
          total: data.total,
          pages: data.pages,
          next: data.next,
          previous: data.previous,
        };

        history.push(`/gerenciar-pessoas?page=${data.page}`);
        setPagination(paginationData);
        setPeople(data.data);
      })
      .catch(console.error);
  };

  const onDialogClose = () => {
    setDialog({
      ...dialog,
      confirmAction: null,
      message: '',
    });
    getPeople();
  };

  const onEditClick = id => e => {
    history.push(`/gerenciar-pessoas/${id}/alterar`);
  };

  const removePerson = id => () => {
    axios.delete(`/people/${id}`)
      .then(response => setDialog({
        ...dialog,
        message: response.data.message || response.data.error,
        confirmAction: null,
      }))
      .catch(error => setDialog({
        ...dialog,
        message: 'Erro ao remover pessoa, tente novamente mais tarde!',
        confirmAction: null,
      }));
  };

  const openDeleteDialog = id => () => {
    setDialog({
      ...dialog,
      message: 'Tem certeza que deseja remover esse registro?',
      confirmAction: removePerson(id),
    });
  };

  useEffect(() => {
    getPeople();
  }, [actual]);

  return (
    <div className='app'>
      <header className='app-header'>
        <h1>Gerenciando Pessoas Físicas e Jurídicas</h1>

        <hr/>
      </header>

      <div className='table'>
        <div className='table-description'>
          <h6>Lista de Pessoas</h6>
          <Link to='/gerenciar-pessoas/cadastrar' className='button success md'>Criar nova pessoa</Link>
        </div>

        <div className='item title'>Tipo</div>
        <div className='item title'>Nome/Razão Social</div>
        <div className='item title'>CPF/CNPJ</div>
        <div className='item title'>Telefone</div>
        <div className='item title'>Cidade</div>
        <div className='item title actions'>Ações</div>

        {
          people.map((person, index) => {
            return (
              <React.Fragment key={index}>
                <div className='item'>{{PJ: 'Pessoa Jurídica', PF: 'Pessoa Física'}[person.type]}</div>
                <div className='item'>{person.name}</div>
                <div className='item'>{person.cpf || person.cnpj}</div>
                <div className='item'>{person.phone}</div>
                <div className='item'>{person.city}</div>
                <div className='item actions'>
                  <IconButton onClick={onEditClick(person._id)} title='Editar' icon={EditIcon} />
                  <IconButton onClick={openDeleteDialog(person._id)} title='Excluir' icon={DeleteIcon} />
                </div>
              </React.Fragment>
            );
          })
        }
      </div>

      {
        !Boolean(people.length) &&
        <div className='message'>
          <span>Não há registros para exibir.</span>
        </div>
      }

      {
        pagination &&
        <div className='pagination'>
          <button disabled={actual === 1} onClick={() => setActual(1)} className='first'>{'<<'}</button>
          <button disabled={pagination.previous === null} onClick={() => setActual(pagination.previous)} className='previous'>{'<'}</button>
          <span className='actual'>{actual} de {pagination.pages}</span>
          <button disabled={pagination.next === null} onClick={() => setActual(pagination.next)} className='next'>{'>'}</button>
          <button disabled={actual === pagination.pages} onClick={() => setActual(pagination.pages)} className='last'>{'>>'}</button>
        </div>
      }

      <div className='app-foo'>
        <Link className='button md' to='/'>{'< Voltar para pesquisa'}</Link>
      </div>
      {dialog.message && <Dialog message={dialog.message} onClose={onDialogClose} confirmAction={dialog.confirmAction} confirmMessage={dialog.confirmMessage} title={dialog.title} />}
    </div>
  );
};

export default ListPeople;
