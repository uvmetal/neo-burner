import React, { Component } from 'react'
import { Jumbotron, Button } from 'reactstrap'

// import burnerLogo from '../../images/neo-burner-burning-logo-alt-3.png'
// import uvmetalFace from '../../images/uvmetal-tongue.png'

// import './style.css'

class Home extends Component {
  constructor(props) {
    super(props)

    this.letsBurn = this.letsBurn.bind(this)

    this.state = {

    }
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  letsBurn() {
    this.props.history.push('/Accounts')
  }

  render() {
    return(
        <React.Fragment>
          <Jumbotron className="vertical-center" id="ma" style={this.props.style}>
          <div className="container hero-container text-center" id="ma">
            <br/>
            <p className="lead">Paper Wallet Event Manager</p>
            <p className="lead mx-auto">
            <Button onClick={this.letsBurn} color="warning" >Let's Burn!</Button>
            </p>
          </div>
        </Jumbotron>
        </React.Fragment>
    );
  }
}
export default Home
