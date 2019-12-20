import React, { Component } from 'react'
import { Button, ButtonGroup, Container, Form, FormGroup, Jumbotron } from 'reactstrap'

import { version } from '../../../neo-paper/neo-paper.js'

// import './style.css'

import util from 'util'

import burnerLogo from '../../../images/neo-burner-burning-logo-alt-3.png'

class List extends Component {
  constructor(props) {
    super(props)

    this.getEvents = this.getEvents.bind(this)
    this.listEvents = this.listEvents.bind(this)
    this.edit = this.edit.bind(this)
    this.view = this.view.bind(this)

    this.state = {
      events: this.props.events
    }
  }

  componentWillMount() {
    this.getEvents()
    console.log('events: '+util.inspect(this.state.events, {depth: null}))
  }

  componentDidMount() {
  }

  getEvents() {
    // this.setState({events: events})
    return this.state.events
  }

  listEvents(events) {
    return (
      <div>
          {events.map((event, index) => (
           <div className="event" key={event.name}>
           <ButtonGroup>
           <Button size="sm" color="warning" onClick={() => this.edit(event, index, events)} >{'Edit'}</Button>
           <Button size="sm" color="warning" onClick={() => this.delete(event, index)} >{'Delete'}</Button> {event.name}
           </ButtonGroup>
           </div>
          ))}
      </div>
    )
  }

  view(data) {
    console.log('viewing event: '+data.name)

    this.props.history.push({
      pathname: '/AdminViewEvent',
      state: { data: data }
    })
  }

  edit(data, index, events) {
    console.log('editing event: '+data.name)

    this.props.history.push({
      pathname: '/AdminEditEvent',
      state: { data: data, index: index, events: events }
    })
  }

  delete(data, index) {
    console.log('deleting event: '+data.name)
    // call sails to delete, for now we can remove the object
    let events = this.state.events
    events.splice(index, 1)
    this.setState({events: events})
  }

  render() {
    return(
      <React.Fragment id="ma">
        <Jumbotron className="vertical-center" id="ma">
        <div className="container hero-container text-center" id="ma">
          <h2 className="display-4">Admin Events</h2>
          <p className="lead" id="fourteenFont">Add, remove, view, and edit events.</p>
          <hr className="my-4" />
          <p className="lead mx-auto">
          </p>
          <Container className="p-5">
            <Form id="accountsFormLeft">
              <FormGroup id="fourteenFont">
                <Button size="sm" color="warning" onClick={() => this.props.history.push({pathname: '/AdminAddEvent', state: {data: this.state.events, events: this.state.events}})} >{'Add Event'}</Button>{' '}<br/>
                {this.listEvents(this.state.events)}
              </FormGroup>
            </Form>
          </Container>
        </div>
        </Jumbotron>
      </React.Fragment>
    )
  }
}
export default List
