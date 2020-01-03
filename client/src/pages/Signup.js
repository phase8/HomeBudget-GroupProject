import React from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";

import apiConfig from "../api/apiConfig";
import formValidate from "../helper/formValidate";

const _ = require("lodash");

class Signup extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    logged: false,
    errors: { name: "", email: "", password: "", apiMsg: "" }
  };

  onFormSubmit = async event => {
    event.preventDefault();

    await apiConfig
      .post("/users", _.pick(this.state, ["name", "email", "password"]))
      .then(res => {
        localStorage.setItem("token", res.data.token);
        this.setState({ logged: true });
      })
      .catch(err => {
        let errors = this.state.errors;
        errors.apiMsg = err.response.data;
        this.setState({ errors });
      });
  };

  onInputChange = async event => {
    let errors = this.state.errors;
    errors[event.target.name] = formValidate(event);
    this.setState({ errors, [event.target.name]: event.target.value });
  };

  render() {
    if (this.state.logged === true || localStorage.getItem("token"))
      return <Redirect to="/welcomepage" />;
    return (
      <div className="signup ui middle aligned center aligned grid">
        <div className="twelve wide mobile eight wide tablet five wide computer column">
          <h2 className="ui header">
            <div className="content">Ready to sign up?</div>
          </h2>
          <form onSubmit={this.onFormSubmit} className="ui large form">
            <div className="ui stacked segment">
              <div className="field">
                <div className="ui left icon input">
                  <i className="user icon"></i>
                  <input
                    name="name"
                    type="text"
                    placeholder="Name"
                    autoComplete="on"
                    value={this.state.name}
                    onChange={e => this.onInputChange(e)}
                  />
                </div>
                {this.state.errors.name && (
                  <span className="ui pointing above red basic label">
                    {this.state.errors.name}
                  </span>
                )}
              </div>
              <div className="field">
                <div className="ui left icon input">
                  <i className="envelope icon"></i>
                  <input
                    name="email"
                    type="text"
                    placeholder="E-mail address"
                    autoComplete="on"
                    value={this.state.email}
                    onChange={e => this.onInputChange(e)}
                  />
                </div>
                {this.state.errors.email && (
                  <span className="ui pointing above red basic label">
                    {this.state.errors.email}
                  </span>
                )}
              </div>
              <div className="field">
                <div className="ui left icon input">
                  <i className="lock icon"></i>
                  <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    autoComplete="on"
                    value={this.state.password}
                    onChange={e => this.onInputChange(e)}
                  />
                </div>
                {this.state.errors.password && (
                  <span className="ui pointing above red basic label">
                    {this.state.errors.password}
                  </span>
                )}
              </div>
              <button className="ui fluid large red button">Sign up</button>
            </div>
            {this.state.errors.apiMsg && (
              <div className="ui negative message">
                {this.state.errors.apiMsg}
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
