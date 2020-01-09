import React from "react";
import "../styles/page.css";
import axios from "axios";

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      operationname: "",
      amount: "",
      category: "",
      operationtype: "",
      startDate: new Date(),
      ispernament: "",
      categories: []
    };
  }

  getExpenses = () => {
    axios
      .get("http://localhost:3001/api/History/get")
      .then(response => {
        const data = response.data;
        this.setState({ posts: data });
        console.log("Zassało się");
        console.log(data);
      })
      .catch(() => {
        console.error("I dupa");
      });
  };

  componentDidMount = () => {
    this.getExpenses();
  };

  render() {
    return <div className="pageContainer">alamakota</div>;
  }
}

export default History;
