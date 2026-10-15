const s = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };

export const IconeZap = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" strokeWidth="2" {...s}>
    <path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.6-5.4A8.4 8.4 0 1 1 21 11.5z" />
  </svg>
);

export const IconeMais = ({ aberto }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" strokeWidth="1.8" {...s}
    style={{ transform: aberto ? 'rotate(45deg)' : 'none', transition: 'transform .35s cubic-bezier(.16,1,.3,1)' }}>
    <path d="M7 1v12M1 7h12" />
  </svg>
);

export const IconeCheck = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" strokeWidth="2.2" {...s}><path d="M2.5 7.5l3 3 6-7" /></svg>
);

export const IconeSeta = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" strokeWidth="1.8" {...s}><path d="M3 8h10M9 4l4 4-4 4" /></svg>
);

export const IconePausa = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" strokeWidth="2" {...s}><path d="M4.5 2.5v9M9.5 2.5v9" /></svg>
);

export const IconePlay = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" {...s} fill="currentColor" stroke="none"><path d="M4 2.2v9.6L11.5 7z" /></svg>
);

// Símbolo da logo do parque: montanha amarelo-limão, mata verde e água azul
export const Marca = () => (
  <svg className="marca-simbolo" width="40" height="32" viewBox="0 0 40 32" aria-hidden="true">
    <path fill="#C9CD3A" d="M3.5 15.2 C8 11.6 12 9.7 16 9 L18.4 5.2 L20.3 7.8 L22.6 4.4 L25.4 8.6 C29.5 9.2 33 10.3 36.5 12 C31 10.6 25.5 10.3 20 10.6 C13.5 11 8.5 12.8 3.5 15.2 Z" />
    <path fill="#35A45D" d="M5 19.6 C11 16.2 19 14.8 27 15.1 C30.5 15.2 33.5 15.8 35.8 16.6 C30 16.4 23 16.8 17 17.6 C12 18.3 8.5 18.9 5 19.6 Z" />
    <path fill="none" stroke="#2690BC" strokeWidth="2.2" strokeLinecap="round" d="M9 22.4 C17 20.4 27 20.2 31.6 22.2 C35 23.8 33.2 28 23 28.8" />
    <path fill="none" stroke="#2690BC" strokeWidth="1.6" strokeLinecap="round" d="M12.5 24.9 C18.5 23.6 25 23.7 27.4 24.7 C28.9 25.4 27.6 26.3 24.8 26.6" />
  </svg>
);

// Logo completa: símbolo, "BONITO" em negrito, "ECOPARQUE" na cor da marca e "Cachoeira da Corrente"
export const Logo = () => (
  <span className="logo">
    <Marca />
    <span className="logo-txt">
      <span className="logo-nome"><b>Bonito</b><span>Ecoparque</span></span>
      <span className="logo-sub">Cachoeira da Corrente</span>
    </span>
  </span>
);
