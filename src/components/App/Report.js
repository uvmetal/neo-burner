import React, { Component } from 'react'
import { Jumbotron } from 'reactstrap';
//
// import './style.css'

class Report extends Component {
  constructor(props) {
    super(props)

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
          <h2 className="display-4">Report </h2>
          <p className="lead" id="fourteenFont">Generate reports on your events!</p>
          <hr className="my-4" />
          <p className="lead mx-auto">

          </p>
        </div>
        </Jumbotron>
      </React.Fragment>
    )
  }
}

export default Report
