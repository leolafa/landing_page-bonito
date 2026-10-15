import { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import Paisagem from './Paisagem.jsx';
import { roteiro } from '../data.js';

// A seção fica fixa na tela enquanto a pessoa rola: o dia avança das 9h30 às 16h,
// o céu muda de cor, o sol percorre o arco e cada momento traz o que fazer e quanto custa.

const n = roteiro.length;

function Momento({ m }) {
  return (
    <>
      <h3 className="titulo-m">{m.titulo}</h3>
      <p className="dia-texto">{m.texto}</p>
      <dl className="dia-info">
        {m.info.map(([k, v]) => (
          <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
        ))}
      </dl>
    </>
  );
}

function Estatico() {
  return (
    <section id="dia" className="dia-estatico secao">
      <div className="container">
        <p className="rotulo">Sugestão de roteiro para um dia</p>
        <h2 className="titulo-l">O dia no parque</h2>
        <ol className="dia-lista">
          {roteiro.map((m) => (
            <li key={m.hora}>
              <span className="dia-hora-p">{m.hora}</span>
              <div><Momento m={m} /></div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default function DiaNoParque() {
  const reduzir = useReducedMotion();
  const ref = useRef(null);
  const [ativo, setAtivo] = useState(0);
  const [direcao, setDirecao] = useState(1);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const i = Math.min(n - 1, Math.max(0, Math.floor(p * n * 0.999)));
    if (i !== ativo) {
      setDirecao(i > ativo ? 1 : -1);
      setAtivo(i);
    }
  });

  const paradas = roteiro.map((_, i) => i / (n - 1));
  const ceu = useTransform(scrollYProgress, paradas, roteiro.map((m) => m.ceu));
  const ang = useTransform(scrollYProgress, [0, 1], [Math.PI * 0.94, Math.PI * 0.08]);
  const solX = useTransform(ang, (a) => 50 + Math.cos(a) * 42);
  const solY = useTransform(ang, (a) => 78 - Math.sin(a) * 62);
  const solLeft = useTransform(solX, (v) => `${v}%`);
  const solTop = useTransform(solY, (v) => `${v}%`);
  const trilha = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  if (reduzir) return <Estatico />;

  const irPara = (i) => {
    const el = ref.current;
    if (!el) return;
    const topo = el.getBoundingClientRect().top + window.scrollY;
    const curso = el.offsetHeight - window.innerHeight;
    const alvo = topo + curso * ((i + 0.5) / n);
    if (window.__lenis) window.__lenis.scrollTo(alvo, { duration: 1.2 });
    else window.scrollTo({ top: alvo, behavior: 'smooth' });
  };

  const m = roteiro[ativo];

  return (
    <section id="dia" ref={ref} className="dia" style={{ height: `${n * 85 + 15}vh` }} aria-label="O dia no parque">
      {/* Roteiro completo em texto, para leitores de tela e buscadores (a versão visual mostra um momento por vez) */}
      <ol className="sr-only">
        {roteiro.map((m) => <li key={m.hora}>{m.hora}: {m.titulo}. {m.texto}</li>)}
      </ol>
      <motion.div className="dia-palco" style={{ backgroundColor: ceu }}>
        <motion.div className="dia-sol" style={{ left: solLeft, top: solTop }} aria-hidden="true" />
        <Paisagem className="dia-serra" semente={11} semCeu inicio={2} enquadramento="xMidYMax slice" />

        <div className="container dia-grade">
          <div className="dia-esq">
            <h2 className="rotulo">O dia no parque, em sugestão de roteiro</h2>
            <div className="dia-hora" aria-live="polite">
              <AnimatePresence initial={false} custom={direcao}>
                <motion.span
                  key={m.hora}
                  custom={direcao}
                  variants={{
                    entra: (d) => ({ y: d > 0 ? '70%' : '-70%', opacity: 0 }),
                    fica: { y: '0%', opacity: 1 },
                    sai: (d) => ({ y: d > 0 ? '-70%' : '70%', opacity: 0 }),
                  }}
                  initial="entra"
                  animate="fica"
                  exit="sai"
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  {m.hora}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          <div className="dia-dir">
            {/* Os momentos se sobrepõem na mesma célula do grid: a troca é cruzada e nunca trava */}
            <AnimatePresence initial={false} custom={direcao}>
              <motion.div
                key={m.hora}
                className="dia-momento"
                custom={direcao}
                variants={{
                  entra: (d) => ({ opacity: 0, y: d * 32 }),
                  fica: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.08 } },
                  sai: (d) => ({ opacity: 0, y: d * -24, transition: { duration: 0.3, ease: [0.4, 0, 1, 1] } }),
                }}
                initial="entra"
                animate="fica"
                exit="sai"
              >
                <Momento m={m} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="container dia-trilha-wrap">
          <div className="dia-trilha">
            <motion.div className="dia-trilha-fill" style={{ width: trilha }} />
          </div>
          <ol className="dia-marcos">
            {roteiro.map((r, i) => (
              <li key={r.hora}>
                <button
                  type="button"
                  className={`dia-marco${i === ativo ? ' ativo' : ''}${i < ativo ? ' feito' : ''}`}
                  onClick={() => irPara(i)}
                  aria-current={i === ativo ? 'step' : undefined}
                  aria-label={`${r.hora}, ${r.titulo}`}
                >
                  <span className="ponto" />
                  <span className="txt">{r.hora}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </motion.div>
    </section>
  );
}
