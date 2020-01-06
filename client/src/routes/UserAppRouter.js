import React from "react";
import { Switch, Route } from "react-router-dom";
import { Redirect } from "react-router";

import Welcomepage from "../pages/Welcomepage";
import Userpanel from "../pages/Userpanel";
import NavBar from "../pages/components/NavBar";
import { welcomepageUrl, userpanelUrl, userName } from "../helper/urls";

const UserAppRouter = () => {
  if (!localStorage.getItem("token")) return <Redirect to="/" />; // need to add checking validate of token, e.g. when sending req to db
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path={welcomepageUrl} component={Welcomepage}></Route>
        <Route path={userpanelUrl} component={Userpanel}></Route>\
        <Redirect from={`/${userName}`} to="/" />
      </Switch>
    </div>
  );
};

export default UserAppRouter;
