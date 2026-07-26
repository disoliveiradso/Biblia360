import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Music, BookOpenCheck, ArrowRight, ShieldCheck, HardDriveDownload } from 'lucide-react';

export default function Home() {
  return (
    <div style={{ padding: '1rem 0' }}>
      {/* Hero Section */}
      <div style={{
        textAlign: 'center',
        padding: '3rem 1rem 4rem',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <div className="badge" style={{ marginBottom: '1.5rem' }}>
          <ShieldCheck size={14} />
          <span>Agregador Digital Sem Fins Lucrativos</span>
        </div>

        <h1 style={{
          fontSize: '2.75rem',
          lineHeight: '1.2',
          marginBottom: '1.25rem',
          fontWeight: '800',
          letterSpacing: '-0.03em'
        }}>
          Sua biblioteca bíblica <br />
          <span style={{
            background: 'linear-gradient(135deg, var(--accent-color) 0%, #fbbf24 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            unificada e acessível.
          </span>
        </h1>

        <p style={{
          fontSize: '1.125rem',
          color: 'var(--text-secondary)',
          maxWidth: '640px',
          margin: '0 auto 2.5rem',
          lineHeight: '1.7'
        }}>
          Acesse a Bíblia Sagrada, os Hinos da Harpa Cristã e as Lições da EBD em uma plataforma limpa, minimalista e 100% preparada para uso offline.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/biblia" className="btn">
            <span>Começar Leitura</span>
            <ArrowRight size={18} />
          </Link>
          <Link to="/meus-downloads" className="btn btn-outline">
            <HardDriveDownload size={18} />
            <span>Gerenciar Offline</span>
          </Link>
        </div>
      </div>

      {/* Main Options Grid (Strict Order: 1. Bíblia, 2. Harpa, 3. EBD) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.75rem',
        marginTop: '1rem'
      }}>
        {/* 1. Bíblia */}
        <Link to="/biblia" className="card card-interactive" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '14px',
            backgroundColor: 'var(--accent-light)',
            color: 'var(--accent-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Book size={28} strokeWidth={2} />
          </div>

          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--accent-color)', marginBottom: '0.25rem' }}>
              SEÇÃO 01
            </div>
            <h2 style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>Bíblia Sagrada</h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Navegue por livros, capítulos e traduções completas. Salve até 2 versões para consulta offline.
            </p>
          </div>

          <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: '600', color: 'var(--accent-color)', fontSize: '0.9rem' }}>
            <span>Acessar Escrituras</span>
            <ArrowRight size={16} />
          </div>
        </Link>

        {/* 2. Hinos da Harpa */}
        <Link to="/harpa" className="card card-interactive" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '14px',
            backgroundColor: 'var(--accent-light)',
            color: 'var(--accent-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Music size={28} strokeWidth={2} />
          </div>

          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--accent-color)', marginBottom: '0.25rem' }}>
              SEÇÃO 02
            </div>
            <h2 style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>Hinos da Harpa</h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Coletânea de louvores da Harpa Cristã com letras completas. Download ilimitado para acesso offline.
            </p>
          </div>

          <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: '600', color: 'var(--accent-color)', fontSize: '0.9rem' }}>
            <span>Ver Hinos</span>
            <ArrowRight size={16} />
          </div>
        </Link>

        {/* 3. Lições da EBD */}
        <Link to="/ebd" className="card card-interactive" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '14px',
            backgroundColor: 'var(--accent-light)',
            color: 'var(--accent-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <BookOpenCheck size={28} strokeWidth={2} />
          </div>

          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--accent-color)', marginBottom: '0.25rem' }}>
              SEÇÃO 03
            </div>
            <h2 style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>Lições da EBD</h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Estudos bíblicos estruturados por Jovens/Adultos e Trimestres. Armazene 1 lição completa offline.
            </p>
          </div>

          <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: '600', color: 'var(--accent-color)', fontSize: '0.9rem' }}>
            <span>Estudar Lições</span>
            <ArrowRight size={16} />
          </div>
        </Link>
      </div>
    </div>
  );
}
