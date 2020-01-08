import React from "react";
import "../styles/page.css";
import Userpanel from "./components/userpanel.js";

class Welcomepage extends React.Component {
  render() {
    return (
      <div className="pageContainer">
        <Userpanel />
        <div className="notification">
          Cześć {localStorage.getItem("name")}! Miło Cię widzieć ponownie.
          Zaoszczędź z nami trochę $$$ żeby Ci potem starczyło na waciki.
        </div>
      </div>
    );
  }
}

export default Welcomepage;
