import React, { Component } from 'react'
import { Jumbotron, Form, FormGroup, Label, Input } from 'reactstrap';

import '../style.css'

import cozLogo from '../../../images/coz-inverted.svg'
import neoOneLogo from '../../../images/neo-one.png'

var remote = window.require('electron').remote

class SettingsServer extends Component {
  constructor(props) {
    super(props);

    this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this)


    this.state = {
    }
  }

  handleCheckBoxChange(event) {
    window.ipcRenderer.send('use-sails', event.target.checked)

    remote.getGlobal('serverConfig').useSails = event.target.checked
    console.log('useSails set to : '+remote.getGlobal('serverConfig').useSails)
  }

  componentDidMount() {
  }

  render() {
    return(
      <React.Fragment>
        <Jumbotron className="vertical-center">
        <div className="container hero-container text-center">
          <h1 className="display-4">Server Settings </h1>
          <p className="lead">
          <Form>
            <FormGroup check inline>
              <Label check>
                <Input type="checkbox" onChange={this.handleCheckBoxChange}/> Use Sails.js (not fully implemented)
                <Input type="checkbox" onChange={this.handleCheckBoxChange}/> Allow Multiple Server Instances (placeholder)
              </Label>
            </FormGroup>
          </Form>
          </p>
          <hr className="my-4" />
          <p className="lead mx-auto">
          </p>
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
export default SettingsServer
