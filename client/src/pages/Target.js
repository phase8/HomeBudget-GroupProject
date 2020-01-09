import React from "react";
import axios from "axios";
import "../styles/page.css";
class Target extends React.Component {
  state = {
    title: "",
    body: "",
    posts: [],
    total: 0
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  submit = event => {
    event.preventDefault();
    if (this.state.title === "" || this.state.body === "") {
      alert("Wypełnij wszystkie pola.");
    } else {
      const payload = {
        title: this.state.title,
        body: this.state.body
      };

      axios({
        url: "http://localhost:3001/api/OperationsAndGoals/savetarget",
        method: "POST",
        data: payload
      })
        .then(() => {
          console.log("Data has been sent to the server");
          this.resetUserInputs();
          this.getBlogPost();
        })
        .catch(() => {
          console.log("Internal server error");
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
      .get("http://localhost:3001/api/OperationsAndGoals/getblogpost")
      .then(response => {
        const data = response.data;
        this.setState({ posts: data });
        console.log("Data has been received!!");
      })
      .catch(() => {
        alert("błąd przy pobraniu danych");
      });
  };

  displayBlogPost = posts => {
    if (!posts.length) return null;

    return posts.map((post, index) => (
      <div key={index} className="blog-post__display">
        <h3>{post.title}</h3>
        <p>{post.body} zł</p>
        <p>
          Do realizacji celu pozostało:{" "}
          {post.body - this.state.total < 0 ? 0 : post.body - this.state.total}{" "}
          zł{" "}
        </p>

        <button onClick={this.handleRemove.bind(this, post._id)}>
          Usuń cel
        </button>
      </div>
    ));
  };

  getTotal = () => {
    axios
      .get("http://localhost:3001/api/OperationsAndGoals/total")
      .then(response => {
        const data = response.data;
        console.log(data);
        this.setState({ total: data[0].total });
        console.log("Data has been received!!");
      })
      .catch(() => {
        alert("błąd pobierania danych");
      });
  };

  handleRemove = id => {
    axios
      .delete("http://localhost:3001/api/OperationsAndGoals/removetarget", {
        data: { id: id }
      })
      .then(response => {
        console.log(response.data);
      });

    setTimeout(function() {
      window.location.reload();
    }, 1000);
  };

  render() {
    console.log("State: ", this.state);
    return (
      <div className="pageContainer">
        <div className="statusContainer">
          <div className="currentFinantialStatus">
            <div className="statusDescription">Dodaj cel finansowy</div>
          </div>

          <div>
            <form onSubmit={this.submit}>
              <div className="form-input">
                <input
                  type="text"
                  name="title"
                  placeholder="nazwa celu"
                  value={this.state.title}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-input">
                <input
                  type="number"
                  placeholder="kwota"
                  name="body"
                  value={this.state.body}
                  onChange={this.handleChange}
                />
              </div>

              <button className="form-input"> Dodaj</button>
            </form>

            <h2>Twoje cele:</h2>
            <div className="blog-">
              {this.displayBlogPost(this.state.posts)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Target;
