import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ButtonGroup, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import InputModal from './InputModal'
// import './style.css'

class AdminModalButton extends Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.toggleDropDown = this.toggleDropDown.bind(this)
    this.select = this.select.bind(this)
    this.okayButtonClick = this.okayButtonClick.bind(this)

    this.state = {
      modal: false,
      dropdownOpen: false,
      email: '',
      password: '',
      rememberMe: false,
      dataType: 'BIP39',
      dataValue: '',
      placeholder: 'Please enter a BIP39 seed to login to your account.'
    }
  }

  componentDidMount() {
  }

  toggle() {
    this.setState({ modal: !this.state.modal })
  }

  toggleDropDown() {
    this.setState({dropdownOpen: !this.state.dropdownOpen})
  }

  select(event) {
    let placeholder

    switch(event.target.innerText) {
      case 'WIF':
        placeholder = 'Please enter a WIF to login to your account.'
      break
      case 'Private Key':
        placeholder = 'Please enter a private key to login to your account.'
      break
      default:
        placeholder = 'Please enter a BIP39 seed to login to your account.'
    }

    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
      dataType: event.target.innerText,
      placeholder: placeholder
    })

    console.log('selected: '+event.target.innerText)
  }

  okayButtonClick() {
    if (this.props.onOkayButtonClick) this.props.onOkayButtonClick()

    this.toggle()
  }

  render() {
    let color = "warning"
    if (this.props && this.props.color) color = this.props.color

    let button

    color = 'warning'
    button = <InputModal color="warning" buttonLabel='Login' title={'Admin Login'}
      body={
        <div>
          <Input
            style={{width: "200px"}}
            type="text"
            name="text"
            placeholder="Email"
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
            id="fourteenFont"
            />
          <Input
            style={{width: "200px"}}
            type="password"
            name="text"
            placeholder="Password"
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
            id="fourteenFont"
            />

          <br/>
          Note: please login with your administrator credentials. Unauthorized use of this page will be logged.
        </div>
        }
      okayButtonText='Login'
      onOkayButtonClick={() => this.props.login(this.state.email, this.state.password, this.state.rememberMe)}
      cancelButtonText='Cancel'
    />

    if (this.props.user.loggedIn) {
      button =
        <Button color={color} onClick={() => this.props.logout()} id="fourteenFont" key='2'>Logout</Button>
    }

    return(
      <div id="fourteenFont">
      {button}
      </div>
    )
  }
}
export default AdminModalButton
