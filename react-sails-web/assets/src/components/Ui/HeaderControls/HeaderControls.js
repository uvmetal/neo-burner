import React, { Component } from 'react'
import { Button, ButtonGroup } from 'reactstrap'
import regeneratorRuntime from 'regenerator-runtime'

// import './style.css'

class HeaderControls extends Component {
  constructor(props) {
    super(props)

    this.home = this.home.bind(this)
    this.new = this.new.bind(this)
    this.import = this.import.bind(this)
    this.export = this.export.bind(this)
    this.about = this.about.bind(this)
    this.report = this.report.bind(this)
    this.settings = this.settings.bind(this)
    this.accounts = this.accounts.bind(this)
    this.wallets = this.wallets.bind(this)
    this.admin = this.admin.bind(this)
    this.events = this.events.bind(this)
    this.redeem = this.redeem.bind(this)

    this.state = {
      isOpen: false,
      ready: true,
    }
  }

  home() {
     this.props.history.push('/Home')
  }

  accounts() {
    this.props.history.push('/Accounts')
  }

  wallets() {
    this.props.history.push('/Wallets')
  }

  new() {
     this.props.history.push('/New')
  }

  import() {
     this.props.history.push('/Import')
  }

  export() {
     this.props.history.push('/Export')
  }

  about() {
     this.props.history.push('/About')
  }

  settings() {
     this.props.history.push('/Settings')
  }

  report() {
     this.props.history.push('/Report')
  }

  admin () {
    this.props.history.push('/Admin')
  }

  events () {
    this.props.history.push('/ListEvents')
  }

  redeem () {
    this.props.history.push('/Redeem')
  }

  componentDidMount() {
  }

  render() {
    return(
      <div id="ma">
        <ButtonGroup>
          <Button size="sm" color="warning" onClick={this.home} >Home</Button>{' '}
          <Button size="sm" color="warning" onClick={this.events} >Events</Button>{' '}
          <Button size="sm" color="warning" onClick={this.redeem} >Redeem</Button>{' '}
          <Button size="sm" color="warning" onClick={this.admin} >Admin</Button>{' '}
          <Button size="sm" color="warning" onClick={this.about} >About</Button>{' '}
        </ButtonGroup>
      </div>
    )
  }
}
export default HeaderControls
// <Button size="sm" color="warning" onClick={this.new} >New</Button>{' '}
// <Button size="sm" color="warning" onClick={this.import} >Import</Button>{' '}
// <Button size="sm" color="warning" onClick={this.export} >Export</Button>{' '}
// <Button size="sm" color="warning" onClick={this.report} >Report</Button>{' '}
