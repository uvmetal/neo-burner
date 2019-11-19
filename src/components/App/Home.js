import React, { Component } from 'react'
import { Jumbotron } from 'reactstrap'

import './style.css'

class Home extends Component {
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
          <Jumbotron className="vertical-center">
          <div className="container hero-container text-center">
            <h1 className="display-4">Neo-Burner</h1>
            <p className="lead">Paper Wallet Event Manager</p>
            <hr className="my-4" />
            <p className="lead mx-auto">

              <p/>
            </p>
          </div>
        </Jumbotron>
        </React.Fragment>
    );
  }
}
export default Home
