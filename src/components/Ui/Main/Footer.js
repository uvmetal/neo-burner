import React, { Component } from 'react'
import { Jumbotron } from 'reactstrap'

import './style.css'

import cozLogo from '../../../images/coz-inverted.svg'
import uvmetalLogo from '../../../images/uvmetal-fire-logo.png'

class Footer extends Component {
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
        <div className=" coz-medium pt-1">
          <img src={cozLogo} width="200" height="50" alt="City of Zion" className="" />
          &nbsp;
          &nbsp;
          <img src={uvmetalLogo} width="76" height="20" className="img-fluid" alt="uvmetal" />
        </div>
        </React.Fragment>
    );
  }
}
export default Footer
