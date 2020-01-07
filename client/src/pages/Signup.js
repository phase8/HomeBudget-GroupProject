import React from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";

import apiConfig from "../api/apiConfig";
import Input from "./components/FormInput";
import { login } from "../helper/tools";
import { welcomepageUrl } from "../helper/urls";

const _ = require("lodash");

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      logged: false,
      errorApiMsg: ""
    };
  }

  updateForm = (name, value) => {
    this.setState({ [name]: value });
  };

  onFormSubmit = async event => {
    event.preventDefault();

    await apiConfig
      .post("/users", _.pick(this.state, ["name", "email", "password"]))
      .then(res => {
        login(res.data);
        this.setState({ logged: true });
      })
      .catch(err => {
        let errorApiMsg = this.state.errorApiMsg;
        errorApiMsg = err.response.data;
        this.setState({ errorApiMsg });
      });
  };

  render() {
    if (this.state.logged === true || localStorage.getItem("token"))
      return <Redirect to={welcomepageUrl} />;

    return (
      <div className="signup ui middle aligned center aligned grid">
        <div className="twelve wide mobile eight wide tablet five wide computer column">
          <h2 className="ui header">
            <div className="content">Ready to sign up?</div>
          </h2>
          <form onSubmit={this.onFormSubmit} className="ui large form">
            <div className="ui stacked segment">
              <div className="field">
                <Input
                  name={"name"}
                  type={"text"}
                  placeholder={"Name"}
                  icon={"user"}
                  updateForm={this.updateForm}
                />
                <Input
                  name={"email"}
                  type={"text"}
                  placeholder={"E-mail address"}
                  icon={"envelope"}
                  updateForm={this.updateForm}
                />
                <Input
                  name={"password"}
                  type={"password"}
                  placeholder={"Password"}
                  icon={"lock"}
                  updateForm={this.updateForm}
                />
              </div>
              <button className="ui fluid large red button">Sign up</button>
            </div>
            {this.state.errorApiMsg && (
              <div className="ui negative message">
                {this.state.errorApiMsg}
              </div>
            )}
          </form>
          <div className="ui message">
            Already have an account?
            <Link to="/"> Sign in</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
