const { app, BrowserWindow } = require('electron')
const readline = require('readline')

let win

function createWindow () {
  win = new BrowserWindow({
    frame: false,
    fullscreen: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  // Get the URL from the command line argument, if provided, else default to GitHub
  const url = process.argv[2] || 'https://github.com'
  win.loadURL(url)

  // Inject CSS to hide scrollbar
  win.webContents.on('did-finish-load', () => {
    win.webContents.insertCSS('body::-webkit-scrollbar { display: none; }')
  })

  // Full screen handling from the command line
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  rl.on('line', (input) => {
    console.log(`Received: ${input}`)
  
    if(input === 'fullscreen') {
      win.setFullScreen(true)
    }
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
