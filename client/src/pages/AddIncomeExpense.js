import React from "react";
import axios from "axios";
import "../styles/page.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { categoryAddUrl } from "../helper/urls";
import { checkActiveUrl } from "../helper/tools";
import { Link } from "react-router-dom";

class AddIncomeExpense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      operationname: "",
      amount: 0,
      category: "",
      operationtype: "",
      startDate: new Date(),
      ispernament: "",
      categories: [],
      email: localStorage.getItem("email")
    };
  }

  componentDidMount = () => {
    this.getCategories();
  };

  getCategories = () => {
    axios
      .get(
        "http://localhost:3001/api/OperationsAndGoals/getCategoriesToAddIncomeExpense", {
        params: { email: this.state.email }
      })
      .then(response => {
        const data = response.data;
        this.setState({ categories: data });
      })
      .catch(() => {
        alert("błąd przy pobraniu danych");
      });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
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
        ispernament: this.state.ispernament,
        userid: this.state.email
      };
      axios({
        url: "http://localhost:3001/api/OperationsAndGoals/saveincomeexpense",
        method: "POST",
        data: payload
      });
      setTimeout(this.resetUserInputs(), 1000);
      alert("Dane zostały zapisane.");
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
      <div className="addIncomeexpense-pagecontainer">
        <div className="target-mainbox">
          <div className="target-title-container">
            <div className="target-box">
              <div className="target-title">Dodaj operację</div>
            </div>
          </div>
          <div className="target-form-container">
            <form onSubmit={this.submit}>
              <label className="target-amount-one">
                {" "}
                Wpisz nazwę operacji{" "}
              </label>
              <input
                className="target-form-input"
                type="text"
                name="operationname"
                placeholder="nazwa operacji"
                value={this.state.operationname}
                onChange={this.handleChange}
              />
              <label className="target-amount-one"> Wpisz kwotę </label>
              <input
                className="target-form-input"
                type="number"
                placeholder="kwota"
                name="amount"
                value={this.state.amount}
                onChange={this.handleChange}
              />
              <label className="target-amount-one">Wybierz typ operacji:</label>
              <select
                className="target-form-input"
                name="operationtype"
                value={this.state.operationtype}
                onChange={this.handleChange}
              >
                <option value="wybierz">wybierz</option>
                <option value="przychód">przychód</option>
                <option value="wydatek">wydatek</option>
              </select>
              <div>
                <label className="target-amount-one">
                  Wybierz datę operacji:{" "}
                </label>
                <div className="date-picker-box">
                  <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleChange2}
                    name="startDate"
                    dateFormat="dd/MM/yyyy"
                  />
                </div>
              </div>
              <label className="target-amount-one">
                Czy powtarzać operację co tydzień automatycznie?{" "}
              </label>
              <select
                className="target-form-input"
                name="ispernament"
                value={this.state.ispernament}
                onChange={this.handleChange}
              >
                <option value="wybierz">wybierz</option>
                <option value="tak">tak</option>
                <option value="nie">nie</option>
              </select>
              <label className="target-amount-one">
                {" "}
                Wybierz kategorię wydatków:{" "}
              </label>
              <select
                className="target-form-input"
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
                      value={obj.name}
                    >
                      {obj.name}
                    </option>
                  );
                })}
              </select>
              <button className="target-add-button ">Dodaj</button>
            </form>
          </div>
          <div className="incomeexpense-add-cattegory">
            <Link
              to={categoryAddUrl}
              className={`${checkActiveUrl(categoryAddUrl)} addincomeexpense-add-cattegory-button `}>Dodaj kategorię wydatków</Link>
          </div>
        </div>
      </div >
    );
  }
}
export default AddIncomeExpense;
