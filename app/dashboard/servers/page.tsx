"use client";

import Sidebar from "@/components/Sidebar";
import { Search, Globe, Zap, Shield, ChevronRight, Check } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const servers = [
  { id: 1, name: "United States - New York", flag: "🇺🇸", latency: "24ms", load: "42%", recommended: true },
  { id: 2, name: "United Kingdom - London", flag: "🇬🇧", latency: "38ms", load: "12%", recommended: true },
  { id: 3, name: "Japan - Tokyo", flag: "🇯🇵", latency: "145ms", load: "65%", recommended: false },
  { id: 4, name: "Germany - Frankfurt", flag: "🇩🇪", latency: "42ms", load: "28%", recommended: false },
  { id: 5, name: "Singapore - Central", flag: "🇸🇬", latency: "98ms", load: "54%", recommended: false },
  { id: 6, name: "Canada - Toronto", flag: "🇨🇦", latency: "31ms", load: "18%", recommended: false },
  { id: 7, name: "Australia - Sydney", flag: "🇦🇺", latency: "210ms", load: "33%", recommended: false },
  { id: 8, name: "India - Mumbai", flag: "🇮🇳", latency: "112ms", load: "78%", recommended: false },
];

export default function Servers() {
  const [selectedId, setSelectedId] = useState(1);
  const [search, setSearch] = useState("");

  const filteredServers = servers.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', background: 'var(--background)', minHeight: '100vh' }}>
      <Sidebar />

      <main style={{ marginLeft: '320px', padding: '40px', width: '100%' }}>
        <header style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Global Servers</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)' }}>Choose from 5,000+ lightning-fast locations</p>
        </header>

        <div className="glass" style={{ padding: '32px' }}>
          <div style={{ position: 'relative', marginBottom: '32px' }}>
            <Search style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} size={20} />
            <input 
              type="text" 
              placeholder="Search for a country or city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--card-border)',
                borderRadius: '12px',
                padding: '16px 16px 16px 52px',
                color: 'white',
                fontSize: '1rem',
                outline: 'none',
                transition: 'var(--transition-smooth)'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filteredServers.map((server) => (
              <motion.div
                key={server.id}
                whileHover={{ background: 'rgba(255,255,255,0.05)' }}
                onClick={() => setSelectedId(server.id)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '50px 1fr 100px 100px 50px',
                  alignItems: 'center',
                  padding: '16px 24px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  border: selectedId === server.id ? '1px solid var(--primary)' : '1px solid rgba(255, 255, 255, 0)',
                  background: selectedId === server.id ? 'rgba(0, 209, 255, 0.05)' : 'rgba(255, 255, 255, 0)',
                  transition: 'var(--transition-smooth)'
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>{server.flag}</span>
                <div>
                  <div style={{ fontWeight: '600' }}>{server.name}</div>
                  {server.recommended && (
                    <span style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 'bold', textTransform: 'uppercase' }}>Recommended</span>
                  )}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Zap size={14} /> {server.latency}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>Load: {server.load}</div>
                  <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ 
                      width: server.load, 
                      height: '100%', 
                      background: parseInt(server.load) > 70 ? 'var(--warning)' : 'var(--success)' 
                    }} />
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {selectedId === server.id ? (
                    <div style={{ background: 'var(--primary)', borderRadius: '50%', padding: '4px' }}>
                      <Check size={16} />
                    </div>
                  ) : (
                    <ChevronRight size={20} color="rgba(255,255,255,0.2)" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
