import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ButtonGroup, Input } from 'reactstrap'
import InputModal from './InputModal'
// import './style.css'

class LoginModalButton extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modal: false
    }
  }

  componentDidMount() {

  }

  toggle = () => {

    this.setState({ modal: !this.state.modal })
    // if (this.props.onCancelClick) this.props.onCancelClick()
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
           <Input
             style={{width: "200px"}}
             type="text"
             name="text"
             placeholder="Private Key"
             value={this.state.amount}
             onChange={e => this.setState({ amount: e.target.value })}
             id="fourteenFont"
             />
          }
         okayButtonText='Login'
         onOkayButtonClick={() => this.props.loginUser()}
         cancelButtonText='Cancel'
       />
     }

    if (this.props.user.loggedIn) {
      button =
        <Button size="sm" color={color} onClick={() => this.props.history.push('/Logout')} key='2'>Logout</Button>
    }

    return(
      <div id="fourteenFont">
      {button}
      </div>
    )
  }
}
export default LoginModalButton
