import React, { useState, useEffect } from 'react';
import ReadingToolbar from '../components/ReadingToolbar';
import { db } from '../services/db';
import { Download, ExternalLink, CheckCircle2, Music, Eye, ArrowLeft } from 'lucide-react';

export default function Harpa() {
  const [hymns] = useState([
    { number: '1', title: 'Chuvas de Graça', stanzas: ['Deus prometeu com certeza, chuvas de graça mandar;', 'Ele nos dá fortaleza, para o Seu nome exaltar.', 'Chuvas de graça, chuvas pedimos a Ti;', 'Manda-nos já, ó Senhor, bênçãos que fruam aqui.'] },
    { number: '2', title: 'Saudosa Lembrança', stanzas: ['Oh! quão saudosa lembrança tenho de ti, ó Sião,', 'Terra que eu tanto amo, pois és do meu coração.', 'Já meus pés estão cansados de caminhar na terra,', 'Mas eu sei que logo chegarei à Pátria celestial.'] },
    { number: '3', title: 'Plena Vida', stanzas: ['Plena vida, paz e gozo, tenho em meu Salvador;', 'Que por mim na cruz sofreu, por Seu infinito amor.'] },
    { number: '4', title: 'Deus Tomará Conta de Ti', stanzas: ['Em todo o tempo, em qualquer lugar,', 'Deus tomará conta de ti!'] }
  ]);

  const [activeHymn, setActiveHymn] = useState(null);
  const [downloaded, setDownloaded] = useState({});

  useEffect(() => {
    checkDownloaded();
  }, []);

  const checkDownloaded = async () => {
    const dls = await db.harpa_hymns.toArray();
    const map = {};
    dls.forEach(dl => map[dl.number] = true);
    setDownloaded(map);
  };

  const handleDownload = async (hymn) => {
    if (downloaded[hymn.number]) return;
    await db.harpa_hymns.put(hymn);
    checkDownloaded();
  };

  return (
    <div>
      {/* Show ReadingToolbar ONLY during active hymn reading */}
      {activeHymn && <ReadingToolbar />}

      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          {activeHymn && (
            <button 
              className="btn-outline" 
              onClick={() => setActiveHymn(null)}
              style={{ padding: '0.4rem', borderRadius: '8px', border: 'none' }}
              title="Voltar para a lista"
            >
              <ArrowLeft size={20} />
            </button>
          )}

          <div style={{
            padding: '0.4rem',
            borderRadius: '8px',
            backgroundColor: 'var(--accent-light)',
            color: 'var(--accent-color)',
            display: 'flex'
          }}>
            <Music size={20} />
          </div>
          <h1 style={{ fontSize: '2rem', margin: 0 }}>
            {activeHymn ? `Hino #${activeHymn.number} - ${activeHymn.title}` : 'Hinos da Harpa Cristã'}
          </h1>
        </div>

        {/* Dynamic Credits */}
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <span>Fonte e créditos:</span>
          <a 
            href="https://www.harpacrista.org/" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ color: 'var(--accent-color)', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}
          >
            Harpa Cristã <ExternalLink size={12} />
          </a>
        </p>
      </div>

      {/* Hymns Catalog List */}
      {!activeHymn ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {hymns.map(h => (
            <div key={h.number} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div 
                style={{ flex: 1, minWidth: '240px', cursor: 'pointer' }}
                onClick={() => setActiveHymn(h)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
                  <span className="badge">Hino #{h.number}</span>
                  <h3 style={{ fontSize: '1.2rem', margin: 0 }}>{h.title}</h3>
                </div>
                <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', margin: 0, fontStyle: 'italic' }}>
                  "{h.stanzas[0]}"
                </p>
              </div>

              {/* Action Buttons: Primary "Ler Online", Secondary Gray "Salvar Offline" */}
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button className="btn" onClick={() => setActiveHymn(h)}>
                  <Eye size={16} />
                  <span>Ler Online</span>
                </button>

                <button 
                  className="btn-outline" 
                  onClick={() => handleDownload(h)}
                  disabled={downloaded[h.number]}
                  style={{
                    borderColor: 'var(--border-color)',
                    color: downloaded[h.number] ? 'var(--text-muted)' : 'var(--text-secondary)'
                  }}
                >
                  {downloaded[h.number] ? (
                    <>
                      <CheckCircle2 size={16} color="var(--accent-color)" />
                      <span>Baixado</span>
                    </>
                  ) : (
                    <>
                      <Download size={16} />
                      <span>Salvar Offline</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Hymn Reader View */
        <div className="card" style={{ padding: '2.5rem' }}>
          <div style={{ textAlignment: 'center', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', pb: '1.5rem' }}>
            <span className="badge" style={{ marginBottom: '0.5rem' }}>Harpa Cristã</span>
            <h2 style={{ fontSize: '1.75rem', margin: 0 }}>Hino #{activeHymn.number} - {activeHymn.title}</h2>
          </div>

          <div className="reading-content" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'center' }}>
            {activeHymn.stanzas.map((stanza, idx) => (
              <p key={idx} style={{ margin: 0, lineHeight: '2' }}>
                {stanza}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
