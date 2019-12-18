import React, { Component } from 'react'
import { Jumbotron, Container, Form, FormGroup, Button, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, } from 'reactstrap'
import { version } from '../../../neo-paper/neo-paper.js'

import util from 'util'

class Edit extends Component {
  constructor(props) {
    super(props)

    this.select = this.select.bind(this)
    this.toggle = this.toggle.bind(this)

    this.state = {
      ...this.props.location.state.data,
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
            <Form id="accountsFormLeft">
              <FormGroup id="fourteenFont">
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
              <textarea
               id="accountsTextArea"
               disabled
               cols="100"
               rows="40"
               name="accounts"
               value={util.inspect(this.state.accounts, {depth:null})}/>
               <br/>
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
