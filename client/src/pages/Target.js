import React from "react";
import axios from "axios";
import "../styles/page.css";

class Target extends React.Component {
  state = {
    title: "",
    body: 0,
    posts: [],
    plus: 0,
    minus: 0,
    email: localStorage.getItem("email")
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  submit = event => {
    event.preventDefault();

    if (this.state.body < 0) {
      alert("kwota nie może być ujemna");
    }
    if (this.state.title === "" || this.state.body === "") {
      alert("Wypełnij wszystkie pola.");
    } else {
      const payload = {
        title: this.state.title,
        body: this.state.body,
        userid: this.state.email
      };
      axios({
        url: "http://localhost:3001/api/OperationsAndGoals/savetarget",
        method: "POST",
        data: payload
      }).then(() => {
        this.resetUserInputs();
        this.getBlogPost();
        this.getTotal();
        alert("Dane zostały zapisane.");
      });
    }
  };

  resetUserInputs = () => {
    this.setState({
      title: "",
      body: ""
    });
  };

  componentDidMount = () => {
    this.getBlogPost();
    this.getTotal();
  };

  getBlogPost = () => {
    axios
      .get("http://localhost:3001/api/OperationsAndGoals/getblogpost", {
        params: { email: this.state.email }
      })
      .then(response => {
        const data = response.data;
        this.setState({ posts: data });
      })
      .catch(() => {
        alert("błąd przy pobraniu danych");
      });
  };
  displayBlogPost = posts => {
    if (!posts.length) return null;
    let balance = this.state.plus - this.state.minus;

    return posts.map((post, index) => (
      <div key={index} className="target-display-one">
        <div className="target-title-one">{post.title}</div>
        <p className="target-amount-one">{post.body} zł</p>
        <p className="target-how-much-one">
          Do realizacji celu pozostało: {this.checkMoney(post.body, balance)} zł{" "}
        </p>
        <button
          className="target-remove-button"
          onClick={this.handleRemove.bind(this, post._id)}
        >
          Usuń cel
        </button>
      </div>
    ));
  };

  getTotal = () => {
    axios
      .get("http://localhost:3001/api/OperationsAndGoals/getBalancePlus", {
        params: { email: this.state.email }
      })
      .then(response => {
        const data = response.data;
        var plus1 = data.reduce(function(prev, cur) {
          return prev + cur.amount;
        }, 0);
        this.setState({ plus: plus1 });
      })
      .catch(() => {
        alert("błąd pobierania danych");
      });
    axios
      .get("http://localhost:3001/api/OperationsAndGoals/getBalanceMinus", {
        params: { email: this.state.email }
      })
      .then(response => {
        const data = response.data;
        var minus1 = data.reduce(function(prev, cur) {
          return prev + cur.amount;
        }, 0);
        this.setState({ minus: minus1 });
      })
      .catch(() => {
        alert("błąd pobierania danych");
      });
  };

  checkMoney = (post, balance) => {
    if (balance === 0) {
      return post;
    } else if (post === 0) {
      return 0;
    } else if (balance < 0) {
      return Math.abs(balance) + post;
    } else if ((balance > 0) & (post < balance)) {
      return 0;
    } else {
      return post - balance;
    }
  };

  handleRemove = id => {
    axios.delete("http://localhost:3001/api/OperationsAndGoals/removetarget", {
      data: { id: id }
    });
    setTimeout(function() {
      window.location.reload();
    }, 1000);
  };
  render() {
    return (
      <div className="target-pageContainer">
        <div className="target-mainbox">
          <div className="target-title-container">
            <div className="target-box">
              <div className="target-title">Dodaj cel finansowy</div>
            </div>
          </div>
          <div className="target-form-container">
            <form className="target-form" onSubmit={this.submit}>
              <div className="target-inputbox">
                <input
                  className="target-form-input"
                  type="text"
                  name="title"
                  placeholder="nazwa celu"
                  value={this.state.title}
                  onChange={this.handleChange}
                />
              </div>
              <div className="target-inputbox">
                <input
                  className="target-form-input"
                  type="number"
                  placeholder="kwota"
                  name="body"
                  value={this.state.body}
                  onChange={this.handleChange}
                />
              </div>
              <button className="target-add-button"> Dodaj</button>
            </form>
          </div>
        </div>
        <div>
          <div className="target-display-maincontainer">
            <div className="target-display-title">Twoje cele:</div>
            <div className="target-display-box">
              {this.displayBlogPost(this.state.posts)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Target;
