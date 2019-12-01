import React, { Component } from 'react'
import { Jumbotron, Button, Form, FormGroup, Input, Container, ButtonGroup } from 'reactstrap'
import FlashButton from '../Ui/FlashButton/FlashButton'

import util from 'util'

const electron = window.require('electron')

class Wallets extends Component {
  constructor(props) {
    super(props)

    this.goToAccounts = this.goToAccounts.bind(this)
    this.setFolder = this.setFolder.bind(this)
    this.createPdf = this.createPdf.bind(this)
    this.viewPdf = this.viewPdf.bind(this)
    this.customizePdf = this.customizePdf.bind(this)
    this.resetTemplatePath = this.resetTemplatePath.bind(this)
    // this.currentModalBody = this.currentModalBody.bind(this)

    // TODO Refactor state/prop management

    this.state = {
      folder: '',
      filename: 'wallets.pdf',
      templateFolder: '',
      generatingPdf: false,
      pdfExists: false,
      currentModal: '',
      nextButtonText: 'Next',
      nextModalClick: '',
      cancelButtonText: 'Cancel',
      cancelModalClick: '',
      modalBody: ''
    }
  }

  componentDidMount() {
    // console.log('accountsPath: '+util.inspect(this.props.config, {depth: null}))
    console.log('templateFolder: '+this.props.templateFolder)
    this.setState({ folder: this.props.folder, pdfExists: this.props.pdfExists })

    electron.ipcRenderer.on('pdf-created', (event, arg) => {
      console.log('ipc pdf-created')
      this.props.setPdfPath(this.state.folder+'/', this.state.filename)
      this.setState({
        generatingPdf: false,
        pdfExists: true
      })
      this.props.history.push('Wallets')
    })
  }

  goToAccounts() {
    this.props.history.push('Accounts')
  }

  setFolder(e) {
    this.setState({ folder: document.getElementsByTagName('input')[0].files[0].path })
    this.props.setFolder(document.getElementsByTagName('input')[0].files[0].path)
  }

  createPdf() {
    this.setState({ generatingPdf: true })
    this.props.history.push('Wallets')
    let templateFolder
    if (this.props.templateFolder) templateFolder = this.props.templateFolder
    else templateFolder = this.props.config.userData+'/'
    // this.props.history.push('PDF')
    window.ipcRenderer.send('create-pdf', { pdfPath: this.state.folder+'/', filename: this.state.filename, templateFolder: templateFolder, data: this.props.accounts })
    console.log('wallet folder: '+this.state.folder+'/'+this.state.filename)
  }

  viewPdf() {
    this.props.history.push('PDF')
  }

  customizePdf() {
    this.props.history.push('DownloadHtmlTemplate')
  }

  nextModal() {
    console.log('nextClick')
  }

  resetTemplatePath(){
    this.props.setTemplateFolder(this.props.config.userData+'/')
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
            <p className="lead mx-auto">
              <Container className="p-5">
                <Form id="accountsFormLeft">
                  <FormGroup>
                    <div id="upload_button">
                      <label>
                        <input directory="" webkitdirectory="" type="file" id="ma"
                          onChange={e => this.setFolder(e)}
                          />
                        <span class="btn btn-primary">PDF Output Path</span>
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
                  <ButtonGroup>
                  <FlashButton buttonLabel='Create PDF' title={'Burn Notice'} message={'Please wait while a PDF containing '+this.props.accounts.length+' wallets is being generated at '+this.state.folder+'/'+this.state.filename} open={this.state.generatingPdf} onClick={this.createPdf}/>
                  <Button onClick={this.customizePdf} color="warning" >Set Template Path</Button>
                  <Button onClick={this.resetTemplatePath} color="warning" >Reset Template Path</Button>
                  {' '}
                  {this.state.pdfExists ? <Button onClick={this.viewPdf} color="warning" >View PDF</Button> : ''}
                  </ButtonGroup>
                  <br/>
                  Template Path: {this.props.templateFolder ? this.props.templateFolder : this.props.config.userData+'/' }
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
// <UploadHtmlTemplateModal config={this.props.config} folder={this.props.folder} />
// <DownloadHtmlTemplateModal config={this.props.config} folder={this.props.folder} />
