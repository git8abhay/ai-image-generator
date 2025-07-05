// apiService.js

export async function generateImage(prompt) {
  try {
    const res = await fetch('http://localhost:3001/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || 'Failed to fetch image');
    return data.url;

  } catch (error) {
    console.error('Image generation failed:', error);
    throw error;
  }
}
