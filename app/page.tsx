"use client";

import Navbar from "@/components/Navbar";
import { Shield, Zap, Globe, Lock, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', paddingBottom: '100px' }}>
      <Navbar />

      {/* Hero Section */}
      <section style={{
        padding: '160px 20px 80px',
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'center',
        gap: '60px'
      }} id="hero">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 style={{ fontSize: '4.5rem', lineHeight: '1.1', marginBottom: '24px' }}>
            Ultimate Privacy <br />
            <span className="text-gradient">Without Compromise</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', marginBottom: '40px', maxWidth: '500px' }}>
            AuraVPN uses military-grade encryption and ultra-fast WireGuard protocol to keep your digital life secure and anonymous.
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <Link href="/dashboard" className="bg-gradient glow-primary" style={{
              padding: '16px 32px',
              borderRadius: '12px',
              fontSize: '1.1rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              Start Free Trial <ChevronRight size={20} />
            </Link>
            <Link href="#features" className="glass" style={{
              padding: '16px 32px',
              borderRadius: '12px',
              fontSize: '1.1rem',
              fontWeight: '600'
            }}>
              Learn More
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="animate-float"
          style={{ position: 'relative', height: '500px', width: '100%' }}
        >
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle, var(--primary-glow) 0%, transparent 70%)',
            zIndex: -1
          }} />

        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ padding: '100px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '16px' }}>Why Choose AuraVPN?</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem' }}>The most advanced features for your online freedom.</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '32px'
        }}>
          {[
            { icon: <Lock />, title: "Zero Logs Policy", desc: "We don't track, collect, or share your private data. Your business is yours alone." },
            { icon: <Zap />, title: "Blazing Speeds", desc: "Powered by WireGuard® for lightning-fast connections across 60+ countries." },
            { icon: <Globe />, title: "Global Network", desc: "Access content from anywhere with over 5,000+ optimized servers worldwide." },
            { icon: <Shield />, title: "Multi-Hop VPN", desc: "Route your traffic through multiple servers for an extra layer of anonymity." }
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="glass"
              style={{ padding: '40px', transition: 'var(--transition-smooth)' }}
            >
              <div className="bg-gradient" style={{
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px'
              }}>
                {feature.icon}
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>{feature.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.6' }}>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <style jsx>{`
        @media (max-width: 1024px) {
          section#hero {
            grid-template-columns: 1fr !important;
            text-align: center;
            padding-top: 120px !important;
          }
          section#hero h1 { font-size: 3rem !important; }
          section#hero p { margin-left: auto !important; margin-right: auto !important; }
          section#hero div { justify-content: center !important; }
          .animate-float { height: 400px !important; }
        }
      `}</style>
    </main>
  );
}
