import React from 'react';
import '../styles/page.css';
import { Link } from 'react-router-dom';
import {
  categoryAddUrl,
  categoryIncomeUrl,
  categoryExpenseUrl
} from '../helper/urls';

class Category extends React.Component {
  render() {
    return (
      <div className='pageContainer'>
        <div className='statusContainer'>
          <div className='currentFinantialStatus'>
            <Link
              to={categoryAddUrl}
              className='statusDescription statusDescription--button'
            >
              Dodaj kategorię
            </Link>
            <Link
              to={categoryIncomeUrl}
              className='statusDescription statusDescription--button'
            >
              Kategorie przychodów
            </Link>

            <Link
              to={categoryExpenseUrl}
              className='statusDescription statusDescription--button'
            >
              Kategorie wydatków
            </Link>
            {/* <button className='statusDescription'>Dodaj kategorię</button> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Category;
