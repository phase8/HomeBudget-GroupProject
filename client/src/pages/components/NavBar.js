import React from "react";
import { Link } from "react-router-dom";
import { checkActiveUrl, logout } from "../../helper/tools";
import {
  userName,
  welcomepageUrl,
  categoryUrl,
  historyUrl,
  goalsUrl,
  accountManagementUrl
} from "../../helper/urls";

class NavBar extends React.Component {
  render() {
    return (
      <header>
        <div className="ui large secondary inverted pointing menu blue">
          <div className="toc item">
            <i className="chart line icon large"></i>
          </div>
          <Link
            to={welcomepageUrl}
            className={`${checkActiveUrl(welcomepageUrl)} item`}
          >
            Home
          </Link>
          <Link
            to={categoryUrl}
            className={`${checkActiveUrl(categoryUrl)} item`}
          >
            Category
          </Link>
          <Link
            to={historyUrl}
            className={`${checkActiveUrl(historyUrl)} item`}
          >
            History
          </Link>
          <Link to={goalsUrl} className={`${checkActiveUrl(goalsUrl)} item`}>
            Goals
          </Link>
          <div className="right item">
            <div className="column">
              <Link
                to={accountManagementUrl}
                className={`${checkActiveUrl(
                  accountManagementUrl
                )} ui button teal`}
              >
                {userName}
              </Link>
            </div>
            <Link to="/" onClick={logout} className="ui inverted red button ">
              Log out
            </Link>
          </div>
        </div>
      </header>
    );
  }
}

export default NavBar;
