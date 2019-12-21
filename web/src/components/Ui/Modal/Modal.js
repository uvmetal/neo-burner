import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ButtonGroup } from 'reactstrap'
// import './style.css'

class BurnerModal extends Component {
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
    // if (this.props.onNextClick) this.props.onNextClick()
    // if (this.props.onCancelClick) this.props.onCancelClick()
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
      <div>
        <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{this.props.title}</ModalHeader>
          <ModalBody>
          {this.props.body}
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button color="warning" onClick={this.props.onNextClick}>{this.props.nextButtonText}</Button>{' '}
              <Button color="warning" onClick={this.props.onCancelClick ? this.props.onCancelClick : this.toggle}>{this.props.cancelButtonText}</Button>
            </ButtonGroup>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}
export default BurnerModal
