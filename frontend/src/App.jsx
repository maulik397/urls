import { useEffect, useState } from 'react'
import './App.css'

import Footer from './Components/Footer'
import Login from './Components/Login'
import User from './Components/User'
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import axios from 'axios';
import Header from'./Components/Header'
function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get('https://us.maulikdalwadi.tech/auth/login/success', {
          withCredentials: true,
        });
       console.log("response from PP",response);
        if (response.status === 200 && response.data.success) {
          
          setUser(response.data.user);
        } else {
          throw new Error(response.data.message || 'Authentication has failed!');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    getUser();
  }, []);


  
  return (
    <div className="App">
      
      <BrowserRouter>
      <Navbar user={user}/>

      <Routes>
        <Route path='/' element={<Home user={user}/>}></Route>
        <Route path='/header' element={<Header/>}></Route>
        <Route path='/login' element={user ? <Navigate to ='/' />:<Login/>}></Route>
        <Route path="/nav" element={<Navbar/>}></Route>

      </Routes>
    <Footer/>
      </BrowserRouter> 

      </div>
  
  )
}

export default App
