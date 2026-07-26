import * as cheerio from 'cheerio';

export default async function handler(req, res) {
  // Configuração de CORS para Vercel
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { hino } = req.query;

  try {
    if (hino) {
      // Buscar hino específico
      const response = await fetch(`https://www.harpacrista.org/hino/${hino}/`);
      if (!response.ok) throw new Error('Hino não encontrado');
      
      const html = await response.text();
      const $ = cheerio.load(html);
      
      const title = $('h1').first().text().trim();
      const lyrics = [];
      
      // O site da harpa costuma colocar a letra em parágrafos específicos
      $('.letra p').each((i, el) => {
        lyrics.push($(el).text().trim());
      });

      // Se a estrutura falhar, pegamos um fallback genérico
      if (lyrics.length === 0) {
        $('article p').each((i, el) => {
          const text = $(el).text().trim();
          if(text) lyrics.push(text);
        });
      }

      res.status(200).json({ number: hino, title, lyrics });
    } else {
      // Buscar lista de hinos (simplificado para MVP, retornando os 10 primeiros se não houver lógica avançada)
      // O ideal seria raspar a index.
      res.status(200).json({
        message: 'Endpoint para lista em construção',
        hymns: [
           { number: '1', title: 'Chuvas de Graça' },
           { number: '2', title: 'Saudosa Lembrança' }
        ]
      });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao fazer o scraping da Harpa' });
  }
}
