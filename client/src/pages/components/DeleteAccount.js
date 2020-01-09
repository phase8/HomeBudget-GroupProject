import React from "react";
import Input from "./FormInput";

class DeleteAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      errorMsg: ""
    };
  }

  updateForm = (name, value) => {
    this.setState({ [name]: value });
  };

  onFormSubmit = async event => {
    event.preventDefault();
  };

  render() {
    return (
      <div className="content">
        <form onSubmit={this.onFormSubmit} className="ui medium form">
          <div className="ui stacked segment">
            <Input
              name={"password"}
              type={"password"}
              placeholder={"Password"}
              icon={"lock"}
              updateForm={this.updateForm}
            />
            <button className="ui fluid large red button">Confirm</button>
          </div>
          {this.state.errorMsg && this.state.password.length > 7 && (
            <div className="ui negative message">{this.state.errorMsg}</div>
          )}
        </form>
      </div>
    );
  }
}

export default DeleteAccount;
