import React from "react";
import "../styles/page.css";
import { userpanel } from "./components/userpanel.js";

const notification = [
  <div className="notification">
    Cześć (nazwa użytkownika)! Miło Cię widzieć ponownie. Zaoszczędź z nami
    trochę $$$ żeby Ci potem starczyło na waciki.
  </div>
];

class Welcomepage extends React.Component {
  render() {
    return (
      <div className="pageContainer">
        {userpanel}
        {notification}
      </div>
    );
  }
}

export default Welcomepage;
