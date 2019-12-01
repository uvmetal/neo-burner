import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import './style.css'

class FlashButton extends Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)

    this.state = {
      modal: false
    }
  }

  componentDidMount() {
  }

  toggle() {

    this.setState({ modal: !this.state.modal })
    if (this.props.onClick) this.props.onClick()
  }

  render() {
    return(
      <div id="ma">
        <Button color="warning" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.props.open} >
          <ModalHeader>{this.props.title}</ModalHeader>
          <ModalBody className="">
            {this.props.message}
          </ModalBody>

        </Modal>
      </div>
    )
  }
}
export default FlashButton
