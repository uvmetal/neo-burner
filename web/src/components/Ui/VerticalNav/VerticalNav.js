import React, {Component} from 'react'
import { NavLink as RRNavLink } from 'react-router-dom'
import { Collapse, Nav, NavItem, NavLink } from 'reactstrap'
// import './style.css'

class VerticalNav extends Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    // this.togggleWorkspaceRollup = this.togggleWorkspaceRollup.bind(this)

    this.state = {
      isOpen: false,
      isWorkspaceOpen: false,
      isSettingsOpen: false,
    }
  }

  toggle() {
      this.setState({
          isOpen: !this.state.isOpen
      })
  }

  togggleWorkspaceRollup() {
      this.setState({
          isWorkspaceOpen: !this.state.isWorkspaceOpen
      })
  }

  componentDidMount() {
  }

  render() {
    if (!this.props.hidden) {
      return(
        <div>

              <Collapse isOpen={!this.state.isOpen} navbar>
                <Nav vertical navbar>
                  <NavItem >
                    <NavLink tag={RRNavLink} exact to="/" activeClassName="active">Home</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={RRNavLink} exact to="/About" activeClassName="active">About</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={RRNavLink} exact to="/Events" activeClassName="active">Events</NavLink>
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
