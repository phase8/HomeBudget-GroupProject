import React from "react";
import { Link } from 'react-router-dom';

class Signup extends React.Component {
  render() {
    return (<div>Rejestracja
        <Link to="/">
            <button variant="outlined">
                Powrot
            </button>
        </Link>
    </div>
    )}
}

export default Signup;
