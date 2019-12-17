import React, { Component } from 'react'
import { Jumbotron, Container, Form, FormGroup, Button, Input } from 'reactstrap'
import { version } from '../../../neo-paper/neo-paper.js'

import util from 'util'

class Edit extends Component {
  constructor(props) {
    super(props)

    this.state = {...this.props.location.state.data}
  }

  componentDidMount() {
  }

  render() {
    return(
      <React.Fragment id="ma">
        <Jumbotron className="vertical-center" id="ma">
        <div className="container hero-container text-center" id="ma">
          <h2 className="display-4">Admin Edit Event</h2>
          <p className="lead" id="fourteenFont"></p>
          <hr className="my-4" />
          <p className="lead mx-auto">
          </p>
          <Container className="p-5">
            <Form id="accountsFormLeft">
              <FormGroup id="fourteenFont">
              <Input
                style={{width: "400px"}}
                type="text"
                name="text"
                placeholder="Event Name"
                value={this.state.name}
                onChange={e => this.setState({ name: e.target.value })}
                id="fourteenFont"
              />
              <br/>
              </FormGroup>
            </Form>
          </Container>
        </div>
        </Jumbotron>
      </React.Fragment>
    )
  }
}
export default Edit
