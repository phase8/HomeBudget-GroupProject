import React from "react";
import Input from "./FormInput";
import { Redirect } from "react-router";
import apiConfig from "../../api/apiConfig";
import { login } from "../../helper/tools";
import { accountManagementUrl } from "../../helper/urls";

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: "",
      confirmPassword: "",
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
    if (name === "confirmPassword")
      this.setState({
        errorMsg:
          value !== this.state.newPassword ? "Fields aren't the same!" : ""
      });
    else if (name === "newPassword")
      this.setState({
        errorMsg:
          value !== this.state.confirmPassword ? "Fields aren't the same!" : ""
      });
  };

  onFormSubmit = async event => {
    event.preventDefault();
    let email = localStorage.getItem("email");
    let data = {
      user: { email: email, password: this.state.password },
      password: this.state.newPassword
    };
    if (!this.state.errorMsg && this.state.confirmPassword.length > 7) {
      await apiConfig
        .post("/user/password", data)
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
        <h3 className="ui grey header">Change password</h3>
        <form onSubmit={this.onFormSubmit} className="ui medium form">
          <div className="ui stacked segment">
            <Input
              name={"password"}
              type={"password"}
              placeholder={"Current password"}
              icon={"lock"}
              updateForm={this.updateForm}
            />
            <Input
              name={"newPassword"}
              type={"password"}
              placeholder={"New password"}
              icon={"lock"}
              updateForm={this.updateForm}
            />
            <Input
              name={"confirmPassword"}
              type={"password"}
              placeholder={"Confirm new password"}
              icon={"lock"}
              updateForm={this.updateForm}
            />

            <button className="ui fluid large blue button">Confirm</button>
          </div>
          {this.state.errorMsg && this.state.confirmPassword.length > 7 && (
            <div className="ui negative message">{this.state.errorMsg}</div>
          )}
        </form>
      </div>
    );
  }
}

export default ChangePassword;
