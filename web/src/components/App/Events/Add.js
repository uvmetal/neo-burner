import React, { Component } from 'react'
import { Jumbotron, Container, Form, FormGroup, Button } from 'reactstrap'
import { version } from '../../../neo-paper/neo-paper.js'

// import './style.css'

class Add extends Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  componentDidMount() {
  }

  render() {
    return(
      <React.Fragment id="ma">
        <Jumbotron className="vertical-center" id="ma">
        <div className="container hero-container text-center" id="ma">
          <h2 className="display-4">Add Event</h2>
          <p className="lead" id="fourteenFont"></p>
          <hr className="my-4" />
          <p className="lead mx-auto">
          </p>
          <Container className="p-5">
            <Form id="accountsFormLeft">
              <FormGroup id="fourteenFont">

              </FormGroup>
            </Form>
          </Container>
        </div>
        </Jumbotron>
      </React.Fragment>
    )
  }
}
export default Add
