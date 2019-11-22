import React, { Component } from 'react'
import { Jumbotron, Form, FormGroup, Label, Input } from 'reactstrap'

import './style.css'


var remote = window.require('electron').remote

class Settings extends Component {
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
        <Jumbotron className="vertical-center" id="ma">
        <div className="container hero-container text-center">
          <h1 className="display-4">Settings </h1>
          <br/>
          <p className="lead">
          <Form id="formLeft">
            <FormGroup check inline>
              <Label check>
                <Input type="checkbox" onChange={this.handleCheckBoxChange}/> Dark Mode
                <br/>
                <Input type="checkbox" onChange={this.handleCheckBoxChange}/> Test
              </Label>
            </FormGroup>
          </Form>
          </p>
          <hr className="my-4" />
          <p className="lead mx-auto">
          </p>
        </div>
        </Jumbotron>
      </React.Fragment>
    )
  }
}
export default Settings
