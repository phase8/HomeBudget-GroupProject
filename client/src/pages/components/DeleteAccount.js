import React from "react";
import Input from "./FormInput";
import apiConfig from "../../api/apiConfig";
import { logout } from "../../helper/tools";
import { Redirect } from "react-router";

class DeleteAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      errorMsg: "",
      timeout: "",
      redirect: false
    };
  }

  timer = () =>
    setTimeout(() => {
      this.setState({ redirect: true });
    }, 1500);

  componentWillUnmount = () => {
    clearTimeout(this.timeout);
  };

  updateForm = (name, value) => {
    this.setState({ [name]: value, errorMsg: "" });
  };

  onFormSubmit = async event => {
    event.preventDefault();
    let email = localStorage.getItem("email");
    let dane = {
      password: this.state.password
    };
    if (!this.state.errorMsg && this.state.password.length > 7) {
      await apiConfig
        .delete(`user/${email}`, { data: dane })
        .then(res => {
          logout();
          this.setState({ errorMsg: "Success!", timeout: this.timer() });
        })
        .catch(err => {
          let errorMsg = this.state.errorMsg;
          errorMsg = err.response.data;
          this.setState({ errorMsg });
        });
    }
  };

  render() {
    if (this.state.redirect === true) return <Redirect to="/" />;
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
