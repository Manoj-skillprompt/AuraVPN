"use client";

import Sidebar from "@/components/Sidebar";
import { Gift, Copy, TrendingUp, Award } from "lucide-react";
import { useState } from "react";

export default function Invite() {
  const [copied, setCopied] = useState(false);
  const referralCode = "AURA-MANOJ-2026";

  const copyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: 'flex', background: 'var(--background)', minHeight: '100vh' }}>
      <Sidebar />

      <main style={{ marginLeft: '320px', padding: '40px', width: '100%' }}>
        <header style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Invite & Earn</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)' }}>Share AuraVPN and get free premium days</p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '32px' }}>
          <div className="glass" style={{ padding: '48px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(0, 209, 255, 0.05) 0%, rgba(255, 0, 200, 0.05) 100%)' }}>
            <div style={{ 
              width: '80px', 
              height: '80px', 
              borderRadius: '50%', 
              background: 'var(--bg-gradient)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              margin: '0 auto 32px',
              boxShadow: '0 0 30px var(--primary-glow)'
            }}>
              <Gift size={40} />
            </div>
            
            <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>Get 30 Days Free</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem', marginBottom: '40px', maxWidth: '500px', margin: '0 auto 40px' }}>
              For every friend who signs up using your code, both of you get **30 days of Premium** for free.
            </p>

            <div style={{ 
              background: 'rgba(255,255,255,0.05)', 
              borderRadius: '16px', 
              padding: '24px', 
              border: '1px dashed rgba(255,255,255,0.2)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              maxWidth: '400px',
              margin: '0 auto'
            }}>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>Your Code</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>{referralCode}</div>
              </div>
              <button 
                onClick={copyCode}
                className="bg-gradient" 
                style={{ padding: '12px 24px', borderRadius: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                {copied ? "Copied!" : <><Copy size={18} /> Copy</>}
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div className="glass" style={{ padding: '32px' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <TrendingUp size={20} color="var(--success)" /> Your Stats
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>Total Referrals</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>12</div>
                </div>
                <div style={{ padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>Days Earned</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--success)' }}>360</div>
                </div>
              </div>
            </div>

            <div className="glass" style={{ padding: '32px' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Award size={20} color="var(--primary)" /> Top Referrers
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { name: "Alex R.", count: "142 referrals", prize: "Lifetime Pro" },
                  { name: "Sarah M.", count: "98 referrals", prize: "5 Years Free" },
                  { name: "David K.", count: "74 referrals", prize: "2 Years Free" }
                ].map((user, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                    <div>
                      <div style={{ fontWeight: '600' }}>{user.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>{user.count}</div>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 'bold' }}>{user.prize}</div>
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
