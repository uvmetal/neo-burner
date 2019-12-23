import React, { Component } from 'react'
import { Jumbotron, Container, Form, FormGroup, Button } from 'reactstrap'
import LoginModalButton from '../../Ui/Modal/LoginModal'

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
            <Form id="editForm">
              <FormGroup id="fourteenFont">
                Name: {this.state.name}<br/>
                URL: {this.state.url}<br/>
                Payout: {this.state.payout}<br/>
                Payout Asset: {this.state.payoutAsset}<br/>
                Payout Window: {this.state.payoutWindow}<br/>
                <textarea
                 id="accountsTextArea"
                 disabled
                 cols="100"
                 rows="40"
                 name="accounts"
                 value={util.inspect(this.state.accounts, {depth:null})}/>
                 <br/>
                 <LoginModalButton {...this.props} />
                 <Button size="sm" color="warning" onClick={() => this.props.history.push('/ViewAccount')} >{'Next'}</Button>
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
