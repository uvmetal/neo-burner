import React, { Component } from 'react'
import { Jumbotron } from 'reactstrap'
import Terminal from 'terminal-in-react'

class WorkspaceConsole extends Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  componentDidMount() {
  }

  render() {
    return(
      <React.Fragment>
      <Jumbotron className="vertical-center">
        <div className="container hero-container text-center">
         <h1 className="display-4">Console </h1>
         <p className="lead">Lorem ipsum dolor</p>
         <hr className="my-4" />
         <p className="lead mx-auto">
         </p>
        </div>
      </Jumbotron>

      <Terminal
        color='#dee5eb'
        backgroundColor='#000000'
        fullscreen
        hideTopBar
        startState='maximised'
        showActions={false}
        allowTabs={false}
        watchConsoleLogging
        barColor='#363963'
        msg='Your sword is glowing a faint green. A black orc swirls from the shadows. What do you do?'
        style={{ fontWeight: "bold", fontSize: "1em", minHeight: "500px", height: "500px", lineHeight: "1em" }}
        commands={{
          exec: () => alert('Not implemented.'),
        }}
        descriptions={{
          exec: 'Execute Neo-One API command',
          show: false
        }}
      />
      </React.Fragment>
   )
  }
}

export default WorkspaceConsole
