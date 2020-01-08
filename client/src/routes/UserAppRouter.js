import React from "react";
import { Switch, Route } from "react-router-dom";
import { Redirect } from "react-router";

import Welcomepage from "../pages/Welcomepage";
import AccountManagment from "../pages/AccountManagment";
import NavBar from "../pages/components/NavBar";
import { welcomepageUrl, accountManagmentUrl, goalsUrl, AddIncomeExpenseUrl } from "../helper/urls";
import PageNotFound from "../pages/PageNotFound";
import AddIncomeExpense from "../pages/AddIncomeExpense";
import Target from "../pages/Target";







const UserAppRouter = () => {
  if (!localStorage.getItem("token")) return <Redirect to="/" />; // need to add checking validate of token, e.g. when sending req to db
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path={welcomepageUrl} component={Welcomepage}></Route>
        <Route path={accountManagmentUrl} component={AccountManagment}></Route>
        <Route path="/404" component={PageNotFound} />
        <Route path={goalsUrl} component={Target}></Route>
        <Route path={AddIncomeExpenseUrl} component={AddIncomeExpense}></Route>
        <Redirect from="*" to="/404" />
      </Switch>
    </div>
  );
};

export default UserAppRouter;
