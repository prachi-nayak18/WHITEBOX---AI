const fetch = require('node-fetch');

const PROMPTS = {
  text:  'You are Whitebox AI, a brilliant assistant. Answer clearly and helpfully.',
  code:  'You are Whitebox AI Code Expert. Write clean well-commented code.',
  math:  'You are Whitebox AI Math Expert. Show every step clearly.',
  image: 'You are Whitebox AI Vision Expert. Analyze images thoroughly.',
};

exports.askClaude = async ({ message, mode, lang, history, images }) => {
  const messages = [];

  if (history && history.length > 0) {
    history.slice(-10).forEach(h => {
      messages.push({ role: h.role, content: h.content });
    });
  }

  let content = [];
  if (images && images.length > 0) {
    images.forEach(img => {
      content.push({
        type: 'image',
        source: { type: 'base64', media_type: img.type || 'image/jpeg', data: img.data },
      });
    });
  }
  if (message) content.push({ type: 'text', text: message });

  const finalContent = content.length === 1 && content[0].type === 'text'
    ? message : content;

  messages.push({ role: 'user', content: finalContent });

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method:  'POST',
    headers: {
      'Content-Type':      'application/json',
      'x-api-key':         process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model:      'claude-sonnet-4-5',
      max_tokens: 2048,
      system:     PROMPTS[mode] || PROMPTS.text,
      messages:   messages,
    }),
  });

  const data = await response.json();
  if (!data || !data.content) {
  console.log('Full API response:', JSON.stringify(data));
  return 'Error: ' + (data?.error?.message || 'No response from API');
}

const reply = data.content
  .filter(b => b.type === 'text')
  .map(b => b.text)
  .join('');

return reply || 'No response.';
};