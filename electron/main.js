/* eslint-disable */
/* eslint-env node */
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { exec } = require('child_process');

const isDev = !app.isPackaged;

let serve;
if (!isDev) {
  serve = require('electron-serve');
}

const loadURL = !isDev ? serve({ directory: 'out' }) : null;

let mainWindow;

// Register Window Handlers FIRST to ensure they are always ready
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
  if (mainWindow) mainWindow.close();
});

const isWin = process.platform === 'win32';

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
