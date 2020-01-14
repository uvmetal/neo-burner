import React, { Component } from 'react'
import { version } from '../../neo-paper/neo-paper.js'

import './style.css'

import cozLogo from '../../images/coz-inverted.svg'
import uvmetalLogo from '../../images/uvmetal-fire-logo.png'
import burnerLogo from '../../images/neo-burner-burning-logo-alt-3.png'

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
            <img src={burnerLogo} width="200" height="60" alt="neo-burner" className=""  /> {version}
          </div>
          <div className=" coz-medium pt-1" id="footerRight">
            <a href="https://github.com/cityofzion/neo-burner" target="_blank" rel="noopener noreferrer">
              <img src={cozLogo} width="200" height="50" alt="City of Zion" className=""  />
            </a>
            &nbsp;
            &nbsp;
            <a href="https://github.com/uvmetal" target="_blank" rel="noopener noreferrer">
              <img src={uvmetalLogo} width="100" height="20" className="img-fluid" alt="uvmetal" />
            </a>
          </div>

        </div>
        </React.Fragment>
    )
  }
}
export default Footer
