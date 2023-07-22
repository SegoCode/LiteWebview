// Import required modules
const { app, BrowserWindow } = require('electron') // Importing 'app' and 'BrowserWindow' from 'electron' module.

let win // Define a variable to hold your application's main window.

// Function to create a new application window
function createWindow () {
  // Instantiate a new BrowserWindow with specific options.
  win = new BrowserWindow({
    frame: false, // Creates a frameless window
    fullscreen: true, // The window will be created in full-screen mode
    webPreferences: {
      nodeIntegration: true, // Allows use of Node.js APIs in the renderer process
      contextIsolation: false // Running JavaScript in isolated context
    }
  })

  // Get the URL from the command line argument, if provided, else default to GitHub
  let url = process.argv[2] || 'https://github.com/SegoCode';

  // Load the specified URL into the BrowserWindow
  win.loadURL(url)

  // After the page is fully loaded, insert custom CSS to hide the scrollbar
  win.webContents.on('did-finish-load', () => {
    win.webContents.insertCSS('body::-webkit-scrollbar { display: none; }') // Injecting custom CSS
  })
}

// When Electron is fully initialized, create the application window
app.whenReady().then(createWindow)

// Event listener for when all application windows have been closed
app.on('window-all-closed', function () {
  // Quit the application
  app.quit()
})
