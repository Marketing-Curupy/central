// ==========================================
// DADOS EDITÁVEIS DA CENTRAL DO VISITANTE
// ==========================================

// Links principais da página.
// Troque os links abaixo pelos links oficiais da Curupy.

const CONFIG = {
  links: {
    googleMaps: "https://maps.google.com/?q=Curupy+Sinop+MT",

    hospedagem: "#",
    associados: "#",

    whatsappIngressos: "https://wa.me/5566996454707",
    whatsappHospedagem: "https://wa.me/55996562410",
    whatsappAssociados: "https://wa.me/556630153214",
    whatsappGeral: "https://wa.me/556630153214"
  }
};

// ==========================================
// CALENDÁRIO DO PARQUE
// ==========================================
//
// data: usar formato AAAA-MM-DD
// status: "aberto" ou "fechado"
// horario: exemplo "09h às 17h30"
// promocao: pode deixar vazio ""
// linkSofalta: link específico da data no sistema Só Falta
//
// Bilheteria:
// - visitante
// - kids
// - convidadoSocio
//
// Online:
// - visitante
// - kids
// - melhorIdade

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
