import { renderToString } from 'react-dom/server';
import { MotionConfig } from 'framer-motion';
import App from './App.jsx';

// Usado só no build: gera o HTML da página para que buscadores leiam o conteúdo sem executar JS
export function render() {
  return renderToString(
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  );
}
