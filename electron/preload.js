// @ts-nocheck
/* eslint-disable */
/* eslint-env node */
const { contextBridge, ipcRenderer } = require('electron');

console.log("AuraVPN: Preload script initialized");

contextBridge.exposeInMainWorld('electron', {
  vpn: {
    connect: (configPath) => ipcRenderer.invoke('vpn:connect', configPath),
    disconnect: (configPath) => ipcRenderer.invoke('vpn:disconnect', configPath),
    status: () => ipcRenderer.invoke('vpn:status'),
  },
  window: {
    minimize: () => ipcRenderer.invoke('window:minimize'),
    maximize: () => ipcRenderer.invoke('window:maximize'),
    close: () => ipcRenderer.invoke('window:close'),
  }
});
