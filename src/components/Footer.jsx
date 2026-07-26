import React from 'react';
import { ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--footer-bg)',
      borderTop: '1px solid var(--border-color)',
      padding: '2.5rem 1.5rem',
      marginTop: 'auto',
      transition: 'all 0.3s ease'
    }}>
      <div style={{
        maxWidth: '1140px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        textAlign: 'center'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.35rem 0.85rem',
          borderRadius: '999px',
          backgroundColor: 'var(--accent-light)',
          color: 'var(--accent-color)',
          fontSize: '0.8rem',
          fontWeight: '600'
        }}>
          <ShieldCheck size={14} />
          <span>Projeto Sem Fins Lucrativos</span>
        </div>

        <p style={{
          maxWidth: '750px',
          fontSize: '0.875rem',
          color: 'var(--text-secondary)',
          lineHeight: '1.6'
        }}>
          O <strong>Bíblia360</strong> funciona como um repositório e agregador de conteúdos sem fins lucrativos. 
          Todas as informações disponibilizadas podem ser acessadas e obtidas no repositório oficial do projeto.
        </p>

        <div style={{
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem',
          marginTop: '0.5rem'
        }}>
          <span>Desenvolvido com foco em acessibilidade e leitura agradável</span>
        </div>
      </div>
    </footer>
  );
}
