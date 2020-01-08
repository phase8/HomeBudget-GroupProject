import React from 'react';
import '../styles/page.css';
import { Link } from 'react-router-dom';
import axios from '../api/apiConfig';
import '../styles/page.css';

const categoryTypes = {
  INCOME: 'INCOME',
  EXPENSE: 'EXPENSE'
};

class CategoryAdd extends React.Component {
  state = {
    name: '',
    type: categoryTypes.INCOME
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.name === '' || this.state.type === '') {
      alert('Wypełnij wszystkie pola.');
      return;
    }

    const payload = {
      name: this.state.name,
      type: this.state.type
    };

    axios({
      url: '/categories',
      method: 'POST',
      data: payload
    })
      .then(() => {
        console.log('Data has been sent to the server');
      })
      .catch(() => {
        console.log('Internal server error');
      });
  };

  render() {
    return (
      <div className='pageContainer'>
        <div className='statusContainer'>
          <div className='currentFinantialStatus'>
            <form onSubmit={this.handleSubmit} className=''>
              <div className='form-input category-input'>
                <input
                  type='text'
                  name='name'
                  placeholder='Nazwa kategorii'
                  value={this.state.title}
                  onChange={this.handleChange}
                />
              </div>
              <div className='form-input' className='category-input'>
                <select
                  name='type'
                  value={this.state.type}
                  onChange={this.handleChange}
                >
                  <option value={categoryTypes.INCOME}>Przychód</option>
                  <option value={categoryTypes.EXPENSE}>Wydatek</option>
                </select>
              </div>
              <button type='submit' className='form-input category-input'>
                Dodaj kategorię
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CategoryAdd;
