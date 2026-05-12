"use client";

import Sidebar from "@/components/Sidebar";
import { MessageSquare, Mail, HelpCircle, Send, CheckCircle2, LifeBuoy } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Support() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.subject || !formData.message) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ subject: "", message: "" });
    }, 5000);
  };

  return (
    <div style={{ display: 'flex', background: 'var(--background)', minHeight: '100vh' }}>
      <Sidebar />

      <main style={{ marginLeft: '320px', padding: '40px', width: '100%' }}>
        <header style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Support Center</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)' }}>We&apos;re here to help you 24/7</p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px' }}>
          <div className="glass" style={{ padding: '40px' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <MessageSquare size={24} className="text-gradient" /> Open a Ticket
            </h2>

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit} 
                  style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)' }}>Subject</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Connection drops on Linux"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        color: 'white',
                        outline: 'none'
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)' }}>How can we help?</label>
                    <textarea 
                      rows={6}
                      placeholder="Describe your issue in detail..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        color: 'white',
                        outline: 'none',
                        resize: 'none'
                      }}
                    />
                  </div>
                  <button 
                    type="submit"
                    className="bg-gradient" 
                    style={{ 
                      padding: '16px', 
                      borderRadius: '12px', 
                      fontWeight: 'bold', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      gap: '12px',
                      marginTop: '12px'
                    }}
                  >
                    <Send size={20} /> Send Message
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  style={{ textAlign: 'center', padding: '40px 0' }}
                >
                  <CheckCircle2 size={64} color="var(--success)" style={{ margin: '0 auto 24px' }} />
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>Ticket Submitted!</h3>
                  <p style={{ color: 'rgba(255,255,255,0.5)' }}>We&apos;ve received your request. Our team will get back to you via email within 2 hours.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div className="glass" style={{ padding: '32px' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <LifeBuoy size={20} color="var(--primary)" /> Quick Support
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <a href="#" className="glass" style={{ padding: '16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'inherit' }}>
                  <HelpCircle size={20} color="var(--primary)" /> Knowledge Base
                </a>
                <a href="mailto:support@auravpn.com" className="glass" style={{ padding: '16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'inherit' }}>
                  <Mail size={20} color="var(--secondary)" /> Email Support
                </a>
              </div>
            </div>

            <div className="glass" style={{ padding: '32px' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '20px' }}>Frequently Asked</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  "How to setup on Router?",
                  "Is AuraVPN safe for banking?",
                  "Does it work with Netflix?",
                  "How to fix slow speeds?"
                ].map((q, i) => (
                  <div key={i} style={{ padding: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.9rem', cursor: 'pointer', color: 'rgba(255,255,255,0.6)' }}>
                    {q}
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
