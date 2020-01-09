
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router';

import Welcomepage from '../pages/Welcomepage';
import Category from '../pages/Category';
import AccountManagment from '../pages/AccountManagment';
import NavBar from '../pages/components/NavBar';
import PageNotFound from '../pages/PageNotFound';
import AddIncomeExpense from '../pages/AddIncomeExpense';
import Target from '../pages/Target';
import CategoryAdd from '../pages/CategoryAdd';
import CategoryExpenseList from '../pages/CategoryExpenseList';
import CategoryIncomeList from '../pages/CategoryIncomeList';
import History from "../pages/History"

import {
  welcomepageUrl,
  accountManagmentUrl,
  categoryUrl,
  goalsUrl,
  AddIncomeExpenseUrl,
  categoryAddUrl,
  categoryIncomeUrl,
  categoryExpenseUrl,
  historyUrl
} from '../helper/urls';


const UserAppRouter = () => {
  if (!localStorage.getItem('token')) return <Redirect to='/' />; // need to add checking validate of token, e.g. when sending req to db
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path={welcomepageUrl} component={Welcomepage}></Route>
        <Route exact path={categoryUrl} component={Category}></Route>
        <Route path={categoryAddUrl} component={CategoryAdd}></Route>
        <Route path={categoryIncomeUrl} component={CategoryIncomeList}></Route>
        <Route
          path={categoryExpenseUrl}
          component={CategoryExpenseList}
        ></Route>
        <Route path={accountManagmentUrl} component={AccountManagment}></Route>
        <Route path={AddIncomeExpenseUrl} component={AddIncomeExpense}></Route>

        
        <Redirect from="*" to="/404" />

        <Route path={goalsUrl} component={Target}></Route>
        <Route path='/404' component={PageNotFound} />
        <Redirect from='*' to='/404' />
        <Route path={historyUrl} component={History}></Route>

      </Switch>
    </>
  );
};

export default UserAppRouter;
