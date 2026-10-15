import { useMemo } from 'react';
import { motion } from 'framer-motion';

// Paisagem de montanhas em camadas, gerada por ruído com semente fixa (o desenho é sempre o mesmo).
// Usada na abertura e como arte provisória nos espaços de foto.

const W = 1600;
const H = 900;

function gerador(semente) {
  let s = semente;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}

// Ruído 1D suave (value noise com interpolação cosseno)
function ruido(semente, passos) {
  const rnd = gerador(semente);
  const v = Array.from({ length: passos + 2 }, rnd);
  return (t) => {
    const x = t * passos;
    const i = Math.floor(x);
    const f = (1 - Math.cos((x - i) * Math.PI)) / 2;
    return v[i] * (1 - f) + v[i + 1] * f;
  };
}

// Catmull-Rom para curva Bézier: crista orgânica, sem quinas
function caminho(pts) {
  let d = `M${-20} ${H + 20} L${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return `${d} L${W + 20} ${H + 20} Z`;
}

function crista({ semente, base, amp, ondas, copa = 0, passo = 16 }) {
  const n1 = ruido(semente, ondas);
  const n2 = ruido(semente + 7, ondas * 3);
  const rnd = gerador(semente + 99);
  const pts = [];
  const ys = [];
  for (let x = -20; x <= W + 20; x += passo) {
    const t = (x + 20) / (W + 40);
    let y = base - n1(t) * amp - n2(t) * amp * 0.35;
    // Copas da Mata Atlântica: pequenos arcos arredondados na linha da crista
    if (copa) y -= Math.abs(Math.sin(x / (passo * 0.9))) * copa * (0.5 + rnd() * 0.7);
    pts.push([x, y]);
    ys.push(y);
  }
  return { d: caminho(pts), yEm: (x) => ys[Math.max(0, Math.min(ys.length - 1, Math.round((x + 20) / passo)))] };
}

export const paletas = {
  manha: {
    ceu: ['#F3EAD3', '#E7EDE6'],
    sol: '#F8E2A6',
    camadas: ['#C9D6CB', '#A9BFAE', '#7F9C86', '#56775F', '#33533F', '#1B3A2C'],
  },
  tarde: {
    ceu: ['#F2D3A6', '#EADFC9'],
    sol: '#F6C886',
    camadas: ['#D5C8AE', '#B4B49A', '#879A7E', '#5C775E', '#365440', '#1B3A2C'],
  },
  nevoa: {
    ceu: ['#E4ECE8', '#D6E3DF'],
    sol: '#F1F0E2',
    camadas: ['#C3D3CD', '#9DB6AD', '#759588', '#4F7263', '#2F5243', '#173528'],
  },
};

export default function Paisagem({
  semente = 3,
  paleta = 'manha',
  cachoeira = false,
  parallax = null,
  entrada = false,
  sol = { x: 1180, y: 250 },
  extra = null,
  semCeu = false,
  inicio = 0, // primeira camada desenhada (pular as mais distantes deixa o topo livre para texto)
  className = '',
  enquadramento = 'xMidYMax slice',
}) {
  const p = paletas[paleta];

  const camadas = useMemo(() => {
    const cfg = [
      { base: 470, amp: 150, ondas: 4, copa: 0 },
      { base: 540, amp: 150, ondas: 5, copa: 0 },
      { base: 620, amp: 130, ondas: 5, copa: 5 },
      { base: 700, amp: 110, ondas: 6, copa: 8, passo: 14 },
      { base: 790, amp: 90, ondas: 6, copa: 12, passo: 12 },
      { base: 880, amp: 70, ondas: 7, copa: 16, passo: 11 },
    ];
    return cfg.map((c, i) => crista({ semente: semente * 31 + i * 17, ...c }));
  }, [semente]);

  // Cachoeira descendo da 4ª camada até a 6ª
  const queda = useMemo(() => {
    if (!cachoeira) return null;
    const x = 1060;
    const topo = camadas[3].yEm(x) + 6;
    const fundo = camadas[4].yEm(x) + 18;
    return { x, topo, fundo };
  }, [cachoeira, camadas]);

  const idBase = `p${semente}${paleta}`;

  return (
    <svg className={className} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio={enquadramento} aria-hidden="true">
      <defs>
        <linearGradient id={`${idBase}ceu`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.ceu[0]} />
          <stop offset="1" stopColor={p.ceu[1]} />
        </linearGradient>
        <radialGradient id={`${idBase}sol`}>
          <stop offset="0" stopColor={p.sol} stopOpacity="1" />
          <stop offset="0.45" stopColor={p.sol} stopOpacity="0.55" />
          <stop offset="1" stopColor={p.sol} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${idBase}nevoa`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="0.6" stopColor="#FFFFFF" stopOpacity="0.45" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${idBase}agua`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="1" stopColor="#D8ECEC" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {!semCeu && <rect width={W} height={H} fill={`url(#${idBase}ceu)`} />}
      {!semCeu && <circle cx={sol.x} cy={sol.y} r="230" fill={`url(#${idBase}sol)`} />}

      {camadas.map((c, i) => {
        if (i < inicio) return null;
        const corpo = (
          <>
            <path d={c.d} fill={p.camadas[i]} />
            {i < 4 && (
              <rect x="0" y={c.yEm(800) - 10} width={W} height="120" fill={`url(#${idBase}nevoa)`} opacity={0.9 - i * 0.15} />
            )}
            {queda && i === 3 && (
              <g>
                <path
                  d={`M${queda.x - 5} ${queda.topo} C${queda.x - 9} ${(queda.topo + queda.fundo) / 2} ${queda.x + 2} ${(queda.topo + queda.fundo) / 2} ${queda.x - 3} ${queda.fundo} L${queda.x + 9} ${queda.fundo} C${queda.x + 13} ${(queda.topo + queda.fundo) / 2} ${queda.x + 4} ${(queda.topo + queda.fundo) / 2} ${queda.x + 7} ${queda.topo} Z`}
                  fill={`url(#${idBase}agua)`}
                />
                <ellipse cx={queda.x + 2} cy={queda.fundo} rx="46" ry="10" fill="#FFFFFF" opacity="0.55" />
              </g>
            )}
          </>
        );
        // parallax: lista de MotionValues (deslocamento y) ou de objetos de estilo ({ y, scale, ... })
        const pv = parallax ? parallax[i] : undefined;
        const estilo = pv && typeof pv.get === 'function' ? { y: pv } : pv;
        return (
          <motion.g
            key={i}
            initial={entrada ? { y: 50 + i * 12, opacity: 0 } : false}
            animate={entrada ? { y: 0, opacity: 1 } : undefined}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 + i * 0.09 }}
          >
            <motion.g style={estilo}>{corpo}</motion.g>
          </motion.g>
        );
      })}

      {extra}
    </svg>
  );
}
