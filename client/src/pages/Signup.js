import React from "react";
import { Link } from 'react-router-dom';

class Signup extends React.Component {
    render() {
      return ( 
      <div className="signin ui middle aligned center aligned grid">
          <div className="twelve wide mobile eight wide tablet four wide computer column">
            <h2 className="ui header">
              <div className="content">
              Ready to sign up?
              </div>
            </h2>
            <form className="ui large form">
              <div className="ui stacked segment">
                <div className="field">
                  <div className="ui left icon input">
                    <i className="user icon"></i>
                    <input type="text" name="username" placeholder="Username"/>
                  </div>
                </div>
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
                <div className="ui fluid large red submit button">Sign up</div>
              </div>
              <div className="ui error message"></div>
            </form>
            <div className="ui message">
              Already have an account?
              <Link to="/"> Sign in</Link>
            </div>
          </div>
        </div>
    )}
  }

export default Signup;
