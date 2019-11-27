import React, { Component } from 'react'
import { Jumbotron, Button } from 'reactstrap'

import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer'

// import ReactToPrint from 'react-to-print'
// import PrintTemplate from 'react-print'
//
import { QRCode } from 'react-qr-svg'
import { bip39 } from 'bip39'

import util from 'util'

// import './style.css'

class PDF extends Component {
  constructor(props) {
    super(props)

    this.createQrCodesFromAccounts = this.createQrCodesFromAccounts.bind(this)

    this.state = {
    }
  }

  componentDidMount() {

  }

  createQrCodesFromAccounts() {
    let qrCodes = []
    let i = 40, j = 430, k = 770
    this.props.accounts.forEach((account) => {
      console.log('account: '+account)

      qrCodes.push(
        <div key={i}>
          <img style={{'max-width': 150, height: 60}} src="./images/neo-logo-xp.png"  />

          <img style={{position: 'absolute', top: 40, right: 0,'max-width': 650, width:350, padding: 10}} src="./images/coz-inverted.svg" />
            <div style={{position: 'absolute', 'z-index': 1, left: 33, top: i, width: 250, height: 150, 'font-size': 21, 'letter-spacing': -1}}>
              <br/><br/><br/>
              <div>
                Public Address<br/>
                Share this to get loot! {account.address}
              </div>
                <QRCode value={account._address} bgColor="#000000" fgColor="#ffFFff" level="Q" style={{ width: 100, height: 100 }} />
              </div>
            <div style={{position: 'absolute', 'z-index': 1, left: 400, top: i, width: 250, height: 150, 'font-size': 21, 'letter-spacing': -1}}>
                <br/><br/><br/>
                <div style={{'word-wrap': 'break-word', 'max-width': 200, width: 200}}>
                  URL: <br/>
                  {account.url} <br/>
                  <br/>
                </div>

                <QRCode value={account.url} bgColor="#000000" fgColor="#ffFFff" level="Q" style={{ width: 100, height: 100 }} />

            </div>

            <div class="" style={{position: 'absolute', left: 33, top: j, width: 350, height: 250}} >

                <div style={{'font-family': 'VT323', 'margin-top': 0, 'font-size': 21, 'padding-bottom': 20}} >
                    WIF (DO NOT SHARE)<br/>
                    Import to mobile or desktop wallet.
                </div>

                <QRCode value={account._WIF} bgColor="#000000" fgColor="#ffFFff" level="Q" style={{ width: 100, height: 100 }} />
            </div>
            <div class="" style={{position: 'absolute', left:400, top:j, width:350, height: 250}} >

                <div style={{'font-family': 'VT323', 'margin-top': 0, 'font-size': 21, 'padding-bottom': 20}} >
                    BIP-39 Seed <br/>
                    (DO NOT SHARE)
                </div>
            <QRCode value={account._bip39} bgColor="#000000" fgColor="#ffFFff" level="Q" style={{ width: 100, height: 100 }} />

            </div>
            <div class="" style={{position: 'absolute', left:33, top:k, width: 300, height: 5}} >
              https://github.com/cityofzion/neo-paper v1.0.1
            </div>
        </div>
      )
      // i++
      i+=530
      j+=530
      k+=530
    })
    return qrCodes
  }

  render() {
    if (this.props.accounts.length) {
      console.log('got '+this.props.accounts.length+' accounts')
      return(
        <React.Fragment>
          <Jumbotron className="vertical-center" id="ma">
          <div className="container hero-container text-center" id="ma">
            <h1 className="display-4">PDF </h1>
            <p className="lead">Found {this.props.accounts.length} accounts.</p>
            <hr className="my-4" />
            <p className="lead mx-auto">

            </p>
            <Button onClick={this.createPdf} color="warning" >Create PDF</Button>
            {this.createQrCodesFromAccounts}
          </div>
          </Jumbotron>

        </React.Fragment>
      )
    }
  }
}

export default PDF
