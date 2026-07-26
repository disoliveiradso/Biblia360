import React, { useState, useEffect } from 'react';
import ReadingToolbar from '../components/ReadingToolbar';
import { db } from '../services/db';
import { Download, ExternalLink, CheckCircle2, Music } from 'lucide-react';

export default function Harpa() {
  const [hymns] = useState([
    { number: '1', title: 'Chuvas de Graça', stanzas: ['Deus prometeu com certeza, chuvas de graça mandar;', 'Ele nos dá fortaleza, para o Seu nome exaltar.'] },
    { number: '2', title: 'Saudosa Lembrança', stanzas: ['Oh! quão saudosa lembrança tenho de ti, ó Sião,', 'Terra que eu tanto amo, pois és do meu coração.'] },
    { number: '3', title: 'Plena Vida', stanzas: ['Plena vida, paz e gozo, tenho em meu Salvador;', 'Que por mim na cruz sofreu, por Seu infinito amor.'] },
    { number: '4', title: 'Deus Tomará Conta de Ti', stanzas: ['Em todo o tempo, em qualquer lugar,', 'Deus tomará conta de ti!'] }
  ]);
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
            <Music size={20} />
          </div>
          <h1 style={{ fontSize: '2rem', margin: 0 }}>Hinos da Harpa Cristã</h1>
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

      {/* Hymns List */}
      <div className="reading-content" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {hymns.map(h => (
          <div key={h.number} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ flex: 1, minWidth: '240px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <span className="badge">Hino #{h.number}</span>
                <h3 style={{ fontSize: '1.2rem', margin: 0 }}>{h.title}</h3>
              </div>
              
              <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: '1.7' }}>
                {h.stanzas.map((stanza, idx) => (
                  <p key={idx} style={{ margin: '0 0 0.35rem' }}>"{stanza}"</p>
                ))}
              </div>
            </div>

            <button 
              className={downloaded[h.number] ? "btn btn-outline" : "btn"} 
              onClick={() => handleDownload(h)}
              disabled={downloaded[h.number]}
              style={{
                borderColor: downloaded[h.number] ? 'var(--border-color)' : undefined,
                color: downloaded[h.number] ? 'var(--text-muted)' : undefined,
                cursor: downloaded[h.number] ? 'default' : 'pointer'
              }}
            >
              {downloaded[h.number] ? (
                <>
                  <CheckCircle2 size={16} color="var(--accent-color)" />
                  <span>Baixado Offline</span>
                </>
              ) : (
                <>
                  <Download size={16} />
                  <span>Salvar Hino</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
