import React, { Component } from 'react'

import InstallerHome  from './Home'
import InstallerHeaderControls from './HeaderControls'
import InstallerNav  from './VerticalNav'

import About from '../App/About'
import Quickstart from '../App/Quickstart'

import '../../style.css'

class InstallerMain extends Component {
  constructor(props) {
    super(props)

    this.leftPaneToggleHidden = this.leftPaneToggleHidden.bind(this)
    this.toggleVerticalNavRollup = this.toggleVerticalNavRollup.bind(this)

    this.state = {
      leftPaneHidden: true,
      hideWorkspaceRollup: true,
      hideSettingsRollup: true,
    }
  }

  componentDidMount() {

  }

  toggleVerticalNavRollup(rollup) {
    if(rollup === 'workspace') {
      this.setState({
        hideWorkspaceRollup: !this.state.hideWorkspaceRollup,
      })
    }
    else {
      this.setState({
        hideSettingsRollup: !this.state.hideSettingsRollup,
      })
    }
  }

  leftPaneToggleHidden () {
    this.setState({
      leftPaneHidden: !this.state.leftPaneHidden
    })
  }

  render() {
    let headerContent = this.props.headerContent ? this.props.headerContent :
      <InstallerHeaderControls leftPaneToggleHidden={this.leftPaneToggleHidden} />
    // let headerContent = this.props.headerContent ? this.props.headerContent :
    //   <HeaderControls leftPaneToggleHidden={this.leftPaneToggleHidden} />
    // let leftPaneContent = this.props.leftPaneContent ? this.props.leftPaneContent : ''
    let leftPaneContent = <InstallerNav hidden={this.state.leftPaneHidden} hideWorkspaceRollup={this.state.hideWorkspaceRollup} hideSettingsRollup={this.state.hideSettingsRollup} toggleRollup={this.toggleVerticalNavRollup} />
    let rightPaneContent = this.props.rightPaneContent ? this.props.rightPaneContent : ''
    let footerContent = this.props.footerContent ? this.props.footerContent : ''
    footerContent = 'footer footer footer'

    if (this.props && this.props.location && this.props.location.pathname) {

      console.log('pathname: ' + this.props.location.pathname)

      rightPaneContent = <InstallerHome />

      switch(this.props.location.pathname) {

        case '/About':
        rightPaneContent = <About />
        break

        case '/Quickstart':
          rightPaneContent = <Quickstart />
        break

        default:
          rightPaneContent = <InstallerHome config={this.props.config} />
      }
    }

    return (
      <div class='wrapper'>
        <div class='headerContent'>{headerContent}</div>
        { !this.state.leftPaneHidden &&
          <div class='leftPaneContent'>
         { leftPaneContent }
          </div>
        }
        <div class='rightPaneContent'>
        {rightPaneContent}
        </div>
        <div class='footerContent'>{footerContent}</div>
      </div>
    )
  }
}
export default InstallerMain
