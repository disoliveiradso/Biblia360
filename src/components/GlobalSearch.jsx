import React, { useState } from 'react';
import { Search, X, Book, Music, BookOpenCheck, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function GlobalSearch({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  if (!isOpen) return null;

  // Mocked/searchable database index
  const bibleData = [
    { title: 'Gênesis', type: 'Livro (Antigo Testamento)', link: '/biblia?book=gn' },
    { title: 'Êxodo', type: 'Livro (Antigo Testamento)', link: '/biblia?book=ex' },
    { title: 'Salmos', type: 'Livro (Antigo Testamento)', link: '/biblia?book=sl' },
    { title: 'Isaías', type: 'Livro (Antigo Testamento)', link: '/biblia?book=is' },
    { title: 'Mateus', type: 'Livro (Novo Testamento)', link: '/biblia?book=mt' },
    { title: 'João', type: 'Livro (Novo Testamento)', link: '/biblia?book=jo' },
    { title: 'Romanos', type: 'Livro (Novo Testamento)', link: '/biblia?book=rm' },
    { title: 'Apocalipse', type: 'Livro (Novo Testamento)', link: '/biblia?book=ap' }
  ];

  const harpaData = [
    { number: '1', title: 'Chuvas de Graça', link: '/harpa?hymn=1' },
    { number: '2', title: 'Saudosa Lembrança', link: '/harpa?hymn=2' },
    { number: '3', title: 'Plena Vida', link: '/harpa?hymn=3' },
    { number: '4', title: 'Deus Tomará Conta de Ti', link: '/harpa?hymn=4' },
    { number: '15', title: 'Foi na Cruz', link: '/harpa?hymn=15' },
    { number: '77', title: 'Guarda o Contacto', link: '/harpa?hymn=77' },
    { number: '291', title: 'A Mensagem da Cruz', link: '/harpa?hymn=291' }
  ];

  const ebdData = [
    { title: 'Lição 01: A Revelação Espiritual da Bíblia', category: 'Adultos / 2026 - 1º Trimestre', link: '/ebd?lesson=1' },
    { title: 'Lição 02: A Doutrina da Salvação e Graça', category: 'Adultos / 2026 - 1º Trimestre', link: '/ebd?lesson=2' },
    { title: 'Lição 01: Escolhas Inteligentes na Juventude', category: 'Jovens / 2026 - 1º Trimestre', link: '/ebd?lesson=j1' }
  ];

  const cleanQuery = query.toLowerCase().trim();

  const filteredBible = cleanQuery ? bibleData.filter(item => item.title.toLowerCase().includes(cleanQuery)) : [];
  const filteredHarpa = cleanQuery ? harpaData.filter(item => item.number.includes(cleanQuery) || item.title.toLowerCase().includes(cleanQuery)) : [];
  const filteredEbd = cleanQuery ? ebdData.filter(item => item.title.toLowerCase().includes(cleanQuery) || item.category.toLowerCase().includes(cleanQuery)) : [];

  const totalResults = filteredBible.length + filteredHarpa.length + filteredEbd.length;

  const handleSelect = (url) => {
    onClose();
    navigate(url);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={e => e.stopPropagation()} 
        style={{ maxWidth: '650px', textAlign: 'left', padding: '1.75rem' }}
      >
        {/* Search Input Box */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
          <Search size={22} color="var(--accent-color)" />
          <input 
            type="text" 
            placeholder="Pesquisar por livro, número do hino ou lição..." 
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: '1.1rem',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-family-ui)'
            }}
          />
          <button 
            onClick={onClose} 
            className="btn-outline" 
            style={{ border: 'none', padding: '0.35rem', borderRadius: '6px' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Results Container */}
        {!cleanQuery ? (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem 0', fontSize: '0.95rem' }}>
            Digite um termo para pesquisar na Bíblia, Harpa ou Lições da EBD.
          </p>
        ) : totalResults === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem 0', fontSize: '0.95rem' }}>
            Nenhum resultado encontrado para "{query}".
          </p>
        ) : (
          <div style={{ maxHeight: '420px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingRight: '0.5rem' }}>
            
            {/* Bíblia Results */}
            {filteredBible.length > 0 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-color)', fontWeight: '700', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
                  <Book size={16} />
                  <span>BÍBLIA SAGRADA ({filteredBible.length})</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {filteredBible.map((b, i) => (
                    <div 
                      key={i} 
                      onClick={() => handleSelect(b.link)}
                      style={{
                        padding: '0.75rem 1rem',
                        borderRadius: '10px',
                        backgroundColor: 'var(--surface-color)',
                        border: '1px solid var(--border-color)',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                      className="card-interactive"
                    >
                      <span style={{ fontWeight: '600' }}>{b.title}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{b.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Harpa Results */}
            {filteredHarpa.length > 0 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-color)', fontWeight: '700', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
                  <Music size={16} />
                  <span>HINOS DA HARPA ({filteredHarpa.length})</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {filteredHarpa.map((h, i) => (
                    <div 
                      key={i} 
                      onClick={() => handleSelect(h.link)}
                      style={{
                        padding: '0.75rem 1rem',
                        borderRadius: '10px',
                        backgroundColor: 'var(--surface-color)',
                        border: '1px solid var(--border-color)',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                      className="card-interactive"
                    >
                      <span style={{ fontWeight: '600' }}>Hino #{h.number} - {h.title}</span>
                      <ArrowRight size={16} color="var(--accent-color)" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* EBD Results */}
            {filteredEbd.length > 0 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-color)', fontWeight: '700', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
                  <BookOpenCheck size={16} />
                  <span>LIÇÕES DA EBD ({filteredEbd.length})</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {filteredEbd.map((e, i) => (
                    <div 
                      key={i} 
                      onClick={() => handleSelect(e.link)}
                      style={{
                        padding: '0.75rem 1rem',
                        borderRadius: '10px',
                        backgroundColor: 'var(--surface-color)',
                        border: '1px solid var(--border-color)',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                      className="card-interactive"
                    >
                      <div>
                        <div style={{ fontWeight: '600' }}>{e.title}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{e.category}</div>
                      </div>
                      <ArrowRight size={16} color="var(--accent-color)" />
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
}
