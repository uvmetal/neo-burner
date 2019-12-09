import React, { Component } from 'react'
import { Jumbotron, Button } from 'reactstrap'

import util from 'util'

import './style.css'

import burnerLogo from '../../images/neo-burner-burning-logo-alt-3.png'
import uvmetalFace from '../../images/uvmetal-tongue.png'

class InstallerHome extends Component {
  constructor(props) {
    super(props)

    this.lift = this.lift.bind(this)
    this.lower = this.lower.bind(this)

    this.state = {
    }
  }

  lift() {
    window.ipcRenderer.send('startServer')
  }

  lower() {
    window.ipcRenderer.send('stopServer')
  }

  componentDidMount() {
    if (this.props.config) {
      console.log('System directory configuration: ')
      console.log(this.props.config)
    }

    // receive ipc when sails loads then fetch the page to show in this window
    fetch(`http://localhost:1337`)
      .then((response) => {
        console.log('sails response: '+ util.inspect(response, {depth: null}))
      })
  }

  render() {
    return(
      <React.Fragment>
        <Jumbotron className="vertical-center" id="ma" style={this.props.style}>
        <div className="container hero-container text-center" id="ma">
          <img src={burnerLogo} width="800" height="175" alt="neo-burner" className=""  />
          <br/>
          <img src={uvmetalFace} width="205" height="205" alt="neo-burner" className=""  />
          <p className="lead">Installation</p>
          <p className="lead mx-auto">
          <Button onClick={this.letsBurn} color="warning" >Let's Burn!</Button>
          </p>
        </div>
      </Jumbotron>
      </React.Fragment>

    )
  }
}
export default InstallerHome
