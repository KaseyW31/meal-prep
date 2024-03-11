import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App ingredients={[
        {name: "soba noodles", qty: 12, unit: "oz"},
        {name: "bok choy", qty: 2, unit: "lb"},
        {name: "chicken breast", qty: 6, unit: "oz"},
        {name: "miso paste", qty: 64, unit: "tbsp"},
        {name: "oats", qty: 16, unit: "cup"},
        {name: "milk", qty: 16, unit: "cup"},
        {name: "banana", qty: 7, unit: null}
      ]}/>
    </BrowserRouter>
  </React.StrictMode>,
);
