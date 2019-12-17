import React, { Component } from 'react'
import { Jumbotron, Container, Form, FormGroup, Button  } from 'reactstrap'
import { version } from '../../../neo-paper/neo-paper.js'

// import './style.css'

class Admin extends Component {
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
          <h2 className="display-4">Admin</h2>
          <p className="lead" id="fourteenFont">Neo-Burner {version} Admin</p>
          <hr className="my-4" />
          <p className="lead mx-auto">
          </p>
          <Container className="p-5">
            <Form id="accountsFormLeft">
              <FormGroup id="fourteenFont">
              <Button size="sm" color="warning" onClick={() => this.props.history.push('/Login')} >{'Login'}</Button>{' '}
              <Button size="sm" color="warning" onClick={() => this.props.history.push('/Logout')} >{'Logout'}</Button>{' '}

              </FormGroup>
            </Form>
          </Container>
        </div>
        </Jumbotron>
      </React.Fragment>
    )
  }
}
export default Admin
