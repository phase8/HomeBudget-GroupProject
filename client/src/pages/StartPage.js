import React from "react";
import { Link } from 'react-router-dom';

class StartPage extends React.Component {
  render() {
    return (<div>Do dziela<br/>
        <Link to="/signup">
            <button variant="outlined">
                Sign up
            </button>
        </Link>
    </div>
    )}
}

export default StartPage;

