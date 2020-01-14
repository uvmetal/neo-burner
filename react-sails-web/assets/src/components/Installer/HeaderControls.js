import React, {Component} from 'react'
import { Button } from 'reactstrap'
import '../../style.css'

class InstallerHeaderControls extends Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)

    this.state = {
      isOpen: false,
      ready: true,
    }
  }

  toggle() {
      this.setState({
          isOpen: !this.state.isOpen
      })
  }

  componentDidMount() {
  }

  render() {
    return(
      <div>
        <div>
          Installation
        </div>
        </div>
    )
  }
}
export default InstallerHeaderControls
