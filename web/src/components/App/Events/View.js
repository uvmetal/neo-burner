import React, { Component } from 'react'
import { Jumbotron } from 'reactstrap'
import { version } from '../../../neo-paper/neo-paper.js'

// import './style.css'
import util from 'util'

import burnerLogo from '../../../images/neo-burner-burning-logo-alt-3.png'

class View extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: this.props.location.state.data
    }
  }

  componentDidMount() {
    console.log('props: '+util.inspect(this.props, {depth: null}))
    console.log('state: '+util.inspect(this.state, {depth: null}))
  }

  render() {

    return(
      <React.Fragment id="ma">
        <Jumbotron className="vertical-center" id="ma">
        <div className="container hero-container text-center" id="ma">
          <h2 className="display-4">View Event</h2>
          <p className="lead" id="fourteenFont">Add, remove, view, and edit events.</p>
          <hr className="my-4" />
          <p className="lead mx-auto">
          </p>
          {this.state.data.name}<br/>
          {this.state.data.url}<br/>
        </div>
        </Jumbotron>
      </React.Fragment>
    )
  }
}
export default View
