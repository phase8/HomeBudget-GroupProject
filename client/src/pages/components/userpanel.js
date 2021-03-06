import React from "react";
import { Link } from "react-router-dom";
import { AddIncomeExpenseUrl, goalsUrl } from "../../helper/urls";
import { checkActiveUrl } from "../../helper/tools";

class Userpanel extends React.Component {
  render() {
    return (
      <div className="pageContainer">
        <div className="dataContainer">
          <div className="statusContainer">
            <div className="currentFinantialStatus">
              <div className="statusDescription">Twoje obecne środki:</div>
              <div className="cashAmount"></div>
            </div>
            <div className="controlBox">
              <Link
                to={goalsUrl}
                className={`${checkActiveUrl(goalsUrl)} addGoal `}
              >
                Dodaj cel
              </Link>
              <Link
                to={AddIncomeExpenseUrl}
                className={`${checkActiveUrl(AddIncomeExpenseUrl)} addCash `}
              >
                Dodaj przychód lub wydatek
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Userpanel;
