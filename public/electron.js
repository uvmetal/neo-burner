var Sails = require('sails').constructor

var rc = require('sails/accessible/rc')

var util = require('util')

let sailsServer = null

const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')
const isDev = require('electron-is-dev')

const ipc = require('electron').ipcMain

const firstRun = require('electron-first-run')

const isFirstRun = firstRun()

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow(
    {
      width: 900,
      height: 680,
      webPreferences: {
        nodeIntegration: true,
        preload: __dirname + '/preload.js'
      }
  })
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`)
  mainWindow.on('closed', () => mainWindow = null)
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

ipc.on('start-server', function (event, arg) {
    if (sailsServer === null) {
      sailsServer = new Sails()

      let serverPath = app.isPackaged ? '../server' : './server'

      // TODO add flag to configure from environment or cli
      let serverPort = 2328

      console.log('lifting server at: ' + serverPath)

      sailsServer.lift({appPath: serverPath, port: serverPort}, function(err) {
        if (err) {
            console.log('Error occurred lifting Sails app:', err)
            return
          }
          console.log('Sails app lifted successfully!')
      })
    } else console.log('sails server is already running')
})

ipc.on('stop-server', function (event, arg) {
  if (sailsServer !== null) {
    sailsServer.lower(
      function (err) {
        sailsServer = null
        if (err) {
          return console.log("Error occurred lowering Sails app: ", err);
        }
        console.log("Sails app lowered successfully!");
      }
    )
  } else console.log('sails is not running')
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

  let systemConfig

  function configError(error) {
    console.log('install config: ' + error)
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
    isPackaged: isPackaged
  }

  console.log('systemConfig is ' + util.inspect(systemConfig, {depth: null}))

  return systemConfig
}
