import React, { Component } from 'react'
import { NavLink as RRNavLink } from 'react-router-dom'
import { Jumbotron, Container, Col, Button, Form, FormGroup, Label, Input, FormText, Nav, NavItem, NavLink  } from 'reactstrap'
import { version } from '../../neo-paper/neo-paper.js'
import { generateAccounts } from '../../neo-paper/accounts.js'

import util from 'util'

import './style.css'

class Accounts extends Component {
  constructor(props) {
    super(props)

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.state = {
      amount: '1',
      accounts: []
    };
  }

  onFormSubmit(e) {
    this.setState({ amount: e.target.value })
    console.log('Generating: '+this.state.amount)
    this.state.accounts = generateAccounts(this.state.amount)
    // alert('Generating '+this.state.amount+': '+this.state.accounts)
    // alert('Generated '+this.state.amount+' accounts: '+JSON.stringify(this.state, null, '  '))
    console.log('accounts: '+util.inspect(this.state.accounts, {depth:null}))
    this.props.history.push('/Wallets')
  }

  componentDidMount() {
  }

  render() {
    return(
      <React.Fragment>
        <Jumbotron className="vertical-center" id="ma">
        <div className="container hero-container text-center" id="ma">
          <h1 className="display-4">Accounts </h1>
          <p className="lead">Generate Accounts</p>
          <hr className="my-4" />
          <p className="lead mx-auto">
          <Container className="p-5">
             <Form id="accountsFormLeft">
               <FormGroup>
                 <Label>How many:</Label> <Input
                   style={{width: "200px"}}
                   type="text"
                   name="text"
                   placeholder="1"
                   value={this.state.amount}
                   onChange={e => this.setState({ amount: e.target.value })}
                 />
               </FormGroup>
               <Button onClick={e => this.onFormSubmit(e)} color="primary">Generate</Button>
             </Form>
           </Container>
          </p>
        </div>
        </Jumbotron>
      </React.Fragment>
    )
  }
}
export default Accounts
