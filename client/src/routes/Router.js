import React from "react";
import { Switch, Route } from "react-router-dom";

import Signup from "../pages/Signup";
import Signin from "../pages/Signin";
import UserAppRouter from "./UserAppRouter";
import { userName } from "../helper/urls";
import AddIncomeExpense from "../pages/AddIncomeExpense";
import Target from "../pages/Target";


const Router = () => {
  return (
    <Switch>
      <Route exact path="/" component={Signin}></Route>
      <Route path="/signup" component={Signup}></Route>
      <Route path="/addincomeExpense" component={AddIncomeExpense}></Route>
      <Route path="/goals" component={Target}></Route>
      <Route path={`/:${userName}`} component={UserAppRouter}></Route>
    </Switch>
  );
};

export default Router;
