import React, { useState, useEffect } from 'react';
import ReadingToolbar from '../components/ReadingToolbar';
import { db, checkBibleQuota } from '../services/db';
import { Download, AlertTriangle, ExternalLink, CheckCircle2, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Biblia() {
  const [versions] = useState([
    { abbrev: 'nvi', name: 'Nova Versão Internacional', desc: 'Linguagem contemporânea e de fácil compreensão.' },
    { abbrev: 'acf', name: 'Almeida Corrigida Fiel', desc: 'Fiel aos textos originais baseados no Textus Receptus.' },
    { abbrev: 'ara', name: 'Almeida Revista e Atualizada', desc: 'Tradição almeidiana com vocabulário atualizado.' }
  ]);
  const [showModal, setShowModal] = useState(false);
  const [downloaded, setDownloaded] = useState({});

  useEffect(() => {
    checkDownloaded();
  }, []);

  const checkDownloaded = async () => {
    const dls = await db.bible_translations.toArray();
    const map = {};
    dls.forEach(dl => map[dl.abbrev] = true);
    setDownloaded(map);
  };

  const handleDownload = async (version) => {
    const quotaMet = await checkBibleQuota();
    if (quotaMet && !downloaded[version.abbrev]) {
      setShowModal(true);
      return;
    }
    await db.bible_translations.put(version);
    checkDownloaded();
  };

  return (
    <div>
      <ReadingToolbar />

      {/* Page Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <div style={{
            padding: '0.4rem',
            borderRadius: '8px',
            backgroundColor: 'var(--accent-light)',
            color: 'var(--accent-color)',
            display: 'flex'
          }}>
            <BookOpen size={20} />
          </div>
          <h1 style={{ fontSize: '2rem', margin: 0 }}>Bíblia Sagrada</h1>
        </div>

        {/* Dynamic Credits */}
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <span>Informações obtidas via API pública da</span>
          <a 
            href="https://bibliaapi.com.br/" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ color: 'var(--accent-color)', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}
          >
            BibliaAPI <ExternalLink size={12} />
          </a>
        </p>
      </div>

      {/* Content Section */}
      <div className="reading-content" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {versions.map(v => (
          <div key={v.abbrev} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ flex: 1, minWidth: '240px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
                <span className="badge">{v.abbrev.toUpperCase()}</span>
                <h3 style={{ fontSize: '1.2rem', margin: 0 }}>{v.name}</h3>
              </div>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', margin: 0, fontFamily: 'var(--font-family-ui)' }}>
                {v.desc}
              </p>
            </div>

            <button 
              className={downloaded[v.abbrev] ? "btn btn-outline" : "btn"} 
              onClick={() => handleDownload(v)}
              disabled={downloaded[v.abbrev]}
              style={{
                borderColor: downloaded[v.abbrev] ? 'var(--border-color)' : undefined,
                color: downloaded[v.abbrev] ? 'var(--text-muted)' : undefined,
                cursor: downloaded[v.abbrev] ? 'default' : 'pointer'
              }}
            >
              {downloaded[v.abbrev] ? (
                <>
                  <CheckCircle2 size={16} color="var(--accent-color)" />
                  <span>Baixado Offline</span>
                </>
              ) : (
                <>
                  <Download size={16} />
                  <span>Salvar Offline</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Quota Exceeded Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '999px',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              color: '#ef4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem'
            }}>
              <AlertTriangle size={32} />
            </div>

            <h3 style={{ fontSize: '1.35rem', marginBottom: '0.75rem' }}>Limite de Armazenamento Excedido</h3>
            
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '2rem' }}>
              Você atingiu o limite máximo de armazenamento offline para esta seção (máximo de 2 traduções salvas). Para baixar este novo conteúdo, por favor acesse a página de Downloads e exclua um item antigo.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button className="btn btn-outline" onClick={() => setShowModal(false)}>
                Cancelar
              </button>
              <Link to="/meus-downloads" className="btn">
                Ir para Downloads
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
