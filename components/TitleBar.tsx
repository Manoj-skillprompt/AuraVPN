"use client";

import { X, Minus, Square } from "lucide-react";
import React from "react";

export default function TitleBar() {
  // Safe to access window here because we are inside the ClientOnly wrapper
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const win = typeof window !== 'undefined' ? (window as any) : null;
  const electron = win?.electron;

  if (!electron) return null;

  const handleMinimize = () => electron.window.minimize();
  const handleMaximize = () => electron.window.maximize();
  const handleClose = () => electron.window.close();

  return (
    <div style={{
      height: '32px',
      background: 'rgba(5, 5, 5, 0.8)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 12px',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 9999,
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      WebkitAppRegion: 'drag'
    } as React.CSSProperties}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <img src="/logo.png" style={{ width: '18px', height: '18px', borderRadius: '4px' }} alt="AuraVPN Logo" />
        <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', fontWeight: '600' }}>AuraVPN</span>
      </div>

      <div style={{ 
        display: 'flex', 
        gap: '4px',
        WebkitAppRegion: 'no-drag'
      } as React.CSSProperties}>
        <button 
          onClick={handleMinimize}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
        >
          <Minus size={14} />
        </button>
        <button 
          onClick={handleMaximize}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
        >
          <Square size={12} />
        </button>
        <button 
          onClick={handleClose}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
