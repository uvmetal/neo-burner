import React, { Component } from 'react'
import {Jumbotron, Container, Form, FormGroup, Button, ButtonGroup, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { version } from '../../../neo-paper/neo-paper.js'

// import './style.css'

import util from 'util'

class Add extends Component {
  constructor(props) {
    super(props)

    this.select = this.select.bind(this)
    this.toggle = this.toggle.bind(this)
    this.save = this.save.bind(this)
    this.addAccount = this.addAccount.bind(this)
    this.importAccounts = this.importAccounts.bind(this)

    this.state = {
      name: '',
      url: '',
      payout: '',
      payoutAsset: '',
      payoutWindow: '',
      accounts: []
    }
  }

  componentDidMount() {
  }

  select(event) {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
      payoutAsset: event.target.innerText
    })

    console.log('selected: '+event.target.innerText)
  }

  toggle() {
    this.setState({dropdownOpen: !this.state.dropdownOpen})
  }

  save() {
    // call sails api to commit the updated state to waterline
  }

  // Add a new account linked to this event by data entry
  addAccount() {

  }

  // This should be an option to do here, but neo-burner desktop should be able to call sails directly at event inception. That feature is not enabled yet as the sails api is still in development.
  importAccounts() {

  }

  // Generate accounts to be added
  generateAccounts() {

  }

  render() {
    return(
      <React.Fragment id="ma">
        <Jumbotron className="vertical-center" id="ma">
        <div className="container hero-container text-center" id="ma">
          <h2 className="display-4">Add Event</h2>
          <p className="lead" id="fourteenFont"></p>
          <hr className="my-4" />
          <p className="lead mx-auto">
          </p>
          <Container className="p-5">
            <Form id="editForm">
              <FormGroup id="fourteenFont">
              Event Name
              <Input
                style={{width: "400px"}}
                type="text"
                name="text"
                placeholder="Event Name"
                value={this.state.name}
                onChange={e => this.setState({ name: e.target.value })}
                id="fourteenFont"
              />
              <br/>
              Event URL
              <Input
                style={{width: "400px"}}
                type="text"
                name="text"
                placeholder="Event URL"
                value={this.state.url}
                onChange={e => this.setState({ url: e.target.value })}
                id="fourteenFont"
              />
              <br/>
              Payout Amount
              <Input
                style={{width: "400px"}}
                type="text"
                name="text"
                placeholder="Payout"
                value={this.state.payout}
                onChange={e => this.setState({ payout: e.target.value })}
                id="fourteenFont"
              />
              <br/>
              Payout Asset
              <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                 <DropdownToggle caret id="fourteenFont">
                   {'Asset Type: '+this.state.payoutAsset}
                   </DropdownToggle>
                 <DropdownMenu id="fourteenFont">
                   <DropdownItem onClick={this.select} id="fourteenFont">{'Neo'}</DropdownItem>
                   <DropdownItem onClick={this.select}>{'Gas'}</DropdownItem>
                 </DropdownMenu>
              </Dropdown>
              <br/>
              Payout Window (Should be date range)
              <Input
                style={{width: "400px"}}
                type="text"
                name="text"
                placeholder="Payout"
                value={this.state.payoutWindow}
                onChange={e => this.setState({ payoutWindow: e.target.value })}
                id="fourteenFont"
              />
              <br/>
              Linked Account Details
              <textarea
               id="accountsTextArea"
               disabled
               cols="100"
               rows="40"
               name="accounts"
               value={util.inspect(this.state.accounts, {depth:null})}/>
               <Button size="sm" color="warning" onClick={() => this.addAccount()} >{'Add Account'}</Button>
              <br/>
              <ButtonGroup>
                <Button size="sm" color="warning" onClick={() => this.save()} >{'Save'}</Button>
                <Button size="sm" color="warning" onClick={() => this.props.history.push('/AdminEvents')} >{'Cancel'}</Button>
              </ButtonGroup>
              </FormGroup>
            </Form>
          </Container>
        </div>
        </Jumbotron>
      </React.Fragment>
    )
  }
}
export default Add
