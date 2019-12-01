import React, { Component } from 'react'

import PDFViewer from 'pdf-viewer-reactjs'

// import ReactToPrint from 'react-to-print'
// import PrintTemplate from 'react-print'
// import './style.css'


import cozLogo from '../../images/coz-inverted.svg'


class PDF extends Component {
  constructor(props) {
    super(props)

    // this.createQrCodesFromAccounts = this.createQrCodesFromAccounts.bind(this)

    this.state = {
    }
  }

  componentDidMount() {

  }

  // createQrCodesFromAccounts() {
  //   let qrEntry = []
  //   let wallets = []
  //
  //   let i = 40, j = 430, k = 770
  //   this.props.accounts.forEach((account) => {
  //     console.log('pdf account: '+account)
  //
  //     wallets.push(
  //       <QRCode value={account._address} bgColor="#000000" fgColor="#ffFFff" level="Q" style={{ width: 100, height: 100 }} />,
  //
  //       <QRCode value={account.url} bgColor="#000000" fgColor="#ffFFff" level="Q" style={{ width: 100, height: 100 }} />,
  //
  //       <QRCode value={account._WIF} bgColor="#000000" fgColor="#ffFFff" level="Q" style={{ width: 100, height: 100 }} />,
  //
  //       <QRCode value={account._bip39} bgColor="#000000" fgColor="#ffFFff" level="Q" style={{ width: 100, height: 100 }} />
  //     )
  //   })
  //   // console.log('wallets: '+util.inspect(wallets, {depth: null}))
  //   return wallets
  // }

  render() {
    console.log('pdfPath: '+this.props.pdf)
      // let wallets = this.createQrCodesFromAccounts()
      // console.log('got '+this.props.accounts.length+' wallets')
      // console.log('wallet: '+wallets[0])
      // let pub = qr.image('test', { type: 'png'})
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <PDFViewer document={{ url: 'file://'+this.props.pdf, }}
          scale={.75}
          canvasCss={{width: '100%', height: '50%'}}
        />
      </div>
    )
  }
}

export default PDF
