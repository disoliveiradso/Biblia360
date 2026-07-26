import React from 'react';
import { ShieldCheck, Github } from 'lucide-react';

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
          {/* Nonprofit Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 0.95rem',
            borderRadius: '999px',
            backgroundColor: 'var(--accent-light)',
            color: 'var(--accent-color)',
            fontSize: '0.825rem',
            fontWeight: '700'
          }}>
            <ShieldCheck size={16} />
            <span>Projeto Sem Fins Lucrativos</span>
          </div>

          {/* GitHub Repository Badge */}
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
              backgroundColor: 'var(--surface-color)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              fontSize: '0.825rem',
              fontWeight: '700',
              transition: 'all 0.2s ease'
            }}
            className="btn-outline"
          >
            <Github size={16} />
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
