/*
 * Copyright © 2/21/19 4:06 PM, $name
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * The Software is provided “as is”, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders X be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the Software.
 *
 * Except as contained in this notice, the name of the <copyright holders> shall not be used in advertising or otherwise to promote the sale, use or other dealings in this Software without prior written authorization from the $name.
 */

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
        body: `Pomodoro phase ${params.current} done, ${params.max === params.current ? '25':'5'} minutes of free time`,
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

});
