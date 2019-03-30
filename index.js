const electron = require('electron');
const { app, BrowserWindow, ipcMain, Notification } = electron;
const path = require('path');

app.on('ready', () => {
  const xPos = electron.screen.getPrimaryDisplay().workArea.width;
  let window = new BrowserWindow({
    width: 300,
    height: 201,
    transparent: true,
    vibrancy: 'appearance-based',
    x: xPos - 50 - 300,
    y: 65,
    title: 'test',
    // frame: false,
    titleBarStyle: 'hidden',
    alwaysOnTop: true,
    maximizable: false,
    // resizable: false,
    fullscreenable: false,
    // fullscreenWindowTitle: true,
    movable: true,
    icon: './public/assets/img/icon.png'
  });

  window.setVisibleOnAllWorkspaces(true, {visibleOnFullScreen: true});

  window.loadFile(path.resolve(__dirname, './public/final/index.html'));

  window.webContents.executeJavaScript('window.localStorage.getItem(\'alwaysOnTop\')')
    .then(result => {
      window.setAlwaysOnTop(result === 'true');
    })
    .catch(err => console.error(err));


  ipcMain.on('start', () => {
    window.setSize(300, 77, true);
    window.setWindowButtonVisibility(false);
    window.setFocusable(false);
  });

  ipcMain.on('end', (event, end = false, params = {}) => {
    window.setSize(300, 202, true);
    window.setWindowButtonVisibility(true);
    window.setFocusable(true);
    if (end) {
      new Notification({
        title: `Take a ${params.max === params.current ? 'long':'short'} break`,
        body: `Pomodoro phase ${params.current - 1} done, ${params.max === params.current ? '25':'5'} minutes of free time`,
      }).show();
    }
    window.focus();
  });

  ipcMain.on('settings-change', (event, data) => {
    if (data.alwaysOnTop !== undefined) window.setAlwaysOnTop(data.alwaysOnTop);
  });

  ipcMain.on('action', (event, data) => {
    switch (data) {
      case 'play': {
        window.setWindowButtonVisibility(false);
        break;
      }
      case 'pause': {
        window.setWindowButtonVisibility(true);
        break;
      }
    }
  });

  app.on('window-all-closed', () => {
    app.quit();
  })
});
