import React, { Component } from 'react'
import { Jumbotron } from 'reactstrap'

import './style.css'

import cozLogo from '../../images/coz-inverted.svg'
// import eventLogo from '../../images/eventLogo.png'

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  componentDidMount() {
  }

  render() {
    // <img src={eventLogo} className="img-fluid mx-auto d-block" alt="Event" />

    return(
        <React.Fragment>
          <Jumbotron className="vertical-center">
          <div className="container hero-container text-center">
            <h1 className="display-4">Home</h1>
            <p className="lead">A burner wallet for the Neo Smart Economy</p>
            <hr className="my-4" />
            <p className="lead mx-auto">

              <p/>
            </p>
          </div>
        </Jumbotron>
        <div className="footer coz-medium pt-1">
        <img src={cozLogo} width="276" height="50" alt="City of Zion" className="img-fluid mx-auto d-block" />
        </div>
        </React.Fragment>
    );
  }
}
export default Home
