import React, { Component } from 'react'
import { Jumbotron } from 'reactstrap'

import burnerLogo from '../../images/neo-burner-burning-logo-alt-3.png'
import uvmetalFace from '../../images/uvmetal-tongue.png'


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
          <Jumbotron className="vertical-center" id="ma">
          <div className="container hero-container text-center" id="ma">
            <img src={burnerLogo} width="800" height="175" alt="neo-burner" className=""  />
            <br/>
            <img src={uvmetalFace} width="205" height="205" alt="neo-burner" className=""  />

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
