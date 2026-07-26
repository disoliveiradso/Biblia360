import React from 'react';
import { ShieldCheck } from 'lucide-react';

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
        gap: '1.25rem',
        textAlign: 'center'
      }}>
        {/* Badges Side-by-Side */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.85rem',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {/* 1. Nonprofit Badge - Discreet Gray (Less Prominence) */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 0.95rem',
            borderRadius: '999px',
            backgroundColor: 'var(--surface-color)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-secondary)',
            fontSize: '0.825rem',
            fontWeight: '600'
          }}>
            <ShieldCheck size={16} />
            <span>Projeto Sem Fins Lucrativos</span>
          </div>

          {/* 2. GitHub Repository Badge - Filled Amber Accent (Identical to previous Nonprofit Pill) */}
          <a 
            href="https://github.com/disoliveiradso/Biblia360"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 0.95rem',
              borderRadius: '999px',
              backgroundColor: 'var(--accent-light)',
              color: 'var(--accent-color)',
              fontSize: '0.825rem',
              fontWeight: '700',
              transition: 'all 0.2s ease',
              textDecoration: 'none'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
              <path d="M9 18c-4.51 2-5-2-7-2"></path>
            </svg>
            <span>GitHub: Bíblia360</span>
          </a>
        </div>

        {/* Legal Text Notice */}
        <p style={{
          maxWidth: '750px',
          fontSize: '0.875rem',
          color: 'var(--text-secondary)',
          lineHeight: '1.6',
          margin: 0
        }}>
          O <strong>Bíblia360</strong> funciona como um repositório e agregador de conteúdos sem fins lucrativos. 
          Todas as informações disponibilizadas podem ser acessadas e obtidas no repositório oficial do projeto.
        </p>

        <div style={{
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}>
          <span>Desenvolvido com foco em acessibilidade, simplicidade e leitura agradável</span>
        </div>
      </div>
    </footer>
  );
}
