import React, { Component } from 'react'

import HeaderControls from '../HeaderControls/HeaderControls'
import VerticalNav from '../VerticalNav/VerticalNav'

// import Advanced from '../../App/Advanced'

import About from '../../App/About'
import Events from '../../App/Events'
import Home from '../../App/Home'
import Quickstart from '../../App/Quickstart'

import Exchange from '../../App/Exchange'
import Link from '../../App/Link'
import Send from '../../App/Send'
import Share from '../../App/Share'
import Receive from '../../App/Receive'
import Request from '../../App/Request'


import WorkSpaceAccounts from '../../App/Workspace/Accounts'
import WorkspaceBlocks from '../../App/Workspace/Blocks'
import WorkspaceConsole from '../../App/Workspace/Console'
import WorkspaceContracts from '../../App/Workspace/Contracts'
import WorkspaceExport from '../../App/Workspace/Export'
import WorkspaceStorage from '../../App/Workspace/Storage'
import WorkspaceServer from '../../App/Workspace/Server'
import WorkspaceTransactions from '../../App/Workspace/Transactions'

// import SettingsMain from '../../App/Settings/Main'

import InstallerHome  from '../../Installer/Home'



// import util from 'util'

// import cozLogo from '../../../images/coz-inverted.svg'

import './style.css'

class AppMain extends Component {
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
      <HeaderControls leftPaneToggleHidden={this.leftPaneToggleHidden} />
    // let leftPaneContent = this.props.leftPaneContent ? this.props.leftPaneContent : ''
    let leftPaneContent = <VerticalNav hidden={this.state.leftPaneHidden} hideWorkspaceRollup={this.state.hideWorkspaceRollup} hideSettingsRollup={this.state.hideSettingsRollup} toggleRollup={this.toggleVerticalNavRollup} />
    let rightPaneContent = this.props.rightPaneContent ? this.props.rightPaneContent : ''
    let footerContent = this.props.footerContent ? this.props.footerContent : ''
    footerContent = 'footer footer footer'

    if (this.props && this.props.location && this.props.location.pathname) {

      console.log('pathname: ' + this.props.location.pathname)

      rightPaneContent = <Home />

      switch(this.props.location.pathname) {

        case '/About':
        rightPaneContent = <About />
        break

        case '/Events':
        rightPaneContent = <Events />
        break

        case '/Quickstart':
          rightPaneContent = <Quickstart />
        break

        case '/Exchange':
          rightPaneContent = <Exchange />
        break

        // case '/SettingsMain':
        //   rightPaneContent = <SettingsMain />
        // break

        case '/InstallerHome':
          rightPaneContent = <InstallerHome config={this.props.config}/>
        break

        default:
          rightPaneContent = <Home />
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
export default AppMain
