import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import {
  motion, useScroll, useSpring, useInView, animate, useReducedMotion, useMotionValue, useMotionTemplate,
} from 'framer-motion';

// Rolagem suave (Lenis). Desligada para quem pede menos movimento.
export function useRolagemSuave() {
  const reduzir = useReducedMotion();
  useEffect(() => {
    if (reduzir) return;
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true, anchors: { offset: -72 } });
    window.__lenis = lenis;
    let id;
    const loop = (t) => { lenis.raf(t); id = requestAnimationFrame(loop); };
    id = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(id); lenis.destroy(); window.__lenis = null; };
  }, [reduzir]);
}

// Linha fina no topo mostrando o progresso da leitura
export function BarraProgresso() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return <motion.div className="barra-progresso" style={{ scaleX: x }} aria-hidden="true" />;
}

// Título que sobe palavra por palavra por trás de uma máscara quando entra na tela
export function Titulo({ as = 'h2', texto, className = '', id, atraso = 0 }) {
  const Tag = motion[as];
  const palavras = texto.split(' ');
  return (
    <Tag
      id={id}
      className={`titulo-anim ${className}`}
      aria-label={texto}
      initial="oculto"
      whileInView="visivel"
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ staggerChildren: 0.05, delayChildren: atraso }}
    >
      {palavras.map((p, i) => (
        <span key={i} aria-hidden="true">
          <span className="mascara">
            <motion.span
              className="palavra"
              variants={{ oculto: { y: '108%' }, visivel: { y: '0%' } }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              {p}
            </motion.span>
          </span>
          {i < palavras.length - 1 ? ' ' : null}
        </span>
      ))}
    </Tag>
  );
}

// Botão que acompanha levemente o ponteiro (só em telas com mouse)
export function Magnetico({ children, forca = 0.28 }) {
  const ref = useRef(null);
  const x = useSpring(0, { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(0, { stiffness: 220, damping: 18, mass: 0.4 });
  const mover = (e) => {
    if (e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * forca);
    y.set((e.clientY - (r.top + r.height / 2)) * forca);
  };
  const soltar = () => { x.set(0); y.set(0); };
  return (
    <motion.span ref={ref} className="magnetico" style={{ x, y }} onPointerMove={mover} onPointerLeave={soltar}>
      {children}
    </motion.span>
  );
}

// Cartão que inclina em 3D seguindo o mouse, com um brilho de luz que acompanha o cursor.
// "as" escolhe a tag (article, figure...). Só reage a mouse; toque e "reduzir movimento" ficam parados.
export function Inclina({ children, className = '', max = 6, as = 'div', ...resto }) {
  const reduzir = useReducedMotion();
  const ref = useRef(null);
  const mola = { stiffness: 170, damping: 18, mass: 0.5 };
  const rx = useSpring(0, mola);
  const ry = useSpring(0, mola);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const op = useSpring(0, { stiffness: 120, damping: 20 });
  const brilho = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(255, 255, 255, .28), rgba(255, 255, 255, 0) 55%)`;
  const mover = (e) => {
    if (reduzir || e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 2 * max);
    rx.set(-(py - 0.5) * 2 * max);
    gx.set(px * 100);
    gy.set(py * 100);
    op.set(1);
  };
  const soltar = () => { rx.set(0); ry.set(0); op.set(0); };
  const Tag = motion[as];
  return (
    <Tag
      ref={ref}
      className={`inclina ${className}`}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      onPointerMove={mover}
      onPointerLeave={soltar}
      {...resto}
    >
      {children}
      <motion.span className="inclina-brilho" style={{ backgroundImage: brilho, opacity: op }} aria-hidden="true" />
    </Tag>
  );
}

// Cartão parado com uma luz suave que acompanha o mouse por dentro e a borda que acende.
// Nada se mexe: só a luz. Para cartões de texto, onde a inclinação atrapalha a leitura.
export function Luz({ children, className = '', as = 'div', ...resto }) {
  const ref = useRef(null);
  const mover = (e) => {
    if (e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--mx', `${e.clientX - r.left}px`);
    ref.current.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  const Tag = as;
  return (
    <Tag ref={ref} className={`luz ${className}`} onPointerMove={mover} {...resto}>
      {children}
    </Tag>
  );
}

// Entrada em perspectiva: o bloco sobe e "deita" para a posição, como um cartão sendo colocado na mesa
export function Surge({ children, className = '', atraso = 0 }) {
  return (
    <motion.div
      className={`surge ${className}`}
      initial={{ opacity: 0, y: 60, rotateX: 16 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: atraso }}
      style={{ transformPerspective: 1200, transformOrigin: '50% 100%' }}
    >
      {children}
    </motion.div>
  );
}

// Número que conta a partir de zero quando aparece na tela
export function Contador({ valor, casas = 0, sufixo = '' }) {
  const ref = useRef(null);
  const visto = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const [txt, setTxt] = useState(valor.toFixed(casas).replace('.', ','));
  useEffect(() => {
    if (!visto) return;
    const c = animate(0, valor, {
      duration: 1.6, ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setTxt(v.toFixed(casas).replace('.', ',')),
    });
    return c.stop;
  }, [visto, valor, casas]);
  return <span ref={ref} className="contador-num">{txt}{sufixo}</span>;
}
