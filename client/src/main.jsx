import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
//import dotenv from 'dotenv';
//console.log(dotenv);
import { BrowserRouter } from "react-router-dom";


//dotenv.config();
//console.log('main2');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
