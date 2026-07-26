import * as cheerio from 'cheerio';

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { lesson } = req.query;

  try {
    if (lesson) {
      // Exemplo genérico, a estrutura exata de URL da EBD precisaria ser analisada a fundo
      res.status(200).json({
        id: lesson,
        title: `Lição ${lesson}`,
        content: `Conteúdo extraído da lição ${lesson}...`
      });
    } else {
      // Scrape do sumário geral
      const response = await fetch('https://www.estudantesdabiblia.com.br/cpad_sumario_geral.htm');
      const html = await response.text();
      const $ = cheerio.load(html);
      
      const lessons = [];
      // Buscar links do sumário
      $('a').each((i, el) => {
        const text = $(el).text().trim();
        const href = $(el).attr('href');
        if(text && href && href.includes('licao')) {
          lessons.push({ title: text, link: href });
        }
      });
      
      res.status(200).json({ lessons });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao fazer o scraping da EBD' });
  }
}
