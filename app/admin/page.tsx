"use client";

import { Shield, Users, Server, Globe, Activity, AlertTriangle, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

const stats = [
  { label: "Total Users", value: "12,482", growth: "+12%", icon: <Users /> },
  { label: "Active Servers", value: "542", growth: "+2", icon: <Server /> },
  { label: "Global Traffic", value: "84.2 TB/s", growth: "+5%", icon: <Activity /> },
  { label: "Revenue (MTD)", value: "$42.5K", growth: "+18%", icon: <Shield /> },
];

const serverHealth = [
  { name: "NY-01", region: "US-East", status: "Healthy", load: "42%", uptime: "99.99%" },
  { name: "LON-04", region: "EU-West", status: "Healthy", load: "28%", uptime: "100%" },
  { name: "TOK-02", region: "AP-Northeast", status: "Warning", load: "89%", uptime: "98.5%" },
  { name: "FRA-07", region: "EU-Central", status: "Healthy", load: "15%", uptime: "99.95%" },
];

export default function AdminDashboard() {
  const [realTimeStats, setRealTimeStats] = useState(stats);

  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeStats(prev => prev.map(s => ({
        ...s,
        value: s.label === "Global Traffic" 
          ? (80 + Math.random() * 10).toFixed(1) + " TB/s"
          : s.value
      })));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ background: '#050505', minHeight: '100vh', padding: '40px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Shield className="text-gradient" size={32} /> AuraVPN Admin
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)' }}>Network Operations & System Management</p>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <button className="glass" style={{ padding: '12px 24px', borderRadius: '12px', fontWeight: '600' }}>System Status</button>
          <button className="bg-gradient" style={{ padding: '12px 24px', borderRadius: '12px', fontWeight: '600' }}>Deploy New Server</button>
        </div>
      </header>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '40px' }}>
        {realTimeStats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass"
            style={{ padding: '24px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '10px', color: 'var(--primary)' }}>
                {stat.icon}
              </div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '4px', 
                color: stat.growth.startsWith('+') ? 'var(--success)' : 'var(--error)',
                fontSize: '0.8rem',
                fontWeight: 'bold'
              }}>
                {stat.growth} <ArrowUpRight size={14} />
              </div>
            </div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', marginBottom: '4px' }}>{stat.label}</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>{stat.value}</div>
          </motion.div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
        {/* Server Health Table */}
        <div className="glass" style={{ padding: '32px' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '24px' }}>Server Health Monitor</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--card-border)' }}>
                <th style={{ padding: '16px', color: 'rgba(255,255,255,0.4)', fontWeight: '500' }}>Server</th>
                <th style={{ padding: '16px', color: 'rgba(255,255,255,0.4)', fontWeight: '500' }}>Region</th>
                <th style={{ padding: '16px', color: 'rgba(255,255,255,0.4)', fontWeight: '500' }}>Status</th>
                <th style={{ padding: '16px', color: 'rgba(255,255,255,0.4)', fontWeight: '500' }}>Load</th>
                <th style={{ padding: '16px', color: 'rgba(255,255,255,0.4)', fontWeight: '500' }}>Uptime</th>
              </tr>
            </thead>
            <tbody>
              {serverHealth.map((server, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--card-border)' }}>
                  <td style={{ padding: '16px', fontWeight: '600' }}>{server.name}</td>
                  <td style={{ padding: '16px', color: 'rgba(255,255,255,0.6)' }}>{server.region}</td>
                  <td style={{ padding: '16px' }}>
                    <span style={{ 
                      padding: '4px 12px', 
                      borderRadius: '20px', 
                      fontSize: '0.75rem', 
                      fontWeight: 'bold',
                      background: server.status === 'Healthy' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                      color: server.status === 'Healthy' ? 'var(--success)' : 'var(--warning)',
                    }}>
                      {server.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px' }}>{server.load}</td>
                  <td style={{ padding: '16px' }}>{server.uptime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* System Alerts */}
        <div className="glass" style={{ padding: '32px' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertTriangle size={20} color="var(--warning)" /> Critical Alerts
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { type: 'warning', msg: 'High load detected on TOK-02 server.', time: '2 mins ago' },
              { type: 'error', msg: 'DDoS attempt mitigated on LON-04.', time: '15 mins ago' },
              { type: 'info', msg: 'New firmware update available for NY nodes.', time: '1 hour ago' },
            ].map((alert, i) => (
              <div key={i} style={{ 
                padding: '16px', 
                borderRadius: '12px', 
                background: 'rgba(255,255,255,0.03)',
                borderLeft: `4px solid ${alert.type === 'error' ? 'var(--error)' : alert.type === 'warning' ? 'var(--warning)' : 'var(--primary)'}`
              }}>
                <div style={{ fontSize: '0.9rem', marginBottom: '4px' }}>{alert.msg}</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>{alert.time}</div>
              </div>
            ))}
          </div>
          <button style={{ width: '100%', marginTop: '24px', color: 'var(--primary)', fontWeight: '600' }}>View All Incident Reports</button>
        </div>
      </div>
    </div>
  );
}
