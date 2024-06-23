import React, { useState } from 'react';
import '../App.css';

function Home() {
  const [url, setUrl] = useState('');
  const [urls, setUrls] = useState([]);

  const handleShortenUrl = () => {
    if (url.trim() !== '') {
      setUrls([...urls, url]);
      setUrl('');
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
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
            >
              <input
                type="text"
                placeholder="Enter URL"
                className="homeInput"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <button type="button" className="shortButton" onClick={handleShortenUrl}>
                Short URL
              </button>
            </form>
          </div>
          <table className="w-full mt-4">
            <tbody>
              {urls.map((shortenedUrl, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2 text-white">{shortenedUrl}</td>
                  <td className="p-2">
                    <button
                      className="copyButton"
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
  );
}

export default Home;
