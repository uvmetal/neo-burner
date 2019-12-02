import React, { Component } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Jumbotron, Container, Button, Form, FormGroup, Input, ButtonGroup } from 'reactstrap'
import { generateAccounts } from '../../neo-paper/accounts.js'

import util from 'util'

import './style.css'

const divStyle = {
  display: 'flex',
  alignItems: 'center'
}

class Accounts extends Component {
  constructor(props) {
    super(props)

    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.renderGenerateAccounts = this.renderGenerateAccounts.bind(this)
    this.createWallet = this.createWallet.bind(this)
    this.toggle = this.toggle.bind(this)
    this.select = this.select.bind(this)

    this.state = {
      amount: '',
      name: '',
      url: '',
      payout: '',
      folder: '/tmp',
      filename: 'accounts.json',
      dropdownOpen: false,
      assetType: 'Neo'
    }
  }

  componentDidMount() {
  }

  onFormSubmit(e) {
    console.log('Generating: '+this.state.amount)
    console.log('Name: '+this.state.name)
    console.log('URL: '+this.state.url)
    console.log('Payout: '+this.state.payout)
    console.log('Asset Type: '+this.state.assetType)
    console.log('fakepath: '+this.state.folder)

    let realpath

    if (document.getElementsByTagName('input')[0].files[0])
      realpath = document.getElementsByTagName('input')[0].files[0].path
    else realpath = '/tmp'

    console.log('realpath: '+realpath)

    this.setState({folder: realpath})

    console.log('filename: '+this.state.filename)

    let accounts = generateAccounts(this.state.amount, this.state.name, this.state.url, this.state.payout, this.state.assetType)

    this.props.setAccounts(accounts, realpath, this.state.filename)

    window.ipcRenderer.send('write-file', { path: realpath+'/'+this.state.filename, data: JSON.stringify(accounts).toString() })
  }

  createWallet() {
    this.props.history.push('Wallets')
  }

  select(event) {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
      assetType: event.target.innerText
    })

    console.log('selected: '+event.target.innerText)
  }

  toggle() {
    this.setState({dropdownOpen: !this.state.dropdownOpen})
  }

  renderGenerateAccounts() {
    return(
      <React.Fragment>
        <Jumbotron className="vertical-center" id="ma">
        <div className="container hero-container text-center" id="ma">
          <h2 className="display-4">Accounts </h2>
          <p className="lead" id="fourteenFont">Generate  accounts (WARNING: files are overwritten!)</p>
          <Container className="p-5">
             <Form id="accountsFormLeft">
               <FormGroup>
                 <div id="upload_button">
                   <label>
                     <input directory="" webkitdirectory="" type="file" id="ma"
                       onChange={e => this.setState({ folder: document.getElementsByTagName('input')[0].files[0].path })}
                     />
                     <span class="btn btn-primary" id="fourteenFont">Choose Path</span>
                     <span id="fourteenFont">{' '+this.state.folder}</span>
                   </label>
                 </div>
                 <Input
                   style={{width: "400px"}}
                   type="text"
                   name="text"
                   placeholder="File Name"
                   value={this.state.filename}
                   onChange={e => this.setState({ filename: e.target.value })}
                   id="fourteenFont"
                 />
                 <Input
                   style={{width: "400px"}}
                   type="text"
                   name="text"
                   placeholder="Event Name"
                   value={this.state.name}
                   onChange={e => this.setState({ name: e.target.value })}
                   id="fourteenFont"
                 />
                 <Input
                   style={{width: "400px"}}
                   type="text"
                   name="text"
                   placeholder="Event URL"
                   value={this.state.url}
                   onChange={e => this.setState({ url: e.target.value })}
                   id="fourteenFont"
                 />
                 <div style={divStyle}>
                 <Input
                   style={{width: "200px"}}
                   type="text"
                   name="text"
                   placeholder="Event Payout"
                   value={this.state.payout}
                   onChange={e => this.setState({ payout: e.target.value })}
                   id="fourteenFont"
                 />
                 <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle caret id="fourteenFont">
                      {'Asset Type'}
                      </DropdownToggle>
                    <DropdownMenu id="fourteenFont">
                      <DropdownItem onClick={this.select} id="fourteenFont">{'Neo'}</DropdownItem>
                      <DropdownItem onClick={this.select}>{'Gas'}</DropdownItem>
                    </DropdownMenu>
                 </Dropdown>
                 </div>
                 <Input
                   style={{width: "200px"}}
                   type="text"
                   name="text"
                   placeholder="How many accounts?"
                   value={this.state.amount}
                   onChange={e => this.setState({ amount: e.target.value })}
                   id="fourteenFont"
                 />
               </FormGroup>
               <Button onClick={e => this.onFormSubmit(e)} color="warning" id="fourteenFont">Generate</Button>
             </Form>
           </Container>
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
            <p className="lead" id="fourteenFont">There are {this.props.accounts.length} accounts.</p>
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
                <ButtonGroup>
                <Button onClick={this.props.clearAccounts} color="warning" id="fourteenFont">Clear</Button>{' '}
                <Button onClick={this.createWallet} color="warning" id="fourteenFont">Create Wallet</Button>
                </ButtonGroup>
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
