import React, { Component } from 'react'
import { Button, ButtonGroup } from 'reactstrap'
// import './style.css'

let adminNav

class HeaderControls extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
      ready: true,
    }
  }

  home = () => {
    this.props.history.push('/Home')
  }

  admin = () => {
    this.props.history.push('/Admin')
  }

  events = () => {
    this.props.history.push('/AdminEvents')
  }

  getAdminNav = () => {
    console.log('getAdminNav()')
    let buttons = []
    if (this.props.user.admin) {
      buttons.push
      (
        <Button size="sm" color="danger" onClick={this.admin} key='0' >Admin</Button>,
        <Button size="sm" color="danger" onClick={this.events} key='1'>Events</Button>
      )
    }
    if (this.props.user.loggedIn) {
      buttons.push
      (
        <Button size="sm" color="danger" onClick={this.props.history.push('/Logout')} key='2'>Logout</Button>
      )
    } else {

    }
    return buttons
  }

  accounts = () => {
    this.props.history.push('/Accounts')
  }

  wallets = () => {
    this.props.history.push('/Wallets')
  }

  new = () => {
    this.props.history.push('/New')
  }

  import = () => {
    this.props.history.push('/Import')
  }

  export = () => {
    this.props.history.push('/Export')
  }

  about = () => {
    this.props.history.push('/About')
  }

  settings = () => {
    this.props.history.push('/Settings')
  }

  report = () => {
    this.props.history.push('/Report')
  }

  componentWillReceiveProps() {

  }

  componentWillMount() {
    // adminNav = this.getAdminNav()
  }

  componentDidMount() {
  }

  render() {
    let loginButtons
    let adminButtons
    let buttonColor = 'warning'
    if (this.props.user.admin) {
      buttonColor = 'danger'
      adminButtons = [
        <Button size="sm" color="danger" onClick={this.admin} key='0' >Admin</Button>,
        <Button size="sm" color="danger" onClick={this.events} key='1'>Events</Button>
      ]
    } else buttonColor = 'warning'

    if (this.props.user.loggedIn) {
      loginButtons = [
        <Button size="sm" color={buttonColor} onClick={() => this.props.history.push('/Logout')} key='2'>Logout</Button>
      ]
    } else {
      loginButtons = [
        <Button size="sm" color={buttonColor} onClick={() => this.props.history.push({pathname: '/Login', referrer: '/Home'})} key='2'>Login</Button>
      ]
    }
    return(
      <div id="ma">
        <ButtonGroup>
          <Button size="sm" color="warning" onClick={this.home} >Home</Button>{' '}
          <Button size="sm" color="warning" onClick={this.accounts} >Accounts</Button>{' '}
          <Button size="sm" color="warning" onClick={this.wallets} >Wallets</Button>{' '}
          <Button size="sm" color="warning" onClick={this.settings} >Settings</Button>{' '}
          <Button size="sm" color="warning" onClick={this.about} >About</Button>{' '}

          {adminButtons}{loginButtons}
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
