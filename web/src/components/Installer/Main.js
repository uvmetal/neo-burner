import React, { Component } from 'react'

import InstallerHome  from './Home'
import Footer from './Footer'
import InstallerHeaderControls from './HeaderControls'
import InstallerNav  from './VerticalNav'

import About from '../App/About'


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
    let footerContent = this.props.footerContent ? this.props.footerContent : <Footer />

    if (this.props && this.props.location && this.props.location.pathname) {

      // console.log('pathname: ' + this.props.location.pathname)
      // console.log(this.props.config.consoleBuffer)

      rightPaneContent = <InstallerHome />

      switch(this.props.location.pathname) {

        case '/About':
        rightPaneContent = <About />
        break

        default:
          rightPaneContent = <InstallerHome config={this.props.config} />
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
export default InstallerMain
