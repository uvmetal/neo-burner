var Sails = require('sails').constructor

var rc = require('sails/accessible/rc')

const util = require('util')

const fs = require('fs-extra')
const fse = require('fs-extra')

const { app, shell, electron, BrowserWindow, Menu } = require('electron')

const path = require('path')
const url = require('url')
const isDev = require('electron-is-dev')

const ipc = require('electron').ipcMain

const firstRun = require('electron-first-run')

const { spawn } = require('child_process')

const isFirstRun = firstRun()

const qr = require('./qrpdf')

let rcp = require('recursive-copy')


let mainWindow, systemConfig, userSettings, userSettingsFile = 'user-settings.json'

let sailsServer

let sailsServerPath, sailsIsPackaged, sailsServerPort = 2328

let server = {
  serverPID: undefined,
  serverPath: './server/node_modules/.bin/'
}

let rootpath

global.serverConfig = { useSails: false }

function createWindow() {
  // Menu.setApplicationMenu(null)

  mainWindow = new BrowserWindow(
    {
      // frame: false, // disable title and menu
      backgroundColor: '#000000', // <- borked
      height: 800,
      width: 1200,
      minHeight: 750,
      minWidth: 1200,
      // useContentSize: true,
      webPreferences: {
        nodeIntegration: true,
        preload: __dirname + '/preload.js',
        webSecurity: false
      }
  })
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`)
  mainWindow.on('closed', () => mainWindow = null)

  // Open clicked URLs in the OS browser
  mainWindow.webContents.on("new-window", function(event, url) {
    event.preventDefault()
    shell.openExternal(url)
  })

 //  var menu = Menu.buildFromTemplate([
 //    {
 //       label: 'Home',
 //       submenu: [
 //
 //       ],
 //    },
 //    {
 //       label: 'Menu',
 //        submenu: [
 //         { label:'Home' },
 //         { label:'CoinMarketCap' },
 //         { label:'Exit',
 //             click() {
 //                 app.quit()
 //             }
 //         }
 //        ]
 //     }
 // ])
 // Menu.setApplicationMenu(menu)

  // console.log(util.inspect(mainWindow, {depth: null}))

  let systemConfig = getSystemProfile()

  let srcPath
  // TODO modify installer to install sails for database/api module deployment

  if (app.isPackaged) {
    sailsIsPackaged = true
    sailsServerPath = systemConfig.exe + '/../server'
    const re = /\/neo-burner$/
    server.serverPath = systemConfig.exe.replace(re, '/server/node_modules/.bin/')
    srcPath = path.join(systemConfig.exe, '..', 'node_modules')

  } else {
    sailsIsPackaged = false
    sailsServerPath = './server'
    server.serverPath = './server/node_modules/.bin/'
    srcPath = path.join('.', 'node_modules')
  }
  rootpath = systemConfig.userData
  console.log('phantomjs-prebuilt rootpath: '+rootpath)
  console.log('__dirname: '+__dirname)
  console.log('phant sources: '+srcPath)

  // TODO move all the file copy to installation component and module

  let options = {
    overwrite: true,
    expand: true
  }

  fs.mkdirpSync(systemConfig.userData+'/node_modules/')

  rcp(srcPath+'/phantomjs-prebuilt/', systemConfig.userData+'/node_modules/phantomjs-prebuilt/', options, function (err) { if (err) {
      return console.error(err)
    } console.log('done!')
  })

  rcp(srcPath+'/es6-promise/', systemConfig.userData+'/node_modules/es6-promise/', options, function (err) {
  if (err) {
    return console.error(err)
  } console.log('done!')
  })

  rcp(srcPath+'/extract-zip/', systemConfig.userData+'/node_modules/extract-zip/', options, function (err) {
  if (err) {
    return console.error(err)
  } console.log('done!')
  })

  rcp(srcPath+'/mkdirp/', systemConfig.userData+'/node_modules/mkdirp/', options, function (err) {
    if (err) {
      return console.error(err)
    } console.log('done!')
  })

  rcp(srcPath+'/which/', systemConfig.userData+'/node_modules/which/', options, function (err) {
  if (err) {
    return console.error(err)
  } console.log('done!')
  })

  rcp(srcPath+'/html-pdf/', systemConfig.userData+'/node_modules/html-pdf/', options, function (err) {
    if (err) {
      return console.error(err)
    } console.log('done!')
  })

  console.log('Installing from data folder: '+__dirname)

  // rcp(__dirname+'/neo-paper/data/', systemConfig.userData+'/', (err) => {
  //   if (err) {
  //     return console.error(err)
  //   } console.log('copied '+__dirname+'/neo-paper/data/* to '+ systemConfig.userData+'/')
  // }

  fs.copy(__dirname+'/neo-paper/data/template.html', systemConfig.userData+'/template.html')
  .then(() => console.log('copied '+__dirname+'/neo-paper/data/template.html to '+ systemConfig.userData+'/template.html'))
  .catch(err => console.error(err))

  fs.copy(__dirname+'/neo-paper/data/images/background.png', systemConfig.userData+'/background.png')
  .then(() => console.log('copied '+__dirname+'/neo-paper/data/images/background.png to '+ systemConfig.userData+'/background.png'))
  .catch(err => console.error(err))

  fs.copy(__dirname+'/neo-paper/data/images/coz-inverted.svg', systemConfig.userData+'/coz-inverted.svg')
  .then(() => console.log('copied: '+__dirname+'/neo-paper/data/images/coz-inverted.svg to ' + systemConfig.userData+'/coz-inverted.svg'))
  .catch(err => console.error(err))

  fs.copy(__dirname+'/neo-paper/data/images/neo-logo-xp.png', systemConfig.userData+'/neo-logo-xp.png')
  .then(() => console.log('copied '+__dirname+'/neo-paper/data/images/neo-logo-xp.png to'+ systemConfig.userData+'/neo-logo-xp.png'))
  .catch(err => console.error(err))

  let settings = {
    darkMode: true,
    accountsPath: '/tmp/',
    accountsFile: 'accounts.json',
    pdfPath: '/tmp/',
    pdfFile: 'wallets.pdf',
    templatePath: systemConfig.userData+'/'
  }

  let filename = systemConfig.userData+'/'+userSettingsFile
  console.log('Writing default user settings to '+filename)
  console.log('data: '+util.inspect(settings, {depth: null}))
  fs.writeFileSync(filename, JSON.stringify(settings).toString())
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

// This manages events from the terminal widget under Workspace/Console
// ipc.on('setup-event-manager', function (event, arg) {
//   ipcBin.setupEventManager(event)
// })

// ipc.on('create-pdf', function (event, arg) {
//   // qr.gen(arg.path, arg.filename, arg.data)
//   console.log('ipc create-pdf at '+arg.pdfPath+arg.filename+' using template folder '+arg.templatePath)
//
//   let window_to_PDF = new BrowserWindow({show : false});//to just open the browser in background
//   window_to_PDF.loadURL(arg.templatePath+'/template.html'); //give the file link you want to display
//   function pdfSettings() {
//       var paperSizeArray = ["A4", "A5"];
//       var option = {
//           landscape: false,
//           marginsType: 0,
//           printBackground: false,
//           printSelectionOnly: false,
//           // pageSize: paperSizeArray[settingCache.getPrintPaperSize()-1],
//           pageSize: paperSizeArray[0]
//       };
//     return option;
//   }
//   window_to_PDF.webContents.printToPDF(pdfSettings(), function(err, data) {
//       if (err) {
//           //do whatever you want
//           return;
//       }
//       try{
//           fs.writeFileSync(arg.pdfPath+'/'+arg.filename, data);
//           console.log('done!')
//       }catch(err){
//           //unable to save pdf..
//           console.log('cant write pdf: '+err)
//       }
//
//   })
//   //
//   // qr.gen(rootpath, arg.templatePath+'/', arg.pdfPath, arg.filename, arg.data, () => {
//   //   event.sender.send('pdf-created')
//   //   console.log('done!')
//   // })
// })

ipc.on('create-pdf', function (event, arg) {
  // qr.gen(arg.path, arg.filename, arg.data)
  console.log('ipc create-pdf at '+arg.pdfPath+arg.filename+' using template folder '+arg.templatePath)
  qr.gen(rootpath, arg.templatePath+'/', arg.pdfPath, arg.filename, arg.data, () => {
    event.sender.send('pdf-created')
    console.log('done!')
  })
})


ipc.on('write-file', function (event, arg) {
  fs.writeFileSync(arg.path, arg.data)
  console.log('ipc write-file: '+arg.path)
})

ipc.on('copy-file', function (event, arg) {
  fs.copyFile(arg.src, arg.dest)
  console.log('ipc copy-file: '+arg.src + ' to '+arg.dest)
})

ipc.on('read-file', function (event, arg) {
  let filename = arg
  console.log('Importing saved account data from '+filename)
  let data = fs.readFileSync(filename)
  event.sender.send('read-file-reply', data)
})

ipc.on('copy-template', function (event, arg) {
  // fs.copyFile(systemConfig.userData, arg.dest)
  console.log('ipc copy-template: '+__dirname+'/neo-paper/data/ to '+arg.dest)

  fs.copy(__dirname+'/neo-paper/data/template.html', arg.dest+'/template.html')
  .then(() => console.log('copied '+__dirname+'/neo-paper/data/template.html to '+ arg.dest+'/template.html'))
  .catch(err => console.error(err))

  fs.copy(__dirname+'/neo-paper/data/images/background.png', arg.dest+'/background.png')
  .then(() => console.log('copied '+__dirname+'/neo-paper/data/images/background.png to '+ arg.dest+'/background.png'))
  .catch(err => console.error(err))

  fs.copy(__dirname+'/neo-paper/data/images/coz-inverted.svg', arg.dest+'/coz-inverted.svg')
  .then(() => console.log('copied: '+__dirname+'/neo-paper/data/images/coz-inverted.svg to ' + arg.dest+'/coz-inverted.svg'))
  .catch(err => console.error(err))

  fs.copy(__dirname+'/neo-paper/data/images/neo-logo-xp.png', arg.dest+'/neo-logo-xp.png')
  .then(() => console.log('copied '+__dirname+'/neo-paper/data/images/neo-logo-xp.png to '+ arg.dest+'/neo-logo-xp.png'))
  .catch(err => console.error(err))
})

ipc.on('write-user-settings', function (event, arg) {
  let filename = systemConfig.userData+'/'+userSettingsFile
  console.log('Writing user settings to '+filename)
  console.log('data: '+util.inspect(arg, {depth: null}))
  fs.writeFileSync(filename, JSON.stringify(arg).toString())
})

ipc.on('read-user-settings', function (event, arg) {
  let filename = systemConfig.userData+'/'+userSettingsFile
  console.log('Reading user settings from '+filename)
  let settings = JSON.parse(fs.readFileSync(filename))
  event.sender.send('read-user-settings-reply', settings)
})

ipc.on('check-install', function (event, arg) {
  console.log('Checking your software installation...')

  let systemConfig = getSystemProfile()

  if (isFirstRun) {
    console.log('Your software is installing. ' + isFirstRun)
    mainWindow.webContents.send('installing')
  } else {
    console.log('Your software is already installed.')
  }

  event.sender.send('check-install-reply', systemConfig)
})

ipc.on('update-system-profile', function (event, arg) {
  console.log('Checking your software installation...')

  let systemConfig = getSystemProfile()

  if (isFirstRun) {
    console.log('Your software is installing. ' + isFirstRun)
    mainWindow.webContents.send('installing')
  } else {
    console.log('Your software is already installed.')
  }

  event.sender.send('update-system-profile-reply', systemConfig)
})

function getSystemProfile() {
  let home, appData, userData, temp, exe, mod, desktop, documents, music, pictures, videos, logs, pepperFlashSystemPlugin, version, gpuInfo, isAccessibilitySupportEnabled, isPackaged

  function configError(error) {
    console.log('Install config: ' + error)
  }

  try { home = app.getPath('home') } catch(error) { configError(error) }
  try { appData = app.getPath('appData') } catch(error) { configError(error) }
  try { userData = app.getPath('userData') } catch(error) { configError(error) }
  try { temp = app.getPath('temp') } catch(error) { configError(error) }
  try { exe = app.getPath('exe') } catch(error) { configError(error) }
  try { mod = app.getPath('module') } catch(error) { configError(error) }
  try { desktop = app.getPath('desktop') } catch(error) { configError(error) }
  try { documents = app.getPath('documents') } catch(error) { configError(error) }
  try { music = app.getPath('music') } catch(error) { configError(error) }
  try { tepicturesmp = app.getPath('pictures') } catch(error) { configError(error) }
  try { videos = app.getPath('videos') } catch(error) { configError(error) }
  try { logs = app.getPath('logs') } catch(error) { configError(error) }
  try { pepperFlashSystemPlugin = app.getPath('pepperFlashSystemPlugin') } catch(error) { configError(error) }
  try { version = app.getVersion() } catch(error) { configError(error) }
  try { appMetrics = app.getAppMetrics() } catch(error) { configError(error) }
  try { gpuInfo = app.getGPUInfo('complete') } catch(error) { configError(error) }
  try { isAccessibilitySupportEnabled = app.isAccessibilitySupportEnabled() } catch(error) { configError(error) }
  try { isPackaged = app.isPackaged } catch(error) { configError(error) }

  systemConfig = {
    isFirstRun: isFirstRun,
    home: home,
    appData: appData,
    userData: userData,
    temp: temp,
    exe: exe,
    module: mod,
    desktop: desktop,
    documents: documents,
    music: music,
    pictures: pictures,
    videos: videos,
    logs: logs,
    pepperFlashSystemPlugin: pepperFlashSystemPlugin,
    version: version,
    appMetrics: appMetrics,
    gpuInfo: gpuInfo,
    isAccessibilitySupportEnabled: isAccessibilitySupportEnabled,
    isPackaged: isPackaged,
    consoleBuffer: ['Welcome to Neo-Burner'],
    userSettings: {
      darkMode: true,
      accountsPath: '/tmp',
      accountsFile: 'accounts.json',
      pdfPath: '/tmp',
      pdfFile: 'wallets.pdf',
      templatePath: userData
    }
  }

  console.log('systemConfig is ' + util.inspect(systemConfig, {depth: null}))

  return systemConfig
}
