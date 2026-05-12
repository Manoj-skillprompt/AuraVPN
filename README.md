# AuraVPN 🛡️

A premium, high-performance desktop VPN client built with **Next.js**, **Electron**, and **WireGuard**.

![AuraVPN Banner](public/logo.png)

## Features 🚀

- **Smart Connect**: Automatically detects and connects to the fastest server in your region.
- **Global Network**: High-speed servers across USA, UK, Japan, Germany, and more.
- **Privacy First**: Built on top of the modern WireGuard protocol for maximum security and speed.
- **System Tray Support**: Minimize the app to the tray and keep your connection active in the background.
- **Live Speed Test**: Real-time monitoring of your download, upload, and latency.
- **Kill Switch**: Protects your data by blocking internet access if the VPN connection drops.
- **Technical Logs**: Real-time console output for advanced users and troubleshooting.
- **Glassmorphism UI**: A stunning, modern interface with smooth animations and dark mode.

## Tech Stack 💻

- **Frontend**: Next.js 14, React, Framer Motion, Lucide Icons.
- **Backend**: Electron (Desktop Wrapper).
- **Core**: WireGuard (wg-quick) for networking.
- **Styling**: Vanilla CSS with custom design tokens.

## Getting Started 🛠️

### Prerequisites
- Node.js (v18+)
- WireGuard installed on your system (`wireguard-tools`)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Manoj-skillprompt/AuraVPN.git
   cd AuraVPN
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run in Development Mode**
   ```bash
   npm run dev
   ```

4. **Build the Application**
   ```bash
   npm run build
   ```

## Configuration ⚙️

Configuration files (.conf) should be placed in the `configs/` directory. The app supports dynamic loading of multiple regional configurations.

## Distribution 📦

To generate installers for your platform:

```bash
# For Linux (.deb, .AppImage)
npm run dist:linux

# For Windows (.exe)
npm run dist:win
```

## Security 🔒

AuraVPN uses `pkexec` (Linux) and `wireguard-tools` (Windows) to manage network interfaces securely. It does not store user data or logs on external servers.

---

Built with ❤️ by Manoj Chaudhary
