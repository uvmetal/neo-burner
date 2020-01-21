import React, { Component } from 'react'
import { MemoryRouter, Switch, Route  } from 'react-router'
import axios from 'axios'
import https from 'https'

import * as web from './httpHelpers'

import AppMain from './components/Ui/Main/Main'

import util from 'util'

import './App.css'

// TODO REMEMBER to set this to production using process.env
let baseUrl  = 'http://localhost:1337'

let instance

class App extends Component {
  constructor(props) {
    super(props)

    this.updateUser = this.updateUser.bind(this)
    this.getDataAxios = this.getDataAxios.bind(this)
    this.putDataAxios = this.putDataAxios.bind(this)
    this.postDataAxios = this.postDataAxios.bind(this)

    this.state = {
      isLoading: true,
      users: [],
      isSorting: false,
      systemConfig: {

      },
      _csrf: '',
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

  async componentWillMount() {
    // instance = await axios.create({
  	// 	// jar:cookieJar,
    //   baseURL: baseUrl,
  	// 	withCredentials: true,
  	// 	httpsAgent: new https.Agent({ rejectUnauthorized: false, requestCert: true, keepAlive: true})
  	// })

    instance = web.init({
  		// jar:cookieJar,
      baseURL: baseUrl,
  		withCredentials: true,
  		httpsAgent: new https.Agent({ rejectUnauthorized: false, requestCert: true, keepAlive: true })
    })

    // const response = await instance.get('http://localhost:1337/api/v1/security/grant-csrf-token')

    web.get('http://localhost:1337/api/v1/security/grant-csrf-token').then(function(response) {

      const _csrf = response.data._csrf
      console.log('_csrf: '+_csrf)

      instance.defaults.headers.common['X-CSRF-TOKEN'] = _csrf

      console.log('axios headers: '+instance.defaults.headers.common['X-CSRF-TOKEN'])

      web.put('/api/v1/redeem/do-redeem-login', {data: 'test data', type: 'bip'})
    })

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

  async componentDidMount() {
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
    const response = await instance.get(url)
    console.log(response.data)
  }

  async putDataAxios(url, data) {
    const response = await instance.put(url, data)
    console.log(response.data)
  }

  async postDataAxios(url, data) {
    const response = await instance.post(url, data)
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
