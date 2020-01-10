import React from "react";
import "../styles/page.css";
import { hasJustLogged } from "../helper/tools";
import axios from "axios";
import { Link } from "react-router-dom";
import { AddIncomeExpenseUrl, goalsUrl } from "../helper/urls";
import { checkActiveUrl } from "../helper/tools";

let income;
let outcome;
let ballance;
let arrSum = arr => arr.reduce((a, b) => a + b, 0);
let email = localStorage.getItem("email")



class Welcomepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      operationname: "",
      amount: "",
      category: "",
      operationtype: "",
      startDate: new Date(),
      ispernament: "",
      categories: [],
      email: "",
    };
  }

  setEmail = () => this.setState({
    email: email
  });

  getBallance = () => {
    axios
      .get("http://localhost:3001/api/History/incomes",  {
        params: {
          email: email
        }})
      .then(response => {
        const data = response.data;
        this.setState({ posts: data });
        console.log("przychody wsysły się");
        income = arrSum(data.map(({ amount }) => amount));
        console.log(income);
      })
      .catch(() => {
        console.error("I dupa");
      });
    axios
      .get("http://localhost:3001/api/History/outcomes",  {
        params: {
          email: email
        }})
      .then(response => {
        const data = response.data;
        this.setState({ posts: data });
        console.log("wydatki wsysły się");
        outcome = arrSum(data.map(({ amount }) => amount));
        console.log(outcome);
        ballance = income - outcome;
        console.log(ballance);
      })
      .catch(() => {
        console.error("I dupa");
      });
  };

  componentDidMount = () => {
    this.getBallance();
    this.setEmail();
  };

  render() {
    if (hasJustLogged) {
      return (
        <div className="pageContainer">
          <div className="dataContainer">
            <div className="statusContainer">
              <div className="currentFinantialStatus">
                <div className="statusDescription">Twoje obecne środki:</div>
                <div className="cashAmount">{ballance}</div>
              </div>
              <div className="controlBox">
                <Link
                  to={goalsUrl}
                  className={`${checkActiveUrl(goalsUrl)} addGoal `}
                >
                  Dodaj cel
                </Link>
                <Link
                  to={AddIncomeExpenseUrl}
                  className={`${checkActiveUrl(AddIncomeExpenseUrl)} addCash `}
                >
                  Dodaj przychód lub wydatek
                </Link>
              </div>
            </div>
          </div>
          <div className="notification">
            Cześć {localStorage.getItem("name")}! Miło Cię widzieć ponownie.
            Zaoszczędź z nami trochę $$$ żeby Ci potem starczyło na waciki.
          </div>
        </div>
      );
    } else {
      return (
        <div className="pageContainer">
          <div className="pageContainer">
            <div className="dataContainer">
              <div className="statusContainer">
                <div className="currentFinantialStatus">
                  <div className="statusDescription">Twoje obecne środki:</div>
                  <div className="cashAmount">{ballance}</div>
                </div>
                <div className="controlBox">
                  <Link
                    to={goalsUrl}
                    className={`${checkActiveUrl(goalsUrl)} addGoal `}
                  >
                    Dodaj cel
                  </Link>
                  <Link
                    to={AddIncomeExpenseUrl}
                    className={`${checkActiveUrl(
                      AddIncomeExpenseUrl
                    )} addCash `}
                  >
                    Dodaj przychód lub wydatek
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Welcomepage;
