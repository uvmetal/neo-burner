import React, { Component } from 'react'
import { Jumbotron } from 'reactstrap'

import { version } from '../../../neo-paper/neo-paper.js'

// import './style.css'

import burnerLogo from '../../../images/neo-burner-burning-logo-alt-3.png'

class List extends Component {
  constructor(props) {
    super(props)

    this.getEvents = this.getEvents.bind(this)
    this.listEvents = this.listEvents.bind(this)

    this.state = {
      events: []
    }
  }

  componentWillMount() {
    this.getEvents()
  }

  componentDidMount() {
  }

  getEvents() { // Call sails for the real data
    let events = [
      { name: 'test1', url: 'htpps://github.com/uvmetal/ 1'},
      { name: 'test2', url: 'htpps://github.com/uvmetal/ 2'}
    ]

    this.setState({events: events})
    return events
  }

  listEvents(events) {
    return (
      <div>
         {events.map(event => (
           <div className="event" key={event.name}>{event.name}</div>
         ))}
      </div>
    )
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
          {this.listEvents(this.state.events)}
        </div>
        </Jumbotron>
      </React.Fragment>
    )
  }
}
export default List
