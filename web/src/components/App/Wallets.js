import React, { Component } from 'react'
import { Jumbotron, Button, Form, FormGroup, Input, Container, ButtonGroup } from 'reactstrap'
import FlashButton from '../Ui/FlashButton/FlashButton'

import util from 'util'

// const electron = window.require('electron')

class Wallets extends Component {
  constructor(props) {
    super(props)

    this.state = {
      folder: this.props.folder,
      filename: this.props.filename,
      templatePath: this.props.templatePath,
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
    // console.log('config: '+util.inspect(this.props.config, {depth: null}))
    console.log('templatePath: '+this.props.templatePath)
    this.setState({ folder: this.props.folder, pdfExists: this.props.pdfExists })

    // electron.ipcRenderer.on('pdf-created', (event, arg) => {
    //   console.log('ipc pdf-created')
    //   this.props.setPdfPath(this.state.folder+'/', this.state.filename)
    //   this.setState({
    //     generatingPdf: false,
    //     pdfExists: true
    //   })
    //   this.props.history.push('Wallets')
    // })
  }

  goToAccounts = () => {
    this.props.history.push('Accounts')
  }

  setFolder = (e) => {
    this.setState({ folder: document.getElementsByTagName('input')[0].files[0].path })
    this.props.setFolder(document.getElementsByTagName('input')[0].files[0].path)
  }

  createPdf = () => {
    this.setState({ generatingPdf: true })
    this.props.setPdfPath(this.state.folder+'/', this.state.filename)
    this.props.history.push('Wallets')
    let templatePath
    if (this.props.templatePath) templatePath = this.props.templatePath
    else templatePath = this.props.config.userData+'/'
    // this.props.history.push('PDF')
    // window.ipcRenderer.send('create-pdf', { pdfPath: this.state.folder+'/', filename: this.state.filename, templatePath: templatePath, data: this.props.accounts })
    console.log('wallet folder: '+this.state.folder+'/'+this.state.filename)
  }

  viewPdf = () => {
    this.props.history.push('PDF')
  }

  customizePdf = () => {
    this.props.history.push('CopyHtmlTemplate')
  }

  nextModal = () => {
    console.log('nextClick')
  }

  resetTemplatePath = () => {
    this.props.setTemplatePath(this.props.config.userData+'/')
  }

  render() {
    if (this.props.accounts.length) {
      console.log('got '+this.props.accounts.length+' accounts')
      return(
        <React.Fragment>
          <Jumbotron className="vertical-center" id="ma">
          <div className="container hero-container text-center" id="ma">
            <h2 className="display-4">Wallets </h2>
            <p className="lead" id="fourteenFont">Found {this.props.accounts.length} accounts.</p>
              <Container className="p-5">
                <Form id="accountsFormLeft">
                  <FormGroup id="fourteenFont">
                    <div id="upload_button">
                      <label id="fourteenFont">
                        <input directory="" webkitdirectory="" type="file" id="ma"
                          onChange={e => this.setFolder(e)}
                          />
                        <span className="btn btn-primary" id="fourteenFont">PDF Output Path</span>
                        <span id="fourteenFont">{' '+this.state.folder}</span>
                      </label>
                    </div>
                    <Input
                      style={{width: "400px"}}
                      type="text"
                      name="text"
                      placeholder="File Name"
                      value={this.state.filename}
                      onChange={e => this.setState({ filename: e.target.value })}
                      id="fourteenFont"
                    />
                    <br/>
                    <ButtonGroup>
                    <FlashButton buttonLabel='Create PDF' title={'Burner Notice'} message={'Please wait while a PDF containing '+this.props.accounts.length+' wallets is being generated at '+this.state.folder+'/'+this.state.filename} open={this.state.generatingPdf} onClick={this.createPdf}/>
                    {this.state.pdfExists ? <Button onClick={this.viewPdf} color="warning" id="fourteenFont">View PDF</Button> : ''}
                    </ButtonGroup>
                  </FormGroup>
                  <ButtonGroup>
                    <Button onClick={this.customizePdf} color="warning"  id="fourteenFont">Set Template Path</Button>
                    <Button onClick={this.resetTemplatePath} color="warning" id="fourteenFont">Reset Template Path</Button>
                  </ButtonGroup>
                  <div id="fourteenFont">
                  Template Path: {this.props.templatePath ? this.props.templatePath : this.props.config.userData+'/' }
                  </div>
                </Form>
              </Container>
          </div>
          </Jumbotron>
        </React.Fragment>
      )
    } else {
      return(
        <React.Fragment>
          <Jumbotron className="vertical-center" id="ma">
          <div className="container hero-container text-center" id="ma">
            <h2 className="display-4">Wallets </h2>
            <p className="lead" id="fourteenFont">Found {this.props.accounts.length} accounts.</p>
            <hr className="my-4" />
            <p className="lead mx-auto">
            </p>
            <Button onClick={this.goToAccounts} color="warning" id="fourteenFont">Go To Accounts</Button>
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
