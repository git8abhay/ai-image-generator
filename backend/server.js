/**
 * Official OpenAI DALL·E 3 integration (July 2025)
 */
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post('/generate', async (req, res) => {
  try {
    const { prompt } = req.body;
    const result = await openai.images.generate({
      model: 'dall-e-3',
      prompt,
      size: '1024x1024',
      n: 1,
      quality: 'standard',
      style: 'vivid'
    });

    const imageUrl = result.data[0].url;
    res.json({ url: imageUrl });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Image generation failed' });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));
