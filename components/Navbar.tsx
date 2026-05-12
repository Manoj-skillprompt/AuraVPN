"use client";

import Link from "next/link";
import { Menu, X, Shield, Download } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="glass" style={{
      position: 'fixed',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '95%',
      maxWidth: '1200px',
      zIndex: 1000,
      padding: '12px 32px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      border: '1px solid rgba(255,255,255,0.1)'
    }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Shield className="text-gradient" size={28} />
        <span style={{ fontSize: '1.25rem', fontWeight: '900', letterSpacing: '-0.5px' }}>AuraVPN</span>
      </Link>

      <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '32px', color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem' }}>
          <Link href="#features" style={{ transition: '0.3s' }}>Features</Link>
          <Link href="#network" style={{ transition: '0.3s' }}>Network</Link>
          <Link href="#security" style={{ transition: '0.3s' }}>Security</Link>
        </div>
        
        <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.1)' }} />

        <Link href="https://github.com/Manoj-skillprompt/AuraVPN/releases" target="_blank">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient" 
            style={{
              padding: '10px 24px',
              borderRadius: '10px',
              fontWeight: '600',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 0 20px var(--primary-glow)'
            }}
          >
            <Download size={16} /> Download
          </motion.button>
        </Link>
      </div>
    </nav>
  );
}
