import React, { useState, useEffect } from 'react';
import ReadingToolbar from '../components/ReadingToolbar';
import { db, checkBibleQuota } from '../services/db';
import { Download, AlertTriangle, ExternalLink, CheckCircle2, BookOpen, Eye, ArrowLeft, ChevronRight, BookMarked } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Biblia() {
  const [versions] = useState([
    { abbrev: 'nvi', name: 'Nova Versão Internacional', desc: 'Linguagem contemporânea e de fácil compreensão.' },
    { abbrev: 'acf', name: 'Almeida Corrigida Fiel', desc: 'Fiel aos textos originais baseados no Textus Receptus.' },
    { abbrev: 'ara', name: 'Almeida Revista e Atualizada', desc: 'Tradição almeidiana com vocabulário atualizado.' }
  ]);

  const booksOT = [
    { name: 'Gênesis', abbrev: 'gn', chapters: 50 },
    { name: 'Êxodo', abbrev: 'ex', chapters: 40 },
    { name: 'Levítico', abbrev: 'lv', chapters: 27 },
    { name: 'Números', abbrev: 'nm', chapters: 36 },
    { name: 'Deuteronômio', abbrev: 'dt', chapters: 34 },
    { name: 'Josué', abbrev: 'js', chapters: 24 },
    { name: 'Juízes', abbrev: 'jz', chapters: 21 },
    { name: 'Rute', abbrev: 'rt', chapters: 4 },
    { name: '1 Samuel', abbrev: '1sm', chapters: 31 },
    { name: '2 Samuel', abbrev: '2sm', chapters: 24 },
    { name: 'Salmos', abbrev: 'sl', chapters: 150 },
    { name: 'Provérbios', abbrev: 'pv', chapters: 31 },
    { name: 'Isaías', abbrev: 'is', chapters: 66 }
  ];

  const booksNT = [
    { name: 'Mateus', abbrev: 'mt', chapters: 28 },
    { name: 'Marcos', abbrev: 'mc', chapters: 16 },
    { name: 'Lucas', abbrev: 'lc', chapters: 24 },
    { name: 'João', abbrev: 'jo', chapters: 21 },
    { name: 'Atos', abbrev: 'at', chapters: 28 },
    { name: 'Romanos', abbrev: 'rm', chapters: 16 },
    { name: '1 Coríntios', abbrev: '1co', chapters: 16 },
    { name: '2 Coríntios', abbrev: '2co', chapters: 13 },
    { name: 'Gálatas', abbrev: 'gl', chapters: 6 },
    { name: 'Efésios', abbrev: 'ef', chapters: 6 },
    { name: 'Filipenses', abbrev: 'fp', chapters: 4 },
    { name: 'Colossenses', abbrev: 'cl', chapters: 4 },
    { name: 'Apocalipse', abbrev: 'ap', chapters: 22 }
  ];

  const [selectedVersion, setSelectedVersion] = useState(versions[0]);
  const [activeStep, setActiveStep] = useState('versions'); // 'versions' | 'books' | 'chapters' | 'reading'
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [readFullChapter, setReadFullChapter] = useState(false);
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

  const startReading = (version) => {
    setSelectedVersion(version);
    setActiveStep('books');
  };

  // Mocked sample verses for demonstration
  const sampleVerses = [
    { number: 1, text: 'No princípio criou Deus os céus e a terra.' },
    { number: 2, text: 'E a terra era sem forma e vazia; e havia trevas sobre a face do abismo; e o Espírito de Deus se movia sobre a face das águas.' },
    { number: 3, text: 'E disse Deus: Haja luz; e houve luz.' },
    { number: 4, text: 'E viu Deus que era boa a luz; e fez Deus separação entre a luz e as trevas.' },
    { number: 5, text: 'E Deus chamou à luz Dia; e às trevas chamou Noite. E foi a tarde e a manhã, o dia primeiro.' }
  ];

  return (
    <div>
      {/* Show ReadingToolbar ONLY during active reading mode */}
      {activeStep === 'reading' && <ReadingToolbar />}

      {/* Page Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          {activeStep !== 'versions' && (
            <button 
              className="btn-outline" 
              onClick={() => {
                if (activeStep === 'reading') setActiveStep('chapters');
                else if (activeStep === 'chapters') setActiveStep('books');
                else if (activeStep === 'books') setActiveStep('versions');
              }}
              style={{ padding: '0.4rem', borderRadius: '8px', border: 'none' }}
              title="Voltar"
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
            <BookOpen size={20} />
          </div>
          <h1 style={{ fontSize: '2rem', margin: 0 }}>
            {activeStep === 'versions' && 'Bíblia Sagrada'}
            {activeStep === 'books' && `Seleção de Livro (${selectedVersion.abbrev.toUpperCase()})`}
            {activeStep === 'chapters' && `${selectedBook?.name} - Escolha o Capítulo`}
            {activeStep === 'reading' && `${selectedBook?.name} ${selectedChapter}`}
          </h1>
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

      {/* STEP 1: Versions List */}
      {activeStep === 'versions' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {versions.map(v => (
            <div key={v.abbrev} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div 
                style={{ flex: 1, minWidth: '240px', cursor: 'pointer' }}
                onClick={() => startReading(v)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
                  <span className="badge">{v.abbrev.toUpperCase()}</span>
                  <h3 style={{ fontSize: '1.2rem', margin: 0 }}>{v.name}</h3>
                </div>
                <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', margin: 0 }}>
                  {v.desc}
                </p>
              </div>

              {/* Action Buttons: Primary "Ler Online", Secondary Gray "Salvar Offline" */}
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button className="btn" onClick={() => startReading(v)}>
                  <Eye size={16} />
                  <span>Ler Online</span>
                </button>

                <button 
                  className="btn-outline" 
                  onClick={() => handleDownload(v)}
                  disabled={downloaded[v.abbrev]}
                  style={{
                    borderColor: 'var(--border-color)',
                    color: downloaded[v.abbrev] ? 'var(--text-muted)' : 'var(--text-secondary)'
                  }}
                >
                  {downloaded[v.abbrev] ? (
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
      )}

      {/* STEP 2: Book Selection */}
      {activeStep === 'books' && (
        <div>
          {/* Antigo Testamento */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--accent-color)' }}>
              Antigo Testamento (39 Livros)
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.85rem' }}>
              {booksOT.map(b => (
                <div 
                  key={b.abbrev}
                  className="card card-interactive"
                  onClick={() => { setSelectedBook(b); setActiveStep('chapters'); }}
                  style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <span style={{ fontWeight: '600', fontSize: '0.95rem' }}>{b.name}</span>
                  <ChevronRight size={16} color="var(--text-muted)" />
                </div>
              ))}
            </div>
          </div>

          {/* Novo Testamento */}
          <div>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--accent-color)' }}>
              Novo Testamento (27 Livros)
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.85rem' }}>
              {booksNT.map(b => (
                <div 
                  key={b.abbrev}
                  className="card card-interactive"
                  onClick={() => { setSelectedBook(b); setActiveStep('chapters'); }}
                  style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <span style={{ fontWeight: '600', fontSize: '0.95rem' }}>{b.name}</span>
                  <ChevronRight size={16} color="var(--text-muted)" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: Chapter Selection Grid */}
      {activeStep === 'chapters' && selectedBook && (
        <div>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            Selecione o capítulo desejado do livro de <strong>{selectedBook.name}</strong>:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(70px, 1fr))', gap: '0.75rem' }}>
            {Array.from({ length: selectedBook.chapters }, (_, i) => i + 1).map(num => (
              <button 
                key={num}
                className="card card-interactive"
                onClick={() => { setSelectedChapter(num); setActiveStep('reading'); }}
                style={{
                  padding: '1rem 0.5rem',
                  textAlign: 'center',
                  fontWeight: '700',
                  fontSize: '1.1rem',
                  borderRadius: '12px'
                }}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 4: Verses / Full Chapter Reading */}
      {activeStep === 'reading' && selectedBook && selectedChapter && (
        <div className="card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', pb: '1rem' }}>
            <div>
              <span className="badge" style={{ marginBottom: '0.4rem' }}>{selectedVersion.name}</span>
              <h2 style={{ fontSize: '1.5rem', margin: 0 }}>{selectedBook.name} - Capítulo {selectedChapter}</h2>
            </div>
          </div>

          {/* Verses Content */}
          <div className="reading-content" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {sampleVerses.map(v => (
              <p key={v.number} style={{ margin: 0 }}>
                <sup style={{ fontWeight: 'bold', color: 'var(--accent-color)', marginRight: '0.5rem', fontSize: '0.85em' }}>
                  {v.number}
                </sup>
                {v.text}
              </p>
            ))}
          </div>

          {/* Bottom Action: Toggle Full Chapter Reading */}
          <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
            <button 
              className="btn btn-outline"
              onClick={() => setReadFullChapter(!readFullChapter)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <BookMarked size={18} />
              <span>{readFullChapter ? 'Modo Versículo por Versículo' : 'Ler Capítulo Completo'}</span>
            </button>
          </div>
        </div>
      )}

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
              Você atingiu o limite máximo de armazenamento offline para esta seção. Para baixar este novo conteúdo, por favor acesse a página de Downloads e exclua um item antigo.
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
