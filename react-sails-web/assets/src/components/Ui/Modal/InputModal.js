import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ButtonGroup } from 'reactstrap'
// import './style.css'

class InputModal extends Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.okayButtonClick = this.okayButtonClick.bind(this)

    this.state = {
      modal: false
    }
  }

  componentDidMount() {

  }

  toggle() {
    this.setState({ modal: !this.state.modal })
  }

  okayButtonClick () {
    if (this.props.onOkayButtonClick) this.props.onOkayButtonClick()

    this.toggle()
  }

  render() {
    let color = "warning"
    if (this.props && this.props.color) color = this.props.color

    return(
      <div id="fourteenFont">
        <Button color={color} onClick={this.toggle} id="fourteenFont">{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{this.props.title}</ModalHeader>
          <ModalBody id="fourteenFont">
          {this.props.body}
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button color="warning" onClick={this.okayButtonClick} id="fourteenFont">{this.props.okayButtonText}</Button>{' '}
              <Button color="danger" onClick={this.toggle} id="fourteenFont">{this.props.cancelButtonText}</Button>{' '}

            </ButtonGroup>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}
export default InputModal
