import React, { Component } from 'react'
import { MemoryRouter, Switch, Route  } from 'react-router'

import AppMain from './components/Ui/Main/Main'

// import util from 'util'

import './App.css'

// const electron = window.require('electron')

class App extends Component {
  constructor(props) {
      super(props)

      this.state = {
          isLoading: true,
          users: [],
          isSorting: false,
          systemConfig: {

          }
      }
  }

  componentWillMount() {
    let self = this

    // electron.ipcRenderer.on('check-install-reply', function (event, arg) {
    //   self.setState({ systemConfig: arg })
    //   console.log('userData :'+arg.userData)
    // })
    //
    // electron.ipcRenderer.send('check-install')
    //
    // electron.ipcRenderer.on('update-console-buffer', function (event, arg) {
    //   console.log('updating console buffer')
    //   // self.state.systemConfig.consoleBuffer.push(arg)
    //   // self.setState({ systemConfig: { consoleBuffer: self.state.systemConfig.consoleBuffer } })
    // })

    // electron.ipcRenderer.send('setup-event-manager')
  }

  componentDidMount() {
    // this.worker = new WebWorker(worker)
    //
    // this.worker.addEventListener('message', event => {
    //     const sortedList = event.data
    //     this.setState({
    //         users: sortedList
    //     })
    // })
  }

  handleSort() {
      // this.worker.postMessage(this.state.users)
  }

  render() {
    // if (this.state.systemConfig && this.state.systemConfig.isFirstRun === true) {
    //   console.log('redirecting to installer')
    //
    //   return (
    //     <MemoryRouter>
    //       <Switch>
    //       <Route render={(props) => <InstallerMain {...props} config={this.state.systemConfig} />} />
    //       </Switch>
    //     </MemoryRouter>
    //   )
    // }

    return (
      // <Main rightPaneContent={rightPaneContent} footerContent={footerContent} />

      <MemoryRouter>
        <Switch>
        <Route render={(props) => <AppMain {...props} config={this.state.systemConfig} />} />
        </Switch>
      </MemoryRouter>
    )
  }
}

export default App
