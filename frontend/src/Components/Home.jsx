import React, { useState,useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


function Home({ user }) {
  const [originalUrl, setUrl] = useState('');
  const [urls, setUrls] = useState(() => {
    // Load URLs from local storage when initializing state
    const storedUrls = localStorage.getItem('shortenedUrls');
    return storedUrls ? JSON.parse(storedUrls) : [];
  });
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [isUrlShortened, setIsUrlShortened] = useState(false);
  const [dburl, setDBURL] = useState('');
  const [open, setOpen] = useState(false);

  // Load URLs from local storage when component mounts initially
  useEffect(() => {
    const storedUrls = localStorage.getItem('shortenedUrls');
    if (storedUrls) {
      setUrls(JSON.parse(storedUrls));
    }
  }, []);

  // Load user URLs from backend
  useEffect(() => {
    if (user && user._id) {
      const fetchUrls = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/user?userId=${user._id}`);
          const fetchedUrls = response.data;
          const formattedUrls = fetchedUrls.map(url => `http://localhost:5000/short/${url.shortUrl}`);
          setUrls((prevUrls) => [...prevUrls, ...formattedUrls]);
          setError('');
          setIsUrlShortened(true);
        } catch (error) {
          setError('Error fetching short URL');
        }
      };
      fetchUrls();
    } else {
      setUrls([]);
    }
  }, [user]);

  // Update local storage whenever URLs state changes
  useEffect(() => {
    localStorage.setItem('shortenedUrls', JSON.stringify(urls));
  }, [urls]);

  const handleShortenUrl = async () => {
    try {
      let postData = { originalUrl };

      if (user && user._id) {
        postData.userId = user._id;
      }

      const response = await axios.post('http://localhost:5000/short', postData);
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
    setOpen(true); // Show the snackbar
  };

  const handleDelete = async(shortenedUrl) => {
   
    try
    {
     
      let id =  shortenedUrl.substring(shortenedUrl.lastIndexOf('/')+1);
   
      const response = await axios.delete(`http://localhost:5000/short/${id}`);

      setUrls(prevUrls => prevUrls.filter(url => url !== shortenedUrl));
      
      console.log('Short URL deleted successfully:', response.data.message);
    }
    catch(error)
    {
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
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleCopy(shortenedUrl)}
                      >
                        Copy
                      </Button>
                      <IconButton
                        aria-label="delete"
                        color="primary"
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
