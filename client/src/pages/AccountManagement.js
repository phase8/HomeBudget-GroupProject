import React from "react";
import ChangeName from "./components/ChangeName";
import ChangePassword from "./components/ChangePassword";
import DeleteAccount from "./components/DeleteAccount";

class AccountManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ChangeName: false,
      ChangePassword: false,
      DeleteAccount: false
    };
  }

  checkAction = event => {
    let name = event.target.name;
    this.setState({ [name]: !this.state[name] });
  };

  render() {
    return (
      <div
        className="ui container vertically padded center aligned grid cards"
        style={{ height: "20vh" }}
      >
        <div className="ui center aligned twelve wide column card">
          <h1 className="ui  header"> Account Management </h1>
          <div className="content">
            <button
              className="ui fluid large grey button"
              name="ChangeName"
              onClick={e => this.checkAction(e)}
            >
              Change user name
            </button>
            {this.state.ChangeName && <ChangeName />}
          </div>
          <div className="content">
            <button
              className="ui fluid large grey button"
              name="ChangePassword"
              onClick={e => this.checkAction(e)}
            >
              Change password
            </button>
            {this.state.ChangePassword && <ChangePassword />}
          </div>
          <div className="content">
            <button
              className="ui fluid large red button"
              name="DeleteAccount"
              onClick={e => this.checkAction(e)}
            >
              Delete account
            </button>
            {this.state.DeleteAccount && <DeleteAccount />}
          </div>
        </div>
      </div>
    );
  }
}

export default AccountManagement;
