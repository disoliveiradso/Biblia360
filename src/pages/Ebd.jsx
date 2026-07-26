import React, { useState, useEffect } from 'react';
import ReadingToolbar from '../components/ReadingToolbar';
import { db, checkEbdQuota } from '../services/db';
import { Download, AlertTriangle, ExternalLink, CheckCircle2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Ebd() {
  const [lessons] = useState([
    { id: '1', title: 'Lição 01: A Revelação Espiritual da Bíblia', theme: 'Estudo sobre a inspiração divina e a autoridade das Escrituras.' },
    { id: '2', title: 'Lição 02: A Doutrina da Salvação e Graça', theme: 'Análise teológica sobre a redenção pela fé e o plano divino.' }
  ]);
  const [showModal, setShowModal] = useState(false);
  const [downloaded, setDownloaded] = useState({});

  useEffect(() => {
    checkDownloaded();
  }, []);

  const checkDownloaded = async () => {
    const dls = await db.ebd_lessons.toArray();
    const map = {};
    dls.forEach(dl => map[dl.id] = true);
    setDownloaded(map);
  };

  const handleDownload = async (lesson) => {
    const quotaMet = await checkEbdQuota();
    if (quotaMet && !downloaded[lesson.id]) {
      setShowModal(true);
      return;
    }
    await db.ebd_lessons.put(lesson);
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
            <Sparkles size={20} />
          </div>
          <h1 style={{ fontSize: '2rem', margin: 0 }}>Lições da EBD</h1>
        </div>

        {/* Dynamic Credits */}
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <span>Fonte e créditos:</span>
          <a 
            href="https://www.estudantesdabiblia.com.br/cpad_sumario_geral.htm" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ color: 'var(--accent-color)', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}
          >
            Estudantes da Bíblia / CPAD <ExternalLink size={12} />
          </a>
        </p>
      </div>

      {/* Content Section */}
      <div className="reading-content" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {lessons.map(l => (
          <div key={l.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ flex: 1, minWidth: '240px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
                <span className="badge">Sumário CPAD</span>
                <h3 style={{ fontSize: '1.2rem', margin: 0 }}>{l.title}</h3>
              </div>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', margin: 0, fontFamily: 'var(--font-family-ui)' }}>
                {l.theme}
              </p>
            </div>

            <button 
              className={downloaded[l.id] ? "btn btn-outline" : "btn"} 
              onClick={() => handleDownload(l)}
              disabled={downloaded[l.id]}
              style={{
                borderColor: downloaded[l.id] ? 'var(--border-color)' : undefined,
                color: downloaded[l.id] ? 'var(--text-muted)' : undefined,
                cursor: downloaded[l.id] ? 'default' : 'pointer'
              }}
            >
              {downloaded[l.id] ? (
                <>
                  <CheckCircle2 size={16} color="var(--accent-color)" />
                  <span>Baixada Offline</span>
                </>
              ) : (
                <>
                  <Download size={16} />
                  <span>Salvar Lição</span>
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
              Você atingiu o limite máximo de armazenamento offline para esta seção (máximo de 1 lição salva). Para baixar este novo conteúdo, por favor acesse a página de Downloads e exclua a lição antiga.
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
