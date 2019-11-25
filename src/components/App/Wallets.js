import React, { Component } from 'react'
import { Jumbotron, Button } from 'reactstrap';
import { QRCode } from 'react-qr-svg';
import { bip39 } from 'bip39'

import util from 'util'

// import './style.css'

class Wallets extends Component {
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
    let i = 0
    this.props.accounts.forEach((account) => {
      console.log('account: '+account)

      qrCodes.push(
        <div key={i}>
          <img style={{'max-width': 150, height: 60}} src="./images/neo-logo-xp.png"  />

          <img style={{position: 'absolute', top: 0, right: 0,'max-width': 650, width:350, padding: 10}} src="./images/coz-inverted.svg" />
            <div style={{position: 'absolute', 'z-index': 1, left: 33, top: 40, width: 250, height: 150, 'font-size': 21, 'letter-spacing': -1}}>
              <br/><br/><br/>
              <div>
                Public Address<br/>
                Share this to get loot! **PUBLIC**
              </div>
                <QRCode value={account._address} bgColor="#000000" fgColor="#ffFFff" level="Q" style={{ width: 100, height: 100 }} />
              </div>
            <div style={{position: 'absolute', 'z-index': 1, left: 400, top: 40, width: 250, height: 150, 'font-size': 21, 'letter-spacing': -1}}>
                <br/><br/><br/>
                <div style={{'word-wrap': 'break-word', 'max-width': 200, width: 200}}>
                  URL<br/>
                  **URL** <br/>
                  <br/>
                </div>


            </div>

            <div class="" style={{position: 'absolute', left: 33, top: 430, width: 350, height: 250}} >

                <div style={{'font-family': 'VT323', 'margin-top': 0, 'font-size': 21, 'padding-bottom': 20}} >
                    WIF (DO NOT SHARE)<br/>
                    Import to mobile or desktop wallet.
                </div>

                <QRCode value={account._privateKey} bgColor="#000000" fgColor="#ffFFff" level="Q" style={{ width: 100, height: 100 }} />
            </div>
            <div class="" style={{position: 'absolute', left:400, top:430, width:350, height: 250}} >

                <div style={{'font-family': 'VT323', 'margin-top': 0, 'font-size': 21, 'padding-bottom': 20}} >
                    BIP-39 Seed <br/>
                    (DO NOT SHARE)
                </div>


            </div>
            <div class="" style={{position: 'absolute', left:33, top:770, width: 300, height: 5}} >
              https://github.com/cityofzion/neo-paper v1.0.1
            </div>
        </div>
      )
      i++
    })
    return qrCodes
  }

  render() {
    if (this.props.accounts) {
      console.log('got '+this.props.accounts.length+' accounts')
      return(
        <React.Fragment>
          <Jumbotron className="vertical-center" id="ma">
          <div className="container hero-container text-center" id="ma">
            <h1 className="display-4">Wallets </h1>
            <p className="lead">Found {this.props.accounts.length} accounts.</p>
            <hr className="my-4" />
            <p className="lead mx-auto">

            </p>
            {this.createQrCodesFromAccounts()}
          </div>
          </Jumbotron>
        </React.Fragment>
      )
    } else {

    }

  }
}
export default Wallets
// <img src={require(qrImagePath)} width="100" height="20" className="img-fluid" alt="uvmetal" />
// <Button onClick={this.createQr} color="warning">Generate</Button>
// <div id="padQr"><QRCode value={account._address} bgColor="#000000" fgColor="#ffFFff" level="Q" style={{ width: 100, height: 100 }} /><br/>{' '}</div>
