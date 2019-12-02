import React, { Component } from 'react'

import HeaderControls from '../HeaderControls/HeaderControls'
import VerticalNav from '../VerticalNav/VerticalNav'

import InstallerHome  from '../../Installer/Home'

import Accounts from '../../App/Accounts'
import Wallets from '../../App/Wallets'
import About from '../../App/About'
import New from '../../App/New'
import Import from '../../App/Import'
import Export from '../../App/Export'
import Report from '../../App/Report'
import Events from '../../App/Events'
import Home from '../../App/Home'
import Settings from '../../App/Settings'
import PDF from '../../App/PDF'

import DownloadHtmlTemplateModal from '../../App/DownloadHtmlTemplate'
import UploadHtmlTemplateModal from '../../App/UploadHtmlTemplate'

import Footer from '../../Ui/Main/Footer'

import util from 'util'

// import './style.css'

const electron = window.require('electron')

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
    this.setTemplateFolder = this.setTemplateFolder.bind(this)
    this.writeUserSettings = this.writeUserSettings.bind(this)

    this.state = {
      leftPaneHidden: true,
      hideWorkspaceRollup: true,
      hideSettingsRollup: true,
      accounts: [],
      tutorialMode: true,
      darkMode: 'true',
      folder: '/tmp',
      accountsFile: '',
      templateFolder: '',
      pdfPath: 'wallets.pdf',
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
      accountsPath: this.state.folder,
      accountsFile: this.state.accountsFile,
      pdfPath: this.state.pdfPath,
      pdfFile: this.state.pdfFile,
      templatePath: this.state.templateFolder
    }
    electron.ipcRenderer.send('write-user-settings', settings)
  }

  setFolder(folder) {
    console.log('main setting folder: '+folder)
    this.setState({folder: folder})
    this.writeUserSettings()
  }

  setTemplateFolder(folder) {
    console.log('main setting template folder: '+folder)
    this.setState({templateFolder: folder})
    this.writeUserSettings()
  }

  setAccounts(accounts, folder, filename) {
    console.log('got accounts in main: '+util.inspect(accounts, {depth: null}))
    this.setState({
      accounts: accounts,
      folder: folder,
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

  setPdfPath(folder, file) {
    console.log('setPdfPath(): '+folder+file)
    this.setState({
      folder: folder,
      pdfPath: folder+file,
      pdfFile: file,
      pdfExists: true
    })

    this.writeUserSettings()
  }

  setDarkMode(e) {
    // TODO Fix this it only works one way - from dark to light, can't return
    console.log('darkMode: '+e.target.checked)
    this.setState({ darkMode: e.target.checked })

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
          />
        break

        case '/Wallets':
        rightPaneContent = <Wallets accounts={this.state.accounts} config={this.props.config}
        folder={this.state.folder} {...this.props} setPdfPath={this.setPdfPath}
        setFolder={this.setFolder} pdfExists={this.state.pdfExists} templateFolder={this.state.templateFolder} setTemplateFolder={this.setTemplateFolder}
        />
        break

        case '/PDF':
        rightPaneContent = <PDF accounts={this.state.accounts} config={this.props.config} pdf={this.state.pdfPath}  {...this.props}/>
        break

        case '/UploadHtmlTemplate':
        rightPaneContent = <UploadHtmlTemplateModal config={this.props.config} folder={this.state.uploadFolder} setUploadFolder={this.setUploadFolder} {...this.props}/>
        break

        case '/DownloadHtmlTemplate':
        rightPaneContent = <DownloadHtmlTemplateModal config={this.props.config} folder={this.state.templateFolder} setTemplateFolder={this.setTemplateFolder} {...this.props}/>
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
