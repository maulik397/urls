import React from 'react';
import '../App.css';
function Footer() {
  const githuburl = new URL('../assets/github.png', import.meta.url);
  const linkedinurl = new URL('../assets/Linkedins.png', import.meta.url);
  const instagram = new URL('../assets/INSTA.png', import.meta.url);

  return (
    <div className="Footer h-16 bg-gray-800">
      <ul className="flist">
        <li className="flistItem">
          <a href="https://github.com/maulik397" target="_blank" rel="noopener noreferrer">
            <img src={githuburl} alt="GitHub" className="footer-icon" />
          </a>
        </li>
        <li className="flistItem">
          <a href="https://www.linkedin.com/in/maulik-dalwadi-77174a316/" target="_blank" rel="noopener noreferrer">
            <img src={linkedinurl} alt="LinkedIn" className="footer-icon" />
          </a>
        </li>
        <li className="flistItem">
          <a href="https://www.instagram.com/maulik_397" target="_blank" rel="noopener noreferrer">
            <img src={instagram} alt="Instagram" className="footer-icon" />
          </a>
        </li>
      </ul>
    </div>
  );
}


export default Footer;