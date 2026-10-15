import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate, LayoutGroup } from 'framer-motion';
import { atividades, waLink, DAY_USE } from '../data.js';
import { IconeCheck, IconeZap } from './Icones.jsx';

// Número que conta até o novo valor quando o total muda
function Valor({ valor }) {
  const mv = useMotionValue(valor);
  const texto = useTransform(mv, (v) => Math.round(v).toString());
  useEffect(() => {
    const c = animate(mv, valor, { duration: 0.5, ease: [0.16, 1, 0.3, 1] });
    return c.stop;
  }, [valor, mv]);
  return <motion.span>{texto}</motion.span>;
}

export default function Atividades() {
  const [escolhidas, setEscolhidas] = useState(['arvorismo', 'tirolesa']);
  const [pessoas, setPessoas] = useState(2);

  const alternar = (id) =>
    setEscolhidas((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]));

  const sel = useMemo(() => atividades.filter((a) => escolhidas.includes(a.id)), [escolhidas]);
  const porPessoa = DAY_USE + sel.reduce((s, a) => s + a.preco, 0);
  const total = porPessoa * pessoas;

  const mensagem =
    `Olá! Quero reservar no Bonito Ecoparque.\n` +
    `Roteiro: Day use${sel.map((a) => ` + ${a.nome}`).join('')}\n` +
    `Pessoas: ${pessoas} | Valor estimado: R$ ${total}\nData: __`;

  return (
    <section id="atividades" className="secao atividades">
      <div className="container">
        <header className="cab-secao">
          <p className="rotulo">Atividades e preços</p>
          <h2 className="titulo-l">Monte o seu dia e veja o valor na hora.</h2>
          <p className="lead">
            O day use custa R$ 25 por pessoa e dá acesso à cachoeira, às piscinas e à estrutura do parque.
            As atividades com instrutor são somadas a ele. Valores fora de feriados.
          </p>
        </header>

        <div className="monte">
          <ul className="lista-ativ" role="list">
            <li className="item-ativ fixo">
              <span className="caixa marcada" aria-hidden="true"><IconeCheck /></span>
              <span className="ativ-corpo">
                <span className="ativ-nome">Day use</span>
                <span className="ativ-desc">Cachoeira da Corrente, piscinas naturais, chuveiros e vestiários.</span>
              </span>
              <span className="ativ-preco">R$ 25</span>
            </li>
            {atividades.map((a) => {
              const on = escolhidas.includes(a.id);
              return (
                <li key={a.id}>
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={on}
                    className={`item-ativ${on ? ' on' : ''}`}
                    onClick={() => alternar(a.id)}
                  >
                    <span className={`caixa${on ? ' marcada' : ''}`} aria-hidden="true">
                      <AnimatePresence initial={false}>
                        {on && (
                          <motion.span
                            initial={{ scale: 0.4, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.4, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 28 }}
                            style={{ display: 'inline-flex' }}
                          >
                            <IconeCheck />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                    <span className="ativ-corpo">
                      <span className="ativ-nome">{a.nome}</span>
                      <span className="ativ-desc">{a.texto}</span>
                      <span className="ativ-det">{a.detalhe}</span>
                    </span>
                    <span className="ativ-preco">R$ {a.preco}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <aside className="resumo" aria-label="Resumo do seu dia">
            <p className="resumo-tit">Seu dia</p>
            <LayoutGroup>
              <ul className="resumo-itens">
                <motion.li layout key="dayuse"><span>Day use</span><span>R$ 25</span></motion.li>
                <AnimatePresence initial={false}>
                  {sel.map((a) => (
                    <motion.li
                      layout
                      key={a.id}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 12, transition: { duration: 0.15 } }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <span>{a.nome}</span><span>R$ {a.preco}</span>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
              <motion.div layout className="resumo-pp">
                <span>Por pessoa</span>
                <strong>R$ <Valor valor={porPessoa} /></strong>
              </motion.div>
              <motion.div layout className="resumo-pessoas">
                <label htmlFor="pessoas">Pessoas</label>
                <div className="contador">
                  <button type="button" aria-label="Menos uma pessoa" onClick={() => setPessoas((p) => Math.max(1, p - 1))}>−</button>
                  <output id="pessoas" aria-live="polite">{pessoas}</output>
                  <button type="button" aria-label="Mais uma pessoa" onClick={() => setPessoas((p) => Math.min(30, p + 1))}>+</button>
                </div>
              </motion.div>
              <motion.div layout className="resumo-total">
                <span>Total estimado</span>
                <strong>R$ <Valor valor={total} /></strong>
              </motion.div>
              <motion.a layout className="btn btn-sol btn-largo" href={waLink(mensagem)}>
                <IconeZap /> Reservar este roteiro
              </motion.a>
              <motion.p layout className="resumo-nota">
                A mensagem já vai com o roteiro. A equipe confirma vagas e valores pelo WhatsApp.
              </motion.p>
            </LayoutGroup>
          </aside>
        </div>
      </div>
    </section>
  );
}
