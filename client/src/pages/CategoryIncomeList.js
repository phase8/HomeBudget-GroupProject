import React from 'react';
import '../styles/page.css';
import { Link } from 'react-router-dom';

class CategoryIncomeList extends React.Component {
  render() {
    return (
      <div className='pageContainer'>
        <div className='statusContainer'>
          <div className='currentFinantialStatus'></div>
        </div>
      </div>
    );
  }
}

export default CategoryIncomeList;
