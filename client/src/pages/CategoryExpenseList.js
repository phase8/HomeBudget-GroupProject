import React from "react";
import "../styles/page.css";
import { Link } from "react-router-dom";
import axios from "../api/apiConfig";
import { categoryAddUrl } from "../helper/urls";

class CategoryExpenseList extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      categoryType: "EXPENSE",
      selectedCategoryId: "",
      email: localStorage.getItem("email")
    };
    this.deleteCategory = this.deleteCategory.bind(this);
  }

  getCategories = async type => {
    const query = type ? `?type=${type}` : "";

    await axios({
      url: "/categories" + query,
      method: "GET",
      params: { email: this.state.email }
    })
      .then(res => {
        this.setState({
          categories: res.data
        });
      })
      .catch(() => {
        console.log("Internal server error");
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

  async deleteCategory() {
    if (this.state.selectedCategoryId.length < 2)
      return alert("Select a category! ");
    await axios({
      url: `/categories/${this.state.selectedCategoryId}`,
      method: "DELETE"
    })
      .then(() => {
        alert("Category deleted successfully");
        this.setState({ selectedCategoryId: "" });
      })
      .catch(() => {
        console.log("Internal server error");
      });
    this.getCategories(this.state.categoryType);
  }

  render() {
    return (
      <div className="pageContainer">
        <div className="categories-container">
          <h2>Kategorie wydatków</h2>
          <ul>
            {this.state.categories.map(category => (
              <li key={category._id}>
                <button
                  className="category-button"
                  onClick={() => this.onClickHandle(category._id)}
                >
                  {category.name}
                </button>
              </li>
            ))}
            <div className="action-buttons">
              <button className="category-button-action">
                <Link to={categoryAddUrl}>Dodaj kategorię</Link>
              </button>
              <button
                className="category-button-action"
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
