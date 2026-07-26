import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Type, Eye, Contrast } from 'lucide-react';

export default function ReadingToolbar() {
  const {
    increaseFont, decreaseFont,
    toggleSepia, toggleHighContrast,
    sepia, highContrast
  } = useTheme();

  return (
    <div style={{
      position: 'sticky',
      top: '1rem',
      background: 'var(--secondary-bg)',
      border: '1px solid var(--border-color)',
      padding: '0.5rem',
      borderRadius: '8px',
      display: 'flex',
      gap: '0.5rem',
      alignItems: 'center',
      marginBottom: '2rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      zIndex: 10
    }}>
      <span style={{ fontSize: '0.9rem', fontWeight: 'bold', marginRight: 'auto', paddingLeft: '0.5rem' }}>
        Ferramentas de Leitura
      </span>
      <button className="btn btn-outline" onClick={decreaseFont} title="Diminuir Fonte">A-</button>
      <button className="btn btn-outline" onClick={increaseFont} title="Aumentar Fonte">A+</button>
      <button 
        className="btn btn-outline" 
        onClick={toggleSepia} 
        style={{ background: sepia ? 'var(--primary-color)' : 'transparent', color: sepia ? '#fff' : 'var(--primary-color)' }}
        title="Descanso Ocular (Sépia)"
      >
        <Eye size={18} />
      </button>
      <button 
        className="btn btn-outline" 
        onClick={toggleHighContrast}
        style={{ background: highContrast ? 'var(--primary-color)' : 'transparent', color: highContrast ? '#fff' : 'var(--primary-color)' }}
        title="Alto Contraste"
      >
        <Contrast size={18} />
      </button>
    </div>
  );
}
