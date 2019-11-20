import React, { Component } from 'react'
import { Jumbotron } from 'reactstrap'

import './style.css'

import cozLogo from '../../images/coz-inverted.svg'
import neoOneLogo from '../../images/neo-one.png'
import burnerLogo from '../../images/neo-burner-burning-logo-alt-3.png'

class About extends Component {
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
          <h1 className="display-4">About Neo-Burner </h1>
          <p className="lead">Neo-Burner is a paper wallet event generator.</p>
          <hr className="my-4" />
          <p className="lead mx-auto">
            <img src={burnerLogo} width="800" height="300" alt="neo-burner" className=""  />
          </p>
        </div>
        </Jumbotron>
      </React.Fragment>
    )
  }
}
export default About
