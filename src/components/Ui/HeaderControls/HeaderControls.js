import React, { Component } from 'react'
import { NavLink as RRNavLink } from 'react-router-dom'
import { Card, CardBody, Button, Collapse, Nav, NavItem, NavLink } from 'reactstrap'
import './style.css'

class HeaderControls extends Component {
  constructor(props) {
    super(props)

    this.home = this.home.bind(this)
    this.new = this.new.bind(this)
    this.import = this.import.bind(this)
    this.export = this.export.bind(this)
    this.about = this.about.bind(this)
    this.report = this.report.bind(this)
    this.settings = this.settings.bind(this)

    this.state = {
      isOpen: false,
      ready: true,
    }
  }

  home() {
     this.props.history.push('/Home')
  }

  new() {
     this.props.history.push('/New')
  }

  import() {
     this.props.history.push('/Import')
  }

  export() {
     this.props.history.push('/Export')
  }

  about() {
     this.props.history.push('/About')
  }

  settings() {
     this.props.history.push('/Settings')
  }

  report() {
     this.props.history.push('/Report')
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
      <div id="ma">
        <Button size="sm" color="warning" onClick={this.home} >Home</Button>{' '}
        <Button size="sm" color="warning" onClick={this.new} >New</Button>{' '}
        <Button size="sm" color="warning" onClick={this.import} >Import</Button>{' '}
        <Button size="sm" color="warning" onClick={this.export} >Export</Button>{' '}
        <Button size="sm" color="warning" onClick={this.report} >Report</Button>{' '}
        <Button size="sm" color="warning" onClick={this.settings} >Settings</Button>{' '}
        <Button size="sm" color="warning" onClick={this.about} >About</Button>{' '}
      </div>
    )
  }
}
export default HeaderControls
