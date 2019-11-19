// This isn't needed if you are okaywith doing this in the module:
// const electron = window.require("electron")
// and then f.e., electron.ipcRenderer.send('check-install')
// See example in App.js. This file is currently unneccessary
window.ipcRenderer = require('electron').ipcRenderer
