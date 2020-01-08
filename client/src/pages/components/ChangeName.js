import React from "react";
import Input from "./FormInput";

class ChangeName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      confirmName: "",
      errorMsg: ""
    };
  }
  updateForm = (name, value) => {
    this.setState({ [name]: value });
    if (name === "confirmName")
      this.setState({
        errorMsg: value !== this.state.name ? "Fields aren't the same!" : ""
      });
    else if (name === "name")
      this.setState({
        errorMsg:
          value !== this.state.confirmName ? "Fields aren't the same!" : ""
      });
  };

  onFormSubmit = async event => {
    event.preventDefault();
    if (!this.state.errorMsg && this.state.confirmName.length > 4) {
      console.log("here add req");
    }
  };
  render() {
    return (
      <div className="content">
        <h3 className="ui grey header">Change username</h3>
        <form onSubmit={this.onFormSubmit} className="ui medium form">
          <div className="ui stacked segment">
            <Input
              name={"name"}
              type={"text"}
              placeholder={"New name"}
              icon={"user"}
              updateForm={this.updateForm}
            />
            <Input
              name={"confirmName"}
              type={"text"}
              placeholder={"Confirm new name"}
              icon={"user"}
              updateForm={this.updateForm}
            />

            <button className="ui fluid large blue button">Confirm</button>
          </div>
          {this.state.errorMsg && this.state.confirmName.length > 4 && (
            <div className="ui negative message">{this.state.errorMsg}</div>
          )}
        </form>
      </div>
    );
  }
}

export default ChangeName;
