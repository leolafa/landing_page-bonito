import { useEffect, useRef, useState } from 'react';
import { Logo } from './Icones.jsx';
import { waLink } from '../data.js';

// Cabeçalho que some ao descer a página e volta ao subir
export default function Header() {
  const [estado, setEstado] = useState({ fundo: false, oculto: false });
  const ultimo = useRef(0);

  useEffect(() => {
    const aoRolar = () => {
      const y = window.scrollY;
      const descendo = y > ultimo.current && y > 240;
      ultimo.current = y;
      setEstado({ fundo: y > 40, oculto: descendo });
    };
    aoRolar();
    window.addEventListener('scroll', aoRolar, { passive: true });
    return () => window.removeEventListener('scroll', aoRolar);
  }, []);

  return (
    <header className={`header${estado.fundo ? ' com-fundo' : ''}${estado.oculto ? ' oculto' : ''}`}>
      <div className="header-in">
        <a href="#topo" className="marca" aria-label="Bonito Ecoparque, início">
          <Logo />
        </a>
        <nav className="nav" aria-label="Seções">
          <a href="#dia">O dia no parque</a>
          <a href="#atividades">Atividades e preços</a>
          <a href="#hospedagem">Hospedagem</a>
          <a href="#planeje">Planeje a visita</a>
        </nav>
        <a className="btn btn-sol btn-p" href={waLink()}>Reservar</a>
      </div>
    </header>
  );
}
