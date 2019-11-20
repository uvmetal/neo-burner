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
        <div>
          <div id="footerLeft">
          neo-burner v0.0.2
          </div>
          <div className=" coz-medium pt-1" id="footerRight">
            <a href="https://github.com/cityofzion/neo-burner" target="_blank">
              <img src={cozLogo} width="200" height="50" alt="City of Zion" className=""  />
            </a>
            &nbsp;
            &nbsp;
            <a href="https://github.com/uvmetal" target="_blank">
              <img src={uvmetalLogo} width="76" height="20" className="img-fluid" alt="uvmetal" />
            </a>
          </div>

        </div>
        </React.Fragment>
    );
  }
}
export default Footer
