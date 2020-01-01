import React from "react";
import { Link } from "react-router-dom";
import apiConfig from "../api/apiConfig";
import { Redirect } from "react-router";

const _ = require("lodash");

class Signin extends React.Component {
  state = {
    email: "",
    password: "",
    logged: false
  };
  onFormSubmit = async event => {
    event.preventDefault();

    await apiConfig
      .post("/auth", _.pick(this.state, ["email", "password"]))
      .then(res => {
        localStorage.setItem("token", res.data.token);
        this.setState({ logged: true });
      })
      .catch(err => {
        console.log("AXIOS ERROR: ", err);
      });
  };
  render() {
    if (this.state.logged === true || localStorage.getItem("token"))
      return <Redirect to="/welcomepage" />;
    return (
      <div className="signin ui middle aligned center aligned grid">
        <div className="twelve wide mobile eight wide tablet five wide computer column">
          <h2 className="ui blue header">
            <div className="content">Log-in to your account</div>
          </h2>
          <form onSubmit={this.onFormSubmit} className="ui large form">
            <div className="ui stacked segment">
              <div className="field">
                <div className="ui left icon input">
                  <i className="envelope icon"></i>
                  <input
                    type="text"
                    placeholder="E-mail address"
                    value={this.state.email}
                    onChange={e => this.setState({ email: e.target.value })}
                  />
                </div>
              </div>
              <div className="field">
                <div className="ui left icon input">
                  <i className="lock icon"></i>
                  <input
                    type="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={e => this.setState({ password: e.target.value })}
                  />
                </div>
              </div>
              <button className="ui fluid large blue button">Login</button>
            </div>
            <div className="ui error message"></div>
          </form>
          <div className="ui message">
            New to us?
            <Link to="/signup"> Register</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Signin;
