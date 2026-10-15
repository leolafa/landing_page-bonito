// Todo o conteúdo editável da página fica aqui.
// Campos entre colchetes precisam ser confirmados com o parque antes de publicar.

export const contato = {
  whatsapp: '5581998814090',
  whatsappExibicao: '(81) 99881-4090',
  telefone: '(81) 99935-3656',
  email: 'bonitoecoparque@gmail.com',
  instagram: 'https://www.instagram.com/bonitoecoparquepe/',
  facebook: 'https://www.facebook.com/pousadabonitoecoparque',
  endereco: 'PE-103, 19, Bonito, PE, 55680-000',
  rotaMaps: 'https://www.google.com/maps/dir/?api=1&destination=-8.576876,-35.699008',
  perfilGoogle: 'https://www.google.com/maps/place/Bonito+Ecoparque/@-8.5767966,-35.6990027,17z/data=!4m9!3m8!1s0x70767609eb555c7:0x6d2c8157729d0f11!5m2!4m1!1i2!8m2!3d-8.5767966!4d-35.6990027!16s%2Fg%2F11clgp2ztk?hl=pt-BR',
};

// Nota e total exibidos no perfil do Google em 14/10/2026. Atualizar de tempos em tempos.
// Não vai para o JSON-LD: o Google não aceita AggregateRating do próprio negócio.
export const avaliacaoGoogle = { nota: '4,4', total: '1.116' };

export const DAY_USE = 25;

// Mensagens prontas: uma linha por informação, para a equipe responder sem precisar perguntar de volta
export const MSG_RESERVA = 'Olá! Vi o site e quero reservar o day use no Bonito Ecoparque.\nData:\nAdultos:\nCrianças e idades:';
export const MSG_DUVIDA = 'Olá! Vi o site e tenho uma dúvida sobre as atividades antes de reservar:';
export const MSG_HOSPEDAGEM = 'Olá! Vi o site e quero consultar hospedagem no Bonito Ecoparque.\nPousada ou camping:\nEntrada:\nSaída:\nAdultos:\nCrianças e idades:';

export const waLink = (texto = MSG_RESERVA) =>
  `https://wa.me/${contato.whatsapp}?text=${encodeURIComponent(texto)}`;

// Roteiro sugerido. Abertura (9h30) e encerramento (16h) são os horários oficiais do day use;
// os horários intermediários são apenas sugestão.
export const roteiro = [
  {
    hora: '09h30',
    titulo: 'Chegada e orientação',
    texto: 'O parque abre. Você faz o check-in do day use, deixa as coisas no vestiário e a equipe apresenta as atividades e as regras de segurança.',
    info: [['Day use', 'R$ 25 por pessoa'], ['Reserva', 'Antecipada, pelo WhatsApp']],
    ceu: '#EFE6CF',
  },
  {
    hora: '10h00',
    titulo: 'Copas das árvores e tirolesa',
    texto: 'Comece pelo arvorismo: dez fases entre as copas, com ponte tibetana e teia de aranha, terminando numa tirolesa de 50 m. Depois, a tirolesa molhada acaba com um mergulho no lago.',
    info: [['Arvorismo', 'R$ 35'], ['Tirolesa', 'R$ 30']],
    ceu: '#E4ECE6',
  },
  {
    hora: '12h00',
    titulo: 'Almoço no restaurante',
    texto: 'O restaurante e o bar funcionam o dia todo, com refeições, petiscos e bebidas. A entrada com alimentos e bebidas não é permitida.',
    info: [['Restaurante', 'Café, almoço e jantar'], ['Bar', 'Petiscos e bebidas']],
    ceu: '#DDE9EC',
  },
  {
    hora: '13h30',
    titulo: 'Cachoeira da Corrente',
    texto: 'Banho de cachoeira e piscinas naturais no coração do parque, cercados por Mata Atlântica em regeneração. Para as crianças, há piscina infantil e playground.',
    info: [['Banho', 'Incluso no day use'], ['Estrutura', 'Chuveiros e vestiários']],
    ceu: '#E7E6D2',
  },
  {
    hora: '15h00',
    titulo: 'Caiaque, rapel ou escalada',
    texto: 'Para fechar a tarde: uma remada tranquila no lago, a descida de rapel com instrutor ou o paredão de escalada com corda de segurança.',
    info: [['Caiaque', 'R$ 25'], ['Rapel', 'R$ 30'], ['Escalada', 'R$ 25']],
    ceu: '#F1D9AE',
  },
  {
    hora: '16h00',
    titulo: 'Fim do day use, ou fique mais',
    texto: 'O day use termina às 16h. Quem quiser acordar na mata pode ficar na pousada do parque, com café da manhã e jantar inclusos, ou no camping.',
    info: [['Pousada casal', 'R$ 350 a diária'], ['Camping', 'R$ 60 por pessoa']],
    ceu: '#EBC39A',
  },
];

export const atividades = [
  { id: 'arvorismo', nome: 'Arvorismo', preco: 35, texto: '10 fases entre as copas, termina numa tirolesa de 50 m.', detalhe: 'Idade mínima [informar]' },
  { id: 'tirolesa', nome: 'Tirolesa', preco: 30, texto: 'Seca, chegando em terra, ou molhada, com mergulho no lago.', detalhe: 'Idade mínima [informar]' },
  { id: 'rapel', nome: 'Rapel', preco: 30, texto: 'Descida vertical na corda, com instrutor do início ao fim.', detalhe: 'Altura [informar]' },
  { id: 'mirim', nome: 'Arvorismo Mirim', preco: 35, texto: 'Circuito mais baixo, feito para as crianças.', detalhe: 'Faixa etária [informar]' },
  { id: 'caiaque', nome: 'Caiaque', preco: 25, texto: 'Remada tranquila no lago do parque.', detalhe: 'Duração [informar]' },
  { id: 'escalada', nome: 'Paredão de escalada', preco: 25, texto: 'Parede com corda de segurança, boa para a primeira vez.', detalhe: 'Idade mínima [informar]' },
];

export const quartos = [
  { tipo: 'Casal', preco: 350 },
  { tipo: 'Triplo', preco: 480 },
  { tipo: 'Quádruplo', preco: 570 },
];

export const rota = [
  'Saia de Recife pela BR-232 até Bezerros.',
  'Entre à direita na PE-103 e siga por Camocim de São Félix até Bonito.',
  'Do centro de Bonito são 18,5 km até o parque. Siga as placas.',
];

export const levar = [
  'Roupa de banho e toalha',
  'Protetor solar e repelente',
  'Tênis fechado para as atividades de altura',
  'Documento com foto',
  '[Confirmar a lista com o parque]',
];

// Avaliações reais de 5 estrelas do Google, copiadas literalmente (coletadas em 14/10/2026).
// O ano é aproximado a partir da data relativa mostrada pelo Google.
export const avaliacoes = [
  { autor: 'Soraia Costa', ano: '2026', texto: 'Lugar lindo !!! Tem restaurante,piscinas\nCachoeiras ,tirolesa e balanço.\nVenham conhecer!!' },
  { autor: 'Cleber Cardim dos Santos', ano: '2024', texto: 'Local exuberante, com uma bela cachoeira, atividade de rapel e arvorismo, além de restaurante e chalés para hospedagem.' },
  { autor: 'Santiago Silva', ano: '2023', texto: 'Ótimo local para relaxar, curtir com a família, inclusive várias opções para crianças.\nPerfeito, ótimo custo benefício.' },
  { autor: 'Arquimedes Medeiros', ano: '2024', texto: 'Pousada muito boa para recarregar as energias , atendimento e funcionários educados e prestativos' },
];

export const perguntas = [
  { p: 'Onde fica o Bonito Ecoparque?', r: 'Em Bonito, no agreste de Pernambuco, a 132 km de Recife e a 18,5 km do centro da cidade, às margens da PE-103. Não confundir com Bonito, no Mato Grosso do Sul.' },
  { p: 'Quanto custa visitar?', r: 'O day use custa R$ 25 por pessoa. As atividades são cobradas à parte: arvorismo R$ 35, arvorismo mirim R$ 35, tirolesa R$ 30, rapel R$ 30, caiaque R$ 25 e paredão de escalada R$ 25. Em feriados os valores podem mudar, e a cotação é feita pelo WhatsApp.' },
  { p: 'Quais dias e horários o parque abre?', r: 'O day use funciona de sexta a domingo e nos feriados, das 9h30 às 16h. A pousada e o camping recebem hóspedes com reserva.' },
  { p: 'Preciso reservar antes?', r: 'Sim. A capacidade diária é limitada, e a reserva é feita com antecedência pelo WhatsApp (81) 99881-4090.' },
  { p: 'Posso levar comida e bebida?', r: 'Não. O parque tem restaurante e bar com refeições, petiscos e bebidas durante todo o dia.' },
  { p: 'Crianças podem fazer as atividades?', r: 'Há um circuito de arvorismo mirim, piscina infantil e playground. Idade mínima por atividade: [informar].' },
  { p: 'Tem restaurante no parque?', r: 'Sim. O restaurante e o bar servem refeições, petiscos e bebidas durante todo o dia, e a pousada oferece café da manhã e jantar aos hóspedes.' },
  { p: 'Dá para dormir no parque?', r: 'Sim. A pousada tem quartos para casal (R$ 350), triplo (R$ 480) e quádruplo (R$ 570) por diária, com café da manhã e jantar. O camping custa R$ 60 por pessoa ao dia, sem barraca e sem refeições, com banheiros, duchas e vestiário.' },
  { p: 'Como chegar de Recife?', r: 'São 132 km. Siga pela BR-232 até Bezerros, entre na PE-103 e passe por Camocim de São Félix até Bonito. Do centro de Bonito são mais 18,5 km até o parque.' },
  { p: 'E se chover ou eu precisar cancelar?', r: '[Informar a política de remarcação e cancelamento.]' },
];
