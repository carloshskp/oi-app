import React from 'react';
import MaskedInput from 'react-text-mask/dist/reactTextMask';
import SelectUf from './SelectUf';
import SelectCities from './SelectCities'
import InputPersonType from './InputPersonType'

const PersonForm = function PersonForm(props) {
  const {
    formType = 'ADD',
    formTitle = 'Criação de Pessoa Física/Jurídica',
    type,
    name,
    uf = '',
    city,
    cpf,
    birthDate,
    cnpj,
    phone,
    onChangeType,
    onChangeName,
    onChangeUf,
    onChangeCity,
    onChangeCpf,
    onChangeBirthDate,
    onChangeCnpj,
    onChangePhone,
    onSubmit,
  } = props;

  return (
    <div className='app-content'>
      <h6>{formTitle}</h6>

      <InputPersonType
        value={type}
        onChange={onChangeType}
      />

      <input value={name} className='input-text' type='text' name='name' placeholder='Nome/Razão Social' onChange={onChangeName} />

      <SelectUf
        value={uf}
        onChange={onChangeUf}
      />

      <SelectCities
        value={city}
        onChange={onChangeCity}
        uf={uf}
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
          onChange={onChangeCpf}
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
          onChange={onChangeCnpj}
        />
      }

      {formType === 'ADD' && <input value={birthDate} className='input-date' type='date' name='birth-date' onChange={onChangeBirthDate} />}

      <MaskedInput
        mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/,]}
        value={phone}
        className='input-text'
        type='text'
        name='phone'
        placeholder='Telefone'
        onChange={onChangePhone}
      />

      <button onClick={onSubmit} className='button info xlg full-width'>{formType === 'ADD' ? 'Salvar' : 'Alterar'}</button>
    </div>
  );
};

export default PersonForm;
