import React from 'react';
import axios from '../api/apiConfig';
import '../styles/page.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Fragment } from 'react';

class AddIncomeExpense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      operationname: '',
      amount: '',
      category: '',
      operationtype: '',
      startDate: new Date(),
      ispernament: '',
      categories: []
    };
  }

  componentDidMount = () => {
    this.getCategories();
  };

  getCategories = () => {
    axios
      .get('/categories')
      .then(response => {
        console.log(response);
        const data = response.data.filter(
          element => element.type === 'EXPENSE'
        ); // array of {type: INCOME/EXPENSE, _id:..., name: "nameOfCategory"}
        this.setState(() => {
          this.state.categories = data.map(element => element.name); // array of type: [expense1Name, expense2Name, ...]
        });
        this.loadCategories();
      })
      .catch(() => {
        alert('błąd przy pobraniu danych');
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
    if (this.state.operationtype === 'przychód') {
      this.resetCategory();
    } else {
      this.sentDataExpenseIncome();
    }
  };

  resetCategory = () => {
    this.setState(
      {
        category: 'bez kategorii'
      },
      () => this.sentDataExpenseIncome()
    );
  };

  sentDataExpenseIncome = () => {
    if (this.state.amount < 0) {
      alert('kwota nie może być ujemna');
    } else if (
      this.state.operationname === '' ||
      this.state.amount === '' ||
      this.state.category === 'wybierz' ||
      this.state.operationtype === 'wybierz' ||
      this.state.ispernament === 'wybierz' ||
      this.state.category === '' ||
      this.state.operationtype === '' ||
      this.state.ispernament === ''
    ) {
      alert('Wypełnij wszystkie pola.');
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
        url: 'http://localhost:3001/api/OperationsAndGoals/saveincomeexpense',
        method: 'POST',
        data: payload
      })
        .then(() => {
          alert('dane zostały zapisane');
          this.resetUserInputs();
        })
        .catch(() => {
          console.log('Internal server error');
        });
    }
  };

  resetUserInputs = () => {
    this.setState({
      operationname: '',
      amount: ''
    });
  };

  onChangeHandle = () => {
    this.setState({
      category: document.getElementById('categories').value
    });
  };

  loadCategories = () => {
    let select = document.getElementById('categories');
    this.state.categories.forEach(element => {
      let newSelect = document.createElement('option');
      newSelect.name = element;
      newSelect.value = element;
      newSelect.textContent = element;
      select.appendChild(newSelect);
    });
  };

  render() {
    return (
      <div className='pageContainer'>
        <div className='statusContainer'>
          <div className='currentFinantialStatus'>
            <div className='statusDescription'>Dodaj operację</div>
          </div>

          <form onSubmit={this.submit}>
            <label> Wpisz nazwę operacji </label>
            <input
              type='text'
              name='operationname'
              placeholder='nazwa operacji'
              value={this.state.operationname}
              onChange={this.handleChange}
            />
            <label> Wpisz kwotę </label>
            <input
              type='number'
              placeholder='kwota'
              name='amount'
              value={this.state.amount}
              onChange={this.handleChange}
            />
            <label> Wybierz kategorię wydatków: </label>

            <select
              id='categories'
              name='categories'
              value={this.state.category}
              onChange={this.onChangeHandle}
            ></select>

            <label>Wybierz typ operacji:</label>
            <select
              name='operationtype'
              value={this.state.operationtype}
              onChange={this.handleChange}
            >
              <option value='wybierz'>wybierz</option>
              <option value='przychód'>przychód</option>
              <option value='wydatek'>wydatek</option>
            </select>
            <div>
              <label>Wybierz datę operacji: </label>
              <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange2}
                name='startDate'
                dateFormat='dd/MM/yyyy'
              />
            </div>
            <label>Czy operacja ma charakter comiesięczny? </label>
            <select
              name='ispernament'
              value={this.state.ispernament}
              onChange={this.handleChange}
            >
              <option value='wybierz'>wybierz</option>
              <option value='tak'>tak</option>
              <option value='nie'>nie</option>
            </select>
            <button>Dodaj</button>
          </form>
        </div>
      </div>
    );
  }
}

export default AddIncomeExpense;
