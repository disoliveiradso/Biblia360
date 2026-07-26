import React, { useState, useEffect } from 'react';
import ReadingToolbar from '../components/ReadingToolbar';
import { db, checkEbdQuota } from '../services/db';
import { Download, AlertCircle } from 'lucide-react';

export default function Ebd() {
  const [lessons, setLessons] = useState([
    { id: '1', title: 'Lição 1 - A Doutrina do Pecado' },
    { id: '2', title: 'Lição 2 - A Salvação pela Graça' }
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
      <h1 style={{ marginBottom: '2rem' }}>Lições da EBD</h1>
      <p style={{ opacity: 0.8, marginBottom: '2rem' }}>
        <em>Fonte e créditos: Estudantes da Bíblia / CPAD (https://www.estudantesdabiblia.com.br/)</em>
      </p>

      <div className="reading-content">
        {lessons.map(l => (
          <div key={l.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ margin: '0 0 0.5rem' }}>{l.title}</h3>
            </div>
            <button 
              className="btn" 
              onClick={() => handleDownload(l)}
              disabled={downloaded[l.id]}
            >
              {downloaded[l.id] ? 'Baixado' : <><Download size={16} style={{ marginRight: '0.5rem' }} /> Baixar Offline</>}
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <AlertCircle size={48} color="orange" style={{ marginBottom: '1rem' }} />
            <h3>Limite Excedido</h3>
            <p>Você atingiu o limite máximo de armazenamento offline (1 lição). Para baixar este novo conteúdo, por favor acesse a página de Downloads e exclua a lição antiga.</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
              <button className="btn btn-outline" onClick={() => setShowModal(false)}>Fechar</button>
              <a href="/meus-downloads" className="btn">Ir para Downloads</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
