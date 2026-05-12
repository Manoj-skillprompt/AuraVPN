"use client";

import Link from "next/link";
import { Shield, LayoutDashboard, Server, Settings, HelpCircle, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/dashboard" },
    { name: "Servers", icon: <Server size={20} />, path: "/dashboard/servers" },
    { name: "Settings", icon: <Settings size={20} />, path: "/dashboard/settings" },
    { name: "Support", icon: <HelpCircle size={20} />, path: "/dashboard/support" },
  ];

  return (
    <aside className="glass" style={{
      width: '280px',
      height: 'calc(100vh - 40px)',
      position: 'fixed',
      left: '20px',
      top: '20px',
      padding: '32px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '40px',
      zIndex: 100
    }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.5rem', fontWeight: 'bold', paddingLeft: '12px' }}>
        <Shield className="text-gradient" size={32} />
        <span className="text-gradient">AuraVPN</span>
      </Link>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {links.map((link) => (
          <Link 
            key={link.path} 
            href={link.path}
            className={pathname === link.path ? "bg-gradient" : ""}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: '12px',
              color: pathname === link.path ? 'white' : 'rgba(255,255,255,0.6)',
              transition: 'var(--transition-smooth)',
              background: pathname === link.path ? '' : 'transparent'
            }}
          >
            {link.icon}
            {link.name}
          </Link>
        ))}
      </div>

      <button style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px',
        color: 'rgba(255,255,255,0.6)',
        marginTop: 'auto'
      }}>
        <LogOut size={20} />
        Sign Out
      </button>
    </aside>
  );
}
