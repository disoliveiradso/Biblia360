import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { Moon, Sun, Download, Book, Music, BookOpen } from 'lucide-react';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav style={{
      background: 'var(--nav-bg)',
      borderBottom: '1px solid var(--border-color)',
      padding: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        📖 Bíblia360
      </Link>
      
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Link to="/biblia" title="Bíblia"><Book size={20} /></Link>
        <Link to="/harpa" title="Harpa"><Music size={20} /></Link>
        <Link to="/ebd" title="Lições da EBD"><BookOpen size={20} /></Link>
        <Link to="/meus-downloads" title="Downloads Offline"><Download size={20} /></Link>
        <button onClick={toggleTheme} className="btn-outline" style={{ border: 'none', padding: '0.5rem' }}>
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>
    </nav>
  );
}
