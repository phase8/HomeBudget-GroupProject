import React from "react";
import { Redirect } from "react-router";

class PageNotFound extends React.Component {
  constructor(props) {
    super(props);
    this.state = { redirect: false };
    this.timeout = this.timer();
  }

  timer = () =>
    setTimeout(() => {
      this.setState({ redirect: true });
    }, 1500);

  componentWillUnmount = () => {
    clearTimeout(this.timeout);
  };

  render() {
    if (this.state.redirect === true) return <Redirect to="/" />;
    return (
      <div className="ui container middle aligned center aligned grid">
        <div className="ui negative message">
          <h1 className="ui dividing header">404 Page not found</h1>
          <p>Rewind and try another one</p>
        </div>
      </div>
    );
  }
}

export default PageNotFound;
