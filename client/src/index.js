import React from "react";
import ReactDOM from "react-dom";
import App from "./routes/App";
import { BrowserRouter } from "react-router-dom";
import "./styles/style.css";

import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.register();
