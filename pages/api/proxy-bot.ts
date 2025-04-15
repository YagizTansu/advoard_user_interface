import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { question, lang, source, ekoid, hash } = req.query;

    // Make the request to the external API
    const response = await axios.get(
      'http://10.0.73.66/ekobot/sendQuestion_ekobot.php',
      {
        params: {
          question,
          lang: lang || 'tr',
          source: source || 'robot',
          ekoid: ekoid || 'abc',
          hash: hash || 'abc'
        }
      }
    );

    // Return the API response to the client
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error proxying request to bot API:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch data from the bot API',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
