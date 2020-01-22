import React, { Component } from 'react'
import regeneratorRuntime from 'regenerator-runtime'

import HeaderControls from '../HeaderControls/HeaderControls'
import VerticalNav from '../VerticalNav/VerticalNav'

// import InstallerHome  from '../../Installer/Home'
import Home from '../../App/Home'
import About from '../../App/About'

import Admin from '../../App/Admin/Admin'
import AdminAccounts from '../../App/Admin/Accounts'

import AdminEventList from '../../App/Events/List'
import ViewEvent from '../../App/Events/View'
import EditEvent from '../../App/Events/Edit'
import AddEvent from '../../App/Events/Add'

import Redeem from '../../App/User/Redeem'
import ViewAccount from '../../App/User/ViewAccount'
import ChooseWallet from '../../App/User/ChooseWallet'
import SendFunds from '../../App/User/SendFunds'

import Settings from '../../App/Settings'
import Accounts from '../../App/Accounts'
import Wallets from '../../App/Wallets'
import New from '../../App/New'
import Import from '../../App/Import'
import Export from '../../App/Export'
import Report from '../../App/Report'
// import PDF from '../../App/PDF'

import CopyHtmlTemplateModal from '../../App/CopyHtmlTemplate'
import UploadHtmlTemplateModal from '../../App/UploadHtmlTemplate'

import Footer from '../../Ui/Main/Footer'

import util from 'util'

// import './style.css'

let user

class AppMain extends Component {
  constructor(props) {
    super(props)

    this.leftPaneToggleHidden = this.leftPaneToggleHidden.bind(this)
    this.toggleVerticalNavRollup = this.toggleVerticalNavRollup.bind(this)
    this.setAccounts = this.setAccounts.bind(this)
    this.clearAccounts = this.clearAccounts.bind(this)
    this.setPdfPath = this.setPdfPath.bind(this)
    this.setDarkMode = this.setDarkMode.bind(this)
    this.setFolder = this.setFolder.bind(this)
    this.setTemplatePath = this.setTemplatePath.bind(this)
    this.writeUserSettings = this.writeUserSettings.bind(this)

    this.loginAdmin = this.loginAdmin.bind(this)
    this.logoutAdmin = this.logoutAdmin.bind(this)

    this.redeemLogin = this.redeemLogin.bind(this)
    this.redeemLogout = this.redeemLogout.bind(this)


    let events = [ // Call sails for the real data
      { index:        0,
        name:         'test1',
        url:          'https://github.com/uvmetal/',
        payout:       1,
        payoutAsset:  'Neo',    // Neo, Gas, NFT, or another token asset identifier
        payoutWindow: '24',     // This should be a date object range
        accounts:     [
          {
            address: 'test1',
            downloadedWallet: '', // Will be set if has downloaded. This flag ultimately determines payout
            hasLoggedIn: '',
            ip: '',
            depositAccount: '',
          },
          {
            address: 'test2',
            downloadedWallet: '', // Will be set if has downloaded. This flag ultimately determines payout
            hasLoggedIn: '',
            ip: '',
            depositAccount: '',
          }
        ]
      },
      { index:        1,
        name:         'test2',
        url:          'https://github.com/coz/',
        payout:       10,
        payoutAsset:  'Gas',
        payoutWindow: '24',
        accounts:     [{
          address: '',
          downloadedWallet: '', // Will be set if has downloaded. This flag ultimately determines payout
          hasLoggedIn: '',
          ip: '',
          depositAccount: '',
        }]
      }
    ]

    this.state = {
      leftPaneHidden: true,
      hideWorkspaceRollup: true,
      hideSettingsRollup: true,

      accounts: [],
      events: events,
      tutorialMode: true,
      darkMode: 'true',
      accountsPath: '/tmp',
      accountsFile: 'accounts.json',
      templatePath: this.props.config.userData +'/',
      pdfPath: '/tmp/',
      pdfFile: 'wallets.pdf',
      pdfExists: false
    }
  }

  componentWillMount() {
  }

  componentWillReceiveProps() {
    console.log('userData :'+util.inspect(this.props.config, {depth: null}))
  }

  componentDidMount() {
  }

  writeUserSettings() {
    let settings = {
      darkMode: this.state.darkMode,
      accountsPath: this.state.accountsPath,
      accountsFile: this.state.accountsFile,
      pdfPath: this.state.pdfPath,
      pdfFile: this.state.pdfFile,
      templatePath: this.state.templatePath
    }
    console.log('updating settings with: '+util.inspect(settings, {depth: null}))
    // electron.ipcRenderer.send('write-user-settings', settings)
  }

  async setFolder(folder) {
    console.log('main setting folder: '+folder)
    await this.setState({folder: folder})
    this.writeUserSettings()
  }

  async setTemplatePath(folder) {
    console.log('main setting template folder: '+folder)
    await this.setState({templatePath: folder})
    this.writeUserSettings()
  }

  async setAccounts(accounts, folder, filename) {
    console.log('got accounts in main: '+util.inspect(accounts, {depth: null}))
    await this.setState({
      accounts: accounts,
      accountsPath: folder,
      accountsFile: filename
    })

    this.writeUserSettings()
  }

  clearAccounts(accounts) {
    console.log('clearing accounts: '+this.state.accounts)
    this.setState({
      accounts: []
    })
  }

  async setEvents(events) {
    console.log('got events in main: '+util.inspect(events, {depth: null}))
    await this.setState({
      events: events
    })
  }

  clearEvents(events) {
    console.log('clearing events: '+this.state.events)
    this.setState({
      events: []
    })
  }

  async setPdfPath(folder, file) {
    console.log('setPdfPath(): '+folder+file)
    await this.setState({
      pdfPath: folder,
      pdfFile: file,
      pdfExists: true
    })

    this.writeUserSettings()
  }

  async setDarkMode(e) {
    // TODO Fix this it only works one way - from dark to light, can't return
    console.log('darkMode: '+e.target.checked)
    await this.setState({ darkMode: e.target.checked })

    this.writeUserSettings()

    if (e.target.checked) {
      require('./style.css')

    } else {
      require('./style-light.css')
    }
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

  async loginAdmin() {

  }

  async logoutAdmin() {

  }

  async redeemLogin() {
    // call sails and get a session
    user = this.props.user

    // if session is valid
    user.redeemLoggedIn = true
    // else false and return

    // Look up account by recovering address from WIF, bip seed, or private key.

    // Find correct event by looking through database for an account linked to an events

    // Check if this account has already been redeemed. If it has been redeemed, flash a message and end the session.

    // update user with the data from sails
    this.props.updateUser(user)
    // this.props.history.push(this.props.location.referrer)

    this.props.history.push('/ViewAccount')
  }

  async redeemLogout() {

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
      // this.setState({templateFolder: this.props.config.userData+'/'})
      // console.log(this.props.config.consoleBuffer)
      rightPaneContent = <Home />

      switch(this.props.location.pathname) {

        case '/About':
        rightPaneContent = <About />
        break

        case '/Accounts':
        rightPaneContent = <Accounts {...this.props}
          setAccounts={this.setAccounts}
          accounts={this.state.accounts}
          clearAccounts={this.clearAccounts}
          accountsFile={this.state.accountsFile}
          accountsPath={this.state.accountsPath}
          />
        break

        case '/Wallets':
        rightPaneContent = <Wallets accounts={this.state.accounts} config={this.props.config}
         {...this.props} setPdfPath={this.setPdfPath}
        setFolder={this.setPdfPath} pdfExists={this.state.pdfExists}
        templatePath={this.state.templatePath}
        folder={this.state.pdfPath}
        filename={this.state.pdfFile}
        setTemplatePath={this.setTemplatePath}
        />
        break

        case '/Redeem':
        rightPaneContent = <Redeem {...this.props} redeemLogin={this.redeemLogin} redeemLogout={this.redeemLogout} />
        break

        // case '/PDF':
        // rightPaneContent = <PDF accounts={this.state.accounts} config={this.props.config} pdf={this.state.pdfPath+'/'+this.state.pdfFile}  {...this.props}/>
        // break

        case '/UploadHtmlTemplate':
        rightPaneContent = <UploadHtmlTemplateModal config={this.props.config} folder={this.state.uploadFolder} setUploadFolder={this.setUploadFolder} {...this.props}/>
        break

        case '/CopyHtmlTemplate':
        rightPaneContent = <CopyHtmlTemplateModal config={this.props.config} folder={this.state.templatePath} setTemplatePath={this.setTemplatePath} {...this.props}/>
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

        case '/Settings':
        rightPaneContent = <Settings darkMode={this.state.darkMode} setDarkMode={this.setDarkMode}/>
        break

        case '/InstallerHome':
          rightPaneContent = <InstallerHome config={this.props.config}/>
        break

        default:
          rightPaneContent = <Home {...this.props} />
      }
    }

    return (
      <div id="wrapper">
         <div id="header">
           {headerContent}
         </div>
         <div id="contentWrapper">
           { !this.state.leftPaneHidden &&
             <div className='leftPaneContent'>
            { leftPaneContent }
             </div>
           }
           <div className='rightPaneContent'>
           {rightPaneContent}
           </div>
        </div>
         <div id="footer">
            <div className='footerContent'>{footerContent}</div>
         </div>
       </div>
    )
  }
}

export default AppMain
