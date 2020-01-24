import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ButtonGroup } from 'reactstrap'
// import './style.css'

class FlashModal extends Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    // this.nextButtonClick = this.nextButtonClick.bind(this)
    // this.onNextClick = this.onNextClick.bind(this)
    // this.cancelButtonClick = this.cancelButtonClick.bind(this)
    // this.onCancelClick = this.onCancelClick.bind(this)

    this.state = {
      modal: true
    }
  }

  async componentWillMount() {
  }

  async componentDidMount() {
    // if(this.props.isOpen) await this.setState({modal: true})
  }

  toggle() {

    this.setState({ modal: !this.state.modal })
    // if (this.props.onNextClick) this.props.onNextClick()
    // if (this.props.onCancelClick) this.props.onCancelClick()
    if (this.props.buttonAction) this.props.buttonAction()
    
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
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{this.props.title}</ModalHeader>
          <ModalBody id="fourteenFont">
          {this.props.body}
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button color="warning" onClick={this.toggle} id="fourteenFont">{this.props.okayButtonText}</Button>{' '}

            </ButtonGroup>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}
export default FlashModal
