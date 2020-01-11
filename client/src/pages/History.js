import React from "react";
import "../styles/page.css";
import axios from "axios";

class History extends React.Component {
  state = {
    operationname: "",
    operations: [],
    amount: "",
    category: "",
    operationtype: "",
    startDate: new Date(),
    ispernament: "",
    email: localStorage.getItem("email")
  };

  getExpenses = () => {
    axios
      .get("http://localhost:3001/api/History/get", {
        params: {
          userid: this.state.email
        }
      })
      .then(response => {
        const data = response.data;
        this.setState({ operations: data });
        console.log("Zassałao się");
        console.log(data);
      })
      .catch(() => {
        console.error("I dupa");
      });
  };

  componentDidMount = () => {
    this.getExpenses();
  };

  displayHistory = operations => {
    return operations.map((operation, index) => (
      <div key={index} className="history-content">
        <div className="operationname">{operation.operationname}</div>
        <div className="amount">{operation.amount} zł</div>
        <div className="date">{operation.date.slice(0, 10)}</div>
        <div className="category">{operation.category}</div>
        <div className="type">{operation.operationtype}</div>
        <button
          className="remove-entry"
          onClick={this.handleRemove.bind(this, operation._id)}
        >
          usuń
        </button>
      </div>
    ));
  };

  handleRemove = id => {
    axios
      .delete("http://localhost:3001/api/History/remove-entry", {
        data: {id: id}
      })
      .then(response => {
        const data = response.data;
        if (data) {window.location.reload()}
      })
  }

  // sortowanie idzie po dacie i jest robione backendem, jak znajdę minimalną chwilę to dorzuce sortowanie po kwocie
  render() {
    return (
      <div className="pageContainer">
        <div className="header-box">Historia wydatków</div>
        <div className="table-description">
          <div className="operationname">nazwa operacji</div>
          <div className="amount">kwota</div>
          <div className="date">data</div>
          <div className="category">kategoria</div>
          <div className="type">typ</div>
          <div className="remove-entry">usuń operację</div>
        </div>
        <div className="history-display-box">
          {this.displayHistory(this.state.operations)}
        </div>
      </div>
    );
  }
}

export default History;
