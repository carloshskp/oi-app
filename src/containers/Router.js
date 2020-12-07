import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Search from './Search';

const Router = function Router(props) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Search} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
