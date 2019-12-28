import React from "react";
import { Link } from 'react-router-dom';

class Signin extends React.Component {
  render() {
    return ( 
    <div className="signin ui middle aligned center aligned grid">
        <div className="twelve wide mobile eight wide tablet four wide computer column">
          <h2 className="ui blue header">
            <div className="content">
              Log-in to your account
            </div>
          </h2>
          <form className="ui large form">
            <div className="ui stacked segment">
              <div className="field">
                <div className="ui left icon input">
                  <i className="envelope icon"></i>
                  <input type="text" name="email" placeholder="E-mail address"/>
                </div>
              </div>
              <div className="field">
                <div className="ui left icon input">
                  <i className="lock icon"></i>
                  <input type="password" name="password" placeholder="Password"/>
                </div>
              </div>
              <div className="ui fluid large blue submit button">Login</div>
            </div>
            <div className="ui error message"></div>
          </form>
          <div className="ui message">
            New to us?
            <Link to="/signup"> Register</Link>
          </div>
        </div>
      </div>
  )}
}

export default Signin;
