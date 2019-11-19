import React, { Component } from 'react'
import { NavLink as RRNavLink } from 'react-router-dom'
import { Card, CardBody, Button, Collapse, Nav, NavItem, NavLink } from 'reactstrap'
import './style.css'

class HeaderControls extends Component {
  constructor(props) {
    super(props)

    this.new = this.new.bind(this)
    this.import = this.import.bind(this)
    this.export = this.export.bind(this)

    this.state = {
      isOpen: false,
      ready: true,
    }
  }

  new() {
     this.props.history.push('/About')
  }
  
  import() {
     this.props.history.push('/About')
  }

  export() {
     this.props.history.push('/About')
  }

  toggleNetworkStatus() {
      this.setState({
          networkStatusToggle: !this.state.networkStatusToggle
      })

  }

  startAllClick() {
      this.setState({
          networks: {
            running: ['BlueNet', 'RedNet']
          }
      })
  }

  stopAllClick() {
      this.setState({
          networks: {
            running: []
          }
      })
  }

  componentDidMount() {
  }

  render() {
    return(
      <div >
        <Button size="sm" color="warning" onClick={this.new} >New</Button>{' '}
        <Button size="sm" color="warning" onClick={this.import} >Import</Button>{' '}
        <Button size="sm" color="warning" onClick={this.export} >Export</Button>{' '}
      </div>
    )
  }
}
export default HeaderControls
