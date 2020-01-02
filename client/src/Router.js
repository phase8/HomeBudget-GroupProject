import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Welcomepage from './pages/Welcomepage'
import Userpanel from './pages/Userpanel'

const Router = () => {
  return (
    <Switch>
      <Route exact path='/' component={Signin}></Route>
      <Route exact path='/signup' component={Signup}></Route>
      <Route exact path='/Welcomepage' component={Welcomepage}></Route>
      <Route exact path='/Userpanel' component={Userpanel}></Route>
    </Switch>
  );
}

export default Router;

