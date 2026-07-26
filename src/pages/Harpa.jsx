import React, { useState, useEffect } from 'react';
import ReadingToolbar from '../components/ReadingToolbar';
import { db } from '../services/db';
import { Download } from 'lucide-react';

export default function Harpa() {
  const [hymns, setHymns] = useState([
    { number: '1', title: 'Chuvas de Graça' },
    { number: '2', title: 'Saudosa Lembrança' }
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
      <h1 style={{ marginBottom: '2rem' }}>Hinos da Harpa</h1>
      <p style={{ opacity: 0.8, marginBottom: '2rem' }}>
        <em>Fonte e créditos: Harpa Cristã (https://www.harpacrista.org/)</em>
      </p>

      <div className="reading-content">
        {hymns.map(h => (
          <div key={h.number} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ margin: '0 0 0.5rem' }}>{h.number}. {h.title}</h3>
            </div>
            <button 
              className="btn" 
              onClick={() => handleDownload(h)}
              disabled={downloaded[h.number]}
            >
              {downloaded[h.number] ? 'Baixado' : <><Download size={16} style={{ marginRight: '0.5rem' }} /> Baixar Offline</>}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
