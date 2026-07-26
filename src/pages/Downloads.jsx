import React, { useState, useEffect } from 'react';
import { db } from '../services/db';
import { Trash2 } from 'lucide-react';

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

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Meus Downloads</h1>
      
      <section style={{ marginBottom: '3rem' }}>
        <h2>Traduções da Bíblia (Máx: 2)</h2>
        {bibles.length === 0 ? <p style={{ opacity: 0.6 }}>Nenhuma tradução baixada.</p> : null}
        {bibles.map(b => (
          <div key={b.abbrev} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>{b.name}</span>
            <button className="btn btn-outline" style={{ color: 'red', borderColor: 'red' }} onClick={() => removeBible(b.abbrev)}>
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2>Hinos da Harpa (Ilimitado)</h2>
        {hymns.length === 0 ? <p style={{ opacity: 0.6 }}>Nenhum hino baixado.</p> : null}
      </section>

      <section>
        <h2>Lições da EBD (Máx: 1)</h2>
        {lessons.length === 0 ? <p style={{ opacity: 0.6 }}>Nenhuma lição baixada.</p> : null}
      </section>
    </div>
  );
}
