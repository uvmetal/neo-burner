import React, { Component } from 'react'
import { Jumbotron, Button } from 'reactstrap';
import { qrGen } from '../../neo-paper/qrpdf.js'

import util from 'util'

var remote = window.require('electron').remote
const electron = window.require('electron')

// import './style.css'

let qrImagePath = ''

let qr

class Wallets extends Component {
  constructor(props) {
    super(props)

    this.createQr = this.createQr.bind(this)

    this.state = {
    }
  }

  componentDidMount() {
    // qrImagePath = require(this.props.config.userData+'/public.png')
    // import qrImagePath from this.props.config.userData+'/public.png'
    electron.ipcRenderer.on('qr-created', function (event, arg) {
      console.log('got arg: '+arg)
      qrImagePath = arg
    })

    if (!qrImagePath) qrImagePath = this.props.config.userData+'/public.png'
  }

  createQr() {
    console.log('generating qr from accounts: ')

    electron.ipcRenderer.send('create-qr', this.props.accounts)

    //
    // qrImage = qrGen()
    //
    // qrImage.pipe(qr)

    // console.log('qr: '+util.inspect(qrImage.pipe(), {depth:null}))
  }

  render() {
    if (!qrImagePath) qrImagePath = this.props.config.userData+'/public.png'
    
    console.log('this.props.config: '+util.inspect(this.props.config.userData, {depth:null}))
    return(
      <React.Fragment>
        <Jumbotron className="vertical-center" id="ma">
        <div className="container hero-container text-center" id="ma">
          <h1 className="display-4">Wallets </h1>
          <p className="lead"></p>
          <hr className="my-4" />
          <p className="lead mx-auto">
          <Button onClick={this.createQr} color="warning">Generate</Button>
          <img src={require(qrImagePath)} width="100" height="20" className="img-fluid" alt="uvmetal" />

          </p>
        </div>
        </Jumbotron>
      </React.Fragment>
    )
  }
}
export default Wallets
