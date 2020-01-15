import React, { Component } from 'react'
import { MemoryRouter, Switch, Route  } from 'react-router'
import axios from 'axios'

import AppMain from './components/Ui/Main/Main'

// import util from 'util'

import './App.css'

// const electron = window.require('electron')

class App extends Component {
  constructor(props) {
    super(props)

    this.updateUser = this.updateUser.bind(this)
    this.getDataAxios = this.getDataAxios.bind(this)

    this.state = {
      isLoading: true,
      users: [],
      isSorting: false,
      systemConfig: {

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
        },
        redeemAccount: {
          wif: '',
          address: ''
        }
      }
    }
  }

  componentWillMount() {
    let clientIp = this.getClientIp()
    
    let user = {
      ip: clientIp,
      admin: false,
      account: {
        wif: 'L2nQbvGZVvjZpdQ4pewsZpp4fFL1PnnwhLUNLaBSzRPkiwBTyU8k',
        address: 'APR3zqwFPmSwQgmZ3f3pVrnLmqbmBGHt2o',
        bip39: 'plastic aunt rent dose primary sustain mansion advance deputy love seat wagon water duty grant list friend thrive solid dog shell drop pizza knock'
      }
    }

    this.setState({user: user})
  }

  componentDidMount() {
  }

  async getClientIp() {
    // make a request to sails to find out
    let user = {
      ip: '127.0.0.1'
      // ip: 'blargl'
    }
    await this.setState({user: user})
    return user.ip
  }

  async getDataAxios(url) {
    const response = await axios.get(url)
    console.log(response.data)
  }

  async updateUser(user) {
    console.log('updateUser(): '+util.inspect(user, {depth: null}))
    await this.setState({user: user})
  }

  render() {
    return (
      <MemoryRouter>
        <Switch>
        <Route render={(props) => <AppMain {...props} config={this.state.systemConfig} user={this.state.user} updateUser={(user) => this.updateUser(user)}  />} />
        </Switch>
      </MemoryRouter>
    )
  }
}

export default App
