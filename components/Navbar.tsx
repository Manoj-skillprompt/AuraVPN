"use client";

import Link from "next/link";
import { Shield, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar glass" style={{
      position: 'fixed',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '90%',
      maxWidth: '1200px',
      zIndex: 1000,
      padding: '12px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>


      <div className="desktop-menu" style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
        <Link href="#features">Features</Link>
        <Link href="#pricing">Pricing</Link>
        <Link href="/dashboard" className="bg-gradient" style={{
          padding: '8px 20px',
          borderRadius: '8px',
          fontWeight: '500',
          boxShadow: '0 0 15px var(--primary-glow)'
        }}>
          Get Started
        </Link>
      </div>

      <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)} style={{ display: 'none' }}>
        {isOpen ? <X /> : <Menu />}
      </button>

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
