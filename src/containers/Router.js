import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Search from './Search';
import ListPeople from './ListPeople';

const Router = function Router(props) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Search} />
        <Route path='/gerenciar-pessoas/' exact component={ListPeople} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
