import React, { useState, useEffect } from 'react';
import ReadingToolbar from '../components/ReadingToolbar';
import { db, checkBibleQuota } from '../services/db';
import { fetchVersions, fetchBooks, fetchChapterVerses, CANONICAL_BOOKS } from '../services/bibliaApi';
import { Download, AlertTriangle, ExternalLink, CheckCircle2, BookOpen, Eye, ArrowLeft, ChevronRight, BookMarked, Trash2, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Biblia() {
  const [versions, setVersions] = useState([]);
  const [books, setBooks] = useState([]);
  const [verses, setVerses] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedVersion, setSelectedVersion] = useState(null);
  const [activeStep, setActiveStep] = useState('versions'); // 'versions' | 'books' | 'chapters' | 'verses' | 'reading'
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedVerse, setSelectedVerse] = useState(null);
  const [readFullChapter, setReadFullChapter] = useState(false);

  // Modals & Download states
  const [showQuotaModal, setShowQuotaModal] = useState(false);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(null);
  const [downloaded, setDownloaded] = useState({});
  const [mobileDeleteActive, setMobileDeleteActive] = useState({});

  useEffect(() => {
    loadInitialData();
    checkDownloaded();
  }, []);

  const loadInitialData = async () => {
    setLoading(true);
    const vList = await fetchVersions();
    const bList = await fetchBooks();
    setVersions(vList);
    setBooks(bList);
    if (vList.length > 0) setSelectedVersion(vList[0]);
    setLoading(false);
  };

  const checkDownloaded = async () => {
    const dls = await db.bible_translations.toArray();
    const map = {};
    dls.forEach(dl => map[dl.abbrev] = true);
    setDownloaded(map);
  };

  const handleDownloadClick = async (version) => {
    if (downloaded[version.abbrev]) {
      if (window.innerWidth <= 768 && !mobileDeleteActive[version.abbrev]) {
        setMobileDeleteActive(prev => ({ ...prev, [version.abbrev]: true }));
      } else {
        setConfirmDeleteModal(version);
      }
      return;
    }

    const quotaMet = await checkBibleQuota();
    if (quotaMet) {
      setShowQuotaModal(true);
      return;
    }
    await db.bible_translations.put(version);
    checkDownloaded();
  };

  const confirmDelete = async () => {
    if (confirmDeleteModal) {
      await db.bible_translations.delete(confirmDeleteModal.abbrev);
      setConfirmDeleteModal(null);
      setMobileDeleteActive({});
      checkDownloaded();
    }
  };

  const startReading = (version) => {
    setSelectedVersion(version);
    setActiveStep('books');
  };

  const loadChapter = async (book, chapterNum) => {
    setSelectedBook(book);
    setSelectedChapter(chapterNum);
    setLoading(true);
    const vData = await fetchChapterVerses(selectedVersion?.abbrev || 'nvi', book.abbrev, chapterNum);
    setVerses(vData);
    setLoading(false);
  };

  const booksOT = books.filter(b => b.group === 'ot' || (!b.group && CANONICAL_BOOKS.find(cb => cb.abbrev === b.abbrev)?.group === 'ot'));
  const booksNT = books.filter(b => b.group === 'nt' || (!b.group && CANONICAL_BOOKS.find(cb => cb.abbrev === b.abbrev)?.group === 'nt'));

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
                if (activeStep === 'reading') setActiveStep('verses');
                else if (activeStep === 'verses') setActiveStep('chapters');
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
            {activeStep === 'books' && `Seleção de Livro (${selectedVersion?.abbrev?.toUpperCase()})`}
            {activeStep === 'chapters' && `${selectedBook?.name} - Selecione o Capítulo`}
            {activeStep === 'verses' && `${selectedBook?.name} ${selectedChapter} - Selecione o Versículo`}
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

      {loading && (
        <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--accent-color)' }}>
          <Loader2 size={36} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
          <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Carregando dados da BibliaAPI...</p>
        </div>
      )}

      {!loading && (
        <>
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
                      {v.desc || `Tradução oficial ${v.name}`}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <button className="btn" onClick={() => startReading(v)}>
                      <Eye size={16} />
                      <span>Ler Online</span>
                    </button>

                    {!downloaded[v.abbrev] ? (
                      <button 
                        className="btn-outline" 
                        onClick={() => handleDownloadClick(v)}
                      >
                        <Download size={16} />
                        <span>Salvar Offline</span>
                      </button>
                    ) : (
                      <button 
                        className={`btn-downloaded ${mobileDeleteActive[v.abbrev] ? 'delete-active' : ''}`}
                        onClick={() => handleDownloadClick(v)}
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
          )}

          {/* STEP 2: Book Selection */}
          {activeStep === 'books' && (
            <div>
              {/* Antigo Testamento */}
              <div style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--accent-color)' }}>
                  Antigo Testamento ({booksOT.length} Livros)
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
                  Novo Testamento ({booksNT.length} Livros)
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
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(70px, 1fr))', gap: '0.85rem' }}>
                {Array.from({ length: selectedBook.chapters || 50 }, (_, i) => i + 1).map(num => (
                  <button 
                    key={num}
                    className="num-grid-btn"
                    onClick={() => {
                      loadChapter(selectedBook, num);
                      setActiveStep('verses');
                    }}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Verse Selection Grid + Full Chapter Button */}
          {activeStep === 'verses' && selectedBook && selectedChapter && (
            <div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Selecione o versículo desejado em <strong>{selectedBook.name} {selectedChapter}</strong>:
              </p>
              
              {/* Verses Number Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(65px, 1fr))', gap: '0.75rem', marginBottom: '2.5rem' }}>
                {verses.map(v => (
                  <button 
                    key={v.number}
                    className="num-grid-btn"
                    onClick={() => {
                      setSelectedVerse(v.number);
                      setReadFullChapter(false);
                      setActiveStep('reading');
                    }}
                  >
                    {v.number}
                  </button>
                ))}
              </div>

              {/* Option Button BELOW the Verse Grid: Read Full Chapter */}
              <div style={{ textAlign: 'center', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
                <button 
                  className="btn btn-outline"
                  onClick={() => {
                    setSelectedVerse(null);
                    setReadFullChapter(true);
                    setActiveStep('reading');
                  }}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 1.75rem' }}
                >
                  <BookMarked size={20} color="var(--accent-color)" />
                  <span>Ler Capítulo Inteiro ({selectedBook.name} {selectedChapter})</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: Verses / Full Chapter Reading View */}
          {activeStep === 'reading' && selectedBook && selectedChapter && (
            <div className="card" style={{ padding: '2.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.25rem' }}>
                <div>
                  <span className="badge" style={{ marginBottom: '0.4rem' }}>{selectedVersion?.name}</span>
                  <h2 style={{ fontSize: '1.6rem', margin: 0 }}>
                    {selectedBook.name} {selectedChapter}
                    {selectedVerse && !readFullChapter ? `:${selectedVerse}` : ''}
                  </h2>
                </div>
                <button 
                  className="btn-outline" 
                  onClick={() => setReadFullChapter(!readFullChapter)}
                  style={{ fontSize: '0.85rem', padding: '0.4rem 0.85rem' }}
                >
                  {readFullChapter ? 'Modo Versículo' : 'Capítulo Completo'}
                </button>
              </div>

              {/* Reading Verses */}
              <div className="reading-content" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {(readFullChapter ? verses : verses.filter(v => selectedVerse ? v.number === selectedVerse : true)).map(v => (
                  <p 
                    key={v.number} 
                    style={{ 
                      margin: 0,
                      backgroundColor: selectedVerse === v.number && !readFullChapter ? 'var(--accent-light)' : 'transparent',
                      padding: selectedVerse === v.number && !readFullChapter ? '0.75rem 1rem' : '0',
                      borderRadius: '10px'
                    }}
                  >
                    <sup style={{ fontWeight: '800', color: 'var(--accent-color)', marginRight: '0.5rem', fontSize: '0.85em' }}>
                      {v.number}
                    </sup>
                    {v.text}
                  </p>
                ))}
              </div>

              {/* Bottom Action */}
              <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
                <button 
                  className="btn btn-outline"
                  onClick={() => {
                    setReadFullChapter(!readFullChapter);
                    if (!readFullChapter) setSelectedVerse(null);
                  }}
                >
                  <BookMarked size={18} />
                  <span>{readFullChapter ? 'Ver Versículo Específico' : 'Ler Capítulo Completo'}</span>
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Quota Exceeded Modal */}
      {showQuotaModal && (
        <div className="modal-overlay" onClick={() => setShowQuotaModal(false)}>
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
              Você atingiu o limite máximo de armazenamento offline para esta seção (máximo de 2 traduções salvas). Para baixar este novo conteúdo, por favor acesse a página de Downloads e exclua um item antigo.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button className="btn btn-outline" onClick={() => setShowQuotaModal(false)}>
                Cancelar
              </button>
              <Link to="/meus-downloads" className="btn">
                Ir para Downloads
              </Link>
            </div>
          </div>
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
              Deseja realmente remover a tradução <strong>{confirmDeleteModal.name}</strong> do seu armazenamento local?
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
