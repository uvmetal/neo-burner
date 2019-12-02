import React, { Component } from 'react'
import { Jumbotron, Form, FormGroup, Label, Input } from 'reactstrap'

// import './style-light.css'

// let style

// var remote = window.require('electron').remote

class Settings extends Component {
  constructor(props) {
    super(props);

    this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this)
    this.changeMode = this.changeMode.bind(this)

    this.state = {
    }
  }

  handleCheckBoxChange(event) {

    // window.ipcRenderer.send('use-sails', event.target.checked)
    //
    // remote.getGlobal('serverConfig').useSails = event.target.checked
    // console.log('useSails set to : '+remote.getGlobal('serverConfig').useSails)
  }

  componentWillMount() {
    // if (this.props.darkMode) {
    //   console.log('going dark')
    //   require('./style.css')
    // } else {
    //   require('./style-light.css')
    // }
  }

  changeMode() {
    if (this.props.darkMode) {
      // style = {
      //   body: {
      //     /* display: flex; */
      //     /* flex-direction: column; */
      //     /* min-height: 100vh; */
      //     /* height: 100%; */
      //     /* width: 100%; */
      //     'background-color': 'black'
      //   },
      //   ma: {
      //     'background-color': 'black',
      //     color: 'white'
      //   },
      //   formLeft: {
      //       'text-align': 'left',
      //       'padding-left': '35%'
      //   },
      //   accountsFormLeft: {
      //       'text-align': 'left',
      //       'padding-left': '40%'
      //   },
      //   accountsTextArea: {
      //       height: '200px',
      //       'max-height': '200px',
      //       'font-size': '10px'
      //   }
      // }

      return 'checked'
    } else {
      // style = {
      //   body: {
      //     /* display: flex; */
      //     /* flex-direction: column; */
      //     /* min-height: 100vh; */
      //     /* height: 100%; */
      //     /* width: 100%; */
      //     'background-color': 'white'
      //   },
      //   ma: {
      //     'background-color': 'white',
      //     color: 'black'
      //   },
      //   formLeft: {
      //       'text-align': 'left',
      //       'padding-left': '35%'
      //   },
      //   accountsFormLeft: {
      //       'text-align': 'left',
      //       'padding-left': '40%'
      //   },
      //   accountsTextArea: {
      //       height: '200px',
      //       'max-height': '200px',
      //       'font-size': '10px'
      //   }
      // }
      return ''
    }
  }

  render() {
    return(
      <React.Fragment>
        <Jumbotron className="vertical-center" id="ma">
        <div className="container hero-container text-center">
          <h2 className="display-4">Settings </h2>
          <br/>
          <p className="lead">
          <Form id="formLeft">
            <FormGroup check inline>
              <Label check>
                <Input type="checkbox" onChange={this.props.setDarkMode} checked={this.changeMode()} id="fourteenFont"/> Dark Mode
                <br/>
                <Input type="checkbox" onChange={this.handleCheckBoxChange} id="fourteenFont"/> Test
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
