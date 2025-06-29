const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const isdev = require("electron-is-dev");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: isdev?1280:1000,
    height: 1024,
    resizable: false,
    maximizable: true,
    icon: path.join(__dirname, "icon_app.ico"),
    fullscreenable: true,
    title: 'PPT2025',
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  
  //mainWindow.webContents.openDevTools();
  mainWindow.loadURL(isdev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, './')}`);







  // Open the DevTools.
  mainWindow.resizable.valueOf(true);
  mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.setUserTasks([]);
app.setUserTasks([
  {
    program: process.execPath,
    arguments: '--new-window',
    iconPath: path.join(__dirname, "icon_app.ico"),
    iconIndex: 0,
    title: 'Abrir ventana',
    description: 'Create a new window'
  }
]);



app.whenReady().then(() => {
  ipcMain.on("request-mainprocess-action", (e, args) => {
    console.log("Args ", args);
  });
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.