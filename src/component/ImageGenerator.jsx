import './ImageGenerator.css';
import { useState, useRef } from 'react';
import myImage from './ai.png';

const ImageGenerator = () => {
  const [image_url, setImage_url] = useState("/");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const API_KEY = `sk-OLizt56A6TzAW5LOqgm7ZsOQW1lGp6dF6a2doPlPmy8t317T` 
 console.log("API KEY:", API_KEY);
  const imageGenerator = async () => {
    if (!inputRef.current.value) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("prompt", inputRef.current.value);

      const response = await fetch(
        "https://api.stability.ai/v2beta/stable-image/generate/core",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            Accept: "image/*",
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const err = await response.text();
        console.log("API Error:", err);
        return;
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);

      setImage_url(imageUrl);

    } catch (err) {
      console.log("Error:", err);
    }

    setLoading(false);
  };

  return (
    <div className="ai-image-generator">
      <div className="header">
        AI Image <span>Generator</span>
      </div>

      <div className="img-loading">
        <div className="image">
          {loading
            ? <p>Generating...</p>
            : <img src={image_url === "/" ? myImage : image_url} alt="AI Generated" />
          }
        </div>
      </div>

      <div className="search-box">
        <input
          type="text"
          ref={inputRef}
          placeholder="Describe What You Want To See"
          className='search-input'
        />
        <div className="generate-btn" onClick={imageGenerator}>
          Generate
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;