"use client";

import Sidebar from "@/components/Sidebar";
import { Terminal, Copy, Trash2} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function LogViewer() {
  const [logs, setLogs] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulated log stream
    const initialLogs = [
      "[INFO] AuraVPN Client initialized (v1.0.0)",
      "[DEBUG] Checking WireGuard binary status...",
      "[INFO] WireGuard tools found in /usr/bin/wg",
      "[INFO] System architecture detected: x64",
      "[DEBUG] Loading user preferences from localStorage",
      "[INFO] UI Ready"
    ];
    
    // Fixed: Wrapping in setTimeout to avoid the "cascading render" warning
    setTimeout(() => {
      setLogs(initialLogs);
    }, 0);

    const interval = setInterval(() => {
      const timestamp = new Date().toLocaleTimeString();
      const newLogs = [
        `[DEBUG] ${timestamp} - Heartbeat sent to server`,
        `[INFO] ${timestamp} - Connection stable (Ping: ${Math.floor(Math.random() * 20 + 20)}ms)`,
      ];
      setLogs(prev => [...prev, ...newLogs].slice(-50)); // Keep last 50 logs
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div style={{ display: 'flex', background: 'var(--background)', minHeight: '100vh' }}>
      <Sidebar />

      <main style={{ marginLeft: '320px', padding: '40px', width: '100%' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Log Viewer</h1>
            <p style={{ color: 'rgba(255,255,255,0.5)' }}>Technical output and connection details</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="glass" style={{ padding: '10px 20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Copy size={16} /> Copy All
            </button>
            <button className="glass" onClick={() => setLogs([])} style={{ padding: '10px 20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--error)' }}>
              <Trash2 size={16} /> Clear Logs
            </button>
          </div>
        </header>

        <div className="glass" style={{ 
          background: 'rgba(0,0,0,0.5)', 
          borderRadius: '16px', 
          border: '1px solid rgba(255,255,255,0.1)',
          padding: '24px',
          fontFamily: 'monospace',
          height: 'calc(100vh - 200px)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', color: 'rgba(255,255,255,0.3)', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px' }}>
            <Terminal size={16} /> 
            <span>AuraVPN-Console-Output</span>
          </div>

          <div 
            ref={scrollRef}
            style={{ 
              flex: 1, 
              overflowY: 'auto', 
              color: 'rgba(0, 255, 100, 0.8)', 
              fontSize: '0.9rem',
              lineHeight: '1.6'
            }}
          >
            {logs.length === 0 && <div style={{ color: 'rgba(255,255,255,0.2)', textAlign: 'center', marginTop: '40px' }}>No logs to display</div>}
            {logs.map((log, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                style={{ marginBottom: '4px' }}
              >
                <span style={{ color: 'rgba(255,255,255,0.2)' }}>[{i+1}]</span> {log}
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
