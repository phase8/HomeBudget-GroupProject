import React from 'react';
import '../styles/page.css';
import { Link } from 'react-router-dom';
import axios from '../api/apiConfig';
import { categoryAddUrl } from '../helper/urls';

class CategoryExpenseList extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      categoryType: 'EXPENSE',
      selectedCategoryId: ''
    };
  }

  getCategories = type => {
    const query = type ? `?type=${type}` : '';

    axios({
      url: '/categories' + query,
      method: 'GET'
    })
      .then(res => {
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

  onClickHandle(categoryId) {
    this.setState({
      selectedCategoryId: categoryId
    });
  }

  deleteCategory() {
    axios({
      url: '/categories/',
      data: {
        _id: this.state.selectedCategoryId // produces Cannot read property 'state' of undefined
      },
      method: 'DELETE'
    })
      .then(() => {
        console.log('Category deleted successfully');
      })
      .catch(() => {
        console.log('Internal server error');
      });
  }

  render() {
    return (
      <div className='pageContainer'>
        <div className='categories-container'>
          <h2>Kategorie wydatków</h2>
          <ul>
            {this.state.categories.map(category => (
              <li key={category._id}>
                <button
                  className='category-button'
                  onClick={() => this.onClickHandle(category._id)}
                >
                  {category.name}
                </button>
              </li>
            ))}
            <div className='action-buttons'>
              <button className='category-button-action'>
                <Link to={categoryAddUrl}>Dodaj kategorię</Link>
              </button>
              <button
                className='category-button-action'
                onClick={this.deleteCategory}
              >
                Usuń kategorię
              </button>
            </div>
          </ul>
        </div>
      </div>
    );
  }
}

export default CategoryExpenseList;
