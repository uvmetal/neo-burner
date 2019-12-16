import React, { Component } from 'react'
import { Jumbotron } from 'reactstrap'
import { version } from '../../../neo-paper/neo-paper.js'

// import './style.css'

import burnerLogo from '../../../images/neo-burner-burning-logo-alt-3.png'

class Admin extends Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  componentDidMount() {
  }

  render() {
    return(
      <React.Fragment id="ma">
        <Jumbotron className="vertical-center" id="ma">
        <div className="container hero-container text-center" id="ma">
          <h2 className="display-4">Admin</h2>
          <p className="lead" id="fourteenFont">Neo-Burner {version} is a paper wallet event manager.</p>
          <hr className="my-4" />
          <p className="lead mx-auto">
            <img src={burnerLogo} width="800" height="175" alt="neo-burner" className=""  />
          </p>
        </div>
        </Jumbotron>
      </React.Fragment>
    )
  }
}
export default Admin
