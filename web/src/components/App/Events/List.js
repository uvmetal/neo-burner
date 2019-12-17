import React, { Component } from 'react'
import { Button, ButtonGroup, Jumbotron } from 'reactstrap'

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
      events: []
    }
  }

  componentWillMount() {
    console.log('props: '+util.inspect(this.props, {depth: null}))

    this.getEvents()

  }

  componentDidMount() {
  }

  getEvents() {
    let events = [ // Call sails for the real data
      { name: 'test1', url: 'htpps://github.com/uvmetal/'},
      { name: 'test2', url: 'htpps://github.com/coz/'}
    ]

    this.setState({events: events})
    return events
  }

  listEvents(events) {
    return (
      <div>
        <ButtonGroup>
          {events.map(event => (
           <div className="event" key={event.name}>
           <Button size="sm" color="warning" onClick={() => this.view(event)} >{'View'}</Button>{event.name}
           <Button size="sm" color="warning" onClick={() => this.edit(event)} >{'Edit'}</Button>{event.name}
           </div>
          ))}
         </ButtonGroup>
      </div>
    )
  }

  edit(data) {
    console.log('viewing event: '+data.name)

    this.props.history.push({
      pathname: '/EditEvent',
      state: { data: data }
    })
  }

  view(data) {
    console.log('viewing event: '+data.name)

    this.props.history.push({
      pathname: '/ViewEvent',
      state: { data: data }
    })
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
