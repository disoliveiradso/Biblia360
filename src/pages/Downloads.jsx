import React, { useState, useEffect } from 'react';
import { db } from '../services/db';
import { Trash2, HardDriveDownload, Book, Music, Sparkles, AlertCircle } from 'lucide-react';

export default function Downloads() {
  const [bibles, setBibles] = useState([]);
  const [hymns, setHymns] = useState([]);
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    loadDownloads();
  }, []);

  const loadDownloads = async () => {
    setBibles(await db.bible_translations.toArray());
    setHymns(await db.harpa_hymns.toArray());
    setLessons(await db.ebd_lessons.toArray());
  };

  const removeBible = async (abbrev) => {
    await db.bible_translations.delete(abbrev);
    loadDownloads();
  };

  const removeHymn = async (number) => {
    await db.harpa_hymns.delete(number);
    loadDownloads();
  };

  const removeLesson = async (id) => {
    await db.ebd_lessons.delete(id);
    loadDownloads();
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <div style={{
            padding: '0.4rem',
            borderRadius: '8px',
            backgroundColor: 'var(--accent-light)',
            color: 'var(--accent-color)',
            display: 'flex'
          }}>
            <HardDriveDownload size={20} />
          </div>
          <h1 style={{ fontSize: '2rem', margin: 0 }}>Gerenciar Conteúdo Offline</h1>
        </div>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', margin: 0 }}>
          Gerencie e liberte espaço dos conteúdos armazenados localmente no seu dispositivo.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Bíblias Section */}
        <section className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Book size={20} color="var(--accent-color)" />
              <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Traduções da Bíblia</h2>
            </div>
            <span className="badge">{bibles.length} / 2 Usadas</span>
          </div>

          {bibles.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>Nenhuma tradução da Bíblia salva offline no momento.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {bibles.map(b => (
                <div key={b.abbrev} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.85rem 1rem',
                  borderRadius: '10px',
                  backgroundColor: 'var(--bg-color)',
                  border: '1px solid var(--border-color)'
                }}>
                  <span style={{ fontWeight: '600' }}>{b.name} ({b.abbrev.toUpperCase()})</span>
                  <button 
                    className="btn-outline" 
                    onClick={() => removeBible(b.abbrev)}
                    style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)', padding: '0.4rem 0.6rem' }}
                    title="Excluir tradução"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Harpa Section */}
        <section className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Music size={20} color="var(--accent-color)" />
              <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Hinos da Harpa</h2>
            </div>
            <span className="badge">{hymns.length} Salvos (Sem limite)</span>
          </div>

          {hymns.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>Nenhum hino da Harpa salvo offline no momento.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {hymns.map(h => (
                <div key={h.number} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.85rem 1rem',
                  borderRadius: '10px',
                  backgroundColor: 'var(--bg-color)',
                  border: '1px solid var(--border-color)'
                }}>
                  <span style={{ fontWeight: '600' }}>Hino #{h.number} - {h.title}</span>
                  <button 
                    className="btn-outline" 
                    onClick={() => removeHymn(h.number)}
                    style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)', padding: '0.4rem 0.6rem' }}
                    title="Excluir hino"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* EBD Section */}
        <section className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={20} color="var(--accent-color)" />
              <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Lições da EBD</h2>
            </div>
            <span className="badge">{lessons.length} / 1 Usada</span>
          </div>

          {lessons.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>Nenhuma lição da EBD salva offline no momento.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {lessons.map(l => (
                <div key={l.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.85rem 1rem',
                  borderRadius: '10px',
                  backgroundColor: 'var(--bg-color)',
                  border: '1px solid var(--border-color)'
                }}>
                  <span style={{ fontWeight: '600' }}>{l.title}</span>
                  <button 
                    className="btn-outline" 
                    onClick={() => removeLesson(l.id)}
                    style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)', padding: '0.4rem 0.6rem' }}
                    title="Excluir lição"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
