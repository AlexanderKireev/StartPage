import "./style.css";
import ReactDOM from 'react-dom/client';
import React from 'react';

import App from './components/App.jsx';

const mountNode = document.getElementById('container');
const root = ReactDOM.createRoot(mountNode);
root.render(<App />);
