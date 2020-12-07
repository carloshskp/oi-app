import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Search from './Search';
import ListPeople from './ListPeople';
import AddPerson from './AddPerson';
import ChangePerson from './ChangePerson';


const Router = function Router(props) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Search} />
        <Route path='/gerenciar-pessoas/' exact component={ListPeople} />
        <Route path='/gerenciar-pessoas/cadastrar' exact component={AddPerson} />
        <Route path='/gerenciar-pessoas/:id/alterar' exact component={ChangePerson} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
