import React, { Component } from 'react'
import { Jumbotron, Button } from 'reactstrap'
import Terminal from 'terminal-in-react'

const electron = window.require('electron')

class WorkspaceConsole extends Component {
  constructor(props) {
    super(props)

    this.showMsg = this.showMsg.bind(this)
    this.quickstart = this.quickstart.bind(this)
    this.quickstop = this.quickstop.bind(this)

    this.state = {
      config: '',
      buffer: []
    }
  }

  componentDidMount() {
    this.setState({
      config: this.props.config
    })
    console.log(this.state.config.consoleBuffer)

    let self = this
  }

  showMsg() {
    console.log(this.state.config.consoleBuffer)
    return this.state.config.consoleBuffer
  }

  quickstart() {
    window.ipcRenderer.send('quickstart')
  }

  quickstop() {
    window.ipcRenderer.send('quickstop')
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
         <h1 className="display-4">Console </h1>
         <p className="lead">Status History</p>
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

export default WorkspaceConsole
