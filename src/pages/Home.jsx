import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Music, BookOpen, Download } from 'lucide-react';

export default function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Bem-vindo ao Bíblia360</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '3rem', opacity: 0.8 }}>
        Seu repositório digital focado na leitura agradável e usabilidade simples.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        <Link to="/biblia" className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '2rem' }}>
          <Book size={48} color="var(--primary-color)" />
          <h2 style={{ margin: 0 }}>1. Bíblia</h2>
          <span style={{ opacity: 0.7 }}>Acesse versões, capítulos e leitura offline</span>
        </Link>
        
        <Link to="/harpa" className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '2rem' }}>
          <Music size={48} color="var(--primary-color)" />
          <h2 style={{ margin: 0 }}>2. Hinos da Harpa</h2>
          <span style={{ opacity: 0.7 }}>Louvores completos e modo offline</span>
        </Link>

        <Link to="/ebd" className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '2rem' }}>
          <BookOpen size={48} color="var(--primary-color)" />
          <h2 style={{ margin: 0 }}>3. Lições da EBD</h2>
          <span style={{ opacity: 0.7 }}>Estude o sumário e conteúdo (Offline)</span>
        </Link>
      </div>

      <div style={{ marginTop: '4rem' }}>
        <Link to="/meus-downloads" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem' }}>
          <Download size={20} />
          Gerenciar Conteúdo Offline (Downloads)
        </Link>
      </div>
    </div>
  );
}
