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
      selectedCategoryId: '',
      selectedCategoryName: ''
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

  onClickHandle(categoryId, categoryName) {
    this.setState({
      selectedCategoryId: categoryId,
      selectedCategoryName: categoryName
    });
  }

  deleteCategory = () => {
    axios({
      url: `/categories/${this.state.selectedCategoryId}`, // produces Cannot read property 'state' of undefined
      method: 'DELETE'
    })
      .then(() => {
        this.setState(
          (this.state.categories = this.state.categories.filter(
            category => category.name !== this.state.selectedCategoryName
          ))
        );
        console.log(this.state.selectedCategoryName);
        console.log(this.state.categories);
      })
      .catch(() => {
        alert('To delete category first click on it');
      });
  };

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
                  onClick={() =>
                    this.onClickHandle(category._id, category.name)
                  }
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
