import React, { Component } from 'react'
import { MemoryRouter, Switch, Route  } from 'react-router'

import axios from 'axios'

import AppMain from './components/Ui/Main/Main'

import util from 'util'

import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      users: [],
      isSorting: false,
      systemConfig: {
        dbPort: 27017,
        dbHost: 'localhost'
      },
      user: {
        name: '',
        email: '',          // not required if not admin - observe in sails schema
        loggedIn: false,
        admin: false,
        ip: '',
        account: {
          wif: '',
          address: ''
        }
      }
    }
  }

  componentWillMount() {
    let clientIp = this.getClientIp()
    let allowedAdminIps = this.getAllowedAdminIps()

    let user = {
      ip: clientIp,
      admin: false
    }

    allowedAdminIps.forEach((adminIp) => { // maintain by sails admin session
      if (adminIp === clientIp) {
        user.admin = true
        console.log('found admin ip: '+adminIp+' = '+clientIp)
        return
      } else {
        console.log('not an admin ip: '+clientIp+' != '+adminIp)
      }
    })
    
    this.setState({user: user})
  }

  componentDidMount() {
  }

  getClientIp = () => {
    // make a request to sails to find out
    let user = {
      ip: '127.0.0.1'
      // ip: 'blargl'
    }
    this.setState({user: user})
    return user.ip
  }

  getAllowedAdminIps = () => {
    let adminIps = ['localhost', '127.0.0.1']

    return adminIps
  }

  getDataAxios = async (url) => {
    const response = await axios.get(url)
    console.log(response.data)
  }

  updateUser = async (user) => {
    console.log('updateUser(): '+util.inspect(user, {depth: null}))
    await this.setState({user: user})
  }

  render() {
    return (
      <MemoryRouter>
        <Switch>
        <Route render={(props) => <AppMain {...props} config={this.state.systemConfig} user={this.state.user} updateUser={(user) => this.updateUser(user)} />} />
        </Switch>
      </MemoryRouter>
    )
  }
}

export default App
