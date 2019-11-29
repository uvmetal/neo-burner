import React, { Component } from 'react'
import { Jumbotron, Button, Form, FormGroup, Input, Container } from 'reactstrap'

import { PDFDownloadLink } from '@react-pdf/renderer'

import PDF from './PDF.js'

import ReactToPrint from 'react-to-print'
import PrintTemplate from 'react-print'

import { QRCode } from 'react-qr-svg'
import { bip39 } from 'bip39'

import util from 'util'

// import './style.css'

import cozLogo from '../../images/coz-inverted.svg'

class Wallets extends Component {
  constructor(props) {
    super(props)

    this.goToAccounts = this.goToAccounts.bind(this)
    this.createPdf = this.createPdf.bind(this)

    this.state = {
      folder: '/tmp',
      filename: 'wallets.pdf'
    }
  }

  componentDidMount() {
    // console.log('accountsPath: '+util.inspect(this.props.config, {depth: null}))
    this.setState({ folder: this.props.folder })
  }

  goToAccounts() {
    this.props.history.push('Accounts')
  }

  createPdf() {
    // this.props.history.push('PDF')
    window.ipcRenderer.send('create-pdf', { path: this.state.folder+'/'+this.state.filename, data: this.props.accounts })
    console.log('wallet folder: '+this.state.folder+'/'+this.state.filename)
  }

  render() {
    if (this.props.accounts.length) {
      console.log('got '+this.props.accounts.length+' accounts')
      return(
        <React.Fragment>
          <Jumbotron className="vertical-center" id="ma">
          <div className="container hero-container text-center" id="ma">
            <h1 className="display-4">Wallets </h1>
            <p className="lead">Found {this.props.accounts.length} accounts.</p>
            <hr className="my-4" />
            <p className="lead mx-auto">
              <Container className="p-5">
                <Form id="accountsFormLeft">
                  <FormGroup>
                    <div id="upload_button">
                      <label>
                        <input directory="" webkitdirectory="" type="file" id="ma"
                          onChange={e => this.setState({ folder: document.getElementsByTagName('input')[0].files[0].path })}
                          />
                        <span class="btn btn-primary">Choose Path</span>
                        {' '+this.state.folder}
                      </label>
                    </div>
                    <Input
                      style={{width: "400px"}}
                      type="text"
                      name="text"
                      placeholder="File Name"
                      value={this.state.filename}
                      onChange={e => this.setState({ filename: e.target.value })}
                    />
                  </FormGroup>
                </Form>
                <Button onClick={this.createPdf} color="warning" >Create PDF</Button><br/>

              </Container>
            </p>
          </div>
          </Jumbotron>
        </React.Fragment>
      )
    } else {
      return(
        <React.Fragment>
          <Jumbotron className="vertical-center" id="ma">
          <div className="container hero-container text-center" id="ma">
            <h1 className="display-4">Wallets </h1>
            <p className="lead">Found {this.props.accounts.length} accounts.</p>
            <hr className="my-4" />
            <p className="lead mx-auto">
            </p>
            <Button onClick={this.goToAccounts} color="warning" >Go To Accounts</Button>

          </div>
          </Jumbotron>

        </React.Fragment>
      )
    }

  }
}
export default Wallets

// class Example extends React.Component {
//   render() {
//     return (
//       <div>
//         <ReactToPrint
//           trigger={() => <a href="#">Print this out!</a>}
//           content={() => this.componentRef}
//         />
//         <Wallets ref={el => (this.componentRef = el)} />
//       </div>
//     )
//   }
// }
// <img src={require(qrImagePath)} width="100" height="20" className="img-fluid" alt="uvmetal" />
// <Button onClick={this.createQr} color="warning">Generate</Button>
// <div id="padQr"><QRCode value={account._address} bgColor="#000000" fgColor="#ffFFff" level="Q" style={{ width: 100, height: 100 }} /><br/>{' '}</div>
// {this.createQrCodesFromAccounts()}
// <img src={cozLogo}/>

// <PDFDownloadLink document={<PDF accounts={this.props.accounts} />} fileName="wallets.pdf" >
//   { "Download Pdf" }
//   </PDFDownloadLink>
