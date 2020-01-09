import React from 'react';
import '../styles/page.css';
import { Link } from 'react-router-dom';
import axios from '../api/apiConfig';

class CategoryExpenseList extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      categoryType: 'EXPENSE'
    };
  }

  getCategories = type => {
    const query = type ? `?type=${type}` : '';

    axios({
      url: '/categories' + query,
      method: 'GET'
    })
      .then(res => {
        console.log(res);
        this.setState({
          categories: res.data
        });
      })
      .catch(() => {
        console.log('Internal server error');
      });
  };

  componentDidMount() {
    this.getCategories(this.state.categoryType);
  }

  render() {
    return (
      <div className='pageContainer'>
        <div className='statusContainer'>
          <div className='currentFinantialStatus'>
            <ul>
              {this.state.categories.map(category => (
                <li key={category._id}>{category.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default CategoryExpenseList;
