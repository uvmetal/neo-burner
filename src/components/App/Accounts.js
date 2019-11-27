import React, { Component } from 'react'
import { Jumbotron, Container, Button, Form, FormGroup, Input } from 'reactstrap'
import { generateAccounts } from '../../neo-paper/accounts.js'


import util from 'util'

import './style.css'

class Accounts extends Component {
  constructor(props) {
    super(props)

    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.renderGenerateAccounts = this.renderGenerateAccounts.bind(this)
    this.createWallet = this.createWallet.bind(this)
    this.state = {
      amount: '',
      name: '',
      url: ''
    }
  }

  componentDidMount() {
  }

  onFormSubmit(e) {
    this.setState({ amount: e.target.value })
    console.log('Generating: '+this.state.amount)
    console.log('Name: '+this.state.name)
    console.log('URL: '+this.state.url)
    let accounts = generateAccounts(this.state.amount, this.state.name, this.state.url)
    // alert('Generated '+this.state.amount+' accounts: '+JSON.stringify(this.state, null, '  '))
    this.props.setAccounts(accounts)
  }

  createWallet() {
    this.props.history.push('Wallets')
  }

  renderGenerateAccounts() {
    return(
      <React.Fragment>
        <Jumbotron className="vertical-center" id="ma">
        <div className="container hero-container text-center" id="ma">
          <h1 className="display-4">Accounts </h1>
          <p className="lead">There are no accounts. Would you like to generate some?</p>
          <p className="lead mx-auto">
          <Container className="p-5">
             <Form id="accountsFormLeft">
               <FormGroup>
                 <Input
                   style={{width: "400px"}}
                   type="text"
                   name="text"
                   placeholder="Event Name"
                   value={this.state.name}
                   onChange={e => this.setState({ name: e.target.value })}
                 />
                 <Input
                   style={{width: "400px"}}
                   type="text"
                   name="text"
                   placeholder="Event URL"
                   value={this.state.url}
                   onChange={e => this.setState({ url: e.target.value })}
                 />
                 <Input
                   style={{width: "200px"}}
                   type="text"
                   name="text"
                   placeholder="How many accounts?"
                   value={this.state.amount}
                   onChange={e => this.setState({ amount: e.target.value })}
                 />
               </FormGroup>
               <Button onClick={e => this.onFormSubmit(e)} color="warning">Generate</Button>
             </Form>
             <br/>
           </Container>
          </p>
        </div>
        </Jumbotron>
      </React.Fragment>
    )
  }

  render() {
    if (!this.props.accounts.length) {
      return(this.renderGenerateAccounts())
    } else {
      return(
        <React.Fragment>
          <Jumbotron className="vertical-center" id="ma">
          <div className="container hero-container text-center" id="ma">
            <h1 className="display-4">Accounts </h1>
            <p className="lead">There are {this.props.accounts.length} accounts.</p>
            <p className="lead mx-auto">
            <Container className="p-5">
               <textarea
                id="accountsTextArea"
                disabled
                cols="100"
                rows="40"
                name="accounts"
                value={util.inspect(this.props.accounts, {depth:null})}/>
                <br/>
                <Button onClick={this.props.clearAccounts} color="warning" >Clear</Button>{' '}
                <Button onClick={this.createWallet} color="warning" >Create Wallet</Button>
             </Container>
            </p>
          </div>
          </Jumbotron>
        </React.Fragment>
      )
    }
  }
}
export default Accounts
