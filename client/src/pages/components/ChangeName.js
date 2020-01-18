import React from "react";
import Input from "./FormInput";
import { Redirect } from "react-router";
import apiConfig from "../../api/apiConfig";
import { login } from "../../helper/tools";
import { accountManagementUrl } from "../../helper/urls";

class ChangeName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      confirmName: "",
      password: "",
      errorMsg: "",
      update: false
    };
  }
  componentDidUpdate = () => {
    if (this.state.update) this.setState({ update: false });
  };

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
    else this.setState({ errorMsg: "" });
  };

  onFormSubmit = async event => {
    event.preventDefault();
    let email = localStorage.getItem("email");
    let data = {
      user: { email: email, password: this.state.password },
      name: this.state.name
    };
    if (!this.state.errorMsg && this.state.confirmName.length > 4) {
      await apiConfig
        .post("/user/name", data)
        .then(res => {
          login(res.data);
          this.setState({ errorMsg: "Success!", update: true });
        })
        .catch(err => {
          let errorMsg = this.state.errorMsg;
          errorMsg = err.response.data;
          this.setState({ errorMsg });
        });
    }
  };

  render() {
    if (this.state.update === true)
      return <Redirect to={accountManagementUrl} />;

    return (
      <div className="content">
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
            <Input
              name={"password"}
              type={"password"}
              placeholder={"Password"}
              icon={"lock"}
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
