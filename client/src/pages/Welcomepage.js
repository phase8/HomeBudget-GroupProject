import React from "react";
import "../styles/page.css";
import { hasJustLogged } from "../helper/tools";
import axios from "axios";
import { Link } from "react-router-dom";
import { AddIncomeExpenseUrl, goalsUrl } from "../helper/urls";

let income;
let outcome;
let arrSum = arr => arr.reduce((a, b) => a + b, 0);

class Welcomepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      operationname: "",
      operations: [],
      amount: "",
      category: "",
      operationtype: "",
      startDate: new Date(),
      ispernament: "",
      email: localStorage.getItem("email"),
      ballance: 0
    };
  }

  getBallance = () => {
    let ballance;
    axios
      .get("http://localhost:3001/api/History/incomes", {
        params: {
          email: this.state.email
        }
      })
      .then(response => {
        const data = response.data;
        income = arrSum(data.map(({ amount }) => amount));
      })
      .catch(() => {
        console.error("I dupa");
      });
    axios
      .get("http://localhost:3001/api/History/outcomes", {
        params: {
          email: this.state.email
        }
      })
      .then(response => {
        const data = response.data;
        outcome = arrSum(data.map(({ amount }) => amount));
        ballance = income - outcome;
        this.setState({ ballance });
      })
      .catch(() => {
        console.error("I dupa");
      });
    return ballance;
  };

  componentDidMount = () => {
    this.getBallance();
  };

  render() {
    return (
      <div className="pageContainer">
        <div className="dataContainer">
          <div className="statusContainer">
            <div className="currentFinantialStatus">
              <div className="statusDescription">Twoje obecne środki:</div>
              <div className="cashAmount">{this.state.ballance} zł</div>
            </div>
            <div className="controlBox">
              <Link to={goalsUrl} className={` addGoal `}>
                Dodaj cel
              </Link>
              <Link to={AddIncomeExpenseUrl} className={`addCash `}>
                Dodaj przychód lub wydatek
              </Link>
            </div>
          </div>
        </div>
        {hasJustLogged && (
          <div className="notification">
            Cześć {localStorage.getItem("name")}! Miło Cię widzieć ponownie.
            Zaoszczędź z nami trochę $$$ żeby Ci potem starczyło na waciki.
          </div>
        )}
      </div>
    );
  }
}

export default Welcomepage;
