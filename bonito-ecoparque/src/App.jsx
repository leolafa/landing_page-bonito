import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import DiaNoParque from './components/DiaNoParque.jsx';
import Atividades from './components/Atividades.jsx';
import { Destaques, Sobre, Galeria, Seguranca, Hospedagem, Planeje, Avaliacoes, Faq, CtaFinal, Rodape, CtaFixo, ZapFlutuante } from './components/Secoes.jsx';
import { useRolagemSuave, BarraProgresso } from './components/Movimento.jsx';

// Ordem pensada para quem decide uma visita:
// 1. o que é e o essencial (abertura com foto real, chamada e barra de informações)
// 2. como é o lugar (o parque e a galeria de fotos)
// 3. como é o dia lá dentro (roteiro guiado pela rolagem)
// 4. quanto custa (montador de roteiro) e segurança
// 5. ficar mais (hospedagem), planejar, prova social, dúvidas e reserva
export default function App() {
  useRolagemSuave();
  return (
    <>
      <BarraProgresso />
      <Header />
      <main>
        <Hero />
        <Destaques />
        <Sobre />
        <Galeria />
        <DiaNoParque />
        <Atividades />
        <Seguranca />
        <Hospedagem />
        <Planeje />
        <Avaliacoes />
        <Faq />
        <CtaFinal />
      </main>
      <Rodape />
      <CtaFixo />
      <ZapFlutuante />
    </>
  );
}
