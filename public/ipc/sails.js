// Control neo-one with sails

let sailsServer = null

exports.lift = function (serverPath, serverPort, isPackaged) {

  if (sailsServer === null) {
    sailsServer = new Sails()

    console.log('Lifting server at: ' + serverPath)

    sailsServer.lift({appPath: serverPath, port: serverPort, isPackaged: isPackaged}, function(err) {
      if (err) {
          console.log('Error occurred lifting Sails app:', err)
          return
        }
        console.log('Sails app lifted successfully!')
    })
  } else console.log('Sails server is already running.')
}

exports.lower = function () {
  if (sailsServer !== null) {
    sailsServer.lower(
      function (err) {
        sailsServer = null
        if (err) {
          return console.log("Error occurred lowering Sails app: ", err)
        }
        console.log("Sails app lowered successfully!")
      }
    )
  } else console.log('Sails is not running.')
}

exports.addIpcListeners = function () {


}

exports.removeIpcListeners = function () {


}

exports.stopAll = function () {
  
}
