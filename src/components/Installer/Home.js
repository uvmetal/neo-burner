import React, { Component } from 'react'
import { Jumbotron, Button } from 'reactstrap'

import util from 'util'

import '../../style.css'

import cozLogo from '../../images/coz-inverted.svg'
import neoOneLogo from '../../images/neo-one.png'

class InstallerHome extends Component {
  constructor(props) {
    super(props)

    this.lift = this.lift.bind(this)
    this.lower = this.lower.bind(this)

    this.state = {
    }
  }

  lift() {
    window.ipcRenderer.send('start-server')
  }

  lower() {
    window.ipcRenderer.send('stop-server')
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
        <Jumbotron className="vertical-center">
        <div className="container hero-container text-center">
          <h1 className="display-4">Installation </h1>
          <p className="lead">Welcome, please configure</p>
          <hr className="my-4" />
          <p className="lead mx-auto">
          </p>
          <Button size="sm" onClick={this.lift} >Start Sails</Button>
          <Button size="sm" onClick={this.lower} >Stop Sails</Button>
        </div>
        </Jumbotron>
        <img src={neoOneLogo} className="img-fluid mx-auto d-block" alt="Neo One" />
        <div className="footer coz-medium pt-1">
          <img src={cozLogo} width="276" height="50" alt="City of Zion" className="img-fluid mx-auto d-block" />
        </div>
      </React.Fragment>
    )
  }
}
export default InstallerHome
