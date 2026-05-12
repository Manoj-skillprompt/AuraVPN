export interface IElectronAPI {
  vpn: {
    connect: (configPath: string) => Promise<string>;
    disconnect: (configPath: string) => Promise<string>;
    status: () => Promise<boolean>;
  };
  window: {
    minimize: () => Promise<void>;
    maximize: () => Promise<void>;
    close: () => Promise<void>;
  };
}

declare global {
  interface Window {
    electron: IElectronAPI;
  }
}
