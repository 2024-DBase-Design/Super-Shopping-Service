const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const preloadPath = path.join(__dirname, 'preload.js');
  console.log(`Preload path: ${preloadPath}`);
  
  let mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: preloadPath,
    },
  });

  // Load the HTML file from the public directory
  mainWindow.loadFile(path.join(__dirname, '..', '..', 'public', 'index.html'));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
