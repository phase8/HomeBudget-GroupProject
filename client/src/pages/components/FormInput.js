import React from "react";
import formValidate from "../../helper/formValidate";

class Input extends React.Component {
  state = {
    value: "",
    error: ""
  };
  onInputChange = event => {
    let error = this.state.error;
    error = formValidate(event);
    this.setState({ error, value: event.target.value });
    this.props.updateForm(this.props.name, event.target.value);
  };

  render() {
    return (
      <div className="field">
        <div className="ui left icon input">
          <i className={`${this.props.icon} icon`}></i>
          <input
            name={this.props.name}
            type={this.props.type}
            placeholder={this.props.placeholder}
            autoComplete="on"
            value={this.state.value}
            onChange={e => this.onInputChange(e)}
          />
        </div>
        {this.state.error && (
          <span className="ui pointing above red basic label">
            {this.state.error}
          </span>
        )}
      </div>
    );
  }
}

export default Input;
