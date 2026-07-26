import React, { useState, useEffect } from 'react';
import ReadingToolbar from '../components/ReadingToolbar';
import { db, checkBibleQuota } from '../services/db';
import { Download, AlertCircle } from 'lucide-react';

export default function Biblia() {
  const [versions, setVersions] = useState([
    { abbrev: 'nvi', name: 'Nova Versão Internacional' },
    { abbrev: 'acf', name: 'Almeida Corrigida Fiel' },
    { abbrev: 'ara', name: 'Almeida Revista e Atualizada' }
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
    
    // Simulate download
    await db.bible_translations.put(version);
    checkDownloaded();
  };

  return (
    <div>
      <ReadingToolbar />
      <h1 style={{ marginBottom: '2rem' }}>Versões da Bíblia</h1>
      <p style={{ opacity: 0.8, marginBottom: '2rem' }}>
        <em>Informações obtidas via API pública da BibliaAPI (https://bibliaapi.com.br/)</em>
      </p>

      <div className="reading-content">
        {versions.map(v => (
          <div key={v.abbrev} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ margin: '0 0 0.5rem' }}>{v.name}</h3>
              <span style={{ opacity: 0.7 }}>Abreviação: {v.abbrev.toUpperCase()}</span>
            </div>
            <button 
              className="btn" 
              onClick={() => handleDownload(v)}
              disabled={downloaded[v.abbrev]}
            >
              {downloaded[v.abbrev] ? 'Baixado' : <><Download size={16} style={{ marginRight: '0.5rem' }} /> Baixar Offline</>}
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <AlertCircle size={48} color="orange" style={{ marginBottom: '1rem' }} />
            <h3>Limite Excedido</h3>
            <p>Você atingiu o limite máximo de armazenamento offline (2 traduções). Para baixar este novo conteúdo, por favor acesse a página de Downloads e exclua um item antigo.</p>
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
