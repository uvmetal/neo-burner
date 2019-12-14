import React, {Component} from 'react'
import { NavLink as RRNavLink } from 'react-router-dom'
import { Collapse, Nav, NavItem, NavLink } from 'reactstrap'
import '../../style.css'

class VerticalNav extends Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    // this.togggleWorkspaceRollup = this.togggleWorkspaceRollup.bind(this)

    this.state = {
      isOpen: false,
    }
  }

  toggle() {
      this.setState({
          isOpen: !this.state.isOpen
      })
  }

  togggleWorkspaceRollup() {
      this.setState({
          isOpen: !this.state.isOpen
      })
  }

  componentDidMount() {
  }

  render() {
    if (!this.props.hidden) {
      return(
        <div>
        <div onClick={() => this.props.toggleRollup('Installer')}>
        [Installation...]</div>

        <Collapse isOpen={!this.props.hideRollup} navbar>
          <Nav vertical navbar>
            <NavItem >
              <NavLink tag={RRNavLink} exact to="/" activeClassName="active">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} exact to="/About" activeClassName="active">About</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} exact to="/Quickstart" activeClassName="active">Quickstart</NavLink>
            </NavItem>
            </Nav>
          </Collapse>

        </div>
      )
    }
  }
}
export default VerticalNav
