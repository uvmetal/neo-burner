import React, { Component } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Jumbotron, Container, Button, Form, FormGroup, Input, ButtonGroup } from 'reactstrap'
import HelpModal from '../Ui/Modal/HelpModal'
import { generateAccounts } from '../../neo-paper/accounts.js'

import util from 'util'

import './style.css'

// const electron = window.require('electron')

const divStyle = {
  display: 'flex',
  alignItems: 'center'
}

class Accounts extends Component {
  constructor(props) {
    super(props)

    this.generate = this.generate.bind(this)
    this.import = this.import.bind(this)
    this.help = this.help.bind(this)
    this.renderGenerateAccounts = this.renderGenerateAccounts.bind(this)
    this.createWallet = this.createWallet.bind(this)
    this.toggle = this.toggle.bind(this)
    this.select = this.select.bind(this)

    this.state = {
      amount: '',
      name: '',
      url: '',
      payout: '',
      folder: this.props.accountsPath,
      filename: this.props.accountsFile,
      dropdownOpen: false,
      assetType: 'Neo',
      timeLimit: ''
    }
  }

  componentDidMount() {
  }

  generate(e) {
    console.log('Generating: '+this.state.amount)
    console.log('Name: '+this.state.name)
    console.log('URL: '+this.state.url)
    console.log('Payout: '+this.state.payout)
    console.log('Time Limit: '+this.state.timeLimit)
    console.log('Asset Type: '+this.state.assetType)
    console.log('fakepath: '+this.state.folder)

    let realpath

    if (document.getElementsByTagName('input')[0].files[0])
      realpath = document.getElementsByTagName('input')[0].files[0].path
    else realpath = this.state.folder

    console.log('realpath: '+realpath)

    this.setState({folder: realpath})

    console.log('filename: '+this.state.filename)

    let accounts = generateAccounts(this.state.amount, this.state.name, this.state.url, this.state.payout, this.state.timeLimit, this.state.assetType)

    this.props.setAccounts(accounts, realpath, this.state.filename)

    // window.ipcRenderer.send('write-file', { path: realpath+'/'+this.state.filename, data: JSON.stringify(accounts).toString() })
  }

  import(e) {
    // TODO add flash dialog for operations status

    let realpath

    if (document.getElementsByTagName('input')[0].files[0])
      realpath = document.getElementsByTagName('input')[0].files[0].path
    else realpath = this.state.folder

    let self = this

    // electron.ipcRenderer.on('read-file-reply', function (event, arg) {
    //   self.props.setAccounts(JSON.parse(arg), realpath, self.state.filename)
    // })
    //
    // electron.ipcRenderer.send('read-file', realpath+'/'+this.state.filename)
  }

  help(e) {

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
                     <span className="btn btn-primary" id="fourteenFont">Choose Path</span>
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
                   style={{width: "150px"}}
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
                 <Input
                 style={{width: "143px"}}
                 type="text"
                 name="text"
                 placeholder="Event Time Limit"
                 value={this.state.timeLimit}
                 onChange={e => this.setState({ timeLimit: e.target.value })}
                 id="fourteenFont"
                 />
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
                 <ButtonGroup>
                 <Button onClick={e => this.generate(e)} color="warning" id="fourteenFont">Generate</Button>
                 <Button onClick={e => this.import(e)} color="warning" id="fourteenFont">Import</Button>
                 <HelpModal buttonLabel='Help' title={'Burner Help'} body={'Here you can choose a path and filename to save or import accounts. If you are only importing, you do not need to specify how many accounts. "Event Name" and "Event URL" are extra metadata stored along with the accounts and will be shown on the generated PDF. These are used to provide information to users about the paper wallets. "Event Payout", "Asset Type", and "Event Time Limit" are the metadata points for special limited-time event payout where final setup will be done through neo-burner-server. These points are set here for tracking and linkage to accounts. These last three points will not be stored in the wallets.'} okayButtonText='Got it!' id='fourteenFont'/>
               </ButtonGroup>
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
            <p className="lead mx-auto"></p>
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

          </div>
          </Jumbotron>
        </React.Fragment>
      )
    }
  }
}

export default Accounts
