import React from "react";
import { Link } from "react-router-dom";

class Welcomepage extends React.Component {
  logout = () => {
    localStorage.removeItem("token");
  };
  render() {
    return (
      <div>
        Witaj mordo, nie daj się skroić! #zaufana marka
        <Link to="/" onClick={this.logout}>
          logout
        </Link>
      </div>
    );
  }
}

export default Welcomepage;
