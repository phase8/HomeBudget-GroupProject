import React from 'react';
import { Switch, Route } from 'react-router-dom';

import StartPage from './pages/StartPage';
import Signup from './pages/Signup';

const Router = () => {
  return (
    <Switch>
      <Route exact path='/' component={StartPage}></Route>
      <Route exact path='/signup' component={Signup}></Route>
    </Switch>
  );
}

export default Router;