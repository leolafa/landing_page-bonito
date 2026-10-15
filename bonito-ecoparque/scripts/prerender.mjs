// Pré-renderização: injeta o HTML do app em dist/index.html depois do build.
// O navegador recebe a página pronta e o React só "hidrata" (assume) o que já está lá.
import { readFileSync, writeFileSync, rmSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const raiz = resolve(import.meta.dirname, '..');
const { render } = await import(pathToFileURL(resolve(raiz, 'dist-ssr/entry-server.js')).href);
const arquivo = resolve(raiz, 'dist/index.html');
let html = readFileSync(arquivo, 'utf8');

html = html.replace('<div id="root"></div>', `<div id="root">${render()}</div>`);

// Pré-carrega a fonte dos títulos e do texto
const fonte = readdirSync(resolve(raiz, 'dist/assets')).find((f) => /^archivo-latin-wdth-normal-.*\.woff2$/.test(f));
if (fonte) html = html.replace('</title>', `</title>\n    <link rel="preload" href="/assets/${fonte}" as="font" type="font/woff2" crossorigin />`);

writeFileSync(arquivo, html);
rmSync(resolve(raiz, 'dist-ssr'), { recursive: true, force: true });
console.log('Pré-renderização concluída:', arquivo);
