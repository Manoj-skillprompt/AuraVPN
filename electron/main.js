/* eslint-disable */
/* eslint-env node */
const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron');
const path = require('path');
const { exec } = require('child_process');

const isDev = !app.isPackaged;

let serve;
if (!isDev) {
  serve = require('electron-serve');
}

const loadURL = !isDev ? serve({ directory: 'out' }) : null;

let mainWindow;
let tray = null;

// Register Window Handlers
ipcMain.handle('window:minimize', () => {
  if (mainWindow) mainWindow.minimize();
});

ipcMain.handle('window:maximize', () => {
  if (!mainWindow) return;
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow.maximize();
  }
});

ipcMain.handle('window:close', () => {
  if (mainWindow) {
    // Instead of closing, we hide it to keep it in the tray
    mainWindow.hide();
  }
});

const isWin = process.platform === 'win32';

function createTray() {
  const iconPath = path.join(__dirname, '../public/logo.png');
  tray = new Tray(iconPath);
  
  const contextMenu = Menu.buildFromTemplate([
    { 
      label: 'Show AuraVPN', 
      click: () => {
        if (mainWindow) {
          mainWindow.show();
        }
      } 
    },
    { type: 'separator' },
    { 
      label: 'Connect Fastest', 
      click: () => {
        // We could emit an IPC event here to trigger connection
        if (mainWindow) {
          mainWindow.webContents.send('vpn:request-connect');
          mainWindow.show();
        }
      }
    },
    { type: 'separator' },
    { 
      label: 'Quit AuraVPN', 
      click: () => {
        app.isQuitting = true;
        app.quit();
      } 
    }
  ]);

  tray.setToolTip('AuraVPN - Premium Privacy');
  tray.setContextMenu(contextMenu);

  tray.on('click', () => {
    if (mainWindow) {
      mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
    }
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    titleBarStyle: 'hidden',
    backgroundColor: '#050505',
    show: false,
    icon: path.join(__dirname, '../public/logo.png')
  });

  if (isDev) {
    setTimeout(() => {
      mainWindow.loadURL('http://localhost:3000');
    }, 2000);
  } else {
    loadURL(mainWindow);
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Handle close event to prevent quitting
  mainWindow.on('close', (event) => {
    if (!app.isQuitting) {
      event.preventDefault();
      mainWindow.hide();
    }
    return false;
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', () => {
  createWindow();
  createTray();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    // We don't quit here anymore because of tray
  }
});

app.on('will-quit', () => {
  const configPath = path.join(__dirname, '../configs/wg0.conf');
  if (isWin) {
    exec('wireguard /uninstalltunnelservice wg0');
  } else {
    exec(`sudo wg-quick down ${configPath}`);
  }
});

// VPN IPC Handlers
ipcMain.handle('vpn:connect', async (event, configPath) => {
  return new Promise((resolve, reject) => {
    const command = isWin 
      ? `wireguard /installtunnelservice "${configPath}"`
      : `pkexec wg-quick up "${configPath}"`;
      
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(stderr || error.message);
        return;
      }
      resolve(stdout);
    });
  });
});

ipcMain.handle('vpn:disconnect', async (event, configPath) => {
  return new Promise((resolve, reject) => {
    const name = path.basename(configPath, '.conf');
    const command = isWin
      ? `wireguard /uninstalltunnelservice ${name}`
      : `sudo wg-quick down "${configPath}"`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(stderr || error.message);
        return;
      }
      resolve(stdout);
    });
  });
});

ipcMain.handle('vpn:status', async () => {
  return new Promise((resolve) => {
    if (isWin) {
      exec('sc query WireGuardTunnel$wg0', (error, stdout) => {
        resolve(!error && stdout.includes('RUNNING'));
      });
    } else {
      exec('ip link show wg0', (error) => {
        resolve(!error);
      });
    }
  });
});
