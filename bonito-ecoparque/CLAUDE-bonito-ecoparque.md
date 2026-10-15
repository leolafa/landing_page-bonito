# Bonito Ecoparque · contexto do projeto

Landing page em React (Vite + Framer Motion + Lenis) para o **Bonito Ecoparque**, parque de aventura, pousada e camping em **Bonito, Pernambuco** (agreste, a 132 km de Recife). Não confundir com Bonito/MS.

Objetivo: converter visitantes em reservas pelo WhatsApp e ser bem interpretado pelas buscas com IA do Google.

## Como trabalhar com o dono do projeto

- Responder em português do Brasil.
- Evitar o travessão longo nos textos.
- Antes de mudar algo grande, mostrar o que vai mudar.
- Nunca inventar dados do parque: o que não estiver confirmado fica entre colchetes, como `[informar]`.

## Decisões já aprovadas (não alterar sem pedir)

- **Seção "O dia no parque"** (`src/components/DiaNoParque.jsx`) foi aprovada. É um roteiro sugerido das 9h30 às 16h, com a tela fixa durante a rolagem, céu mudando de cor, sol em arco e marcadores clicáveis.
- **Montador de cotação** (`src/components/Atividades.jsx`) foi aprovado. A pessoa marca atividades e número de pessoas, o total é animado e o botão abre o WhatsApp com o roteiro pronto na mensagem.
- O resto do design pode evoluir. O pedido mais recente foi deixá-lo **mais fluido e mais rico**, no nível dos grandes sites atuais.

## Comandos

```bash
npm install
npm run dev           # http://localhost:5173
npm run build         # site final em dist/, já com o HTML pré-renderizado (scripts/prerender.mjs)
npm run build:single  # um único index.html em dist-single/ (prévia)
```

## Estrutura

- `index.html`: metatags e dados estruturados JSON-LD:
  - `TouristAttraction` + `LocalBusiness`;
  - `LodgingBusiness` (pousada) e `Campground`;
  - ofertas com preços;
  - horário de funcionamento.
- `src/data.js`: todo o conteúdo editável (contatos, preços, roteiro do dia, atividades, quartos, rota, FAQ).
- `src/App.jsx`: ordem das seções. A sequência é Abertura, Destaques (4 motivos para ir), O parque, Galeria de fotos, O dia no parque, Atividades e preços, Segurança, Hospedagem, Planeje a visita, Avaliações, Dúvidas e Chamada final, seguida do Rodapé e do botão fixo do celular.
- `src/components/Hero.jsx`: abertura de uma tela no padrão dos sites de referência (MXC Digital, AJ Hackett, Zip World). Foto real da Cachoeira da Corrente em tela cheia com zoom de entrada e parallax, degradê escuro atrás do texto, título curto com destaque em amarelo-limão ("Cachoeira e aventura a 132 km de Recife."), uma frase, um botão principal em pílula e um link secundário, e uma linha discreta com horário e legenda da foto. A tela foi enxugada de propósito: cartões, selo e barra de fatos saíram por excesso de informação. O cabeçalho é uma cápsula translúcida escura, e há um botão redondo de WhatsApp no canto (só no computador). Uma cena 3D foi testada e reprovada por parecer pouco profissional.
- `src/components/Paisagem.jsx`: montanhas em camadas gerada por código com semente fixa. Hoje serve de ilustração provisória onde ainda faltam fotos.
- `src/components/Movimento.jsx`:
  - rolagem suave (Lenis) e barra de progresso;
  - `Titulo`, que revela palavra por palavra;
  - `Magnetico` (botão que segue o mouse) e `Contador`.
- `src/components/Secoes.jsx`: as demais seções, mais `Quadro`, o componente de imagem que aceita `src` para foto real.
- `src/styles.css`: as cores e a tipografia (tokens) ficam no topo do arquivo.

## Identidade visual

- **Logo do parque** (foto de perfil do Instagram @bonitoecoparquepe): fundo preto, montanha amarelo-limão `#C9CD3A`, mata verde `#35A45D` e água azul `#2690BC`, com "BONITO" em branco e "ECOPARQUE" em amarelo. A logo foi recriada em SVG em `Icones.jsx`: `Marca` (símbolo) e `Logo` (símbolo, "BONITO" em negrito, "ECOPARQUE" e "Cachoeira da Corrente"). Em fundo claro, "ECOPARQUE" usa o verde musgo, porque o amarelo-limão não tem contraste; em fundo escuro (rodapé) usa o amarelo-limão original.
- **Paleta derivada da logo:**
  - floresta `#1B3A2C` (texto e fundos escuros);
  - musgo `#26784A` (verde da logo escurecido para texto);
  - verde `#35A45D`;
  - névoa `#EEF1EA`;
  - papel `#F8F9F4`;
  - sol `#CDD13C`, o amarelo-limão da logo, usado nos botões de reserva;
  - água `#2690BC`, o azul da logo.
- **Tipografia:** Archivo variável, hospedada no próprio site. É expandida (`font-stretch` de 118% a 125%) nos títulos e normal no texto.
- **O que evitar:**
  - cara de modelo genérico (creme com terracota, cards iguais, gradientes decorativos, emojis);
  - rótulos em caixa alta;
  - separadores com ponto médio;
  - a palavra "serra": o parque não fica numa serra. Falar de mata, cachoeira, lago e agreste.
- **Movimento:** animar só `transform` e `opacity` e respeitar `prefers-reduced-motion`. Já está tratado com `MotionConfig reducedMotion="user"`, e a seção do dia vira lista quando o movimento está reduzido.

## Dados do parque (pesquisa de 13/10/2026)

Fonte principal: site oficial antigo, bonitoecoparque.com.br (`Tarifario.php`, `arvorismo.php`, `tirolesa.php`, `rappel.php`, `estrutura.php`, `cenario.php`, `comoChegar.php`).

**Funcionamento e preços**
- Day use de sexta a domingo e feriados, das 9h30 às 16h. Reserva antecipada pelo WhatsApp. Não é permitido entrar com comida nem bebida.
- Preços por pessoa, fora de feriados, publicados no site como "Valores 2024":

| Item | Preço |
|---|---|
| Day use | R$ 25 |
| Arvorismo | R$ 35 |
| Arvorismo Mirim | R$ 35 |
| Tirolesa | R$ 30 |
| Rapel | R$ 30 |
| Caiaque | R$ 25 |
| Paredão de escalada | R$ 25 |

- **Confirmar os valores de 2026.**

**Atividades**
- Arvorismo: 10 fases, terminando numa tirolesa de 50 m.
- Tirolesa: versão seca ou molhada (cai no lago).

**Hospedagem**
- Pousada, com café e jantar inclusos:
  - casal R$ 350;
  - triplo R$ 480;
  - quádruplo R$ 570.
- Check-in às 14h e check-out às 12h. Criança de até 6 anos não paga no quarto dos pais.
- Camping: R$ 60 por pessoa ao dia, sem barraca e sem refeições.

**Localização e contato**
- PE-103, a 18,5 km do centro de Bonito. GPS: -8.576876, -35.699008 (segundo o MaCamp).
- Rota: BR-232 até Bezerros, depois PE-103 via Camocim de São Félix.
- WhatsApp (81) 99881-4090; telefone (81) 99935-3656; e-mail bonitoecoparque@gmail.com.
- Instagram @bonitoecoparquepe e facebook.com/pousadabonitoecoparque.

**Outros dados**
- O parque fica numa antiga área de cana em regeneração, onde já foram plantadas 482 mudas. A Cachoeira da Corrente e as piscinas naturais ficam ali.

**Reputação**
- Tripadvisor: 3,1 com 47 avaliações. As queixas recorrentes são desorganização em feriados, atendimento lento e comida fraca.
- Google: 4,4 com 1.116 avaliações (conferido no perfil em 14/10/2026). Endereço no Google: PE-103, 19, Bonito, PE, 55680-000.

## Regras de SEO e de busca com IA (Google, guia de maio de 2026)

- Não há otimização especial para IA. O que conta é conteúdo original, factual e rastreável, um Google Business Profile completo e Core Web Vitals bons (LCP ≤ 2,5 s, INP < 200 ms, CLS < 0,1).
- Nome, endereço e telefone devem ser **idênticos** no site, no Google Business Profile e nos diretórios.
- **Não** marcar `AggregateRating` nem `Review` do próprio parque. O Google considera autoavaliação e retira a elegibilidade.
- O JSON-LD precisa refletir exatamente o texto visível (preços, horários, endereço).
- O FAQ fica visível na página. O rich result de FAQ foi descontinuado em 2026, mas o conteúdo ajuda.
- llms.txt não é usado pelo Google Search.

## SEO técnico já feito (14/10/2026)

- Pré-renderização no build: `src/entry-server.jsx` + `scripts/prerender.mjs` injetam o HTML da página em `dist/index.html`; `main.jsx` usa `hydrateRoot` quando a raiz já vem preenchida. Nada no render pode usar `window`/`document` fora de `useEffect` ou handlers.
- Todas as respostas do FAQ e o roteiro completo do dia ficam no HTML (o roteiro em lista `sr-only`).
- `index.html`: Open Graph e Twitter completos, preload da foto da abertura por tamanho de tela, favicon, manifest e JSON-LD com imagens, mapa, comodidades e ofertas descritas ("por pessoa, fora de feriados").
- `public/`: `robots.txt`, `sitemap.xml` (com imagens), `manifest.webmanifest`, `favicon.svg` e `apple-touch-icon.png`.
- Ao mudar preço, horário ou endereço: atualizar `data.js`, o JSON-LD do `index.html` e, se for o caso, o `sitemap.xml` (lastmod).

## Pendências (em ordem de prioridade)

1. **Fotos reais.** Estão no Google Drive do cliente: https://drive.google.com/drive/folders/1KHR7hwL8JnXwTS_KB-nkaNUsyI0H9eYl
   - **Feito em 14/10/2026:** fotos em `public/fotos/` usadas em O parque, Galeria, Segurança, capa da Hospedagem (lago) e Chamada final; `og:image` ativado. Não há foto da pousada nem da tirolesa no Drive. A subpasta "Takes" tem vídeos verticais (tirolesa sobre o lago, arvorismo, caiaque); alguns quadros viraram fotos.
   - Avaliações: 5 avaliações reais de 5 estrelas do Google foram copiadas literalmente em 14/10/2026 (via Google Hotéis, mesmo cadastro do Maps). Nota 4,4 com 1.116 avaliações. Atualizar nota e total de tempos em tempos.
   - Escolher as melhores para:
     - a abertura (ou uma faixa de fotos após ela);
     - o mosaico "O parque" (cachoeira);
     - a capa da Hospedagem (pousada);
     - a chamada final;
     - opcionalmente, cada momento do "Dia no parque", sem mudar o funcionamento da seção.
   - Salvar em `public/fotos/` em WebP, de 1600 a 2000 px na largura maior e até cerca de 300 KB cada. Pode usar `sharp` via npm.
   - Usar `<Quadro src="/fotos/arquivo.webp" alt="descrição real" />` e trocar a `Paisagem` nas capas onde fizer sentido.
   - Atualizar `og:image` no `index.html`.
   - Escrever `alt` descritivo e real em todas.
2. **Confirmar com o parque e preencher os colchetes em `src/data.js`:**
   - idade mínima por atividade;
   - altura do rapel;
   - certificações e seguro;
   - política de chuva e cancelamento;
3. Confirmar os preços de 2026 e atualizar `data.js` e o JSON-LD juntos.
4. Incorporar o mapa do perfil oficial na seção "Planeje a visita", se desejado.
5. Publicar (Vercel, Netlify ou a hospedagem do domínio) e verificar o Search Console e o relatório de IA generativa.
