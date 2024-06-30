import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
function Home({ user }) {
  const [originalUrl, setUrl] = useState('');
  const [urls, setUrls] = useState(() => {
    const storedUrls = localStorage.getItem('shortenedUrls');
    return storedUrls ? JSON.parse(storedUrls) : [];
  });
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [isUrlShortened, setIsUrlShortened] = useState(false);

  useEffect(() => {
    if (user && user._id) {
      const fetchUrls = async () => {
        try {
          const response = await axios.get(`https://us.maulikdalwadi.tech/user?userId=${user._id}`);
          const fetchedUrls = response.data.map(url => `https://us.maulikdalwadi.tech/short/${url.shortUrl}`);
          setUrls((prevUrls) => [...prevUrls, ...fetchedUrls]);
          setError('');
        } catch (error) {
          setError('Error fetching short URLs');
        }
      };
      fetchUrls();
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('shortenedUrls', JSON.stringify(urls));
  }, [urls]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setOpen(true);
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleShortenUrl = async (e) => {
    e.preventDefault();
    if (!isValidUrl(originalUrl)) {
      setError('Please enter a valid URL');
      return;
    }

    try {
      const postData = { originalUrl, userId: user?._id };

      const response = await axios.post('https://us.maulikdalwadi.tech/short', postData);
      const newShortUrl = response.data.shortUrl;
      setShortUrl(newShortUrl);
      setError('');
      setIsUrlShortened(true);
      setUrls((prevUrls) => [...prevUrls, `https://us.maulikdalwadi.tech/short/${newShortUrl}`]);
      setUrl('');
    } catch (error) {
      setError('Error creating short URL');
      setShortUrl('');
    }
  };

  const handleDelete = async (shortenedUrl) => {
    try {
      const id = shortenedUrl.substring(shortenedUrl.lastIndexOf('/') + 1);
      await axios.delete(`https://us.maulikdalwadi.tech/short/${id}`);
      setUrls((prevUrls) => prevUrls.filter(url => url !== shortenedUrl));
    } catch (error) {
      setError('Error deleting short URL');
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const clearInput = () => {
    setUrl('');
  };

  return (
    <div className="Home">
      <div className="home-container">
        <div className="homebox">
          <div className="homeTitle text-2xl font-bold">URL-SHORTENER</div>
          <div className="home-wrapper mt-4">
            <form onSubmit={handleShortenUrl} className="relative">
              <div className="inputContainer flex items-center justify-center">
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
              </div>
              <button type="submit" className="shortButton mt-4">
                Shorten URL
              </button>
            </form>
            {error && <div className="error mt-2 text-red-500">{error}</div>}
          </div>
          <div className="url-list max-h-60 mt-8 overflow-y-auto custom-scrollbar">
            <table className="w-full mt-4 text-left text-white">
              <tbody>
                {urls.map((shortenedUrl, index) => (
                  <tr key={index} className="border-b border-gray-700">
                    <td className="p-2 break-all">{shortenedUrl}</td>
                    <td className="p-2">
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleCopy(shortenedUrl)}
                      >
                        Copy
                      </Button>
                      <IconButton
                        aria-label="delete"
                        color="primary"
                        size="small"
                        onClick={() => handleDelete(shortenedUrl)}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                        <Alert
                          onClose={handleClose}
                          severity="success"
                          variant="filled"
                          sx={{ width: '100%' }}
                        >
                          Copied to clipboard!
                        </Alert>
                      </Snackbar>
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



/*
return (
    <div className="Home">
      <div className="home-container">
        <div className="homebox">
          <div className="homeTitle text-2xl font-bold">URL-SHORTENER</div>
          <div className="home-wrapper mt-4">
          <form onSubmit={(e) => { e.preventDefault(); handleShortenUrl(); }} className="relative">
              <div className="inputContainer flex items-center justify-center">
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
              </div>
              <button type="submit" className="shortButton mt-4">
                Shorten URL
              </button>
            </form>
            {error && <div className="error mt-2 text-red-500">{error}</div>}
          </div>
          <div className="url-list max-h-60 mt-8 overflow-y-auto custom-scrollbar">
            <table className="w-full mt-4 text-left text-white">
              <tbody>
                {urls.map((shortenedUrl, index) => (
                  <tr key={index} className="border-b border-gray-700">
                    <td className="p-2 break-all">{shortenedUrl}</td>
                    <td className="p-2">
                      <button
                        className="copyButton"
                        onClick={() => {
                          handleCopy(shortenedUrl);
                          setOpen(true);
                        }}
                      >
                        Copy
                      </button>
                      <button
                        className="deleteButton ml-2"
                        onClick={() => handleDelete(shortenedUrl)}
                      >
                        Delete
                      </button>
                      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
                          Copied to clipboard!
                        </Alert>
                      </Snackbar>
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

*/