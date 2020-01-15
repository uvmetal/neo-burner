import React, { Component } from 'react'
import { Jumbotron, Container, Form, FormGroup, Button, ButtonGroup, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import InputModal from '../../Ui/Modal/InputModal'

import { version } from '../../../neo-paper/neo-paper.js'
import { generateAccounts } from '../../../neo-paper/accounts.js'

import util from 'util'

class Edit extends Component {
  constructor(props) {
    super(props)

    this.select = this.select.bind(this)
    this.toggle = this.toggle.bind(this)
    this.update = this.update.bind(this)
    this.addAccounts = this.addAccounts.bind(this)

    this.state = {
      ...this.props.location.state.data,
      index: this.props.location.state.index,
      events: this.props.location.state.events,
      dropdownOpen: false
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

  async update() {
    // call sails api to commit the updated state to waterline

    console.log('index: '+this.state.index)

    let event = {
      index: this.state.index,
      name: this.state.name,
      url: this.state.url,
      payout: this.state.payout,
      payoutAsset: this.state.payoutAsset,
      payoutWindow: this.state.payoutWindow,
      accounts: this.state.accounts
    }

    let events = this.state.events

    events[event.index] = event

    await this.setState({events: events})

    // don't forget to update sails!

    this.props.history.push('/AdminEvents')
  }

  async addAccounts() {
    // add more accounts to this event
    console.log('accounts: '+util.inspect(this.state.accounts, {depth: null}))
    console.log('this.state.amount: '+this.state.amount)

    let accounts = generateAccounts(this.state.amount, this.state.name, this.state.url, this.state.payout, this.state.payoutWindow, this.state.payoutAsset)

    let newAccounts = this.state.accounts.concat(accounts)

    this.props.setAccounts(newAccounts, '', '')

    await this.setState({accounts: newAccounts})

    // don't forget to update sails!
  }

  render() {
    return(
      <React.Fragment id="ma">
        <Jumbotron className="vertical-center" id="ma">
        <div className="container hero-container text-center" id="ma">
          <h2 className="display-4">Admin Edit Event</h2>
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
              Linked Account Details ({this.state.accounts ? this.state.accounts.length : 0})
              <textarea
               id="accountsTextArea"
               disabled
               cols="100"
               rows="40"
               name="accounts"
               value={util.inspect(this.state.accounts, {depth:null})}/>
              <br/>
              <ButtonGroup>
                <Button size="sm" color="warning" onClick={() => this.update()} >{'Update'}</Button>
                <InputModal buttonLabel='Add Accounts' title={'How many accounts would you like to add?'}
                  body={
                    <Input
                      style={{width: "200px"}}
                      type="text"
                      name="text"
                      placeholder="How many accounts?"
                      value={this.state.amount}
                      onChange={e => this.setState({ amount: e.target.value })}
                      id="fourteenFont"
                      />
                        }
                  okayButtonText='Generate'
                  onOkayButtonClick={() => this.addAccounts()}
                  cancelButtonText='Cancel'
                />
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
export default Edit
