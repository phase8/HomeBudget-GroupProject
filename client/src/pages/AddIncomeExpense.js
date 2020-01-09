import React from "react";
import axios from "axios";
import "../styles/page.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class AddIncomeExpense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      operationname: "",
      amount: "",
      category: "",
      operationtype: "",
      startDate: new Date(),
      ispernament: "",
      categories: []
    };
  }

  componentDidMount = () => {
    this.getCategories();
  };

  getCategories = () => {
    axios
      .get("http://localhost:3001/api/OperationsAndGoals/total")
      .then(response => {
        const data = response.data;
        this.setState({ categories: data });
        console.log("Data has been received!!");
      })
      .catch(() => {
        alert("błąd przy pobraniu danych");
      });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleChange2 = date => {
    this.setState({
      startDate: date
    });
  };

  submit = event => {
    event.preventDefault();

    this.handleDisable();
  };

  handleDisable = () => {
    if (this.state.operationtype === "przychód") {
      this.resetCategory();
    } else {
      this.sentDataExpenseIncome();
    }
  };

  resetCategory = () => {
    this.setState(
      {
        category: "bez kategorii"
      },
      () => this.sentDataExpenseIncome()
    );
  };

  sentDataExpenseIncome = () => {
    if (this.state.amount < 0) {
      alert("kwota nie może być ujemna");
    } else if (
      this.state.operationname === "" ||
      this.state.amount === "" ||
      this.state.category === "wybierz" ||
      this.state.operationtype === "wybierz" ||
      this.state.ispernament === "wybierz" ||
      this.state.category === "" ||
      this.state.operationtype === "" ||
      this.state.ispernament === ""
    ) {
      alert("Wypełnij wszystkie pola.");
    } else {
      const payload = {
        operationname: this.state.operationname,
        amount: this.state.amount,
        date: this.state.startDate,
        category: this.state.category,
        operationtype: this.state.operationtype,
        ispernament: this.state.ispernament
      };

      axios({
        url: "http://localhost:3001/api/OperationsAndGoals/saveincomeexpense",
        method: "POST",
        data: payload
      })
        .then(() => {
          alert("dane zostały zapisane");
          this.resetUserInputs();
        })
        .catch(() => {
          console.log("Internal server error");
        });
    }
  };

  resetUserInputs = () => {
    this.setState({
      operationname: "",
      amount: ""
    });
  };

  render() {
    return (
      <div className="pageContainer">
        <div className="statusContainer">
          <div className="currentFinantialStatus">
            <div className="statusDescription">Dodaj operację</div>
          </div>

          <form onSubmit={this.submit}>
            <label> Wpisz nazwę operacji </label>

            <input
              type="text"
              name="operationname"
              placeholder="nazwa operacji"
              value={this.state.operationname}
              onChange={this.handleChange}
            />

            <label> Wpisz kwotę </label>

            <input
              type="number"
              placeholder="kwota"
              name="amount"
              value={this.state.amount}
              onChange={this.handleChange}
            />

            <label> Wybierz kategorię wydatków: </label>

            <select
              name="category"
              value={this.state.category}
              onChange={this.handleChange}
            >
              <option
                disabled={
                  this.state.operationtype === "przychód" ? true : false
                }
                value="wybierz"
              >
                {this.state.operationtype === "przychód"
                  ? "nie dotyczy"
                  : "wybierz"}
              </option>
              {this.state.categories.map(obj => {
                return (
                  <option
                    disabled={
                      this.state.operationtype === "przychód" ? true : false
                    }
                    name="category"
                    value={obj.total}
                  >
                    {obj.total}
                  </option>
                );
              })}
            </select>

            <label>Wybierz typ operacji:</label>

            <select
              name="operationtype"
              value={this.state.operationtype}
              onChange={this.handleChange}
            >
              <option value="wybierz">wybierz</option>
              <option value="przychód">przychód</option>
              <option value="wydatek">wydatek</option>
            </select>

            <div>
              <label>Wybierz datę operacji: </label>
              <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange2}
                name="startDate"
                dateFormat="dd/MM/yyyy"
              />
            </div>

            <label>Czy operacja ma charakter comiesięczny? </label>
            <select
              name="ispernament"
              value={this.state.ispernament}
              onChange={this.handleChange}
            >
              <option value="wybierz">wybierz</option>
              <option value="tak">tak</option>
              <option value="nie">nie</option>
            </select>

            <button>Dodaj</button>
          </form>
        </div>
      </div>
    );
  }
}

export default AddIncomeExpense;
