import React, { useState, useEffect } from 'react';
import ReadingToolbar from '../components/ReadingToolbar';
import { db, checkEbdQuota } from '../services/db';
import { Download, AlertTriangle, ExternalLink, CheckCircle2, BookOpenCheck, Eye, ArrowLeft, Image as ImageIcon, Calendar, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Ebd() {
  const [targetAudience, setTargetAudience] = useState('adultos'); // 'adultos' | 'jovens'
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedQuarter, setSelectedQuarter] = useState('1º Trimestre');
  const [activeLesson, setActiveLesson] = useState(null);

  const lessonsData = [
    {
      id: 'a-2026-1-1',
      audience: 'adultos',
      year: '2026',
      quarter: '1º Trimestre',
      number: 1,
      title: 'Lição 01: A Revelação Espiritual da Bíblia',
      theme: 'Estudo sobre a inspiração divina, autoridade inerrante e preservação das Escrituras Sagradas.',
      coverImg: 'https://www.estudantesdabiblia.com.br/imagens/capas/capa_adultos_2026_1.jpg',
      content: [
        'I. A INSPIRAÇÃO DIVINA DAS ESCRITURAS - Toda a Escritura é divinamente inspirada por Deus e útil para o ensino, repreensão e correção.',
        'II. A PRESERVAÇÃO HISTÓRICA DO TEXTO - Através dos séculos, o Espírito Santo guardou a integridade da palavra revelada aos profetas e apóstolos.',
        'III. A APLICAÇÃO NA VIDA PRÁTICA DO CRISTÃO - A Bíblia não é apenas um livro de regras, mas a voz viva de Deus para a igreja moderna.'
      ]
    },
    {
      id: 'a-2026-1-2',
      audience: 'adultos',
      year: '2026',
      quarter: '1º Trimestre',
      number: 2,
      title: 'Lição 02: A Doutrina da Salvação e Graça',
      theme: 'Análise teológica sobre a redenção pela fé e o plano divino gracioso.',
      coverImg: 'https://www.estudantesdabiblia.com.br/imagens/capas/capa_adultos_2026_1.jpg',
      content: [
        'I. O ESTADO DA HUMANIDADE SEM DEUS - Todos pecaram e destituídos estão da glória de Deus.',
        'II. A GRAÇA DE CRISTO NA CRUZ - Porque pela graça sois salvos, por meio da fé; e isto não vem de vós, é dom de Deus.',
        'III. A SANTIFICAÇÃO CONTÍNUA - A fé genuína produz frutos de justiça e boas obras.'
      ]
    },
    {
      id: 'j-2026-1-1',
      audience: 'jovens',
      year: '2026',
      quarter: '1º Trimestre',
      number: 1,
      title: 'Lição 01: Escolhas Inteligentes na Juventude',
      theme: 'Orientações práticas para os jovens viverem com sabedoria em um mundo secularizado.',
      coverImg: 'https://www.estudantesdabiblia.com.br/imagens/capas/capa_jovens_2026_1.jpg',
      content: [
        'I. COMO PURIFICARÁ O JOVEM O SEU CAMINHO? - Observando-o segundo a Palavra de Deus.',
        'II. RESISTINDO ÀS PRESSÕES SOCIAIS - Onde abundou o pecado, superabundou a graça.',
        'III. CONSTRUINDO UM FUTURO COM PROPÓSITO - Guardando o coração com toda a diligência.'
      ]
    }
  ];

  const [showQuotaModal, setShowQuotaModal] = useState(false);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(null);
  const [downloaded, setDownloaded] = useState({});
  const [mobileDeleteActive, setMobileDeleteActive] = useState({});

  useEffect(() => {
    checkDownloaded();
  }, []);

  const checkDownloaded = async () => {
    const dls = await db.ebd_lessons.toArray();
    const map = {};
    dls.forEach(dl => map[dl.id] = true);
    setDownloaded(map);
  };

  const handleDownloadClick = async (lesson) => {
    if (downloaded[lesson.id]) {
      if (window.innerWidth <= 768 && !mobileDeleteActive[lesson.id]) {
        setMobileDeleteActive(prev => ({ ...prev, [lesson.id]: true }));
      } else {
        setConfirmDeleteModal(lesson);
      }
      return;
    }

    const quotaMet = await checkEbdQuota();
    if (quotaMet) {
      setShowQuotaModal(true);
      return;
    }
    await db.ebd_lessons.put(lesson);
    checkDownloaded();
  };

  const confirmDelete = async () => {
    if (confirmDeleteModal) {
      await db.ebd_lessons.delete(confirmDeleteModal.id);
      setConfirmDeleteModal(null);
      setMobileDeleteActive({});
      checkDownloaded();
    }
  };

  // Filter lessons based on active audience, year, and quarter
  const filteredLessons = lessonsData.filter(l => 
    l.audience === targetAudience && l.year === selectedYear && l.quarter === selectedQuarter
  );

  return (
    <div>
      {/* Show ReadingToolbar ONLY during active lesson reading */}
      {activeLesson && <ReadingToolbar />}

      {/* Page Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          {activeLesson && (
            <button 
              className="btn-outline" 
              onClick={() => setActiveLesson(null)}
              style={{ padding: '0.4rem', borderRadius: '8px', border: 'none' }}
              title="Voltar para a lista de lições"
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
            <BookOpenCheck size={20} />
          </div>
          <h1 style={{ fontSize: '2rem', margin: 0 }}>
            {activeLesson ? activeLesson.title : 'Lições da EBD (CPAD)'}
          </h1>
        </div>

        {/* Dynamic Credits */}
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <span>Fonte e créditos:</span>
          <a 
            href="https://www.estudantesdabiblia.com.br/cpad_sumario_geral.htm" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ color: 'var(--accent-color)', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}
          >
            Estudantes da Bíblia / CPAD <ExternalLink size={12} />
          </a>
        </p>
      </div>

      {!activeLesson ? (
        <div>
          {/* Categorization Controls: Jovens vs Adultos */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', backgroundColor: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '0.25rem' }}>
              <button 
                onClick={() => setTargetAudience('adultos')}
                style={{
                  padding: '0.5rem 1.25rem',
                  borderRadius: '10px',
                  border: 'none',
                  fontWeight: '700',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  backgroundColor: targetAudience === 'adultos' ? 'var(--accent-color)' : 'transparent',
                  color: targetAudience === 'adultos' ? '#ffffff' : 'var(--text-secondary)'
                }}
              >
                Lições de Adultos
              </button>
              <button 
                onClick={() => setTargetAudience('jovens')}
                style={{
                  padding: '0.5rem 1.25rem',
                  borderRadius: '10px',
                  border: 'none',
                  fontWeight: '700',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  backgroundColor: targetAudience === 'jovens' ? 'var(--accent-color)' : 'transparent',
                  color: targetAudience === 'jovens' ? '#ffffff' : 'var(--text-secondary)'
                }}
              >
                Lições de Jovens
              </button>
            </div>

            {/* Year & Quarter Selectors */}
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', backgroundColor: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '0.4rem 0.85rem' }}>
                <Calendar size={16} color="var(--accent-color)" />
                <select 
                  value={selectedYear} 
                  onChange={e => setSelectedYear(e.target.value)}
                >
                  <option value="2026">Ano 2026</option>
                  <option value="2025">Ano 2025</option>
                  <option value="2024">Ano 2024</option>
                </select>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', backgroundColor: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '0.4rem 0.85rem' }}>
                <select 
                  value={selectedQuarter} 
                  onChange={e => setSelectedQuarter(e.target.value)}
                >
                  <option value="1º Trimestre">1º Trimestre</option>
                  <option value="2º Trimestre">2º Trimestre</option>
                  <option value="3º Trimestre">3º Trimestre</option>
                  <option value="4º Trimestre">4º Trimestre</option>
                </select>
              </div>
            </div>
          </div>

          {/* Lessons List */}
          {filteredLessons.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
              Nenhuma lição encontrada para os filtros selecionados ({targetAudience === 'adultos' ? 'Adultos' : 'Jovens'} / {selectedYear} - {selectedQuarter}).
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {filteredLessons.map(l => (
                <div key={l.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.25rem' }}>
                  
                  {/* Cover Badge Placeholder */}
                  <div style={{
                    width: '64px',
                    height: '80px',
                    borderRadius: '10px',
                    backgroundColor: 'var(--accent-light)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-color)',
                    fontSize: '0.75rem',
                    fontWeight: '800',
                    textAlign: 'center',
                    padding: '0.25rem'
                  }}>
                    <ImageIcon size={24} style={{ marginBottom: '0.2rem' }} />
                    <span>CAPA</span>
                  </div>

                  {/* Title & Description */}
                  <div 
                    style={{ flex: 1, minWidth: '240px', cursor: 'pointer' }}
                    onClick={() => setActiveLesson(l)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
                      <span className="badge">{l.quarter}</span>
                      <h3 style={{ fontSize: '1.2rem', margin: 0 }}>{l.title}</h3>
                    </div>
                    <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', margin: 0 }}>
                      {l.theme}
                    </p>
                  </div>

                  {/* Action Buttons: Primary "Ler Online", Green->Red Download Button */}
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <button className="btn" onClick={() => setActiveLesson(l)}>
                      <Eye size={16} />
                      <span>Ler Online</span>
                    </button>

                    {!downloaded[l.id] ? (
                      <button 
                        className="btn-outline" 
                        onClick={() => handleDownloadClick(l)}
                      >
                        <Download size={16} />
                        <span>Salvar Offline</span>
                      </button>
                    ) : (
                      <button 
                        className={`btn-downloaded ${mobileDeleteActive[l.id] ? 'delete-active' : ''}`}
                        onClick={() => handleDownloadClick(l)}
                      >
                        <span className="btn-downloaded-normal" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                          <CheckCircle2 size={16} />
                          <span>Baixada</span>
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Lesson Reader View */
        <div className="card" style={{ padding: '2.5rem' }}>
          <div style={{ marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem' }}>
            <span className="badge" style={{ marginBottom: '0.5rem' }}>
              {activeLesson.audience === 'adultos' ? 'EBD Adultos' : 'EBD Jovens'} - {activeLesson.quarter} ({activeLesson.year})
            </span>
            <h2 style={{ fontSize: '1.75rem', margin: '0 0 0.5rem' }}>{activeLesson.title}</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', margin: 0 }}>{activeLesson.theme}</p>
          </div>

          <div className="reading-content" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {activeLesson.content.map((paragraph, idx) => (
              <p key={idx} style={{ margin: 0 }}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
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
              Você atingiu o limite máximo de armazenamento offline para esta seção (máximo de 1 lição salva). Para baixar este novo conteúdo, por favor acesse a página de Downloads e exclua a lição antiga.
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
              Deseja realmente remover a <strong>{confirmDeleteModal.title}</strong> do seu armazenamento local?
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
