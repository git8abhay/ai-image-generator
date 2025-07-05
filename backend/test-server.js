const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

// Using your DeepAI API key directly (no .env)
const DEEPAI_API_KEY = 'f63f2376-53e4-4fdf-b53a-d441403d51fe';

app.post('/generate', async (req, res) => {
  const prompt = req.body.prompt;
  console.log('🟢 Prompt received:', prompt);

  try {
    const response = await axios.post(
      'https://api.deepai.org/api/text2img',
      new URLSearchParams({ text: prompt }).toString(),
      {
        headers: {
          'Api-Key': DEEPAI_API_KEY,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    console.log('✅ DeepAI Response:', response.data);

    if (!response.data.output_url) {
      throw new Error('DeepAI did not return an image URL');
    }

    res.json({ image: response.data.output_url });
  } catch (err) {
    console.error('❌ DeepAI Error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to generate image' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Test server running on http://localhost:${PORT}`);
});
