import React, { Component } from 'react'
import { Jumbotron } from 'reactstrap';

import './style.css'

class Export extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  componentDidMount() {
  }

  render() {
    return(
      <React.Fragment>
        <Jumbotron className="vertical-center" id="ma">
        <div className="container hero-container text-center">
          <h1 className="display-4">Export </h1>
          <p className="lead">Export your data so you can use it somewhere else!</p>
          <hr className="my-4" />
          <p className="lead mx-auto">
          </p>
        </div>
        </Jumbotron>
      </React.Fragment>
    )
  }
}
export default Export
