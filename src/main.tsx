import { Buffer } from 'buffer';

// Polyfill Buffer and global for browser environment (needed by gray-matter and other Node-centric libs)
if (typeof window !== 'undefined') {
  window.Buffer = Buffer;
  (window as any).global = window;
}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
