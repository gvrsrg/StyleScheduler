import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
//import dotenv from 'dotenv';
//console.log(dotenv);


//dotenv.config();
//console.log('main2');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
