import React, { Component } from 'react'
import { Jumbotron, Container, Form, FormGroup, Button, ButtonGroup, Input  } from 'reactstrap'
// import AdminModalButton from '../../Ui/Modal/AdminModal'
import FlashModal from '../../Ui/Modal/FlashModal'
import * as web from '../../../httpHelpers'

import { version } from '../../../neo-paper/neo-paper.js'
// import './style.css'

class SignUp extends Component {
  constructor(props) {
    super(props)

    this.submit = this.submit.bind(this)

    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      showModal: false,
      modalTitle: '',
      modalBody: ''
    }
  }

  async submit(){
    console.log('submit', this.state)

    if (this.state.password !== this.state.confirmPassword) {
      this.setState({ showModal: true, modalTitle: 'Passwords do not match.', modalBody: 'Please try again.' })
      return
    }
    if (!this.state.password || !this.state.confirmPassword) {
      this.setState({ showModal: true, modalTitle: 'Please supply passwords.', modalBody: 'Please try again.' })
      return
    }
    if (!this.state.fullName) {
      this.setState({ showModal: true, modalTitle: 'Please supply a a full name.', modalBody: 'Please try again.' })
      return
    }
    if (!this.state.email) {
      this.setState({ showModal: true, modalTitle: 'Please supply an email.', modalBody: 'Please try again.' })
      return
    }

    console.log('submit validation passed')

    let self = this

    web.post('/api/v1/entrance/signup', {emailAddress: this.state.email, password: this.state.password, fullName: this.state.fullName}).then(function(response) {
      // if session is valid
      console.log('signUp success', response)
      // user.redeemAccount = {...response.data}
      // console.log('user.redeemAccount: ', user.redeemAccount)

      // user.loggedIn = true
      // user.admin = true
      // else false and return

      // Look up account by recovering address from WIF, bip seed, or private key.

      // Find correct event by looking through database for an account linked to an events

      // Check if this account has already been redeemed. If it has been redeemed, flash a message and end the session.

      let user = {
        admin: false,
        email: self.state.email,
        name: self.state.fullName,
        loggedIn: true
      }

      // update user with the data from sails
      self.props.updateUser(user)
      // this.props.history.push(this.props.location.referrer)

      self.props.history.push('/Home')
    }).catch(function(error, response) {
      console.log('signUp error', error, response)
      // let message = 'No account found for this data. Please ensure you input is correct and try again.'
      // self.props.history.push({pathname: '/Admin', message: message, title: 'Admin Login Failure', buttonLabel: 'Try Again', buttonAction: () => self.props.history.push('/Admin')})
      // self.props.history.push('/Redeem')
      self.setState({ showModal: true, modalTitle: 'Sign Up Failed.', modalBody: 'The email address is already in use. Please choose another.' })
    })
  }

  componentDidMount() {
  }

  render() {
    return(
      <React.Fragment id="ma">
        <Jumbotron className="vertical-center" id="ma">
        <div className="container hero-container text-center" id="ma">
          <h2 className="display-4">Sign Up</h2>
          <p className="lead" id="fourteenFont">Neo-Burner {version} Admin Sign Up</p>
          <hr className="my-4" />
          <p className="lead mx-auto">
          </p>
          <Container className="p-5">
            <Form id="accountsFormLeft">
              <FormGroup id="fourteenFont">
              <Input
                style={{width: "200px"}}
                type="text"
                name="text"
                placeholder="Email"
                value={this.state.email}
                onChange={e => this.setState({ email: e.target.value })}
                id="fourteenFont"
                />
              <Input
                style={{width: "200px"}}
                type="password"
                name="text"
                placeholder="Password"
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
                id="fourteenFont"
                />
              <Input
                style={{width: "200px"}}
                type="password"
                name="text"
                placeholder="Confirm Password"
                value={this.state.confirmPassword}
                onChange={e => this.setState({ confirmPassword: e.target.value })}
                id="fourteenFont"
                />
              <Input
                style={{width: "200px"}}
                type="text"
                name="text"
                placeholder="Full Name"
                value={this.state.fullName}
                onChange={e => this.setState({ fullName: e.target.value })}
                id="fourteenFont"
                />
                <ButtonGroup>
                  <Button color={'warning'} onClick={() => this.submit()} id="fourteenFont" key='2'>Submit</Button>
                  <Button color={'warning'} onClick={() => this.props.history.push('/Admin')} id="fourteenFont" key='2'>Cancel</Button>
                </ButtonGroup>
                { this.state.showModal ? <FlashModal title={this.state.modalTitle} body={this.state.modalBody} okayButtonText={'Okay'} buttonAction={() => this.setState({ showModal: false})} id='fourteenFont' /> : ''}
              </FormGroup>
            </Form>
          </Container>
        </div>
        </Jumbotron>
      </React.Fragment>
    )
  }
}
export default SignUp
