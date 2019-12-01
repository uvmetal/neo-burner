import React, { Component, useState } from 'react'
import { Jumbotron, Form, FormGroup, Input, Container, Button, Modal, ModalHeader, ModalBody, ModalFooter, ButtonGroup } from 'reactstrap'
// import './style.css'

class DownloadHtmlTemplateModal extends Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.save = this.save.bind(this)
    this.skip = this.skip.bind(this)
    this.goBack = this.goBack.bind(this)
    this.setFolder = this.setFolder.bind(this)

    this.state = {
      modal: false,
      folder: this.props.folder,
      filename: 'template.html',
    }
  }

  componentDidMount() {

  }

  toggle() {
    this.setState({ modal: !this.state.modal })
  }

  save() {
    let options = {
      src: this.props.config.userData+'/'+this.state.filename, dest: this.state.folder+'/'+this.state.filename
    }
    window.ipcRenderer.send('copy-file', options)
    console.log('send ipc copy-file: '+options.src +' to '+options.dest)
    this.props.history.push('UploadHtmlTemplate')
  }

  skip() {
    this.props.history.push('UploadHtmlTemplate')
  }

  goBack() {
    this.props.history.push('Wallets')
  }

  setFolder(e) {
    if(document.getElementsByTagName('input')[0]) {
      console.log('folder: '+document.getElementsByTagName('input')[0].files[0].path )
      this.setState({ folder: document.getElementsByTagName('input')[0].files[0].path })
      this.props.setFolder(document.getElementsByTagName('input')[0].files[0].path)
    }
  }

  render() {
    return(
      <React.Fragment>
        <Jumbotron className="vertical-center" id="ma">
        <div className="container hero-container text-center" id="ma">
          <h1 className="display-4">Download Html Template </h1>
          <p className="lead">Download the default Html template, modify it, then upload it to change the default wallet PDF output format.</p>
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
                        <span class="btn btn-primary">Choose Where to Save</span>
                        {' '+this.state.folder}
                      </label>
                    </div>
                    <Input
                      style={{width: "200px"}}
                      type="text"
                      name="text"
                      placeholder="File Name"
                      value={this.state.filename}
                      onChange={e => this.setState({ filename: e.target.value })}
                    />
                    </FormGroup>
                    <ButtonGroup>
                    <Button onClick={this.save} color="warning" >Continue</Button>
                    <Button onClick={this.skip} color="warning" >Skip</Button>
                    <Button onClick={this.goBack} color="warning" >Go Back</Button>
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
