import React from "react";
import "../styles/page.css";
import { userpanel } from "./components/userpanel.js";
import { userName } from "../helper/urls";
import { hasJustLogged } from "../helper/tools"
import axios from 'axios';

const welcomeNotification = [
  <div className="notification">
    Cześć {userName}! Miło Cię widzieć ponownie. Zaoszczędź z nami
    trochę $$$ żeby Ci potem starczyło na waciki.
  </div>
];

class Welcomepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      operationname: '',
      amount: '',
      category: '',
      operationtype: '',
      startDate: new Date(),
      ispernament: "",
      categories: [],
    };
  }

  getBallance = () => {
    axios.get('http://localhost:3001/api/History/checkbalance')
    .then((response) => {
        const data = response.data
        this.setState({ posts: data})
        console.log("Balans wsysł się")
        console.log(data)
    })
    .catch(() => {
        console.error("I dupa")
    })
  }
  
  componentWillMount = () => {
    this.getBallance()
  }
  render() {
    if (hasJustLogged) {
    return (
      <div className="pageContainer">
        {userpanel}
        {welcomeNotification}
      </div>
    );
    } else{
      return (      
      <div className="pageContainer">
        {userpanel}
      </div>)
    }
  }
}



export default Welcomepage;
