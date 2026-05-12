"use client";

import Navbar from "@/components/Navbar";
import { Shield, Zap, Globe, Lock, CheckCircle, Download, Apple, Monitor, Terminal } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";

export default function Home() {
  return (
    <div style={{ background: 'var(--background)', minHeight: '100vh', overflowX: 'hidden' }}>
      <Navbar />

      {/* Hero Section */}
      <section style={{ 
        padding: '160px 20px 100px', 
        textAlign: 'center', 
        position: 'relative',
        background: 'radial-gradient(circle at center, rgba(0, 209, 255, 0.08) 0%, rgba(0,0,0,0) 70%)'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="glass" style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            padding: '8px 20px', 
            borderRadius: '100px', 
            fontSize: '0.9rem',
            marginBottom: '32px',
            color: 'var(--primary)',
            border: '1px solid var(--primary-glow)'
          }}>
            <Zap size={14} /> Next-Gen WireGuard Technology
          </div>
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 8vw, 5rem)', 
            fontWeight: '900', 
            lineHeight: '1.1',
            marginBottom: '24px',
            letterSpacing: '-2px'
          }}>
            Internet Freedom, <br />
            <span className="text-gradient">Redefined.</span>
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            color: 'rgba(255,255,255,0.6)', 
            maxWidth: '650px', 
            margin: '0 auto 48px',
            lineHeight: '1.6'
          }}>
            Experience the world&apos;s fastest VPN with military-grade encryption, zero logs, and a stunning interface. Built for the modern web.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <motion.a 
              href="https://github.com/Manoj-skillprompt/AuraVPN/releases"
              target="_blank"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient shimmer"
              style={{ 
                padding: '18px 40px', 
                borderRadius: '14px', 
                fontWeight: 'bold', 
                fontSize: '1.1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: '0 0 30px var(--primary-glow)'
              }}
            >
              <Download size={20} /> Download AuraVPN
            </motion.a>
            <Link href="/dashboard">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                className="glass"
                style={{ 
                  padding: '18px 40px', 
                  borderRadius: '14px', 
                  fontWeight: 'bold', 
                  fontSize: '1.1rem',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                Go to Dashboard
              </motion.button>
            </Link>
          </div>

          <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', gap: '32px', color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle size={16} color="var(--success)" /> No Credit Card Required</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle size={16} color="var(--success)" /> Open Source</div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section style={{ padding: '100px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Engineered for Speed & Security</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)' }}>Why millions are switching to the Aura ecosystem</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
          <FeatureCard 
            icon={<Zap size={32} color="var(--primary)" />}
            title="Fastest Protocols"
            desc="Leveraging WireGuard for speeds up to 3x faster than traditional OpenVPN connections."
          />
          <FeatureCard 
            icon={<Lock size={32} color="var(--secondary)" />}
            title="Military Encryption"
            desc="Your data is protected by ChaCha20 encryption, ensuring total privacy from ISPs and hackers."
          />
          <FeatureCard 
            icon={<Globe size={32} color="var(--accent)" />}
            title="Global Network"
            desc="Connect to 5,000+ servers in 60 countries with a single click. No throttled speeds."
          />
          <FeatureCard 
            icon={<Terminal size={32} color="var(--success)" />}
            title="Developer Friendly"
            desc="Built-in technical logs and a CLI interface for power users who want more control."
          />
          <FeatureCard 
            icon={<Monitor size={32} color="var(--primary)" />}
            title="Cross-Platform"
            desc="Native support for Windows and Linux with a unified premium experience."
          />
          <FeatureCard 
            icon={<Shield size={32} color="var(--warning)" />}
            title="Strict No-Logs"
            desc="We don't track, collect, or share your private data. What you do online stays private."
          />
        </div>
      </section>

      {/* Download Platforms Section */}
      <section style={{ padding: '100px 20px', background: 'rgba(255,255,255,0.02)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '48px' }}>Available on All Platforms</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
            <PlatformLink icon={<Monitor size={48} />} name="Windows" version="v1.0.0 (.exe)" />
            <PlatformLink icon={<Terminal size={48} />} name="Linux" version="v1.0.0 (.deb / .AppImage)" />
            <PlatformLink icon={<Apple size={48} />} name="macOS" version="Coming Soon" disabled />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '80px 20px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '24px' }}>
          <Shield className="text-gradient" size={32} />
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>AuraVPN</span>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.9rem' }}>
          &copy; 2026 Aura Security Group. All rights reserved. <br />
          Built with Next.js and Electron.
        </p>
      </footer>
    </div>
  );
}

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  desc: string;
}

function FeatureCard({ icon, title, desc }: FeatureCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="glass" 
      style={{ padding: '40px', border: '1px solid rgba(255,255,255,0.05)' }}
    >
      <div style={{ marginBottom: '24px' }}>{icon}</div>
      <h3 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>{title}</h3>
      <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: '1.6' }}>{desc}</p>
    </motion.div>
  );
}

interface PlatformLinkProps {
  icon: ReactNode;
  name: string;
  version: string;
  disabled?: boolean;
}

function PlatformLink({ icon, name, version, disabled = false }: PlatformLinkProps) {
  return (
    <div style={{ opacity: disabled ? 0.3 : 1, textAlign: 'center' }}>
      <div style={{ marginBottom: '16px', color: 'var(--primary)' }}>{icon}</div>
      <div style={{ fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '4px' }}>{name}</div>
      <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>{version}</div>
    </div>
  );
}
