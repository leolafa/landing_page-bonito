import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { IconeZap, IconeSeta } from './Icones.jsx';
import { Magnetico } from './Movimento.jsx';
import { waLink, DAY_USE } from '../data.js';

// Abertura no padrão dos sites de turismo de referência: foto real em tela cheia,
// degradê escuro só onde fica o texto, título curto com o destaque na cor da marca,
// um botão principal forte e um secundário com contorno. Movimento discreto.

const EASE = [0.22, 1, 0.36, 1];

// Menos é mais: um título, uma frase, um botão. O resto da informação está nas seções seguintes.
const linhas = [
  [{ t: 'Cachoeira e aventura' }],
  [{ t: 'a 132 km de Recife.', destaque: true }],
];

export default function Hero() {
  const ref = useRef(null);
  const reduzir = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yFoto = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const yTexto = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opTexto = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section id="topo" ref={ref} className="hero">
      <motion.div className="hero-foto" style={reduzir ? undefined : { y: yFoto }}>
        <motion.picture
          initial={reduzir ? false : { scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: EASE }}
        >
          <source media="(max-width: 760px)" srcSet="/fotos/cachoeira-vertical.webp" />
          <img src="/fotos/cachoeira-corrente.webp" alt="Cachoeira da Corrente, dentro do Bonito Ecoparque, em Bonito, PE" fetchpriority="high" />
        </motion.picture>
      </motion.div>
      <div className="hero-sombra" aria-hidden="true" />

      <motion.div className="container hero-conteudo" style={reduzir ? undefined : { y: yTexto, opacity: opTexto }}>
        <div className="hero-texto">
          <h1 className="hero-titulo">
            <motion.span
              className="hero-kicker"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
            >
              Bonito Ecoparque, em Bonito, Pernambuco
            </motion.span>
            {linhas.map((l, i) => (
              <span className="linha" key={i}>
                <motion.span
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, ease: EASE, delay: 0.35 + i * 0.12 }}
                >
                  {l.map((p) => (p.destaque ? <em key={p.t}>{p.t}</em> : p.t))}
                </motion.span>{' '}
              </span>
            ))}
          </h1>
          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.75 }}
          >
            Day use por <b>R$ {DAY_USE}</b> no Bonito Ecoparque, em Bonito, PE.
            Tirolesa, arvorismo e rapel com instrutor.
          </motion.p>
          <motion.div
            className="hero-acoes"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.9 }}
          >
            <Magnetico>
              <a className="btn btn-sol btn-g" href={waLink()}><IconeZap /> Reservar pelo WhatsApp</a>
            </Magnetico>
            <a className="hero-link" href="#atividades">Ver atividades e preços <IconeSeta /></a>
          </motion.div>
        </div>

      </motion.div>

      <motion.div
        className="container hero-rodape"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.3 }}
      >
        <p>Aberto de sexta a domingo e feriados, das 9h30 às 16h</p>
        <p className="hero-legenda">Foto: Cachoeira da Corrente, dentro do parque</p>
      </motion.div>
    </section>
  );
}
