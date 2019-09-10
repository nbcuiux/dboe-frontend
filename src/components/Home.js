import React, { Component } from 'react';

class Home extends Component {
  componentDidMount() {
    // Temporarily redirect homepage to /databrowse
    this.props.history.push(`/databrowse`)
  }

  render() {
    return (
      <div className="container">
        <p>DBoE</p>
      </div>
    );
  }
}

export default Home;
