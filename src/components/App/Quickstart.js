import React, { Component } from 'react'
import { Jumbotron, Button } from 'reactstrap'

import './style.css'

import cozLogo from '../../images/coz-inverted.svg'
import neoOneLogo from '../../images/neo-one.png'

// TODO Add flag to exclude/include neotracker from startup sequence

class Quickstart extends Component {
  constructor(props) {
    super(props)

    this.quickstart = this.quickstart.bind(this)
    this.quickstop = this.quickstop.bind(this)

    this.state = {
      config: ''
    }
  }

  quickstart() {
    window.ipcRenderer.send('quickstart')
  }

  quickstop() {
    window.ipcRenderer.send('quickstop')
  }

  componentDidMount() {
    this.setState({
      config: this.props.config
    })
    console.log(this.state.config.consoleBuffer)
  }

  render() {
    let history
    if (this.state.config.consoleBuffer && this.state.config.consoleBuffer.length) {
      history = this.state.config.consoleBuffer.map(function(msg){
        return <p>{msg}</p>
      })
    }
    return(
      <React.Fragment>
        <Jumbotron className="vertical-center">
        <div className="container hero-container text-center">
          <h1 className="display-4">Quickstart </h1>
          <p className="lead">Quickstart a New Neo One Network</p>
          <hr className="my-4" />
          <p className="lead mx-auto">
          </p>
          <Button size="sm" onClick={this.quickstart} >Quickstart</Button>
          <Button size="sm" onClick={this.quickstop} >Stop</Button>
        </div>
        </Jumbotron>
        <div>
        {history}
        </div>
      </React.Fragment>
    )
  }
}
export default Quickstart
