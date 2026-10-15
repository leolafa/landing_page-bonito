import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { MotionConfig } from 'framer-motion';
import App from './App.jsx';
// Archivo variável com eixo de largura: expandida nos títulos, normal no texto.
// Hospedada no próprio site, sem depender do Google Fonts.
import '@fontsource-variable/archivo/wdth.css';
import './styles.css';

const raiz = document.getElementById('root');
const app = (
  <React.StrictMode>
    {/* "user" respeita a preferência do sistema por menos movimento */}
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </React.StrictMode>
);

// No site publicado o HTML já vem pré-renderizado (npm run build): o React só assume a página.
// No modo de desenvolvimento a raiz vem vazia e a página é montada do zero.
if (raiz.hasChildNodes()) hydrateRoot(raiz, app);
else createRoot(raiz).render(app);
