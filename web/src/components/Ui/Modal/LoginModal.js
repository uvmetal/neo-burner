import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ButtonGroup, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import InputModal from './InputModal'
// import './style.css'

class LoginModalButton extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modal: false,
      dropdownOpen: false,
      dataType: 'BIP39',
      dataValue: '',
      placeholder: 'Please enter a BIP39 seed to login to your account.'
    }
  }

  componentDidMount() {
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal })
  }

  toggleDropDown = () => {
    this.setState({dropdownOpen: !this.state.dropdownOpen})
  }

  select = (event) => {
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

  okayButtonClick = () => {
    if (this.props.onOkayButtonClick) this.props.onOkayButtonClick()

    this.toggle()
  }

  render() {
    let color = "warning"
    if (this.props && this.props.color) color = this.props.color

    let button

    if (this.props.user.admin) {
      color = 'danger'
      button = <InputModal color="danger" buttonLabel='Login' title={'Admin Login'}
        body={
          <Input
            style={{width: "200px"}}
            type="text"
            name="text"
            placeholder="Email"
            value={this.state.amount}
            onChange={e => this.setState({ amount: e.target.value })}
            id="fourteenFont"
            />

        }
        okayButtonText='Login'
        onOkayButtonClick={() => this.props.loginUser(true)}
        cancelButtonText='Cancel'
      />
    } else {
      color = 'warning'
      button = <InputModal color="warning" buttonLabel='Login' title={'User Login'}
        body={
          <div>
              <textarea name="message" placeholder={this.state.placeholder}
                onChange={e => this.setState({ dataValue: e.target.value })}
                rows="10" cols="50">
              {this.state.dataValue}
              </textarea>
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
                <DropdownToggle caret id="fourteenFont">
                  {this.state.dataType}
                  </DropdownToggle>
                <DropdownMenu id="fourteenFont">
                  <DropdownItem onClick={this.select} id="fourteenFont">{'BIP39'}</DropdownItem>
                  <DropdownItem onClick={this.select}>{'WIF'}</DropdownItem>
                  <DropdownItem onClick={this.select}>{'Private Key'}</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <br/>
            Note: this data can be found if you scan the relevant QR code on your paper wallet. Once you login you will be able to see the amount that you will be able to send to your new account once you download and install a wallet.
          </div>
          }
        okayButtonText='Login'
        onOkayButtonClick={() => this.props.loginUser()}
        cancelButtonText='Cancel'
      />
     }

    if (this.props.user.loggedIn) {
      button =
        <Button color={color} onClick={() => this.props.history.push('/Logout')} id="fourteenFont" key='2'>Logout</Button>
    }

    return(
      <div id="fourteenFont">
      {button}
      </div>
    )
  }
}
export default LoginModalButton
