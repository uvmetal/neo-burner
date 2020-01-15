import React, { Component } from 'react'
import { Jumbotron, Container, Form, FormGroup, Button, ButtonGroup, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import LoginModalButton from '../../Ui/Modal/LoginModal'

import { version } from '../../../neo-paper/neo-paper.js'

// import './style.css'

import util from 'util'

class ChooseWallet extends Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)

    this.state = {
      ...this.props,
      dropdownOpen: false
    }
  }

  componentDidMount() {
    console.log('user: '+util.inspect(this.state.user, {depth: null}))
  }

  toggle() {
    this.setState({dropdownOpen: !this.state.dropdownOpen})
  }

  render() {
    return(
      <React.Fragment id="ma">
        <Jumbotron className="vertical-center" id="ma">
        <div className="container hero-container text-center" id="ma">
          <h2 className="display-4">Choose Wallet Download</h2>
          <p className="lead" id="fourteenFont"></p>
          <hr className="my-4" />
          <p className="lead mx-auto">
          </p>
          <Container className="p-5">
            <Form id="editForm">
              <FormGroup id="fourteenFont">
                Name: {this.state.name}<br/>
                URL: {this.state.url}<br/>
                Payout: {this.state.payout}<br/>
                Payout Asset: {this.state.payoutAsset}<br/>
                Payout Window: {this.state.payoutWindow}<br/>

                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                   <DropdownToggle caret id="fourteenFont">
                     {'Choose Wallet: '+this.state.walletChoice}
                     </DropdownToggle>
                   <DropdownMenu id="fourteenFont">
                     <DropdownItem onClick={this.select} id="fourteenFont">{'Neon'}</DropdownItem>
                     <DropdownItem onClick={this.select}>{'o3'}</DropdownItem>
                   </DropdownMenu>
                </Dropdown>
                 <br/>
                <ButtonGroup>
                <Button size="sm" color="warning"   onClick={() => this.props.history.push('/ViewAccount')} >{'Back'}</Button>
                  <Button size="sm" color="warning" onClick={() => this.props.history.push('/SendFunds')} >{'Next'}</Button>
                </ButtonGroup>
              </FormGroup>
            </Form>
          </Container>
        </div>
        </Jumbotron>
      </React.Fragment>
    )
  }
}
export default ChooseWallet
