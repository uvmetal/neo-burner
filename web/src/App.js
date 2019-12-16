import React, { Component } from 'react'
import { MemoryRouter, Switch, Route  } from 'react-router'

import axios from 'axios'

import AppMain from './components/Ui/Main/Main'

import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.getClientIp = this.getClientIp.bind(this) // sails route to get request IP
    this.getAllowedAdminIps = this.getAllowedAdminIps.bind(this) // sails route to get ALLOWED admin request IPs
    this.getDataAxios = this.getDataAxios.bind(this) // http helper

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

  getClientIp() {
    // make a request to sails to find out
    let user = {
      ip: '127.0.0.1'
      // ip: 'blargl'
    }
    this.setState({user: user})
    return user.ip
  }

  getAllowedAdminIps() {
    let adminIps = ['localhost', '127.0.0.1']

    return adminIps
  }

  async getDataAxios(url){
    const response = await axios.get(url)
    console.log(response.data)
  }

  render() {
    return (
      <MemoryRouter>
        <Switch>
        <Route render={(props) => <AppMain {...props} config={this.state.systemConfig} user={this.state.user} />} />
        </Switch>
      </MemoryRouter>
    )
  }
}

export default App
