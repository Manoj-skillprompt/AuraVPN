"use client";

import Sidebar from "@/components/Sidebar";
import { Download, Copy, Key, Shield, RefreshCw } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Settings() {
  const [copied, setCopied] = useState(false);
  const [config, setConfig] = useState(`[Interface]
PrivateKey = [CLIENT_PRIVATE_KEY]
Address = 10.0.0.2/32
DNS = 1.1.1.1, 8.8.8.8

[Peer]
PublicKey = [SERVER_PUBLIC_KEY]
AllowedIPs = 0.0.0.0/0
Endpoint = 45.128.21.4:51820
PersistentKeepalive = 25`);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(config);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadConfig = () => {
    const element = document.createElement("a");
    const file = new Blob([config], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "auravpn-ny.conf";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div style={{ display: 'flex', background: 'var(--background)', minHeight: '100vh' }}>
      <Sidebar />

      <main style={{ marginLeft: '320px', padding: '40px', width: '100%' }}>
        <header style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Manual Setup</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)' }}>Download WireGuard configurations for third-party clients</p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          <div className="glass" style={{ padding: '32px' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Key size={20} className="text-gradient" /> WireGuard Configuration
            </h2>
            
            <div style={{ 
              background: 'rgba(0,0,0,0.3)', 
              borderRadius: '12px', 
              padding: '24px', 
              fontFamily: 'monospace', 
              fontSize: '0.9rem', 
              color: 'rgba(255,255,255,0.8)',
              position: 'relative',
              border: '1px solid var(--card-border)',
              marginBottom: '24px'
            }}>
              <pre style={{ whiteSpace: 'pre-wrap' }}>{config}</pre>
              <div style={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', gap: '8px' }}>
                <button 
                  onClick={copyToClipboard}
                  style={{ background: 'rgba(255,255,255,0.1)', padding: '8px', borderRadius: '8px' }}
                >
                  <Copy size={16} color={copied ? "var(--success)" : "white"} />
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <button 
                onClick={downloadConfig}
                className="bg-gradient" 
                style={{ 
                  flex: 1, 
                  padding: '16px', 
                  borderRadius: '12px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '8px', 
                  fontWeight: '600' 
                }}
              >
                <Download size={20} /> Download .conf
              </button>
              <button 
                className="glass" 
                style={{ 
                  flex: 1, 
                  padding: '16px', 
                  borderRadius: '12px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '8px', 
                  fontWeight: '600' 
                }}
              >
                <RefreshCw size={20} /> Regenerate Keys
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div className="glass" style={{ padding: '32px' }}>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Account Info</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'rgba(255,255,255,0.5)' }}>Plan</span>
                  <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>PREMIUM</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'rgba(255,255,255,0.5)' }}>Expires</span>
                  <span>June 12, 2027</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'rgba(255,255,255,0.5)' }}>Device Limit</span>
                  <span>1 / 10</span>
                </div>
              </div>
            </div>

            <div className="glass" style={{ padding: '32px', background: 'rgba(255, 0, 200, 0.05)' }}>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Shield size={20} color="var(--accent)" /> Advanced Security
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginBottom: '24px' }}>
                Enable extra protection features for your account.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { label: "Kill Switch", desc: "Block internet if VPN disconnects" },
                  { label: "Double VPN", desc: "Route through two countries" },
                  { label: "Ad Blocker", desc: "Filter malicious domains" }
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: '600' }}>{item.label}</div>
                      <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>{item.desc}</div>
                    </div>
                    <div style={{ 
                      width: '40px', 
                      height: '20px', 
                      background: 'rgba(255,255,255,0.1)', 
                      borderRadius: '10px', 
                      position: 'relative' 
                    }}>
                      <div style={{ 
                        width: '16px', 
                        height: '16px', 
                        background: 'white', 
                        borderRadius: '50%', 
                        position: 'absolute', 
                        top: '2px', 
                        left: '2px' 
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
