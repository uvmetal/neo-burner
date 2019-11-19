// Control neo-one with electron IPC

// PROCESS SPEC
// Quickstart should automatically fill in network names

// Create a new Network with 'name'
// neo-one create network name

// List Wallets for Network 'name'
// neo-one get wallet --network name

// Get private key from Wallet
// neo-one describe wallet --network networkName walletNameq

// Create Neotracker block explorer with 'name' on network 'name'
// neo-one create neotracker trackerName --network netName

// Decode command responses to confirm operation and provide data to user.
// Currently, decode responses directly from spawn command results.
// TODO: decode responses from the system state files

const { spawn } = require('child_process')
const ipc = require('electron').ipcMain

const util = require('util')

let neoOneCommands = ['startServer',
                      'stopServer',
                      'createNeotracker',
                      'deleteNeotracker',
                      'describeNeotracker',
                      'getNeotracker',
                      'startNeotracker',
                      'stopNeotracker',
                      'activateNetwork',
                      'createNetwork',
                      'deactivateNetwork',
                      'deleteNetwork',
                      'describeNetwork',
                      'getNetwork',
                      'startNetwork',
                      'stopNetwork',
                      'activateWallet',
                      'createWallet',
                      'deactivateWallet',
                      'deleteWallet',
                      'describeWallet',
                      'getWallet',
                      'bootstrap',
                      'build',
                      'init',
                      'verify',
                      'version',
                      'quickstart',
                      'quickstop'
                    ]

let neoOneFullCommandSequence = [ 'startServer',
                                  'createNetwork',
                                  'createNeotracker',
                               ]

let neoOneQuickstartCommandSequence = [ 'startServer',
                                  'createNetwork',
                                  'createNeotracker',
                               ]

const functionDebounce = 1000

let neoOne = {}

let eventManager

exports.setupEventManager = function (event) {
    eventManager = event
    console.log('Eventmanager setup.')
    return event
}

exports.addIpcListeners = function (global, neoone) {

  console.log('Adding all IPC listeners for main process control of neo-one.')

  neoOne = neoone

  ipc.on('quickstart', quickstart)
  ipc.on('quickstop', quickstop)
  ipc.on('startServer', startServer)
  ipc.on('stopServer', stopServer)
  ipc.on('createNeotracker', createNeotracker)
  ipc.on('deleteNeotracker', deleteNeotracker)
  ipc.on('describeNeotracker', describeNeotracker)
  ipc.on('getNeotracker', getNeotracker)
  ipc.on('startNeotracker', startNeotracker)
  ipc.on('stopNeotracker', stopNeotracker)
  ipc.on('activateNetwork', activateNetwork)
  ipc.on('createNetwork', createNetwork)
  ipc.on('deactivateNetwork', deactivateNetwork)
  ipc.on('deleteNetwork', deleteNetwork)
  ipc.on('describeNetwork', describeNetwork)
  ipc.on('getNetwork', getNetwork)
  ipc.on('startNetwork', startNetwork)
  ipc.on('stopNetwork', stopNetwork)
  ipc.on('activateWallet', activateWallet)
  ipc.on('createWallet', createWallet)
  ipc.on('deactivateWallet', deactivateWallet)
  ipc.on('deleteWallet', deleteWallet)
  ipc.on('describeWallet', describeWallet)
  ipc.on('getWallet', getWallet)
  ipc.on('bootstrap', bootstrap)
  ipc.on('build', build)
  ipc.on('init', init)
  ipc.on('verify', verify)
  ipc.on('version', version)
}

exports.removeIpcListeners = function () {
  neoOneCommands.forEach((command) => {
    console.log('removing IPC listener: '+command)
    ipc.removeAllListeners(command)
  })
}

exports.stopAll = function () {

}


function log(message) {
  console.log(message)
  eventManager.sender.send('update-console-buffer', message)
  return message
}


function describeAll(event, arg, callback) {
  describeNetwork()
  describeWallet()
  describeNeotracker()
}

function quickstart (event, arg) {
  // TODO add options to save a network with a name and access from saved networks later
  // For now the network, data, wallet, and blocks are all cleared by default each quickstart
  log('Quickstarting a Neo One instance.')
  // console.log(log('Test, test test'))
  startServer(null, null, () => {
    createNetwork(null, null, () => {
      startNetwork(null, null, () => {
        createWallet(null, null, () => {
          createNeotracker(null, null, () => {
            startNeotracker(null, null, () => {
              describeAll()
            })
          })
        })
      })
    })
  })
  // createNeotracker()
}

function quickstop (event, arg) {
  log('Quickstopping a Neo One instance.')
  stopServer()
}

function startServer (event, arg, callback) {
  // TODO verify if we shouldn't allow multiple server instances, until then do debounce:
  setTimeout(() => {
    if (neoOne.serverPID) {
      log('A Neo One server is already running.')
      return
    }
    log('startServer(): ' + neoOne.serverPath + ' init')

    const p = spawn(neoOne.serverPath, ['init'])

    p.stdout.on('data', (data) => {
      log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)

      const regex = /.*\(pid=([0-9].*)\)\n/
      const found = data.toString().replace(regex, '$1')
      console.log(`found ${found}`)
      neoOne.serverPID = found
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
      if (callback) callback()
    })
  }, functionDebounce)
}

function stopServer (event, arg, callback) {
  setTimeout(() => {
    if (neoOne.serverPID === undefined) {
      log('There is no Neo One server running.')
      return
    }

    const pid = neoOne.serverPID

    console.log(log(`kill ${pid}`))

    const p = spawn('kill', [pid])

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)

      if (code === 0) neoOne.serverPID = undefined
      if (callback) callback()
    })
  }, functionDebounce)
}

function createNeotracker (event, arg, callback) {
  setTimeout(() => {
    if (!arg) {
      // TODO code a name generator for networks, wallets, etc
      arg = {
        wallet: 'halite', network: 'halite', neotracker: 'halite'
      }
    }

    const p = spawn(neoOne.serverPath, ['create', 'neotracker', arg.neotracker, '--network', arg.network])

    log('createNeotracker(): ' + neoOne.serverPath + ' create neotracker ' + arg.neotracker + ' --network ' + arg.network)

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
      if (callback) callback()
    })
  }, functionDebounce)
}

function deleteNeotracker (event, arg, callback) {
  setTimeout(() => {
    if (!arg) {
      // TODO code a name generator for networks, wallets, etc
      arg = {
        wallet: 'halite', network: 'halite', neotracker: 'halite'
      }
    }

    const p = spawn(neoOne.serverPath, ['delete', 'neotracker', arg.neotracker])

    log('deleteNeotracker(): ' + neoOne.serverPath + ' delete neotracker ' + arg.neotracker)

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
      if (callback) callback()
    })
  }, functionDebounce)
}

function describeNeotracker (event, arg, callback) {
  setTimeout(() => {
    if (!arg) {
      // TODO code a name generator for networks, wallets, etc
      arg = {
        wallet: 'halite', network: 'halite', neotracker: 'halite'
      }
    }

    const p = spawn(neoOne.serverPath, ['describe', 'neotracker', arg.neotracker])

    log('describeNeotracker(): ' + neoOne.serverPath + ' describe neotracker ' + arg.neotracker)

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
      if (callback) callback()
    })
  }, functionDebounce)
}

function getNeotracker (event, arg, callback) {
  setTimeout(() => {
    if (!arg) {
      // TODO code a name generator for networks, wallets, etc
      arg = {
        wallet: 'halite', network: 'halite', neotracker: 'halite'
      }
    }

    const p = spawn(neoOne.serverPath, ['get', 'neotracker', arg.neotracker])

    log('getNeotracker(): ' + neoOne.serverPath + ' get neotracker ' + arg.neotracker)

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
      if (callback) callback()
    })
  }, functionDebounce)
}

function startNeotracker (event, arg, callback) {
  setTimeout(() => {
    if (!arg) {
      // TODO code a name generator for networks, wallets, etc
      arg = {
        wallet: 'halite', network: 'halite', neotracker: 'halite'
      }
    }

    const p = spawn(neoOne.serverPath, ['start', 'neotracker', arg.neotracker])

    log('startNeotracker(): ' + neoOne.serverPath + ' start neotracker ' + arg.neotracker)

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
      if (callback) callback()
    })
  }, functionDebounce)
}

function stopNeotracker (event, arg, callback) {
  setTimeout(() => {
    if (!arg) {
      // TODO code a name generator for networks, wallets, etc
      arg = {
        wallet: 'halite', network: 'halite', neotracker: 'halite'
      }
    }

    const p = spawn(neoOne.serverPath, ['stop', 'neotracker', arg.neotracker, '--network', arg.network])

    log('stopNeotracker(): ' + neoOne.serverPath + ' stop neotracker ' + arg.neotracker + ' --network ' + arg.network)

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
      if (callback) callback()
    })
  }, functionDebounce)
}

function activateNetwork (event, arg, callback) {
  setTimeout(() => {
    if (!arg) {
      // TODO code a name generator for networks, wallets, etc
      arg = {
        wallet: 'halite', network: 'halite', neotracker: 'halite'
      }
    }

    const p = spawn(neoOne.serverPath, ['activate', 'network', arg.network])

    log('activateNetwork(): ' + neoOne.serverPath + ' activate network ' + arg.network)

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
      if (callback) callback()
    })
  }, functionDebounce)
}

function createNetwork (event, arg, callback) {
  setTimeout(() => {
    if (!arg) {
      // TODO code a name generator for networks, wallets, etc
      arg = {
        wallet: 'halite', network: 'halite', neotracker: 'halite'

      }
    }

    const p = spawn(neoOne.serverPath, ['create', 'network', arg.network])

    log('createNetwork(): ' + neoOne.serverPath + ' create network ' + arg.network)

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
      if (callback) callback()
    })
  }, functionDebounce)
}

function deactivateNetwork (event, arg, callback) {
  setTimeout(() => {
    if (!arg) {
      // TODO code a name generator for networks, wallets, etc
      arg = {
        wallet: 'halite', network: 'halite', neotracker: 'halite'

      }
    }

    const p = spawn(neoOne.serverPath, ['deactivate', 'network', arg.network])

    log('deactivateNetwork(): ' + neoOne.serverPath + ' deactivate network ' + arg.network)

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
      if (callback) callback()
    })
  }, functionDebounce)
}

function deleteNetwork (event, arg, callback) {
  setTimeout(() => {
    if (!arg) {
      // TODO code a name generator for networks, wallets, etc
      arg = {
        wallet: 'halite', network: 'halite', neotracker: 'halite'

      }
    }

    const p = spawn(neoOne.serverPath, ['delete', 'network', arg.network])

    log('deleteNetwork(): ' + neoOne.serverPath + ' delete network ' + arg.network)

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
      if (callback) callback()
    })
  }, functionDebounce)
}

function describeNetwork (event, arg, callback) {
  setTimeout(() => {
    if (!arg) {
      // TODO code a name generator for networks, wallets, etc
      arg = {
        wallet: 'halite', network: 'halite', neotracker: 'halite'

      }
    }

    const p = spawn(neoOne.serverPath, ['describe', 'network', arg.network])

    .log('describeNetwork(): ' + neoOne.serverPath + ' describe network ' + arg.network)

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
      if (callback) callback()
    })
  }, functionDebounce)
}

function getNetwork (event, arg, callback) {
  setTimeout(() => {
    if (!arg) {
      // TODO code a name generator for networks, wallets, etc
      arg = {
        wallet: 'halite', network: 'halite', neotracker: 'halite'

      }
    }

    const p = spawn(neoOne.serverPath, ['get', 'network', arg.network])

    log('getNetwork(): ' + neoOne.serverPath + ' get network ' + arg.network)

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
      if (callback) callback()
    })
  }, functionDebounce)
}

function startNetwork (event, arg, callback) {
  setTimeout(() => {
    if (!arg) {
      // TODO code a name generator for networks, wallets, etc
      arg = {
        wallet: 'halite', network: 'halite', neotracker: 'halite'

      }
    }

    const p = spawn(neoOne.serverPath, ['start', 'network', arg.network])

    log('startNetwork(): ' + neoOne.serverPath + ' start network ' + arg.network)

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
      if (callback) callback()
    })
  }, functionDebounce)
}

function stopNetwork (event, arg, callback) {
 setTimeout(() => {
   if (!arg) {
     // TODO code a name generator for networks, wallets, etc
     arg = {
       wallet: 'halite', network: 'halite', neotracker: 'halite'

     }
   }

   const p = spawn(neoOne.serverPath, ['stop', 'network', arg.network])

   log('stopNetwork(): ' + neoOne.serverPath + ' stop network ' + arg.network)

   p.stdout.on('data', (data) => {
     console.log(`stdout: ${data}`)
   })

   p.stderr.on('data', (data) => {
     console.log(`stderr: ${data}`)
   })

   p.on('close', (code) => {
     console.log(`child process exited with code ${code}`)
     if (callback) callback()
   })
 }, functionDebounce)
}

function activateWallet (event, arg, callback) {
  setTimeout(() => {
    if (!arg) {
      // TODO code a name generator for networks, wallets, etc
      arg = {
        wallet: 'halite', network: 'halite', neotracker: 'halite'

      }
    }
    const p = spawn(neoOne.serverPath, ['activate', 'wallet', arg.wallet, '--network', arg.network])

    log('activateWallet(): ' + neoOne.serverPath + ' activate wallet ' + arg.wallet + ' --network ' + arg.network)

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
      if (callback) callback()
    })
  }, functionDebounce)
}

function createWallet (event, arg, callback) {
  setTimeout(() => {
    if (!arg) {
      // TODO code a name generator for networks, wallets, etc
      arg = {
        wallet: 'halite', network: 'halite', neotracker: 'halite'

      }
    }

    const p = spawn(neoOne.serverPath, ['create', 'wallet', arg.wallet, '--network', arg.network])

    log('createWallet(): ' + neoOne.serverPath + ' create wallet ' + arg.wallet + ' --network ' + arg.network)

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
      if (callback) callback()
    })
  }, functionDebounce)
}

function deactivateWallet (event, arg, callback) {
  setTimeout(() => {
    if (!arg) {
      // TODO code a name generator for networks, wallets, etc
      arg = {
        wallet: 'halite', network: 'halite', neotracker: 'halite'
      }
    }

    const p = spawn(neoOne.serverPath, ['deactivate', 'wallet', arg.wallet, '--network', arg.network])

    log('deactivateWallet(): ' + neoOne.serverPath + ' deactivate wallet ' + arg.wallet + ' --network ' + arg.network)

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
      if (callback) callback()
    })
  }, functionDebounce)
}

function deleteWallet (event, arg, callback) {
  setTimeout(() => {
    if (!arg) {
      // TODO code a name generator for networks, wallets, etc
      arg = {
        wallet: 'halite', network: 'halite', neotracker: 'halite'

      }
    }

    const p = spawn(neoOne.serverPath, ['delete', 'wallet', arg.wallet, '--network', arg.network])

    log('deleteWallet(): ' + neoOne.serverPath + ' delete wallet ' + arg.wallet + ' --network ' + arg.network)

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
      if (callback) callback()
    })
  }, functionDebounce)
}

function describeWallet (event, arg, callback) {
  setTimeout(() => {
    if (!arg) {
      // TODO code a name generator for networks, wallets, etc
      arg = {
        wallet: 'halite', network: 'halite', neotracker: 'halite'

      }
    }

    const p = spawn(neoOne.serverPath, ['describe', 'wallet', arg.wallet, '--network', arg.network])

    log('describeWallet(): ' + neoOne.serverPath + ' describe wallet ' + arg.wallet + ' --network ' + arg.network)

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
      if (callback) callback()
    })
  }, functionDebounce)
}

function getWallet (event, arg, callback) {
  setTimeout(() => {
    if (!arg) {
      // TODO code a name generator for networks, wallets, etc
      arg = {
        wallet: 'halite', network: 'halite', neotracker: 'halite'

      }
    }

    const p = spawn(neoOne.serverPath, ['get', 'wallet', arg.wallet, '--network', arg.network])

    log('getWallet(): ' + neoOne.serverPath + ' get wallet ' + arg.wallet + ' --network ' + arg.network)

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
      if (callback) callback()
    })
  }, functionDebounce)
}

function bootstrap (event, arg) {
  setTimeout(() => {
    if (!arg) {
      // TODO code a name generator for networks, wallets, etc
      arg = {
        wallet: 'halite', network: 'halite', neotracker: 'halite'

      }
    }

    const p = spawn(neoOne.serverPath, ['bootstrap', '--network', arg.network])

    log('bootstrap(): ' + neoOne.serverPath + ' bootstrap --network ' + arg.network)

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }, functionDebounce)
}

function build (event, arg) {
  setTimeout(() => {
    const p = spawn(neoOne.serverPath, ['build'])

    log('build(): ' + neoOne.serverPath +  ' build')

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }, functionDebounce)
}

function init (event, arg) {
  setTimeout(() => {
    const p = spawn(neoOne.serverPath, ['init'])

    log('init(): ' + neoOne.serverPath +  ' init')

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }, functionDebounce)
}

function verify (event, arg) {
  setTimeout(() => {
    const p = spawn(neoOne.serverPath, ['verify'])

    log('verify(): ' + neoOne.serverPath +  ' verify')

    p.stdout.on('data', (data) => {
     console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
     console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
     console.log(`child process exited with code ${code}`)
    })
  }, functionDebounce)
}

function version (event, arg) {
  setTimeout(() => {
    const p = spawn(neoOne.serverPath, ['version'])

    log('version(): ' + neoOne.serverPath +  ' version')

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }, functionDebounce)
}
