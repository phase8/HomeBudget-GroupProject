import React from "react";
import ChangeName from "./components/ChangeName";
import ChangePassword from "./components/ChangePassword";
import DeleteAccount from "./components/DeleteAccount";
class AccountManagment extends React.Component {
  render() {
    return (
      <div
        className="ui container vertically padded center aligned grid cards"
        style={{ height: "20vh" }}
      >
        <div className="ui center aligned twelve wide column card">
          <h1 className="ui  header"> Account Managment </h1>
          <ChangeName />
          <ChangePassword />
          <DeleteAccount />
        </div>
      </div>
    );
  }
}

export default AccountManagment;
