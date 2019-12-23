import React, { Component } from 'react'

import HeaderControls from '../HeaderControls/HeaderControls'
import VerticalNav from '../VerticalNav/VerticalNav'

import InstallerHome  from '../../Installer/Home'

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

import About from '../../App/About'

import Settings from '../../App/Settings'


import Accounts from '../../App/Accounts'
import Wallets from '../../App/Wallets'
import New from '../../App/New'
import Import from '../../App/Import'
import Export from '../../App/Export'
import Report from '../../App/Report'
import Home from '../../App/Home'
import PDF from '../../App/PDF'

import CopyHtmlTemplateModal from '../../App/CopyHtmlTemplate'
import UploadHtmlTemplateModal from '../../App/UploadHtmlTemplate'

import Footer from '../../Ui/Main/Footer'

import util from 'util'

// import './style.css'

// TODO Escape buttons should go back

let user

class AppMain extends Component {
  constructor(props) {
    super(props)

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

    console.log('user :'+util.inspect(this.props.user, {depth: null}))
    console.log('userData :'+util.inspect(this.props.config, {depth: null}))
  }

  componentDidMount() {
  }

  writeUserSettings = () => {
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

  setFolder = async (folder) => {
    console.log('main setting folder: '+folder)
    await this.setState({folder: folder})
    this.writeUserSettings()
  }

  setTemplatePath = async (folder) => {
    console.log('main setting template folder: '+folder)
    await this.setState({templatePath: folder})
    this.writeUserSettings()
  }

  setAccounts = async (accounts, folder, filename) => {
    console.log('got accounts in main: '+util.inspect(accounts, {depth: null}))
    await this.setState({
      accounts: accounts,
      accountsPath: folder,
      accountsFile: filename
    })

    // this.writeUserSettings()
  }

  clearAccounts = (accounts) => {
    console.log('clearing accounts: '+this.state.accounts)
    this.setState({
      accounts: []
    })
  }

  setEvents = async (events) => {
    console.log('got events in main: '+util.inspect(events, {depth: null}))
    await this.setState({
      events: events
    })
  }

  clearEvents = (events) => {
    console.log('clearing events: '+this.state.events)
    this.setState({
      events: []
    })
  }

  setPdfPath = async (folder, file) => {
    console.log('setPdfPath(): '+folder+file)
    await this.setState({
      pdfPath: folder,
      pdfFile: file,
      pdfExists: true
    })

    this.writeUserSettings()
  }

  setDarkMode = async (e) => {
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

  toggleVerticalNavRollup = (rollup) => {
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

  leftPaneToggleHidden = () => {
    this.setState({
      leftPaneHidden: !this.state.leftPaneHidden
    })
  }

  loginUser = async (admin) => {
    // call sails and get a session
    user = this.props.user
    user.loggedIn = true
    this.props.updateUser(user)
    // this.props.history.push(this.props.location.referrer)

    if (admin) {
      this.props.history.push('/Admin')
      // this.props.history.push({pathname: '/Login', referrer: '/Admin'})

    } else {
      // this.props.history.push({pathname: '/Login', referrer: '/Home'})
      this.props.history.push('/Home')
    }
  }

  logoutUser = async () => {
    user = this.props.user
    user.loggedIn = false
    this.props.updateUser(user)
    this.props.history.push('/Home')
  }

  render() {
    let headerContent = this.props.headerContent ? this.props.headerContent :
      <HeaderControls {...this.props} leftPaneToggleHidden={this.leftPaneToggleHidden} loginUser={(user) => this.loginUser(user)} />

    let leftPaneContent = <VerticalNav hidden={this.state.leftPaneHidden} hideWorkspaceRollup={this.state.hideWorkspaceRollup} hideSettingsRollup={this.state.hideSettingsRollup} toggleRollup={this.toggleVerticalNavRollup} />

    let rightPaneContent = this.props.rightPaneContent ? this.props.rightPaneContent : ''
    let footerContent = this.props.footerContent ? this.props.footerContent : <Footer />

    if (this.props && this.props.location && this.props.location.pathname) {
      console.log('this.props.user: '+util.inspect(this.props.user, {depth: null}))
      rightPaneContent = <Home />

      switch(this.props.location.pathname) {

        case '/About':
        rightPaneContent = <About />
        break

        case '/Admin':
        rightPaneContent = <Admin {...this.props}/>
        break

        case '/AdminAccounts':
        rightPaneContent = <AdminAccounts {...this.props}
          accounts={this.state.accounts}
          setAccounts={this.setAccounts}
          clearAccounts={this.clearAccounts}
          />
        break

        case '/AdminEvents':
        rightPaneContent = <AdminEventList {...this.props}
          events={this.state.events}
        />
        break

        case '/AdminViewEvent':
        rightPaneContent = <ViewEvent {...this.props} />
        break

        case '/AdminEditEvent':
        rightPaneContent = <EditEvent {...this.props}
          setAccounts={this.setAccounts}
          setEvents={this.setEvents}
          clearEvents={this.clearEvents}
          />
        break

        case '/AdminAddEvent':
        rightPaneContent = <AddEvent {...this.props}
          events={this.state.events}
          setAccounts={this.setAccounts}
          setEvents={this.setEvents}
          clearEvents={this.clearEvents}
        />
        break

        case '/Login':

        break

        case '/Logout':
          this.logoutUser()
        break

        case '/Redeem':
          rightPaneContent = <Redeem {...this.props} />
        break

        case '/ViewAccount':
          rightPaneContent = <ViewAccount {...this.props} />
        break

        case '/ChooseWallet':
          rightPaneContent = <ChooseWallet {...this.props} />
        break

        case '/SendFunds':
          rightPaneContent = <SendFunds {...this.props} />
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

        case '/PDF':
        rightPaneContent = <PDF accounts={this.state.accounts} config={this.props.config} pdf={this.state.pdfPath+'/'+this.state.pdfFile}  {...this.props}/>
        break

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
