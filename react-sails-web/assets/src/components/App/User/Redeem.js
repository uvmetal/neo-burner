import React, { Component } from 'react'
import { Jumbotron, Container, Form, FormGroup, Button } from 'reactstrap'
import RedeemModalButton from '../../Ui/Modal/RedeemModal'
import FlashModal from '../../Ui/Modal/FlashModal'

import { version } from '../../../neo-paper/neo-paper.js'

// import './style.css'

import util from 'util'

class Redeem extends Component {
  constructor(props) {
    super(props)

    this.state = {...this.props}
  }

  componentDidMount() {
    console.log('user: '+util.inspect(this.state.user, {depth: null}))
  }

  render() {
    return(
      <React.Fragment id="ma">
        <Jumbotron className="vertical-center" id="ma">
        <div className="container hero-container text-center" id="ma">
          <h2 className="display-4">Redeem Your Account</h2>
          <p className="lead" id="fourteenFont"></p>
          <hr className="my-4" />
          <p className="lead mx-auto">
          </p>
          <Container className="p-5">
            <Form id="redeemFormLeft">
              <FormGroup id="fourteenFont">
                <div id="sixteenFont">
                  Login to redeem your paper wallet account. You will be able to review the account details, choose a wallet to download, and once downloaded, send some funds to your new desktop or mobile wallet. Click below to begin.
                </div>
                <br/>
                <br/>
                <br/>
                <RedeemModalButton {...this.props} />
                {this.props.message ? <FlashModal title={this.props.message.title} body={this.props.message.body} okayButtonText={this.props.message.buttonLabel} buttonAction={this.props.message.buttonAction} id='fourteenFont' /> : ''}
              </FormGroup>
            </Form>
          </Container>
        </div>
        </Jumbotron>
      </React.Fragment>
    )
  }
}
export default Redeem
                // <Button size="sm" color="warning" onClick={() => this.props.history.push('/ViewAccount')} >{'Next'}</Button>
