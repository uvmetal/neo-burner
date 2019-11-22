import React, { Component } from 'react'
import { Jumbotron } from 'reactstrap';

import './style.css'

class New extends Component {
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
        <div className="container hero-container text-center" id="ma">
          <h1 className="display-4">New </h1>
          <p className="lead">Create a new event!</p>
          <hr className="my-4" />
          <p className="lead mx-auto">
          Generate Accounts
          Create Event
          Load Event
          </p>
        </div>
        </Jumbotron>
      </React.Fragment>
    )
  }
}
export default New
