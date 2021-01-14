const electron = require('electron');
const path = require('path');
const url = require('url');
// SET ENV
process.env.NODE_ENV = 'development';
const {
  app,
  BrowserWindow,
  ipcMain,
  Menu
} = electron;

let mainWindow;
let addWindow;
let recentcallWindow;
let PhoneBookWindow
// Listen for app to be ready
app.on('ready', function () {
  // Create new window
  mainWindow = new BrowserWindow({
    width: 380,
    height: 665,
    title: 'main'
  });
  // Load html in window
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, './views/onglet1.html'),
    protocol: 'file:',
    slashes: true
  }));
  // Quit app when closed
  mainWindow.on('closed', function () {
    app.quit();
  });
  // Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // Insert menu
  Menu.setApplicationMenu(mainMenu);
  // add window
  addWindow = new BrowserWindow({
    width: 300,
    height: 300,
    title: 'add',
    show: false
  });
  addWindow.loadURL(url.format({
    pathname: path.join(__dirname, './views/addWindow.html'),
    protocol: 'file:',
    slashes: true,
    show: false
  }));
  //  recent call window 
  recentcallWindow = new BrowserWindow({
    width: 380,
    height: 665,
    title: 'recent call',
    show: false
  });
  recentcallWindow.loadURL(url.format({
    pathname: path.join(__dirname, './views/ongle3.html'),
    protocol: 'file:',
    slashes: true,
  }));
  // phone book window
  PhoneBookWindow = new BrowserWindow({
    width: 380,
    height: 665,
    title: 'phone book',
    show: false
  });
  PhoneBookWindow.loadURL(url.format({
    pathname: path.join(__dirname, './views/onglet2.html'),
    protocol: 'file:',
    slashes: true
  }));
});
// Catch item:add
ipcMain.on('item:add', function (e, item, name) {
  PhoneBookWindow.webContents.send('item:add', item, name);
  addWindow.hide();
});
ipcMain.on('item:call', function (e, num, time) {
  recentcallWindow.webContents.send('item:call', num, time);

});
ipcMain.on('item:num', function (e, item) {
  addWindow.webContents.send('item:num', item);

});

// Create menu template
const mainMenuTemplate = [
  // Each object is a dropdown
  {
    label: 'File',
    submenu: [{
        label: 'Add To phone',
        click() {
          addWindow.show();
        }
      },
      {
        label: 'Recenty call',
        click() {
          recentcallWindow.show();

        }
      },
      {
        label: 'Phone Book',
        click() {
          PhoneBookWindow.show();
        }
      },
      {
        label: 'Quit',
        accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click() {
          app.quit();
        }
      }
    ]
  }
];
// If OSX, add empty object to menu
if (process.platform == 'darwin') {
  mainMenuTemplate.unshift({});
}
// Add developer tools option if in dev
if (process.env.NODE_ENV !== 'production') {
  mainMenuTemplate.push({
    label: 'Developer Tools',
    submenu: [{
        role: 'reload'
      },
      {
        label: 'Toggle DevTools',
        accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      }
    ]
  });
}