import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ButtonGroup } from 'reactstrap'
// import './style.css'

class InputModal extends Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.okayButtonClick = this.okayButtonClick.bind(this)
    // this.nextButtonClick = this.nextButtonClick.bind(this)
    // this.onNextClick = this.onNextClick.bind(this)
    // this.cancelButtonClick = this.cancelButtonClick.bind(this)
    // this.onCancelClick = this.onCancelClick.bind(this)

    this.state = {
      modal: false
    }
  }

  componentDidMount() {

  }

  toggle() {

    this.setState({ modal: !this.state.modal })
    // if (this.props.onCancelClick) this.props.onCancelClick()
  }

  okayButtonClick() {
    if (this.props.onOkayButtonClick) this.props.onOkayButtonClick()

    this.toggle()
  }

  // onNextClick(){
  //
  // }
  //
  // onCancelClick() {
  //
  // }

  render() {
    return(
      <div id="fourteenFont">
        <Button color="warning" onClick={this.toggle} id="fourteenFont">{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{this.props.title}</ModalHeader>
          <ModalBody id="fourteenFont">
          {this.props.body}
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button color="warning" onClick={this.okayButtonClick} id="fourteenFont">{this.props.okayButtonText}</Button>{' '}
              <Button color="warning" onClick={this.toggle} id="fourteenFont">{this.props.cancelButtonText}</Button>{' '}

            </ButtonGroup>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}
export default InputModal
