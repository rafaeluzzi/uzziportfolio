import type { Handler } from '@netlify/functions';

//const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_KEY = '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';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
      headers: { 'Content-Type': 'application/json' },
    };
  }

  try {
    const { input, mode, projectType } = JSON.parse(event.body || '{}');

    const prompt = `
You are an expert product manager and developer.
Given the following user input, provide:
1. A one-sentence summary.
2. A classification (e.g., mobile app, web app, SaaS, etc).
3. Three similar product inspiration options (as an array of strings).

User input: "${input}"
Mode: ${mode}
Project type: ${projectType}

Respond as JSON:
{
  "summary": "...",
  "classification": "...",
  "inspirationOptions": ["...", "...", "..."]
}
`;

    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o', // or 'gpt-3.5-turbo'
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      }),
    });

    const data = await openaiRes.json();
    const text = data.choices?.[0]?.message?.content || '{}';

    let json;
    try {
      json = JSON.parse(text);
    } catch {
      json = {
        summary: '',
        classification: '',
        inspirationOptions: [],
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(json),
      headers: { 'Content-Type': 'application/json' },
    };
  } catch (error) {
    console.error('AI Inquiry error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
      headers: { 'Content-Type': 'application/json' },
    };
  }
};