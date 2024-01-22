const { app, BrowserWindow } = require('electron');

let win;

function createWindow() {
  try {
    win = new BrowserWindow({
      frame: false,
      fullscreen: true,
      title: "litewebview",
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
      }
    });

    const url = process.argv[2] || 'https://github.com/SegoCode';
    win.loadURL(url);

    win.webContents.on('did-finish-load', () => {
      win.webContents.insertCSS('body::-webkit-scrollbar { display: none; }');
    });

    // Add the page-title-updated event listener
    win.on('page-title-updated', function(e) {
      e.preventDefault();
    });

  } catch (error) {
    console.error('Error occurred while creating window:', error);
  }
}

try {
  app.whenReady().then(createWindow);

  app.on('window-all-closed', () => {
    app.quit();
  });
} catch (error) {
  console.error('Error in app lifecycle:', error);
}
