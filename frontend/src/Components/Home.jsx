import React, { useState,useEffect } from 'react';
import '../App.css';
import axios from 'axios';

function Home() {

    // Load URLs from local storage when component mounts initially 
    useEffect(() => {
      const storedUrls = localStorage.getItem('shortenedUrls');
      if (storedUrls) {
        setUrls(JSON.parse(storedUrls));
      }
    }, []);
  

  
  const [originalUrl, setUrl] = useState('');
  const [urls, setUrls] = useState(() => {
    // Load URLs from local storage when initializing state
    const storedUrls = localStorage.getItem('shortenedUrls');
    return storedUrls ? JSON.parse(storedUrls) : [];
  });
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [isUrlShortened, setIsUrlShortened] = useState(false);

    // Update local storage whenever URLs state changes
    useEffect(() => {
      localStorage.setItem('shortenedUrls', JSON.stringify(urls));
    }, [urls]);
  
  const handleShortenUrl = async () => {
    try {
      const response = await axios.post('http://localhost:5000/short', { originalUrl });
      const newShortUrl = response.data.shortUrl;
      setShortUrl(newShortUrl);
      setError('');
      setIsUrlShortened(true);
      setUrls((prevUrls) => [...prevUrls, `http://localhost:5000/short/${newShortUrl}`]);
      setUrl('');  // Clear the input field on successful URL generation
    } catch (error) {
      setError('Error creating short URL');
      setShortUrl('');
      setIsUrlShortened(false);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  const clearInput = () => {
    setUrl('');
  };

  return (
    <div className="Home">
      <div className="home-container">
        <div className="homebox">
          <div className="homeTitle">URL-SHORTNER</div>
          <div className="home-wrapper">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleShortenUrl();
              }}
              className="relative"
            >
              <input
                type="text"
                placeholder="Enter URL"
                className="homeInput"
                value={originalUrl}
                onChange={(e) => setUrl(e.target.value)}
              />
              {originalUrl && (
                <button
                  type="button"
                  className="clearButton"
                  onClick={clearInput}
                >
                  &times;
                </button>
              )}
              <button type="submit" className="shortButton">
                Short URL
              </button>
            </form>
            {error && <div className="error">{error}</div>}
          </div>
          <div className="url-list max-h-60 mt-8 overflow-y-auto custom-scrollbar">
                        <table className="w-full mt-4 text-left text-white">
                            <tbody>
                                {urls.map((shortenedUrl, index) => (
                                    <tr key={index} className="border-b border-gray-700">
                                        <td className="p-2 break-all">{shortenedUrl}</td>
                                        <td className="p-2">
                                            <button
                                                className="copyButton bg-blue-500 text-white px-2 py-1 rounded-lg"
                                                onClick={() => handleCopy(shortenedUrl)}
                                            >
                                                Copy
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
