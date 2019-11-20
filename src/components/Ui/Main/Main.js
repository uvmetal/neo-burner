import React, { Component } from 'react'

import HeaderControls from '../HeaderControls/HeaderControls'
import VerticalNav from '../VerticalNav/VerticalNav'

import WorkSpaceAccounts from '../../App/Workspace/Accounts'
import WorkspaceBlocks from '../../App/Workspace/Blocks'
import WorkspaceConsole from '../../App/Workspace/Console'
import WorkspaceContracts from '../../App/Workspace/Contracts'
import WorkspaceExport from '../../App/Workspace/Export'
import WorkspaceStorage from '../../App/Workspace/Storage'
import WorkspaceServer from '../../App/Workspace/Server'
import WorkspaceTransactions from '../../App/Workspace/Transactions'

import SettingsDatabase from '../../App/Settings/Database'
import SettingsExport from '../../App/Settings/Export'
import SettingsLogs from '../../App/Settings/Logs'
import SettingsRest from '../../App/Settings/Rest'
import SettingsRpc from '../../App/Settings/Rpc'
import SettingsSession from '../../App/Settings/Session'
import SettingsServer from '../../App/Settings/Server'

import InstallerHome  from '../../Installer/Home'

import About from '../../App/About'
import New from '../../App/New'
import Import from '../../App/Import'
import Export from '../../App/Export'
import Report from '../../App/Report'
import Events from '../../App/Events'
import Home from '../../App/Home'
import Footer from '../../Ui/Main/Footer.js'
import Quickstart from '../../App/Quickstart'

// import util from 'util'

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
    this.props.history.push('/About');
  }

  leftPaneToggleHidden () {
    this.setState({
      leftPaneHidden: !this.state.leftPaneHidden
    })
  }

  render() {
    let headerContent = this.props.headerContent ? this.props.headerContent :
      <HeaderControls {...this.props} leftPaneToggleHidden={this.leftPaneToggleHidden} />
    // let leftPaneContent = this.props.leftPaneContent ? this.props.leftPaneContent : ''
    let leftPaneContent = <VerticalNav hidden={this.state.leftPaneHidden} hideWorkspaceRollup={this.state.hideWorkspaceRollup} hideSettingsRollup={this.state.hideSettingsRollup} toggleRollup={this.toggleVerticalNavRollup} />
    // let leftPaneContent = <VerticalNav hidden={this.state.leftPaneHidden} hideWorkspaceRollup={this.state.hideWorkspaceRollup} hideSettingsRollup={this.state.hideSettingsRollup} toggleRollup={this.toggleVerticalNavRollup} />
    let rightPaneContent = this.props.rightPaneContent ? this.props.rightPaneContent : ''
    let footerContent = this.props.footerContent ? this.props.footerContent : <Footer />
    // footerContent = 'footer footer footer'

    if (this.props && this.props.location && this.props.location.pathname) {

      // console.log(this.props.config.consoleBuffer)

      rightPaneContent = <Home />

      switch(this.props.location.pathname) {

        case '/About':
        rightPaneContent = <About />
        break

        case '/New':
        rightPaneContent = <New />
        break

        case '/Import':
        rightPaneContent = <Import />
        break

        case '/Export':
        rightPaneContent = <Export />
        break

        case '/Report':
        rightPaneContent = <Report />
        break

        case '/Events':
        rightPaneContent = <Events />
        break

        case '/Quickstart':
          rightPaneContent = <Quickstart config={this.props.config}/>
        break

        case '/WorkspaceAccounts':
          rightPaneContent = <WorkSpaceAccounts />
        break

        case '/WorkspaceBlocks':
        rightPaneContent = <WorkspaceBlocks />
        break

        case '/WorkspaceConsole':
          rightPaneContent = <WorkspaceConsole config={this.props.config}/>
        break

        case '/WorkspaceContracts':
          rightPaneContent = <WorkspaceContracts />
        break

        case '/WorkspaceExport':
          rightPaneContent = <WorkspaceExport />
        break

        case '/WorkspaceStorage':
        rightPaneContent = <WorkspaceStorage />
        break;

        case '/WorkspaceServer':
        rightPaneContent = <WorkspaceServer />
        break;

        case '/WorkspaceTransactions':
        rightPaneContent = <WorkspaceTransactions />
        break

        case '/SettingsDatabase':
          rightPaneContent = <SettingsDatabase />
        break

        case '/SettingsExport':
          rightPaneContent = <SettingsExport />
        break

        case '/SettingsLogs':
          rightPaneContent = <SettingsLogs />
        break

        case '/SettingsRest':
          rightPaneContent = <SettingsRest />
        break

        case '/SettingsRpc':
          rightPaneContent = <SettingsRpc />
        break

        case '/SettingsSession':
          rightPaneContent = <SettingsSession />
        break

        case '/SettingsServer':
          rightPaneContent = <SettingsServer />
        break

        case '/InstallerHome':
          rightPaneContent = <InstallerHome config={this.props.config}/>
        break

        default:
          rightPaneContent = <Home />
      }
    }

    return (
      <div id="wrapper">
         <div id="header">
           {headerContent}
         </div>
         <div id="contentWrapper">
           { !this.state.leftPaneHidden &&
             <div class='leftPaneContent'>
            { leftPaneContent }
             </div>
           }
           <div class='rightPaneContent'>
           {rightPaneContent}
           </div>
        </div>
         <div id="footer">
            <div class='footerContent'>{footerContent}</div>
         </div>
       </div>
    )
  }
}
export default AppMain
