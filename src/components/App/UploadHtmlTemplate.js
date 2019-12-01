import React, { Component } from 'react'
import { Jumbotron, Form, FormGroup, Input, Container, Button, ButtonGroup } from 'reactstrap'
// import './style.css'

class UploadHtmlTemplateModal extends Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.continue = this.continue.bind(this)
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

  continue() {
    let options = {
      src: this.state.folder, dest: this.props.config.userData+'/template.html'
    }
    window.ipcRenderer.send('copy-file', options)
    console.log('send ipc copy-file: '+options.src +' to '+options.dest)
  }

  skip() {
    this.props.history.push('UploadHtmlTemplate')
  }

  goBack() {
    this.props.history.push('DownloadHtmlTemplate')
  }

  setFolder(e) {
    if(document.getElementsByTagName('input')[0]) {
      console.log('folder: '+document.getElementsByTagName('input')[0].files[0].path )
      this.setState({ folder: document.getElementsByTagName('input')[0].files[0].path })
      this.props.setUploadFolder(document.getElementsByTagName('input')[0].files[0].path)
    }
  }

  render() {
    return(
      <React.Fragment>
        <Jumbotron className="vertical-center" id="ma">
        <div className="container hero-container text-center" id="ma">
          <h1 className="display-4">Upload Html Template </h1>
          <p className="lead">Please select a custom Html template to replace the default.</p>
          <hr className="my-4" />
          <p className="lead mx-auto">

              <Container className="p-5" >
                <Form id="accountsFormLeft">
                  <FormGroup>
                    <div id="upload_button">
                      <label>
                        <input directory="" type="file" id="ma"
                          onChange={e => this.setFolder(e)}
                        />
                        <span class="btn btn-primary">Choose Path</span>
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
                    <Button onClick={this.continue} color="warning" >Continue</Button>
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
export default UploadHtmlTemplateModal
