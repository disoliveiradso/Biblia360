import React from 'react';

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--footer-bg)',
      borderTop: '1px solid var(--border-color)',
      padding: '2rem 1rem',
      textAlign: 'center',
      marginTop: 'auto'
    }}>
      <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '0.9rem', opacity: 0.8 }}>
        O Bíblia360 funciona como um repositório e agregador de conteúdos sem fins lucrativos. 
        Todas as informações disponibilizadas podem ser acessadas e obtidas no repositório oficial do projeto.
      </p>
    </footer>
  );
}
