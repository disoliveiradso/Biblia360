// Service to scrape and structure EBD lessons from https://www.estudantesdabiblia.com.br/cpad_sumario_geral.htm
import * as cheerio from 'cheerio';

const PROXY_URL = 'https://api.allorigins.win/get?url=';
const EBD_SUMARIO_URL = 'https://www.estudantesdabiblia.com.br/cpad_sumario_geral.htm';
const EBD_BASE_DOMAIN = 'https://www.estudantesdabiblia.com.br';

export const EBD_YEARS = [
  '2026', '2025', '2024', '2023', '2022', '2021', '2020', 
  '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011'
];

export async function fetchEbdSummaryIndex() {
  try {
    const res = await fetch(`${PROXY_URL}${encodeURIComponent(EBD_SUMARIO_URL)}`);
    if (res.ok) {
      const data = await res.json();
      if (data && data.contents) {
        const $ = cheerio.load(data.contents);
        const indexList = [];

        $('a').each((_, el) => {
          const text = $(el).text().trim();
          const href = $(el).attr('href');
          if (text && href && (text.includes('Jovens') || text.includes('Adultos') || href.includes('licao') || href.includes('cpad'))) {
            indexList.push({
              title: text,
              link: href.startsWith('http') ? href : `${EBD_BASE_DOMAIN}/${href.replace(/^\//, '')}`
            });
          }
        });

        if (indexList.length > 0) return indexList;
      }
    }
  } catch (e) {
    console.warn('Error fetching EBD summary index from CPAD Estudantes da Bíblia:', e);
  }

  return [];
}

export async function fetchEbdLessonContent(lessonUrl) {
  try {
    const res = await fetch(`${PROXY_URL}${encodeURIComponent(lessonUrl)}`);
    if (res.ok) {
      const data = await res.json();
      if (data && data.contents) {
        const $ = cheerio.load(data.contents);
        const title = $('h1, h2, font[size="5"]').first().text().trim() || 'Lição Bíblica EBD';
        const paragraphs = [];
        let coverImg = null;

        $('img').each((_, el) => {
          const src = $(el).attr('src');
          if (src && (src.includes('capa') || src.includes('licao') || src.includes('cpad'))) {
            coverImg = src.startsWith('http') ? src : `${EBD_BASE_DOMAIN}/${src.replace(/^\//, '')}`;
          }
        });

        $('p, td').each((_, el) => {
          const text = $(el).text().trim();
          if (text && text.length > 20 && !text.includes('Estudantes da Bíblia')) {
            paragraphs.push(text);
          }
        });

        return { title, content: paragraphs, coverImg };
      }
    }
  } catch (e) {
    console.warn('Error fetching EBD lesson detail:', e);
  }

  return null;
}
