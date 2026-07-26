import React, { useState, useEffect } from 'react';
import ReadingToolbar from '../components/ReadingToolbar';
import { db } from '../services/db';
import { fetchHymnDetail, HARPA_CATALOG } from '../services/harpaService';
import { Download, ExternalLink, CheckCircle2, Music, Eye, ArrowLeft, Trash2, Loader2, Search } from 'lucide-react';

export default function Harpa() {
  const [hymns] = useState(HARPA_CATALOG);
  const [activeHymn, setActiveHymn] = useState(null);
  const [hymnDetail, setHymnDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filterQuery, setFilterQuery] = useState('');

  const [downloaded, setDownloaded] = useState({});
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(null);
  const [mobileDeleteActive, setMobileDeleteActive] = useState({});

  useEffect(() => {
    checkDownloaded();
  }, []);

  const checkDownloaded = async () => {
    const dls = await db.harpa_hymns.toArray();
    const map = {};
    dls.forEach(dl => map[dl.number] = true);
    setDownloaded(map);
  };

  const handleDownloadClick = async (hymn) => {
    if (downloaded[hymn.number]) {
      if (window.innerWidth <= 768 && !mobileDeleteActive[hymn.number]) {
        setMobileDeleteActive(prev => ({ ...prev, [hymn.number]: true }));
      } else {
        setConfirmDeleteModal(hymn);
      }
      return;
    }

    // Fetch full stanzas before saving offline
    const detail = await fetchHymnDetail(hymn.number);
    await db.harpa_hymns.put(detail);
    checkDownloaded();
  };

  const confirmDelete = async () => {
    if (confirmDeleteModal) {
      await db.harpa_hymns.delete(confirmDeleteModal.number);
      setConfirmDeleteModal(null);
      setMobileDeleteActive({});
      checkDownloaded();
    }
  };

  const openHymnReader = async (hymn) => {
    setActiveHymn(hymn);
    setLoading(true);
    const detail = await fetchHymnDetail(hymn.number);
    setHymnDetail(detail);
    setLoading(false);
  };

  const filteredHymns = hymns.filter(h => 
    h.number.includes(filterQuery.trim()) || h.title.toLowerCase().includes(filterQuery.toLowerCase().trim())
  );

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
              onClick={() => { setActiveHymn(null); setHymnDetail(null); }}
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

      {/* Catalog Search & List View */}
      {!activeHymn ? (
        <div>
          {/* Quick Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '0.65rem 1rem', marginBottom: '1.75rem', maxWidth: '400px' }}>
            <Search size={18} color="var(--accent-color)" />
            <input 
              type="text" 
              placeholder="Filtrar por número ou título do hino..."
              value={filterQuery}
              onChange={e => setFilterQuery(e.target.value)}
              style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)', width: '100%', fontSize: '0.9rem' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {filteredHymns.map(h => (
              <div key={h.number} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div 
                  style={{ flex: 1, minWidth: '240px', cursor: 'pointer' }}
                  onClick={() => openHymnReader(h)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                    <span className="badge">Hino #{h.number}</span>
                    <h3 style={{ fontSize: '1.2rem', margin: 0 }}>{h.title}</h3>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <button className="btn" onClick={() => openHymnReader(h)}>
                    <Eye size={16} />
                    <span>Ler Online</span>
                  </button>

                  {!downloaded[h.number] ? (
                    <button 
                      className="btn-outline" 
                      onClick={() => handleDownloadClick(h)}
                    >
                      <Download size={16} />
                      <span>Salvar Offline</span>
                    </button>
                  ) : (
                    <button 
                      className={`btn-downloaded ${mobileDeleteActive[h.number] ? 'delete-active' : ''}`}
                      onClick={() => handleDownloadClick(h)}
                    >
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                        <CheckCircle2 size={16} />
                        <span>Baixado</span>
                      </span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Hymn Reader View with Loading Spinner & Real Scraped Lyrics */
        <div className="card" style={{ padding: '2.5rem' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--accent-color)' }}>
              <Loader2 size={36} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
              <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Carregando letra do Hino #{activeHymn.number}...</p>
            </div>
          ) : (
            <>
              <div style={{ textAlign: 'center', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem' }}>
                <span className="badge" style={{ marginBottom: '0.5rem' }}>Harpa Cristã</span>
                <h2 style={{ fontSize: '1.75rem', margin: 0 }}>Hino #{hymnDetail?.number || activeHymn.number} - {hymnDetail?.title || activeHymn.title}</h2>
              </div>

              <div className="reading-content" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'center' }}>
                {hymnDetail?.stanzas.map((stanza, idx) => (
                  <p key={idx} style={{ margin: 0, lineHeight: '2' }}>
                    {stanza}
                  </p>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Confirm Deletion Modal */}
      {confirmDeleteModal && (
        <div className="modal-overlay" onClick={() => setConfirmDeleteModal(null)}>
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
              <Trash2 size={32} />
            </div>

            <h3 style={{ fontSize: '1.35rem', marginBottom: '0.75rem' }}>Excluir Conteúdo Offline</h3>
            
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '2rem' }}>
              Deseja realmente remover o <strong>Hino #{confirmDeleteModal.number} - {confirmDeleteModal.title}</strong> do seu armazenamento local?
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button className="btn btn-outline" onClick={() => setConfirmDeleteModal(null)}>
                Cancelar
              </button>
              <button 
                className="btn" 
                style={{ backgroundColor: '#ef4444', borderColor: '#ef4444' }} 
                onClick={confirmDelete}
              >
                Confirmar Exclusão
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
