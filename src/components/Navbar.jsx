import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { Moon, Sun, Download, Book, Music, BookOpenCheck, BookOpen, Search } from 'lucide-react';
import GlobalSearch from './GlobalSearch';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'var(--nav-bg)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-color)',
        transition: 'all 0.3s ease'
      }}>
        <div style={{
          maxWidth: '1140px',
          margin: '0 auto',
          padding: '0.85rem 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {/* Brand Logo */}
          <Link to="/" style={{
            fontSize: '1.35rem',
            fontWeight: '800',
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            color: 'var(--text-primary)',
            letterSpacing: '-0.03em'
          }}>
            <div style={{
              background: 'var(--accent-light)',
              color: 'var(--accent-color)',
              padding: '0.5rem',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <BookOpen size={22} strokeWidth={2.5} />
            </div>
            <span>Bíblia<span style={{ color: 'var(--accent-color)' }}>360</span></span>
          </Link>

          {/* Navigation Menu */}
          <nav style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {/* Search Trigger Button */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="btn-outline"
              aria-label="Buscar na Bíblia, Harpa ou EBD"
              style={{
                padding: '0.5rem 0.85rem',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: 'pointer',
                marginRight: '0.25rem'
              }}
            >
              <Search size={16} color="var(--accent-color)" />
              <span style={{ display: 'none', '@media (min-width: 640px)': { display: 'inline' } }}>Pesquisar...</span>
            </button>

            <NavLink 
              to="/biblia" 
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.5rem 0.9rem',
                borderRadius: '8px',
                fontSize: '0.9rem',
                fontWeight: '600',
                color: isActive ? 'var(--accent-color)' : 'var(--text-secondary)',
                backgroundColor: isActive ? 'var(--accent-light)' : 'transparent',
                transition: 'all 0.2s ease'
              })}
            >
              <Book size={18} />
              <span>Bíblia</span>
            </NavLink>

            <NavLink 
              to="/harpa" 
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.5rem 0.9rem',
                borderRadius: '8px',
                fontSize: '0.9rem',
                fontWeight: '600',
                color: isActive ? 'var(--accent-color)' : 'var(--text-secondary)',
                backgroundColor: isActive ? 'var(--accent-light)' : 'transparent',
                transition: 'all 0.2s ease'
              })}
            >
              <Music size={18} />
              <span>Harpa</span>
            </NavLink>

            <NavLink 
              to="/ebd" 
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.5rem 0.9rem',
                borderRadius: '8px',
                fontSize: '0.9rem',
                fontWeight: '600',
                color: isActive ? 'var(--accent-color)' : 'var(--text-secondary)',
                backgroundColor: isActive ? 'var(--accent-light)' : 'transparent',
                transition: 'all 0.2s ease'
              })}
            >
              <BookOpenCheck size={18} />
              <span>EBD</span>
            </NavLink>

            <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border-color)', margin: '0 0.25rem' }} />

            <NavLink 
              to="/meus-downloads" 
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.5rem 0.9rem',
                borderRadius: '8px',
                fontSize: '0.9rem',
                fontWeight: '600',
                color: isActive ? 'var(--accent-color)' : 'var(--text-secondary)',
                backgroundColor: isActive ? 'var(--accent-light)' : 'transparent',
                transition: 'all 0.2s ease'
              })}
              title="Gerenciar Downloads"
            >
              <Download size={18} />
            </NavLink>

            {/* Theme Toggle Button */}
            <button 
              onClick={toggleTheme} 
              className="btn-outline"
              aria-label="Alternar tema"
              style={{
                padding: '0.5rem',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </nav>
        </div>
      </header>

      {/* Global Search Modal */}
      <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
