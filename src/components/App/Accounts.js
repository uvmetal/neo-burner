import React, { Component, useState, useRef } from 'react'
import { NavLink as RRNavLink } from 'react-router-dom'
import { Jumbotron, Container, Col, Button, Form, FormGroup, Label, Input, FormText, Nav, NavItem, NavLink  } from 'reactstrap'
import { version } from '../../neo-paper/neo-paper.js'
import { generateAccounts } from '../../neo-paper/accounts.js'

import util from 'util'

import './style.css'

class Accounts extends Component {
  constructor(props) {
    super(props)

    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.state = {
      amount: ''
    }
  }

  onFormSubmit(e) {
    this.setState({ amount: e.target.value })
    console.log('Generating: '+this.state.amount)
    let accounts = generateAccounts(this.state.amount)
    // alert('Generating '+this.state.amount+': '+this.state.accounts)
    // alert('Generated '+this.state.amount+' accounts: '+JSON.stringify(this.state, null, '  '))
    // console.log('accounts: '+util.inspect(this.state.accounts, {depth:null}))
    this.props.setAccounts(accounts)
    // this.props.history.push('/Wallets')
    // this.props.history.push('/Accounts')
  }

  componentDidMount() {
  }

  render() {
    console.log('props: '+util.inspect(this.props, {depth: null}))
    return(
      <React.Fragment>
        <Jumbotron className="vertical-center" id="ma">
        <div className="container hero-container text-center" id="ma">
          <h1 className="display-4">Accounts </h1>
          <p className="lead">Generate Accounts</p>
          <p className="lead mx-auto">
          <Container className="p-5">
             <Form id="accountsFormLeft">
               <FormGroup>
                 <Input
                   style={{width: "200px"}}
                   type="text"
                   name="text"
                   placeholder="How many?"
                   value={this.state.amount}
                   onChange={e => this.setState({ amount: e.target.value })}
                 />
               </FormGroup>
               <Button onClick={e => this.onFormSubmit(e)} color="primary">Generate</Button>
             </Form>
             <br/>
             <textarea
              id="accountsTextArea"
              readonly
              disabled
              cols="100" 
              rows="60"
              name="accounts"
              value={util.inspect(this.props.accounts, {depth:null})}/>
           </Container>
          </p>
        </div>
        </Jumbotron>
      </React.Fragment>
    )
  }
}
export default Accounts
// onChange={this.handleChange}
