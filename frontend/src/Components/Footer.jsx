import React from 'react';
import '../App.css';

function Footer() {
  return (
    <div className="Footer">
      <ul className="flist">
        <li className="flistItem">
          <a href="https://github.com/maulik397" target="_blank" rel="noopener noreferrer">
            <img src="github-logo.png" alt="GitHub" className="footer-icon" />
          </a>
        </li>
        <li className="flistItem">
          <a href="https://www.linkedin.com/in/maulik-dalwadi-77174a316/" target="_blank" rel="noopener noreferrer">
            <img src="linkedin-logo.png" alt="LinkedIn" className="footer-icon" />
          </a>
        </li>
        <li className="flistItem">
          <a href="https://www.instagram.com/maulik_397" target="_blank" rel="noopener noreferrer">
            <img src="instagram-logo.png" alt="Instagram" className="footer-icon" />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Footer;