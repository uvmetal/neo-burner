import React, { Component } from 'react'
import { Button, ButtonGroup } from 'reactstrap'
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

  toggleNetworkStatus() {
      this.setState({
          networkStatusToggle: !this.state.networkStatusToggle
      })

  }

  componentDidMount() {
  }

  render() {
    return(
      <div id="ma">
        <ButtonGroup>
          <Button size="sm" color="warning" onClick={this.home} >Home</Button>{' '}
          <Button size="sm" color="warning" onClick={this.accounts} >Accounts</Button>{' '}
          <Button size="sm" color="warning" onClick={this.wallets} >Wallets</Button>{' '}
          <Button size="sm" color="warning" onClick={this.settings} >Settings</Button>{' '}
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
