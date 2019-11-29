import React, { Component } from 'react'
import { Jumbotron, Button } from 'reactstrap'

import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer'

import * as qr from 'qr-image'


// import ReactToPrint from 'react-to-print'
// import PrintTemplate from 'react-print'
//
import { QRCode } from 'react-qr-svg'
import { bip39 } from 'bip39'

import util from 'util'

// import './style.css'

import cozLogo from '../../images/coz-inverted.svg'


class PDF extends Component {
  constructor(props) {
    super(props)

    this.createQrCodesFromAccounts = this.createQrCodesFromAccounts.bind(this)

    this.state = {
    }
  }

  componentDidMount() {

  }

  createQrCodesFromAccounts() {
    let qrEntry = []
    let wallets = []

    let i = 40, j = 430, k = 770
    this.props.accounts.forEach((account) => {
      console.log('pdf account: '+account)

      wallets.push(
        <QRCode value={account._address} bgColor="#000000" fgColor="#ffFFff" level="Q" style={{ width: 100, height: 100 }} />,

        <QRCode value={account.url} bgColor="#000000" fgColor="#ffFFff" level="Q" style={{ width: 100, height: 100 }} />,

        <QRCode value={account._WIF} bgColor="#000000" fgColor="#ffFFff" level="Q" style={{ width: 100, height: 100 }} />,

         <QRCode value={account._bip39} bgColor="#000000" fgColor="#ffFFff" level="Q" style={{ width: 100, height: 100 }} />
      )
    })
    // console.log('wallets: '+util.inspect(wallets, {depth: null}))
    return wallets
  }

  render() {
    if (this.props.accounts.length) {
      let wallets = this.createQrCodesFromAccounts()
      console.log('got '+this.props.accounts.length+' wallets')
      console.log('wallet: '+wallets[0])
      let pub = qr.image('test', { type: 'png'})
      return(
        <Document>
        <Page wrap>
      <View render={({ pageNumber }) => (
        pageNumber % 2 === 0 && (
          <View style={{ background: 'red' }}>
            <Image src={cozLogo} />
            <Text>I'm only visible in odd pages!</Text>
          </View>
        )
      )} />
    </Page>
        </Document>
      )
    }
  }
}

export default PDF

// {this.createQrCodesFromAccounts()}

// {<PDFDownloadLink document={this.createQrCodesFromAccounts()} fileName="wallets.pdf" >
//   {({ blob, url, loading, error }) => loading ? "Loading document..." : "Download Pdf" }
//   </PDFDownloadLink>}
// <Button onClick={this.createPdf} color="warning" >Create PDF</Button>
//
// style={{
// textDecoration: "none",
// padding: "10px",
// color: "#4a4a4a",
// backgroundColor: "#f2f2f2",
// border: "1px solid #4a4a4a"
// }}

//
// qrCodes.push(
//   <div key={i}>
//     <img style={{'max-width': 150, height: 60}} src="./images/neo-logo-xp.png"  />
//
//     <img style={{position: 'absolute', top: 40, right: 0,'max-width': 650, width:350, padding: 10}} src="./images/coz-inverted.svg" />
//       <div style={{position: 'absolute', 'z-index': 1, left: 33, top: i, width: 250, height: 150, 'font-size': 21, 'letter-spacing': -1}}>
//         <br/><br/><br/>
//         <div>
//           Public Address<br/>
//           Share this to get loot! {account.address}
//         </div>
//           <QRCode value={account._address} bgColor="#000000" fgColor="#ffFFff" level="Q" style={{ width: 100, height: 100 }} />
//         </div>
//       <div style={{position: 'absolute', 'z-index': 1, left: 400, top: i, width: 250, height: 150, 'font-size': 21, 'letter-spacing': -1}}>
//           <br/><br/><br/>
//           <div style={{'word-wrap': 'break-word', 'max-width': 200, width: 200}}>
//             URL: <br/>
//             {account.url} <br/>
//             <br/>
//           </div>
//
//           <QRCode value={account.url} bgColor="#000000" fgColor="#ffFFff" level="Q" style={{ width: 100, height: 100 }} />
//
//       </div>
//
//       <div class="" style={{position: 'absolute', left: 33, top: j, width: 350, height: 250}} >
//
//           <div style={{'font-family': 'VT323', 'margin-top': 0, 'font-size': 21, 'padding-bottom': 20}} >
//               WIF (DO NOT SHARE)<br/>
//               Import to mobile or desktop wallet.
//           </div>
//
//           <QRCode value={account._WIF} bgColor="#000000" fgColor="#ffFFff" level="Q" style={{ width: 100, height: 100 }} />
//       </div>
//       <div class="" style={{position: 'absolute', left:400, top:j, width:350, height: 250}} >
//
//           <div style={{'font-family': 'VT323', 'margin-top': 0, 'font-size': 21, 'padding-bottom': 20}} >
//               BIP-39 Seed <br/>
//               (DO NOT SHARE)
//           </div>
//       <QRCode value={account._bip39} bgColor="#000000" fgColor="#ffFFff" level="Q" style={{ width: 100, height: 100 }} />
//
//       </div>
//       <div class="" style={{position: 'absolute', left:33, top:k, width: 300, height: 5}} >
//         https://github.com/cityofzion/neo-paper v1.0.1
//       </div>
//   </div>
// )
// // i++
// i+=530
// j+=530
// k+=530
// })

const styles = StyleSheet.create({
    page: {
        backgroundColor: "#ffffff"
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    movieContainer: {
        backgroundColor: "#f6f6f5",
        display: "flex",
        flexDirection: "row",
        padding: 5
    },
    movieDetails: {
        display: "flex",
        marginLeft: 5
    },
    movieTitle: {
        fontSize: 15,
        marginBottom: 10
    },
    movieOverview: {
        fontSize: 10
    },

    image: {
        height: 200,
        width: 150
    },
    subtitle: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        width: 150,
        alignItems: "center",
        marginBottom: 12
    },
    vote: {
        display: "flex",
        flexDirection: "row"
    },
    rating: {
        height: 10,
        width: 10
    },
    vote_text: {
        fontSize: 10
    },
    vote_pop: {
        fontSize: 10,
        padding: 2,
        backgroundColor: "#61C74F",
        color: "#fff"
    },
    vote_pop_text: {
        fontSize: 10,
        marginLeft: 4
    },
    overviewContainer: {
        minHeight: 110
    },
    detailsFooter: {
        display: "flex",
        flexDirection: "row"
    },
    lang: {
        fontSize: 8,
        fontWeight: 700
    },
    vote_average: {
        fontSize: 8,
        marginLeft: 4,
        fontWeight: "bold"
    }
})
