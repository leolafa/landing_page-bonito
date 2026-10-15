# Bonito Ecoparque · Landing page em React

Landing page do Bonito Ecoparque (Bonito/PE) feita com React, Vite e Framer Motion.

## Como rodar

```bash
npm install
npm run dev      # servidor local em http://localhost:5173
npm run build    # gera o site final em dist/, com o HTML pré-renderizado para o Google (suba essa pasta na hospedagem)
```

`npm run build:single` gera um único `index.html` em `dist-single/`, útil para enviar uma prévia.

## Onde editar

- **Textos, preços, contatos e FAQ:** `src/data.js`. Tudo que está entre colchetes, como `[informar]`, precisa ser confirmado com o parque antes de publicar.
- **Dados estruturados (schema.org) e metatags:** `index.html`. Mantenha preços, horários e endereço idênticos ao texto da página e ao Google Business Profile. Não adicione `AggregateRating` do próprio parque, porque o Google não aceita autoavaliação.
- **Fotos:**
  1. Coloque os arquivos em `public/fotos/`.
  2. Passe o caminho no componente `Quadro`, por exemplo `<Quadro src="/fotos/cachoeira.webp" alt="Cachoeira da Corrente" />`, em `src/components/Secoes.jsx`.
  3. Prefira WebP ou AVIF com até 300 KB.
- **Cores e tipografia:** variáveis no topo de `src/styles.css`.

## Estrutura

A ordem da página acompanha a decisão de quem planeja uma visita:

1. **Abertura** (`Hero.jsx`): as montanhas em camadas, com névoa, cachoeira e tirolesa. A barra inferior traz o essencial: dias, horário, preço do day use, distância e botão de reserva.
2. **O parque** (`Secoes.jsx`, `Sobre`): a história da regeneração da mata e três números.
3. **O dia no parque** (`DiaNoParque.jsx`): a tela fica fixa enquanto a pessoa rola e o dia avança das 9h30 às 16h.
   - O céu muda de cor e o sol percorre o arco.
   - Cada momento mostra o que fazer e quanto custa.
   - Os marcadores da linha do tempo são clicáveis.
   - Com "reduzir movimento" ativo, a seção vira uma lista simples.
4. **Atividades e preços** (`Atividades.jsx`): a pessoa marca as atividades e o número de pessoas e acompanha o total no resumo. O botão de reserva já envia o roteiro pelo WhatsApp.
5. **Segurança, hospedagem, planeje a visita, avaliações, dúvidas e chamada final** (`Secoes.jsx`).

A paisagem (`Paisagem.jsx`) é desenhada por código, com semente fixa. Ela também preenche os quadros de imagem como ilustração provisória, marcada com a etiqueta "Ilustração". Para trocar por uma foto real, passe `src` ao componente `Quadro`, por exemplo `<Quadro src="/fotos/pousada.webp" alt="Quarto da pousada com varanda" />`.

Camada de movimento (`Movimento.jsx`):
- rolagem suave com Lenis;
- barra de progresso no topo;
- títulos que surgem palavra por palavra;
- botões magnéticos;
- contadores;
- a faixa de atividades, que reage à velocidade da rolagem.

A abertura tem duas telas de altura: ao rolar, as camadas das montanhas se aproximam em velocidades diferentes e a névoa conduz à seção seguinte. Na hospedagem, a imagem se abre até a largura total.

A fonte Archivo, nas larguras expandida e normal, fica hospedada no próprio site. As animações respeitam a configuração de "reduzir movimento" do sistema.
