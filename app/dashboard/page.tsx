"use client";

import Sidebar from "@/components/Sidebar";
import { Power, Globe, Zap, ShieldCheck, Download, Upload, Activity, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Server {
  id: string | number;
  name: string;
  flag: string;
  latency: number;
  config: string;
}

const allServers: Server[] = [
  { id: 1, name: "United States - New York", flag: "🇺🇸", latency: 24, config: "usa.conf" },
  { id: 2, name: "United Kingdom - London", flag: "🇬🇧", latency: 38, config: "uk.conf" },
  { id: 3, name: "Japan - Tokyo", flag: "🇯🇵", latency: 145, config: "japan.conf" },
  { id: 4, name: "Germany - Frankfurt", flag: "🇩🇪", latency: 42, config: "usa.conf" },
  { id: 5, name: "Singapore - Central", flag: "🇸🇬", latency: 98, config: "usa.conf" },
  { id: 6, name: "Canada - Toronto", flag: "🇨🇦", latency: 31, config: "usa.conf" },
  { id: 7, name: "Australia - Sydney", flag: "🇦🇺", latency: 210, config: "usa.conf" },
  { id: 8, name: "India - Mumbai", flag: "🇮🇳", latency: 112, config: "usa.conf" },
];

export default function Dashboard() {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isTestingSpeed, setIsTestingSpeed] = useState(false);
  const [stats, setStats] = useState({ down: "0.0", up: "0.0", ping: "--" });
  const [selectedServer, setSelectedServer] = useState<Server>({ 
    id: 'smart', 
    name: "Smart Connect", 
    flag: "⚡", 
    latency: 0,
    config: "usa.conf" 
  });
  const [actualConnectedServer, setActualConnectedServer] = useState<Server | null>(null);

  // Moved functions to the top to avoid "access before declaration" errors
  const connectToVPN = async (server: Server) => {
    let serverToUse = server;
    if (server.id === 'smart') {
      serverToUse = allServers.reduce((prev, curr) => (prev.latency < curr.latency ? prev : curr));
    }

    const configPath = `/home/manoj/personal/vpn/configs/${serverToUse.config}`;
    
    setIsConnecting(true);
    try {
      if (!window.electron) throw new Error("Electron API not found.");
      await window.electron.vpn.connect(configPath);
      setIsConnecting(false);
      setIsConnected(true);
      setActualConnectedServer(serverToUse);
      setStats({ 
        down: (Math.random() * 200 + 50).toFixed(1), 
        up: (Math.random() * 50 + 10).toFixed(1), 
        ping: `${serverToUse.latency}ms` 
      });
    } catch (err) {
      setIsConnecting(false);
      console.error("VPN Error:", err);
    }
  };

  const toggleConnect = async () => {
    const configPath = `/home/manoj/personal/vpn/configs/${selectedServer.config}`;

    if (isConnected) {
      try {
        if (!window.electron) throw new Error("Electron API not found.");
        await window.electron.vpn.disconnect(configPath);
        setIsConnected(false);
        setActualConnectedServer(null);
        setStats({ down: "0.0", up: "0.0", ping: "--" });
      } catch (err) {
        console.error("Failed to disconnect:", err);
      }
    } else {
      await connectToVPN(selectedServer);
    }
  };

  const runSpeedTest = () => {
    if (!isConnected) return;
    setIsTestingSpeed(true);
    let count = 0;
    const interval = setInterval(() => {
      setStats({
        down: (Math.random() * 300 + 100).toFixed(1),
        up: (Math.random() * 80 + 20).toFixed(1),
        ping: `${Math.floor(Math.random() * 10 + 20)}ms`
      });
      count++;
      if (count > 20) {
        clearInterval(interval);
        setIsTestingSpeed(false);
      }
    }, 150);
  };

  // Now useEffect can safely call the functions above
  useEffect(() => {
    const saved = localStorage.getItem("selectedServer");
    const autoConnect = localStorage.getItem("autoConnect") === "true";
    
    if (saved) {
      const parsed = JSON.parse(saved);
      setTimeout(() => {
        setSelectedServer(parsed);
        
        if (autoConnect && !isConnected) {
          connectToVPN(parsed);
        }
      }, 0);
    }
  }, []);

  useEffect(() => {
    const checkStatus = async () => {
      if (window.electron) {
        const active = await window.electron.vpn.status();
        setIsConnected(active);
      }
    };
    checkStatus();
    const interval = setInterval(checkStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'flex', background: 'var(--background)', minHeight: '100vh' }}>
      <Sidebar />

      <main style={{ marginLeft: '320px', padding: '40px', width: '100%' }}>
        {/* Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <h1 style={{ fontSize: '2rem', marginBottom: '4px' }}>Welcome back, Manoj</h1>
            <p style={{ color: 'rgba(255,255,255,0.5)' }}>Your connection is {isConnected ? "secure" : "not protected"}</p>
          </div>
          <div className="glass" style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ 
              width: '10px', 
              height: '10px', 
              borderRadius: '50%', 
              background: isConnected ? 'var(--success)' : 'var(--error)',
              boxShadow: isConnected ? '0 0 10px var(--success)' : '0 0 10px var(--error)'
            }} />
            <span style={{ fontWeight: '600' }}>{isConnected ? "Protected" : "Unprotected"}</span>
          </div>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '32px' }}>
          <div className="glass" style={{ 
            padding: '60px', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <AnimatePresence>
              {isConnected && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'radial-gradient(circle, var(--primary-glow) 0%, rgba(255, 255, 255, 0) 70%)',
                    zIndex: 0
                  }}
                />
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleConnect}
              disabled={isConnecting}
              style={{
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem',
                position: 'relative',
                zIndex: 1,
                border: '4px solid rgba(255,255,255,0.1)',
                background: isConnected ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                color: isConnected ? 'white' : 'rgba(255,255,255,0.3)',
                boxShadow: isConnected ? '0 0 40px var(--primary-glow)' : 'none',
                transition: 'var(--transition-smooth)'
              }}
            >
              <Power size={64} />
              {isConnecting && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  style={{
                    position: 'absolute',
                    top: '-10px',
                    left: '-10px',
                    right: '-10px',
                    bottom: '-10px',
                    borderRadius: '50%',
                    border: '4px solid transparent',
                    borderTopColor: 'var(--primary)',
                    zIndex: -1
                  }}
                />
              )}
            </motion.button>

            <div style={{ marginTop: '32px', textAlign: 'center', zIndex: 1 }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>
                {isConnecting ? "Connecting..." : isConnected ? "Connected" : "Disconnected"}
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.5)' }}>
                {isConnected && actualConnectedServer ? 
                  `Connected to ${actualConnectedServer.name}` : 
                  "Tap to establish a secure tunnel"}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div className="glass" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>Location</span>
                <Link href="/dashboard/servers" style={{ color: 'var(--primary)', fontSize: '0.9rem' }}>Change</Link>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '1.5rem' }}>{selectedServer.flag}</span>
                <span style={{ fontWeight: '600' }}>{selectedServer.name}</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="glass" style={{ padding: '20px', position: 'relative' }}>
                <Download size={16} style={{ color: 'var(--primary)', marginBottom: '8px' }} />
                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>Download</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{stats.down} <small style={{ fontSize: '0.7rem' }}>Mbps</small></div>
                {isTestingSpeed && <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity }} style={{ position: 'absolute', top: '10px', right: '10px', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)' }} />}
              </div>
              <div className="glass" style={{ padding: '20px', position: 'relative' }}>
                <Upload size={16} style={{ color: 'var(--secondary)', marginBottom: '8px' }} />
                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>Upload</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{stats.up} <small style={{ fontSize: '0.7rem' }}>Mbps</small></div>
                {isTestingSpeed && <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, delay: 0.1 }} style={{ position: 'absolute', top: '10px', right: '10px', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--secondary)' }} />}
              </div>
            </div>

            <div className="glass" style={{ padding: '24px', flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Activity size={16} style={{ color: 'var(--success)' }} />
                  <span style={{ fontWeight: '600' }}>Network Stats</span>
                </div>
                <button 
                  onClick={runSpeedTest} 
                  disabled={!isConnected || isTestingSpeed}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: isConnected ? 'var(--primary)' : 'rgba(255,255,255,0.2)', 
                    cursor: isConnected ? 'pointer' : 'default',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.8rem'
                  }}
                >
                  <RefreshCw size={14} className={isTestingSpeed ? "animate-spin" : ""} />
                  Test Speed
                </button>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '80px' }}>
                {[40, 70, 45, 90, 65, 80, 55, 75, 40, 60, 85, 50].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: isConnected ? `${h}%` : '10%' }}
                    style={{
                      flex: 1,
                      borderRadius: '2px',
                      background: isConnected ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                      opacity: isConnected ? 0.6 : 0.2
                    }}
                  />
                ))}
              </div>
              <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>
                <span>Latency</span>
                <span style={{ color: isConnected ? 'var(--success)' : 'inherit' }}>{stats.ping}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
