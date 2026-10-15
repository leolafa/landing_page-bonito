import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView, useReducedMotion } from 'framer-motion';
import Paisagem from './Paisagem.jsx';
import { Titulo, Contador, Magnetico, Inclina, Surge, Luz } from './Movimento.jsx';
import { quartos, avaliacoes, avaliacaoGoogle, rota, levar, perguntas, contato, waLink, DAY_USE, MSG_DUVIDA, MSG_HOSPEDAGEM } from '../data.js';
import { IconeMais, IconeZap, IconeSeta, IconePausa, IconePlay, Logo } from './Icones.jsx';

const EASE = [0.16, 1, 0.3, 1];

// Quadro de imagem. Sem "src", mostra a ilustração da paisagem com a etiqueta "Ilustração".
// Com "src" (ex.: /fotos/pousada.webp), mostra a foto real.
export function Quadro({ src, alt, legenda, semente = 5, paleta = 'manha', proporcao, cachoeira = false, className = '' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  return (
    <figure ref={ref} className={`quadro ${className}`} style={proporcao ? { aspectRatio: proporcao } : undefined}>
      <motion.div className="quadro-in" style={{ y }}>
        {src ? (
          <img src={src} alt={alt} loading="lazy" />
        ) : (
          <Paisagem semente={semente} paleta={paleta} cachoeira={cachoeira} enquadramento="xMidYMax slice" sol={{ x: 1000, y: 380 }} />
        )}
      </motion.div>
      {!src && <figcaption className="etiqueta">Ilustração</figcaption>}
      {src && legenda && <figcaption className="etiqueta">{legenda}</figcaption>}
    </figure>
  );
}

// Borda ondulada entre um bloco escuro e o fundo claro, no desenho das ondas da logo.
// Duas camadas que deslizam devagar em sentidos opostos dão a sensação de água correndo.
export function Onda({ lado = 'topo' }) {
  const d = 'M0 0 H2880 V34 C2640 74 2400 6 2160 34 C1920 62 1680 8 1440 34 C1200 74 960 6 720 34 C480 62 240 8 0 34 Z';
  return (
    <div className={`onda onda-${lado}`} aria-hidden="true">
      <svg className="onda-a" viewBox="0 0 2880 80" preserveAspectRatio="none"><path d={d} /></svg>
      <svg className="onda-b" viewBox="0 0 2880 80" preserveAspectRatio="none"><path d={d} /></svg>
    </div>
  );
}

// Destaques logo depois da abertura: os quatro motivos para escolher o parque, em uma linha
const destaques = [
  { t: 'Cachoeira dentro do parque', d: 'Banho na Cachoeira da Corrente e piscinas naturais' },
  { t: 'Instrutor em cada atividade', d: 'Arvorismo, tirolesa, rapel, caiaque e escalada' },
  { t: `Day use por R$ ${DAY_USE}`, d: 'Atividades cobradas à parte, sem pacote obrigatório' },
  { t: 'Pousada e camping no local', d: 'Para quem quer ficar mais de um dia' },
];

export function Destaques() {
  return (
    <section className="destaques" aria-label="Por que visitar">
      <ul className="container destaques-lista">
        {destaques.map((x, i) => (
          <motion.li
            key={x.t}
            initial={{ opacity: 0, y: 30, rotateX: 40 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 0.9, ease: EASE, delay: i * 0.09 }}
            style={{ transformPerspective: 800, transformOrigin: '50% 0%' }}
          >
            <span className="destaque-n">{String(i + 1).padStart(2, '0')}</span>
            <strong>{x.t}</strong>
            <span>{x.d}</span>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

// O parque: texto curto, três dados confirmados e a cachoeira em foto
export function Sobre() {
  const entrar = (d = 0) => ({
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '0px 0px -10% 0px' },
    transition: { duration: 0.9, ease: EASE, delay: d },
  });

  return (
    <section className="secao sobre" aria-labelledby="sobre-tit">
      <div className="container sobre-grade">
        <motion.div className="sobre-texto" {...entrar(0)}>
          <p className="rotulo">O parque</p>
          <Titulo id="sobre-tit" className="titulo-l" texto="A Cachoeira da Corrente fica dentro do parque." />
          <p className="lead">
            Dá para passar o dia entre o banho de cachoeira, as piscinas naturais, o lago e as atividades de aventura.
            A área já foi canavial e hoje é Mata Atlântica em regeneração, no agreste de Pernambuco.
          </p>
          <dl className="sobre-fatos">
            <div><dt><Contador valor={482} /></dt><dd>mudas nativas já plantadas</dd></div>
            <div><dt><Contador valor={132} sufixo=" km" /></dt><dd>de Recife, pela BR-232 e PE-103</dd></div>
            <div><dt><Contador valor={6} /></dt><dd>atividades com instrutor</dd></div>
          </dl>
        </motion.div>
        <motion.div className="sobre-foto" {...entrar(0.1)}>
          <Inclina className="sobre-inclina" max={5}>
          <Quadro
            src="/fotos/cachoeira-vertical.webp"
            alt="Cachoeira da Corrente descendo entre pedras escuras e mata fechada, formando um poço de água"
            legenda="Cachoeira da Corrente"
            className="quadro-cheio"
          />
          </Inclina>
          <motion.figure
            className="sobre-foto-2"
            initial={{ opacity: 0, y: 30, rotate: -4 }}
            whileInView={{ opacity: 1, y: 0, rotate: -3 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 1, ease: EASE, delay: 0.35 }}
          >
            <img src="/fotos/piscina.webp" alt="Piscina do parque cercada de gramado, mesas e plantas" loading="lazy" />
            <figcaption>Piscina para adultos e crianças</figcaption>
          </motion.figure>
        </motion.div>
      </div>
    </section>
  );
}

// Fotos reais do parque. A faixa anda na horizontal conforme a pessoa rola a página.
const fotosGaleria = [
  { src: '/fotos/rapel.webp', alt: 'Pessoa descendo de rapel pela pedra ao lado de uma queda d\'água', leg: 'Rapel junto à cachoeira', foco: '40% 55%' },
  { src: '/fotos/banho-cachoeira.webp', alt: 'Visitantes sentados nas pedras no meio da correnteza da cachoeira', leg: 'Banho de cachoeira', foco: '50% 50%' },
  { src: '/fotos/arvorismo.webp', alt: 'Pessoa de capacete atravessando uma ponte de madeira presa entre árvores', leg: 'Arvorismo', foco: '50% 30%' },
  { src: '/fotos/piscina.webp', alt: 'Piscina cercada de mesas, gramado e plantas de folhas vermelhas', leg: 'Piscina e área de mesas', foco: '50% 60%' },
  { src: '/fotos/caiaque.webp', alt: 'Dois caiaques amarelos no lago, com a mata ao fundo', leg: 'Caiaque no lago', foco: '50% 52%' },
  { src: '/fotos/pavao-leque.webp', alt: 'Pavão com a cauda aberta em leque sobre um caminho de pedras', leg: 'Pavões pelo gramado', foco: '50% 45%' },
  { src: '/fotos/lago.webp', alt: 'Lago de águas calmas cercado de mata e coqueiros', leg: 'O lago', foco: '50% 50%' },
];

const INTERVALO = 2800;

// Carrossel: passa sozinho, para quando a pessoa passa o mouse, toca, foca ou pausa,
// e não anda fora da tela nem para quem pede menos movimento.
export function Galeria() {
  const secao = useRef(null);
  const trilho = useRef(null);
  const reduzir = useReducedMotion();
  const [atual, setAtual] = useState(0);
  const [pausado, setPausado] = useState(false);
  const [emUso, setEmUso] = useState(false);
  const escolhida = useRef(null); // foto pedida por botão ou ponto (no fim do trilho várias ficam alinhadas)
  const naTela = useInView(secao, { margin: '-20% 0px -20% 0px' });
  const total = fotosGaleria.length;
  const rodando = !reduzir && !pausado && !emUso && naTela;

  const irPara = (i) => {
    const el = trilho.current;
    if (!el) return;
    const n = ((i % total) + total) % total;
    escolhida.current = n;
    const inicio = parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0;
    const max = el.scrollWidth - el.clientWidth;
    el.scrollTo({ left: Math.min(max, el.children[n].offsetLeft - inicio), behavior: reduzir ? 'auto' : 'smooth' });
  };

  // No fim do trilho as últimas fotos já estão visíveis: avançar volta ao começo
  const avancar = () => {
    const el = trilho.current;
    if (el && el.scrollLeft >= el.scrollWidth - el.clientWidth - 4) irPara(0);
    else irPara(atual + 1);
  };
  const voltar = () => {
    const el = trilho.current;
    if (el && el.scrollLeft <= 4) irPara(total - 1);
    else irPara(atual - 1);
  };

  // A foto atual é a mais próxima da borda esquerda do trilho
  useEffect(() => {
    const el = trilho.current;
    if (!el) return;
    const aoRolar = () => {
      const inicio = parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0;
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 4) { setAtual(escolhida.current ?? total - 1); return; }
      let melhor = 0;
      [...el.children].forEach((c, i) => {
        if (Math.abs(c.offsetLeft - inicio - el.scrollLeft) < Math.abs(el.children[melhor].offsetLeft - inicio - el.scrollLeft)) melhor = i;
      });
      setAtual(melhor);
    };
    el.addEventListener('scroll', aoRolar, { passive: true });
    return () => el.removeEventListener('scroll', aoRolar);
  }, [total]);

  useEffect(() => {
    if (!rodando) return;
    const id = setTimeout(avancar, INTERVALO);
    return () => clearTimeout(id);
  });

  return (
    <section ref={secao} className="galeria bloco-escuro" aria-labelledby="gal-tit" aria-roledescription="carrossel">
      <Onda lado="topo" />
      <div className="container galeria-cab">
        <div>
          <p className="rotulo">O parque em fotos</p>
          <Titulo id="gal-tit" className="titulo-m" texto="Veja como é o parque." />
        </div>
        <div className="galeria-ctrl">
          {!reduzir && (
            <button type="button" className="galeria-btn" onClick={() => setPausado(!pausado)} aria-label={pausado ? 'Retomar a passagem automática' : 'Pausar a passagem automática'}>
              {pausado ? <IconePlay /> : <IconePausa />}
            </button>
          )}
          <button type="button" className="galeria-btn" onClick={voltar} aria-label="Foto anterior"><span className="seta-esq"><IconeSeta /></span></button>
          <button type="button" className="galeria-btn" onClick={avancar} aria-label="Próxima foto"><IconeSeta /></button>
        </div>
      </div>
      <ul
        ref={trilho}
        className="galeria-trilho"
        onMouseEnter={() => setEmUso(true)}
        onWheel={() => { escolhida.current = null; }}
        onMouseLeave={() => setEmUso(false)}
        onTouchStart={() => { setEmUso(true); escolhida.current = null; }}
        onTouchEnd={() => setTimeout(() => setEmUso(false), INTERVALO)}
        onFocus={() => setEmUso(true)}
        onBlur={() => setEmUso(false)}
      >
        {fotosGaleria.map((f, i) => (
          <li key={f.src} className="galeria-item" aria-roledescription="slide" aria-label={`${i + 1} de ${total}: ${f.leg}`}>
            <Inclina className="galeria-foto" max={7}>
              <img src={f.src} alt={f.alt} loading="lazy" draggable="false" style={{ objectPosition: f.foco }} />
            </Inclina>
            <span>{f.leg}</span>
          </li>
        ))}
      </ul>
      <div className="container galeria-pontos" role="group" aria-label="Escolher foto">
        {fotosGaleria.map((f, i) => (
          <button
            type="button"
            key={f.src}
            className={`galeria-ponto${i === atual ? ' ativo' : ''}`}
            aria-label={`Ver foto ${i + 1}: ${f.leg}`}
            aria-current={i === atual}
            onClick={() => irPara(i)}
          >
            <span style={i === atual && rodando ? { animationDuration: `${INTERVALO}ms` } : undefined} />
          </button>
        ))}
      </div>
      <Onda lado="base" />
    </section>
  );
}

// Bloco que sobe suavemente ao entrar na tela
function Revela({ children, atraso = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.8, ease: EASE, delay: atraso }}
    >
      {children}
    </motion.div>
  );
}

// Ícones ilustrados de traço, um por atividade (pessoa em ação + cenário)
const icoProps = { viewBox: '0 0 48 48', fill: 'none', stroke: 'currentColor', strokeWidth: 2.2, strokeLinecap: 'round', strokeLinejoin: 'round' };
const IconeAtiv = {
  arvorismo: (
    <svg {...icoProps}>
      <path d="M8 44V21M40 44V21" />
      <path d="M3.5 17.5c-1.5-3 .5-6.5 3.5-6.5.5-3 5-3.5 6.5-.5 3 .5 3.5 5 1 7-1.5 2.5-9.5 3-11 0zM33.5 17.5c-1.5-3 .5-6.5 3.5-6.5.5-3 5-3.5 6.5-.5 3 .5 3.5 5 1 7-1.5 2.5-9.5 3-11 0z" fill="currentColor" fillOpacity=".16" />
      <path d="M8 30c8 4.5 24 4.5 32 0" />
      <path d="M8 24c8 4.5 24 4.5 32 0M14 31.9v-5.6M20 33.1v-5.6M28 33.1v-5.6M34 31.9v-5.6" opacity=".5" />
      <circle cx="24" cy="15" r="2.3" />
      <path d="M24 17.5v6.5M24 19.8l-4 3.2M24 19.8l4 3.2M24 24l-2.5 9.3M24 24l2.5 9.3" />
    </svg>
  ),
  tirolesa: (
    <svg {...icoProps}>
      <path d="M6 42V8M3 42h6M6 14l-3-3M6 14l3-3" />
      <path d="M6 9l38 17" />
      <circle cx="25" cy="17.5" r="1.8" />
      <path d="M25 19.3v4" />
      <circle cx="26.5" cy="26" r="2" />
      <path d="M25 23.3l-2 6 5.5 1 3.5 4M23 29.3l-3 4.5M25.5 24.5l5-2.5" />
      <path d="M14 42c3-2 6-2 9 0s6 2 9 0 6-2 9 0" opacity=".5" />
    </svg>
  ),
  rapel: (
    <svg {...icoProps}>
      <path d="M2 4h9c-1 6 1.5 10 .5 15s-2.5 9-1 14 .5 7-.5 11H2" fill="currentColor" fillOpacity=".16" />
      <path d="M11 6l11.5 19.5" />
      <path d="M22.5 25.5c1 6 3 12 3.5 18.5" opacity=".5" />
      <circle cx="30" cy="16" r="2.4" />
      <path d="M28.6 18.3l-6.1 7.2M22.5 25.5l-10.5-3M22.5 25.5l-10.8 4.5M26.5 20.6l-3.5-1.8" />
      <path d="M36 7v6M41 10v9M36 18v7M41 25v8M36 30v6" opacity=".5" />
    </svg>
  ),
};

// Só entra aqui o que o site oficial confirma (arvorismo.php, tirolesa.php, rappel.php).
// As atividades se revezam sozinhas; o mouse, o toque ou o teclado escolhem uma.
const atividadesSeg = [
  {
    id: 'arvorismo', nome: 'Arvorismo', dado: '10 fases',
    texto: 'Ponte tibetana, trapézio, teia de aranha e mais, entre as árvores. A última fase é uma tirolesa de 50 m.',
    equipamento: 'Cadeira, solteiras, luvas e capacete',
    foto: '/fotos/arvorismo.webp', alt: 'Pessoa de capacete atravessando uma ponte de madeira presa entre árvores, no circuito de arvorismo', foco: '50% 35%',
  },
  {
    id: 'tirolesa', nome: 'Tirolesa', dado: 'Seca ou molhada',
    texto: 'Na seca a chegada é em terra; na molhada, dentro do lago. Não exige técnica nem preparo físico.',
    equipamento: 'Cadeirinha de alpinismo, roldanas e mosquetões',
    foto: '/fotos/lago.webp', alt: 'Lago do parque com os cabos da tirolesa molhada cruzando a água', foco: '60% 50%',
  },
  {
    id: 'rapel', nome: 'Rapel', dado: '4 pontos',
    texto: 'Descidas em cachoeiras e paredões de pedra: Cachoeira da Corrente, Véu de Noiva, Pedra Bela e Pedra do Rodeadouro.',
    equipamento: 'Corda, cadeirinha e instrutor do início ao fim',
    foto: '/fotos/rapel.webp', alt: 'Pessoa descendo de rapel pela pedra ao lado de uma queda d\'água', foco: '40% 55%',
  },
];

const TEMPO_SEG = 6000;

export function Seguranca() {
  const ref = useRef(null);
  const reduzir = useReducedMotion();
  const naTela = useInView(ref, { margin: '-25% 0px -25% 0px' });
  const [ativa, setAtiva] = useState(0);
  const [parado, setParado] = useState(false);
  const atual = atividadesSeg[ativa];
  const rodando = naTela && !parado && !reduzir;

  useEffect(() => {
    if (!rodando) return;
    const id = setTimeout(() => setAtiva((a) => (a + 1) % atividadesSeg.length), TEMPO_SEG);
    return () => clearTimeout(id);
  }, [rodando, ativa]);

  const escolher = (i) => { setAtiva(i); setParado(true); };

  return (
    <section ref={ref} className="seguranca bloco-escuro" aria-labelledby="seg-tit">
      <Onda lado="topo" />
      <div className="container seg-grade">
        <Revela className="seg-foto">
          <Inclina className="seg-moldura" max={4}>
            <AnimatePresence initial={false}>
              <motion.img
                key={atual.foto}
                src={atual.foto}
                alt={atual.alt}
                style={{ objectPosition: atual.foco }}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: EASE }}
              />
            </AnimatePresence>
            <span className="seg-contador" aria-hidden="true">
              <b>{String(ativa + 1).padStart(2, '0')}</b> / {String(atividadesSeg.length).padStart(2, '0')}
            </span>
          </Inclina>
          <AnimatePresence mode="wait">
            <motion.div
              key={atual.id}
              className="seg-ficha"
              initial={{ opacity: 0, y: 16, rotate: -2 }}
              animate={{ opacity: 1, y: 0, rotate: -2 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <span className="seg-ficha-ico" aria-hidden="true">{IconeAtiv[atual.id]}</span>
              <span>
                <small>Equipamento</small>
                {atual.equipamento}
              </span>
            </motion.div>
          </AnimatePresence>
        </Revela>

        <div className="seg-texto">
          <p className="rotulo">Segurança</p>
          <Titulo id="seg-tit" className="titulo-m" texto="Aventura com instrutor e equipamento certo." />
          <Revela atraso={0.1}>
            <p className="seg-lead">A equipe explica cada atividade antes de começar e acompanha até o fim. Escolha uma para ver como é:</p>
          </Revela>
          <ul className="seg-lista" onMouseLeave={() => setParado(false)}>
            {atividadesSeg.map((a, i) => (
              <li key={a.id}>
                <button
                  type="button"
                  className={`seg-item${i === ativa ? ' ativo' : ''}`}
                  aria-pressed={i === ativa}
                  aria-controls={`seg-${a.id}`}
                  onMouseEnter={() => escolher(i)}
                  onFocus={() => escolher(i)}
                  onClick={() => escolher(i)}
                >
                  <span className="seg-ico" aria-hidden="true">{IconeAtiv[a.id]}</span>
                  <span className="seg-nome">{a.nome}</span>
                  <span className="seg-dado">{a.dado}</span>
                  {i === ativa && rodando && (
                    <span className="seg-tempo" aria-hidden="true" style={{ animationDuration: `${TEMPO_SEG}ms` }} />
                  )}
                </button>
                <motion.div
                  id={`seg-${a.id}`}
                  className="seg-desc"
                  initial={false}
                  animate={i === ativa ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                  transition={{ height: { duration: 0.5, ease: EASE }, opacity: { duration: 0.35 } }}
                  style={{ overflow: 'hidden' }}
                >
                  <p>{a.texto}</p>
                </motion.div>
              </li>
            ))}
          </ul>
          <Revela className="seg-nota">
            <p>Idade mínima, peso máximo e restrições por atividade: [informar].</p>
            <a className="link-seta" href={waLink(MSG_DUVIDA)}>Tirar dúvidas no WhatsApp <IconeSeta /></a>
          </Revela>
        </div>
      </div>
      <Onda lado="base" />
    </section>
  );
}

// A imagem começa recuada e com cantos arredondados e se abre até a largura total conforme a rolagem
export function Hospedagem() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.15'] });
  const recuo = useTransform(scrollYProgress, [0, 1], [10, 0]);
  const raio = useTransform(scrollYProgress, [0, 1], [32, 0]);
  const clip = useTransform([recuo, raio], ([r, k]) => `inset(0% ${r}% 0% ${r}% round ${k}px)`);
  const escala = useTransform(scrollYProgress, [0, 1], [1.18, 1]);

  return (
    <section id="hospedagem" className="hosp" aria-labelledby="hosp-tit">
      <div ref={ref} className="hosp-capa-wrap">
        <motion.div className="hosp-capa" style={{ clipPath: clip }}>
          <motion.div className="hosp-capa-arte" style={{ scale: escala }}>
            <img src="/fotos/lago.webp" alt="Lago do Bonito Ecoparque cercado de Mata Atlântica, com coqueiro na margem" loading="lazy" />
          </motion.div>
          <div className="hosp-capa-texto container">
            <p className="rotulo rotulo-claro">Hospedagem</p>
            <Titulo id="hosp-tit" className="titulo-xl" texto="Pousada e camping dentro do parque." />
          </div>
          <span className="etiqueta">O lago do parque</span>
        </motion.div>
      </div>

      <div className="container secao-baixo">
        <div className="hosp-opcoes">
          <Surge>
          <Luz as="article" className="opcao">
            <div className="opcao-topo">
              <h3 className="titulo-s">Pousada</h3>
              <span className="opcao-selo">Café e jantar inclusos</span>
            </div>
            <p className="opcao-desc">Quartos com ar-condicionado, TV, frigobar, chuveiro elétrico e varanda.</p>
            <table className="precos">
              <caption className="sr-only">Diárias da pousada</caption>
              <tbody>
                {quartos.map((q) => (
                  <tr key={q.tipo}><th scope="row">Quarto {q.tipo.toLowerCase()}</th><td>R$ {q.preco}<small>/diária</small></td></tr>
                ))}
              </tbody>
            </table>
            <p className="opcao-nota">Check-in a partir das 14h e check-out às 12h. Criança de até 6 anos não paga no quarto dos pais, se informada na reserva.</p>
            <a className="btn btn-escuro opcao-btn" href={waLink(MSG_HOSPEDAGEM.replace('Pousada ou camping:', 'Pousada ou camping: pousada'))}>
              <IconeZap /> Consultar datas na pousada
            </a>
          </Luz>
          </Surge>
          <Surge atraso={0.1}>
          <Luz as="article" className="opcao">
            <div className="opcao-topo">
              <h3 className="titulo-s">Camping</h3>
              <span className="opcao-selo">Às margens do Rio Verdinho</span>
            </div>
            <p className="opcao-desc">Área para barracas com banheiros, duchas e vestiário. Não inclui barraca nem refeições. Somente com reserva.</p>
            <table className="precos">
              <caption className="sr-only">Diária do camping</caption>
              <tbody><tr><th scope="row">Por pessoa</th><td>R$ 60<small>/dia</small></td></tr></tbody>
            </table>
            <a className="btn btn-escuro opcao-btn" href={waLink(MSG_HOSPEDAGEM.replace('Pousada ou camping:', 'Pousada ou camping: camping'))}>
              <IconeZap /> Consultar datas no camping
            </a>
          </Luz>
          </Surge>
        </div>
      </div>
    </section>
  );
}

export function Planeje() {
  const blocos = [
    {
      tit: 'Funcionamento',
      ico: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>,
      corpo: (
        <dl className="pares">
          <div><dt>Day use</dt><dd>Sexta a domingo e feriados</dd></div>
          <div><dt>Horário</dt><dd>9h30 às 16h</dd></div>
          <div><dt>Pousada e camping</dt><dd>Com reserva</dd></div>
          <div><dt>Reserva</dt><dd>Antecipada, pelo WhatsApp</dd></div>
        </dl>
      ),
    },
    {
      tit: 'Como chegar de Recife',
      ico: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" /><circle cx="12" cy="10" r="2.3" /></svg>,
      corpo: (
        <>
          <ol className="passos">
            {rota.map((p, i) => (<li key={i}><span className="n">{i + 1}</span><span>{p}</span></li>))}
          </ol>
          <a className="link-seta" href={contato.rotaMaps}>Abrir a rota no Google Maps <IconeSeta /></a>
        </>
      ),
    },
    { tit: 'O que levar',
      ico: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 8V6.5A2.5 2.5 0 0 1 9.5 4h5A2.5 2.5 0 0 1 17 6.5V8" /><rect x="4" y="8" width="16" height="12" rx="3" /><path d="M4 13h16" /></svg>, corpo: <ul className="marcadores">{levar.map((l) => <li key={l}>{l}</li>)}</ul> },
    {
      tit: 'Bom saber',
      ico: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="8.5" /><path d="M12 11v5M12 8h.01" /></svg>,
      corpo: (
        <ul className="marcadores">
          <li>Não é permitido entrar com alimentos nem bebidas. O restaurante funciona o dia todo.</li>
          <li>Em feriados os valores podem mudar. Peça a cotação.</li>
          <li>Sem carro? Agências de Recife e Olinda fazem passeios de um dia com transporte incluído.</li>
        </ul>
      ),
    },
  ];
  return (
    <section id="planeje" className="secao planeje" aria-labelledby="plan-tit">
      <div className="container">
        <header className="cab-secao">
          <p className="rotulo">Planeje a visita</p>
          <Titulo id="plan-tit" className="titulo-l" texto="Rota, horários e o que levar." />
        </header>
        <div className="planeje-mapa">
          <iframe
            title="Mapa com a localização do Bonito Ecoparque, em Bonito, Pernambuco"
            src="https://maps.google.com/maps?q=-8.576876,-35.699008&z=12&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="painel">
          {blocos.map((b, i) => (
            <Surge key={b.tit} atraso={(i % 2) * 0.1}>
              <Luz className="bloco">
                <h3 className="bloco-tit"><span className="bloco-ico" aria-hidden="true">{b.ico}</span>{b.tit}</h3>
                {b.corpo}
              </Luz>
            </Surge>
          ))}
        </div>
      </div>
    </section>
  );
}

const Estrelas = ({ tamanho = 16 }) => (
  <span className="estrelas" aria-hidden="true">
    {[0, 1, 2, 3, 4].map((i) => (
      <svg key={i} width={tamanho} height={tamanho} viewBox="0 0 20 20"><path fill="currentColor" d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L10 14.8l-5.2 2.8 1-5.8L1.5 7.7l5.9-.8z" /></svg>
    ))}
  </span>
);

// Depoimentos reais do Google. A seção só aparece quando a nota estiver preenchida em data.js.
export function Avaliacoes() {
  if (String(avaliacaoGoogle.nota).startsWith('[')) return null;
  return (
    <section className="secao aval bloco-escuro" aria-labelledby="aval-tit">
      <Onda lado="topo" />
      <div className="container">
        <div className="aval-topo">
          <div>
            <p className="rotulo">Quem foi, recomenda</p>
            <Titulo id="aval-tit" className="titulo-m" texto="O que dizem os visitantes." />
          </div>
          <a className="aval-nota" href={contato.perfilGoogle} target="_blank" rel="noopener">
            <span className="aval-num">{avaliacaoGoogle.nota}</span>
            <span className="aval-info">
              <Estrelas tamanho={18} />
              <span>{avaliacaoGoogle.total} avaliações no Google</span>
            </span>
            <IconeSeta />
          </a>
        </div>
        <div className="aval-grade">
          {avaliacoes.map((a, i) => (
            <Surge key={a.autor} atraso={i * 0.08}>
              <Luz as="figure" className="depo">
                <Estrelas />
                <blockquote>
                  <p>{a.texto.split('\n').join(' ')}</p>
                </blockquote>
                <figcaption>
                  <span className="depo-avatar" aria-hidden="true">{a.autor[0]}</span>
                  <span><b>{a.autor}</b>Avaliação no Google, {a.ano}</span>
                </figcaption>
              </Luz>
            </Surge>
          ))}
        </div>
      </div>
      <Onda lado="base" />
    </section>
  );
}

function ItemFaq({ p, r, aberto, aoClicar, id }) {
  return (
    <div className={`faq-item${aberto ? ' aberto' : ''}`}>
      <h3>
        <button className="faq-botao" aria-expanded={aberto} aria-controls={id} onClick={aoClicar}>
          <span>{p}</span>
          <span className="faq-icone"><IconeMais aberto={aberto} /></span>
        </button>
      </h3>
      {/* A resposta fica sempre no HTML (o Google lê); só a altura anima */}
      <motion.div
        id={id}
        className="faq-resposta"
        initial={false}
        animate={aberto ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ height: { duration: 0.45, ease: EASE }, opacity: { duration: 0.3 } }}
        style={{ overflow: 'hidden' }}
        aria-hidden={!aberto}
      >
        <p>{r}</p>
      </motion.div>
    </div>
  );
}

export function Faq() {
  const [aberto, setAberto] = useState(0);
  return (
    <section id="duvidas" className="secao faq" aria-labelledby="faq-tit">
      <div className="container faq-grade">
        <div className="faq-lado">
          <p className="rotulo">Dúvidas</p>
          <Titulo id="faq-tit" className="titulo-l" texto="Antes de reservar" />
          <p className="lead">As perguntas que mais chegam pelo WhatsApp, respondidas aqui.</p>
          <div className="faq-contato">
            <p><strong>Ficou alguma dúvida?</strong> A equipe responde pelo WhatsApp {contato.whatsappExibicao}.</p>
            <a className="btn btn-escuro btn-p" href={waLink(MSG_DUVIDA)}><IconeZap /> Perguntar no WhatsApp</a>
          </div>
        </div>
        <div className="faq-lista">
          {perguntas.map((q, i) => (
            <ItemFaq key={q.p} id={`faq-${i}`} {...q} aberto={aberto === i} aoClicar={() => setAberto(aberto === i ? -1 : i)} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaFinal() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const yFoto = useTransform(scrollYProgress, [0, 1], ['-10%', '0%']);
  return (
    <section ref={ref} className="cta-final" aria-labelledby="cta-tit">
      <motion.div className="cta-arte" style={{ y: yFoto }}>
        <img src="/fotos/cachoeira-corrente.webp" alt="" loading="lazy" />
      </motion.div>
      <div className="container cta-in">
        <p className="cta-aviso"><span className="hero-ponto" /> Capacidade diária limitada</p>
        <Titulo id="cta-tit" className="titulo-xl" texto="Garanta seu dia na Cachoeira da Corrente." />
        <p>Mande a data e quantas pessoas vão. A equipe responde pelo WhatsApp com a disponibilidade e o valor total.</p>
        <div className="cta-acoes">
          <Magnetico>
            <a className="btn btn-sol btn-g" href={waLink()}><IconeZap /> Reservar pelo WhatsApp</a>
          </Magnetico>
          <a className="hero-link" href={contato.rotaMaps}>Ver como chegar <IconeSeta /></a>
        </div>
      </div>
    </section>
  );
}

export function Rodape() {
  return (
    <footer className="rodape">
      <div className="container rodape-in">
        <div className="rodape-col rodape-sobre">
          <div className="marca"><Logo /></div>
          <p className="rodape-desc">Parque de aventura, pousada e camping em Bonito, Pernambuco, a 132 km de Recife.</p>
          <a className="btn btn-sol btn-p" href={waLink()}><IconeZap /> Reservar</a>
        </div>
        <nav className="rodape-col" aria-label="Rodapé">
          <p className="rodape-tit">Navegue</p>
          <a href="#dia">O dia no parque</a>
          <a href="#atividades">Atividades e preços</a>
          <a href="#hospedagem">Hospedagem</a>
          <a href="#planeje">Como chegar</a>
          <a href="#duvidas">Dúvidas</a>
        </nav>
        <div className="rodape-col">
          <p className="rodape-tit">Funcionamento</p>
          <p>Day use de sexta a domingo e feriados</p>
          <p>Das 9h30 às 16h</p>
          <p>Pousada e camping com reserva</p>
        </div>
        <address className="rodape-col">
          <p className="rodape-tit">Contato</p>
          <span>{contato.endereco}</span>
          <span>WhatsApp <a href={waLink()}>{contato.whatsappExibicao}</a></span>
          <span>Telefone <a href={`tel:+55${contato.telefone.replace(/\D/g, '')}`}>{contato.telefone}</a></span>
          <a href={`mailto:${contato.email}`}>{contato.email}</a>
          <span className="rodape-redes"><a href={contato.instagram}>Instagram</a><a href={contato.facebook}>Facebook</a></span>
        </address>
      </div>
      <motion.div
        className="rodape-marca"
        aria-hidden="true"
        initial={{ y: '40%', opacity: 0 }}
        whileInView={{ y: '0%', opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: EASE }}
      >
        Bonito Ecoparque
      </motion.div>
    </footer>
  );
}

// Botão redondo do WhatsApp no canto, só no computador (no celular há a barra fixa)
export function ZapFlutuante() {
  // Só aparece depois da abertura, para não competir com o botão principal
  const [visivel, setVisivel] = useState(false);
  useEffect(() => {
    const aoRolar = () => setVisivel(window.scrollY > window.innerHeight * 0.8);
    aoRolar();
    window.addEventListener('scroll', aoRolar, { passive: true });
    return () => window.removeEventListener('scroll', aoRolar);
  }, []);
  return (
    <a className={`zap-flutuante${visivel ? ' visivel' : ''}`} href={waLink()} aria-label="Reservar pelo WhatsApp" tabIndex={visivel ? 0 : -1}>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2s.2-1.1.2-1.2-.2-.2-.4-.3z" />
      </svg>
    </a>
  );
}

// Botão fixo no celular. Some no topo, no dia no parque, nas atividades e no fim da página.
export function CtaFixo() {
  const [visivel, setVisivel] = useState(false);
  useEffect(() => {
    const aoRolar = () => {
      const vh = window.innerHeight;
      const dentro = (id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return r.top < vh && r.bottom > 0;
      };
      const fim = window.scrollY + vh > document.body.scrollHeight - 500;
      setVisivel(window.scrollY > vh * 1.6 && !dentro('atividades') && !dentro('dia') && !fim);
    };
    aoRolar();
    window.addEventListener('scroll', aoRolar, { passive: true });
    return () => window.removeEventListener('scroll', aoRolar);
  }, []);
  return (
    <AnimatePresence>
      {visivel && (
        <motion.a
          className="btn btn-sol cta-fixo"
          href={waLink()}
          initial={{ y: 90 }}
          animate={{ y: 0 }}
          exit={{ y: 90 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <IconeZap /> Reservar pelo WhatsApp
        </motion.a>
      )}
    </AnimatePresence>
  );
}
