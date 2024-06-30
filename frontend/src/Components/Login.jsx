import React from 'react';
import '../App.css';
import googleIcon from '../assets/google.png';
import githubIcon from '../assets/github.png';
import facebookIcon from '../assets/facebook.png';

function Login() {
  function google()
  {
    window.open('http://localhost:5000/auth/google',"_self")
  }
  function github()
  {
    window.open('https://us.maulikdalwadi.tech/auth/github',"_self")
  }
  return (
    <div className="Login flex justify-center items-center h-screen bg-red-900">
      <div className="login-container flex flex-col justify-center items-center rounded-lg border-4 border-black p-6 w-full max-w-md">
        <p className="loginTitle text-center font-sans font-normal text-lg mb-4">Choose Options</p>
        <hr className="w-full border-black mb-4" />
        <div className="wrapper flex flex-col justify-evenly items-center space-y-4">
          <button type="button" className="loginButton bg-black text-white font-bold py-2 px-4 rounded hover:bg-blue-600 flex items-center" onClick={google}>
            <img src={googleIcon} alt="Google" className="w-5 h-5 mr-2" />
            Sign in with Google
          </button>
          <button type="button" className="loginButton bg-black text-white font-bold py-2 px-4 rounded hover:bg-purple-700 flex items-center "onClick={github}>
            <img src={githubIcon} alt="Github" className="w-5 h-5 mr-2" />
            Sign in with Github
          </button>
          
        </div>
      </div>
    </div>
  );
}

export default Login;
