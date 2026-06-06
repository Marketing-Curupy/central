// Dados editáveis da Central do Visitante Curupy.
// Troque os valores e links conforme a tabela oficial do mês.

const CONFIG = {
  links: {
    googleMaps: "https://maps.google.com/?q=Curupy+Sinop+MT",
    hospedagem: "#",
    associados: "#",
    whatsappIngressos: "https://wa.me/5500000000000",
    whatsappHospedagem: "https://wa.me/5500000000000",
    whatsappAssociados: "https://wa.me/5500000000000",
    whatsappGeral: "https://wa.me/5500000000000"
  }
};

// Formato:
// data: AAAA-MM-DD
// status: "aberto" ou "fechado"
// horario: texto livre
// promocao: texto opcional
// linkSofalta: link específico da data
const CALENDARIO = [
  {
    data: "2026-06-06",
    status: "aberto",
    horario: "08h30 às 17h30",
    bilheteria: {
      visitante: 86,
      kids: 45,
      convidadoSocio: 50
    },
    online: {
      visitante: 57,
      kids: 35,
      melhorIdade: 40
    },
    promocao: "Oferta especial",
    linkSofalta: "#"
  },
  {
    data: "2026-06-07",
    status: "aberto",
    horario: "08h30 às 17h30",
    bilheteria: {
      visitante: 86,
      kids: 45,
      convidadoSocio: 50
    },
    online: {
      visitante: 57,
      kids: 35,
      melhorIdade: 40
    },
    promocao: "Oferta especial",
    linkSofalta: "#"
  },
  {
    data: "2026-06-08",
    status: "fechado",
    horario: "",
    bilheteria: {},
    online: {},
    promocao: "",
    linkSofalta: ""
  },
  {
    data: "2026-06-09",
    status: "fechado",
    horario: "",
    bilheteria: {},
    online: {},
    promocao: "",
    linkSofalta: ""
  },
  {
    data: "2026-06-10",
    status: "aberto",
    horario: "09h às 17h30",
    bilheteria: {
      visitante: 86,
      kids: 45,
      convidadoSocio: 50
    },
    online: {
      visitante: 57,
      kids: 35,
      melhorIdade: 40
    },
    promocao: "",
    linkSofalta: "#"
  },
  {
    data: "2026-06-11",
    status: "aberto",
    horario: "09h às 17h30",
    bilheteria: {
      visitante: 86,
      kids: 45,
      convidadoSocio: 50
    },
    online: {
      visitante: 57,
      kids: 35,
      melhorIdade: 40
    },
    promocao: "Combo promocional",
    linkSofalta: "#"
  },
  {
    data: "2026-06-12",
    status: "aberto",
    horario: "09h às 17h30",
    bilheteria: {
      visitante: 86,
      kids: 45,
      convidadoSocio: 50
    },
    online: {
      visitante: 57,
      kids: 35,
      melhorIdade: 40
    },
    promocao: "",
    linkSofalta: "#"
  },
  {
    data: "2026-06-13",
    status: "aberto",
    horario: "08h30 às 17h30",
    bilheteria: {
      visitante: 86,
      kids: 45,
      convidadoSocio: 50
    },
    online: {
      visitante: 57,
      kids: 35,
      melhorIdade: 40
    },
    promocao: "",
    linkSofalta: "#"
  },
  {
    data: "2026-06-14",
    status: "aberto",
    horario: "08h30 às 17h30",
    bilheteria: {
      visitante: 86,
      kids: 45,
      convidadoSocio: 50
    },
    online: {
      visitante: 57,
      kids: 35,
      melhorIdade: 40
    },
    promocao: "",
    linkSofalta: "#"
  }
];
