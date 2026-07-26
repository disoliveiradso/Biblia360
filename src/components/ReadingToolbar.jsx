import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Eye, Contrast, Type } from 'lucide-react';

export default function ReadingToolbar() {
  const {
    increaseFont, decreaseFont,
    toggleSepia, toggleHighContrast,
    sepia, highContrast, fontSize
  } = useTheme();

  return (
    <div className="glass-panel" style={{
      position: 'sticky',
      top: '4.25rem',
      zIndex: 80,
      padding: '0.65rem 1.25rem',
      display: 'flex',
      gap: '0.75rem',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '2rem',
      boxShadow: 'var(--card-shadow)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: '600' }}>
        <Type size={18} color="var(--accent-color)" />
        <span>Ferramentas de Leitura</span>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        {/* Font Controls with small 'A' and large 'A' */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
          backgroundColor: 'var(--surface-color)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          padding: '0.2rem 0.4rem'
        }}>
          <button 
            className="btn-outline" 
            onClick={decreaseFont} 
            title="Diminuir tamanho do texto"
            style={{ 
              padding: '0.25rem 0.5rem', 
              border: 'none', 
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '800',
              fontSize: '0.75rem',
              color: 'var(--text-primary)'
            }}
          >
            A
          </button>
          <span style={{ fontSize: '0.8rem', fontWeight: '700', padding: '0 0.35rem', color: 'var(--text-primary)' }}>
            {fontSize}px
          </span>
          <button 
            className="btn-outline" 
            onClick={increaseFont} 
            title="Aumentar tamanho do texto"
            style={{ 
              padding: '0.25rem 0.5rem', 
              border: 'none', 
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '800',
              fontSize: '1.05rem',
              color: 'var(--text-primary)'
            }}
          >
            A
          </button>
        </div>

        {/* Sepia Filter */}
        <button 
          className="btn-outline" 
          onClick={toggleSepia} 
          style={{
            padding: '0.45rem 0.75rem',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.85rem',
            fontWeight: '600',
            backgroundColor: sepia ? 'var(--accent-color)' : 'transparent',
            color: sepia ? '#ffffff' : 'var(--text-primary)',
            borderColor: sepia ? 'var(--accent-color)' : 'var(--border-color)'
          }}
          title="Filtro de conforto visual (Sépia)"
        >
          <Eye size={16} />
          <span>Sépia</span>
        </button>

        {/* High Contrast */}
        <button 
          className="btn-outline" 
          onClick={toggleHighContrast}
          style={{
            padding: '0.45rem 0.75rem',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.85rem',
            fontWeight: '600',
            backgroundColor: highContrast ? 'var(--accent-color)' : 'transparent',
            color: highContrast ? '#ffffff' : 'var(--text-primary)',
            borderColor: highContrast ? 'var(--accent-color)' : 'var(--border-color)'
          }}
          title="Filtro de Alto Contraste"
        >
          <Contrast size={16} />
          <span>Contraste</span>
        </button>
      </div>
    </div>
  );
}
