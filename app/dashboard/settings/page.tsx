"use client";

import Sidebar from "@/components/Sidebar";
import { motion } from "framer-motion";
import { Shield, Monitor } from "lucide-react";
import { useState, useEffect } from "react";

interface AppSettings {
  autoConnect: boolean;
  killSwitch: boolean;
  minimizeToTray: boolean;
  launchOnStartup: boolean;
  notifications: boolean;
}

export default function Settings() {
  const [settings, setSettings] = useState<AppSettings>({
    autoConnect: false,
    killSwitch: false,
    minimizeToTray: true,
    launchOnStartup: false,
    notifications: true,
  });

  useEffect(() => {
    // Load settings from localStorage
    const savedAutoConnect = localStorage.getItem("autoConnect") === "true";
    const savedKillSwitch = localStorage.getItem("killSwitch") === "true";
    const savedMinimizeToTray = localStorage.getItem("minimizeToTray") !== "false"; // Default true
    
    // Fixed: Wrapping in setTimeout to avoid the "cascading render" warning
    setTimeout(() => {
      setSettings(prev => ({
        ...prev,
        autoConnect: savedAutoConnect,
        killSwitch: savedKillSwitch,
        minimizeToTray: savedMinimizeToTray
      }));
    }, 0);
  }, []);

  const toggleSetting = (key: keyof AppSettings) => {
    const newValue = !settings[key];
    setSettings(prev => ({ ...prev, [key]: newValue }));
    localStorage.setItem(key, String(newValue));
  };

  return (
    <div style={{ display: 'flex', background: 'var(--background)', minHeight: '100vh' }}>
      <Sidebar />

      <main style={{ marginLeft: '320px', padding: '40px', width: '100%' }}>
        <header style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Settings</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)' }}>Manage your AuraVPN preferences and security</p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          {/* General Settings */}
          <div className="glass" style={{ padding: '32px' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Monitor size={20} className="text-gradient" /> General
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <SettingToggle 
                label="Launch on Startup" 
                desc="Automatically start AuraVPN when you turn on your computer"
                active={settings.launchOnStartup}
                onClick={() => toggleSetting('launchOnStartup')}
              />
              <SettingToggle 
                label="Auto-Connect" 
                desc="Instantly connect to the fastest server on app launch"
                active={settings.autoConnect}
                onClick={() => toggleSetting('autoConnect')}
              />
              <SettingToggle 
                label="Minimize to Tray" 
                desc="Keep the app running in the system tray when closing the window"
                active={settings.minimizeToTray}
                onClick={() => toggleSetting('minimizeToTray')}
              />
              <SettingToggle 
                label="Desktop Notifications" 
                desc="Get notified when VPN connects or disconnects"
                active={settings.notifications}
                onClick={() => toggleSetting('notifications')}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Security Settings */}
            <div className="glass" style={{ padding: '32px', background: 'rgba(0, 209, 255, 0.03)' }}>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Shield size={20} style={{ color: 'var(--primary)' }} /> Security
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <SettingToggle 
                  label="Kill Switch" 
                  desc="Blocks internet access if the VPN connection drops unexpectedly"
                  active={settings.killSwitch}
                  onClick={() => toggleSetting('killSwitch')}
                  accent="var(--error)"
                />
                <div style={{ padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ fontWeight: '600', marginBottom: '8px' }}>VPN Protocol</div>
                  <select style={{ 
                    width: '100%', 
                    background: 'rgba(0,0,0,0.2)', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    padding: '12px', 
                    borderRadius: '8px', 
                    color: 'white',
                    outline: 'none'
                  }}>
                    <option>WireGuard (Recommended)</option>
                    <option>OpenVPN (UDP)</option>
                    <option>OpenVPN (TCP)</option>
                    <option>IKEv2</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Account Settings */}
            <div className="glass" style={{ padding: '32px' }}>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '24px' }}>Account Status</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  borderRadius: '50%', 
                  background: 'var(--bg-gradient)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  border: '2px solid var(--primary)'
                }}>
                  M
                </div>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Manoj Chaudhary</div>
                  <div style={{ color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 'bold' }}>PREMIUM USER</div>
                </div>
              </div>
              <button className="glass" style={{ width: '100%', padding: '12px', borderRadius: '12px', color: 'rgba(255,255,255,0.6)' }}>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

interface SettingToggleProps {
  label: string;
  desc: string;
  active: boolean;
  onClick: () => void;
  accent?: string;
}

function SettingToggle({ label, desc, active, onClick, accent = 'var(--primary)' }: SettingToggleProps) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: '600', marginBottom: '4px' }}>{label}</div>
        <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', maxWidth: '80%' }}>{desc}</div>
      </div>
      <div 
        onClick={onClick}
        style={{ 
          width: '50px', 
          height: '26px', 
          background: active ? accent : 'rgba(255,255,255,0.1)', 
          borderRadius: '13px', 
          position: 'relative',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: active ? `0 0 15px ${accent}44` : 'none'
        }}
      >
        <motion.div 
          animate={{ x: active ? 26 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          style={{ 
            width: '22px', 
            height: '22px', 
            background: 'white', 
            borderRadius: '50%', 
            position: 'absolute', 
            top: '2px'
          }} 
        />
      </div>
    </div>
  );
}
