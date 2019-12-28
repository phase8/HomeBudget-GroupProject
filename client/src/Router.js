import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Signup from './pages/Signup';
import Signin from './pages/Signin';

const Router = () => {
  return (
    <Switch>
      <Route exact path='/' component={Signin}></Route>
      <Route exact path='/signup' component={Signup}></Route>
    </Switch>
  );
}

export default Router;

