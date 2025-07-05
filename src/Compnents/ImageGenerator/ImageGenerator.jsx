import React, { useRef, useState } from 'react';
import axios from 'axios';
import './ImageGenerator.css';
import default_image from '../Assets/Default_image.png';

const ImageGenerator = () => {
  const [image_url, setImage_url] = useState('/');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const generateImage = async () => {
  const prompt = inputRef.current.value;
  if (!prompt.trim()) {
    alert('Please enter a prompt.');
    return;
  }

  setLoading(true);
  setImage_url('/');

  try {
    const response = await axios.post(
      'http://localhost:5000/generate',
      { prompt },
      { timeout: 60000 }
    );

    setImage_url(response.data.image); // Assuming backend returns final image URL
  } catch (error) {
    console.error('Image generation failed:', error);

    if (error.code === 'ECONNABORTED') {
      alert('Image generation timed out. Please try again.');
    } else if (error.response) {
      alert(`Error: ${error.response.data.message || 'Server error'}`);
    } else {
      alert('Something went wrong while generating the image.');
    }
  }

  setLoading(false);
};


  return (
    <div className='ai-image-generator'>
      <div className='header'>AI Image <span>Generator</span></div>

      <div className="img-loading">
        <div className="image">
          <img
            src={image_url === '/' ? default_image : image_url}
            alt="Generated"
            width="512"
            height="512"
          />
        </div>
        {loading && <div className="loading">Generating...</div>}
      </div>

      <div className="search-box">
        <input
          type="text"
          ref={inputRef}
          className='search-input'
          placeholder='Describe what you want to see...'
        />
        <div className="generate-btn" onClick={generateImage}>Generate</div>
      </div>
    </div>
  );
};

export default ImageGenerator;
