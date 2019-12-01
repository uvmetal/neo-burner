import React, { Component } from 'react'
import { Jumbotron, Button, Form, FormGroup, Input, Container } from 'reactstrap'
import BurnerModal from '../Ui/Modal/Modal'
import FlashButton from '../Ui/FlashButton/FlashButton'

import { PDFDownloadLink } from '@react-pdf/renderer'

import PDF from './PDF.js'

import ReactToPrint from 'react-to-print'
import PrintTemplate from 'react-print'

import { QRCode } from 'react-qr-svg'
import { bip39 } from 'bip39'

import util from 'util'

const electron = window.require('electron')

class Wallets extends Component {
  constructor(props) {
    super(props)

    this.goToAccounts = this.goToAccounts.bind(this)
    this.createPdf = this.createPdf.bind(this)
    this.viewPdf = this.viewPdf.bind(this)

    this.state = {
      folder: '/tmp',
      filename: 'wallets.pdf',
      generatingPdf: false,
      pdfExists: false
    }
  }

  componentDidMount() {
    // console.log('accountsPath: '+util.inspect(this.props.config, {depth: null}))
    this.setState({ folder: this.props.folder })

    electron.ipcRenderer.on('pdf-created', (event, arg) => {
      console.log('ipc pdf-created')
      this.props.setPdfPath(this.state.folder+'/'+this.state.filename)
      this.state.generatingPdf = false
      this.state.pdfExists = true
      this.props.history.push('Wallets')
    })
  }

  goToAccounts() {
    this.props.history.push('Accounts')
  }

  createPdf() {
    this.state.generatingPdf = true
    this.props.history.push('Wallets')
    // this.props.history.push('PDF')
    window.ipcRenderer.send('create-pdf', { path: this.state.folder+'/', filename: this.state.filename, data: this.props.accounts })
    console.log('wallet folder: '+this.state.folder+'/'+this.state.filename)
  }

  viewPdf() {
    this.props.history.push('PDF')
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
                  <FlashButton buttonLabel='Create PDF' title={'Burn Notice'} message={'Please wait while a PDF containing '+this.props.accounts.length+' wallets is being generated at '+this.state.folder+'/'+this.state.filename} open={this.state.generatingPdf} onClick={this.createPdf}/>
                  {' '}
                  <br/>
                  {this.state.pdfExists ? <Button onClick={this.viewPdf} color="warning" >View PDF</Button> : ''}
                </Form>
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
