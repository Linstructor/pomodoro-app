const electron = require('electron');
const { app, BrowserWindow, ipcMain, Notification } = electron;
const path = require('path');

app.on('ready', () => {

  if (process.argv.includes('dev')) {
    require('vue-devtools').install();
    require('devtron').install();
  }

  const xPos = electron.screen.getPrimaryDisplay().workArea.width;
  let window = new BrowserWindow({
    width: 300,
    height: 201,
    transparent: true,
    vibrancy: 'appearance-based',
    x: xPos - 50 - 300,
    y: 65,
    title: 'test',
    frame: false,
    titleBarStyle: 'hidden',
    alwaysOnTop: true,
    maximizable: false,
    resizable: process.argv.includes('dev'),
    fullscreenable: false,
    fullscreenWindowTitle: true,
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

  ipcMain.on('log', (event, data) => {
    switch (data.type) {
      case 'log': {
        data.message.unshift('\x1b[34m');
        console.log.apply(null, data.message);
        break;
      }
      case 'error': {
        data.message.unshift('\x1b[35m');
        console.warn.apply(null, data.message);
        break;
      }
      case 'warn': {
        data.message.unshift('\x1b[33m');
        console.error.apply(null, data.message);
        break;
      }
    }
  });

  app.on('window-all-closed', () => {
    app.quit();
  })
});
