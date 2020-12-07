import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Search from './Search';
import ListPeople from './ListPeople';
import AddPerson from './AddPerson';

const Router = function Router(props) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Search} />
        <Route path='/gerenciar-pessoas/' exact component={ListPeople} />
        <Route path='/gerenciar-pessoas/cadastrar' exact component={AddPerson} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
