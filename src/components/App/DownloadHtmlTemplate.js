import React, { Component } from 'react'
import { Jumbotron, Form, FormGroup, Input, Container, Button, ButtonGroup } from 'reactstrap'
// import './style.css'

class DownloadHtmlTemplateModal extends Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.continue = this.continue.bind(this)
    this.skip = this.skip.bind(this)
    this.goBack = this.goBack.bind(this)
    this.setFolder = this.setFolder.bind(this)

    this.state = {
      modal: false,
      folder: this.props.folder
    }
  }

  componentDidMount() {

  }

  toggle() {
    this.setState({ modal: !this.state.modal })
  }

  continue() {
    let options = {
      dest: this.state.folder+'/'
    }
    window.ipcRenderer.send('copy-template', options)
    console.log('send ipc copy-template to '+this.state.folder+'/')
    this.props.setTemplateFolder(this.state.folder)
    this.props.history.push('Wallets')
  }

  skip() {
    this.props.history.push('Wallets')
  }

  goBack() {
    this.props.history.push('Wallets')
  }

  setFolder(e) {
    if(document.getElementsByTagName('input')[0]) {
      console.log('template folder: '+document.getElementsByTagName('input')[0].files[0].path )
      this.setState({ folder: document.getElementsByTagName('input')[0].files[0].path })
      this.props.setTemplateFolder(document.getElementsByTagName('input')[0].files[0].path)
    }
  }

  render() {
    return(
      <React.Fragment>
        <Jumbotron className="vertical-center" id="ma">
        <div className="container hero-container text-center" id="ma">
          <h2 className="display-4">Copy Template </h2>
          <p className="lead" id="fourteenFont">Copy and modify the default template to change the default wallet PDF appearance.</p>
          <hr className="my-4" />
          <p className="lead mx-auto">
              <Container className="p-5" >
                <Form id="accountsFormLeft">
                  <FormGroup>
                    <div id="upload_button">
                      <label>
                        <input directory="" webkitdirectory="" type="file" id="ma"
                          onChange={e => this.setFolder(e)}
                        />
                        <span class="btn btn-primary" id="fourteenFont">Choose Where to Save</span>
                        <span id="fourteenFont">{' '+this.state.folder}</span>
                      </label>
                    </div>
                    </FormGroup>
                    <ButtonGroup>
                    <Button onClick={this.continue} color="warning" >Continue</Button>
                    <Button onClick={this.goBack} color="warning" >Cancel</Button>
                    {' '}
                    </ButtonGroup>
                </Form>
              </Container>
              </p>
            </div>
            </Jumbotron>
          </React.Fragment>
    )
  }
}
export default DownloadHtmlTemplateModal
