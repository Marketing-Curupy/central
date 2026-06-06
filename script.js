const $ = (selector) => document.querySelector(selector);

const state = {
  viewDate: new Date(),
  selectedDate: null
};

const monthNames = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro"
];

const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

function toISODate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function parseISODate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function formatMoney(value) {
  if (value === undefined || value === null || value === "") return "-";

  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function formatLongDate(iso) {
  const date = parseISODate(iso);

  return date.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long"
  });
}

function getCalendarItem(iso) {
  return CALENDARIO.find((item) => item.data === iso);
}

function getTodayISO() {
  return toISODate(new Date());
}

function isPast(iso) {
  return iso < getTodayISO();
}

function isToday(iso) {
  return iso === getTodayISO();
}

function renderStatusBar() {
  const today = getTodayISO();
  const item = getCalendarItem(today);
  const statusBar = $("#statusBar");

  if (item && item.status === "aberto") {
    const b = item.bilheteria || {};

    statusBar.innerHTML = `
      <div class="status-grid">
        <div>
          <div class="status-title">🟢 Parque aberto hoje</div>
          <div class="status-meta">
            <span>📅 ${formatLongDate(item.data)}</span>
            <span>⏰ ${item.horario}</span>
          </div>
        </div>

        <div>
          <strong>🎟️ Bilheteria hoje</strong>
          <div class="ticket-values">
            <span class="value-pill">👤 Visitante: ${formatMoney(b.visitante)}</span>
            <span class="value-pill">🧒 Kids: ${formatMoney(b.kids)}</span>
            <span class="value-pill">💎 Convidado: ${formatMoney(b.convidadoSocio)}</span>
          </div>
        </div>

        <div>
          <small>ℹ️ Meia-entrada mediante comprovação.</small><br>
          <button class="meia-link" onclick="openModal('modalMeiaEntrada')">
            Ver regras completas
          </button>
        </div>
      </div>
    `;

    return;
  }

  const nextOpen = CALENDARIO
    .filter((i) => i.status === "aberto" && i.data > today)
    .sort((a, b) => a.data.localeCompare(b.data))[0];

  statusBar.innerHTML = `
    <div class="status-grid">
      <div>
        <div class="status-title">🔴 Parque fechado hoje</div>
        <div class="status-meta">
          <span>📅 Próximo dia de abertura: ${nextOpen ? formatLongDate(nextOpen.data) : "em breve"}</span>
        </div>
      </div>
    </div>
  `;
}

function renderCalendar() {
  const year = state.viewDate.getFullYear();
  const month = state.viewDate.getMonth();

  $("#tituloMes").textContent = `${monthNames[month]} ${year}`;

  const calendar = $("#calendar");
  calendar.innerHTML = "";

  dayNames.forEach((day) => {
    const el = document.createElement("div");
    el.className = "day-name";
    el.textContent = day;
    calendar.appendChild(el);
  });

  const firstDay = new Date(year, month, 1);
  const startOffset = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < startOffset; i++) {
    calendar.appendChild(document.createElement("div"));
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const iso = toISODate(date);
    const item = getCalendarItem(iso);

    const btn = document.createElement("button");
    btn.className = "day";
    btn.innerHTML = `<strong>${day}</strong>`;

    if (isPast(iso)) {
      btn.classList.add("disabled");
      btn.innerHTML += `<small>Passado</small>`;
      btn.disabled = true;
    } else if (isToday(iso)) {
      btn.classList.add("today");
      btn.innerHTML += `<small>Hoje: compra online indisponível</small>`;
      btn.disabled = true;
    } else if (!item || item.status === "fechado") {
      btn.classList.add("closed");
      btn.innerHTML += `<small>Fechado</small>`;
      btn.disabled = true;
    } else {
      btn.classList.add("available");

      if (item.promocao) {
        btn.classList.add("promo");
        btn.innerHTML += `<small>🎉 ${item.promocao}</small>`;
      } else {
        btn.innerHTML += `<small>Disponível</small>`;
      }

      btn.addEventListener("click", () => selectDate(item));
    }

    calendar.appendChild(btn);
  }
}

function selectDate(item) {
  state.selectedDate = item;

  const container = $("#dataSelecionada");
  const online = item.online || {};

  container.classList.remove("hidden");

  container.innerHTML = `
    <h3>📅 ${formatLongDate(item.data)}</h3>

    ${item.promocao ? `<p class="alerta">🎉 ${item.promocao}</p>` : ""}

    <p>⏰ ${item.horario}</p>

    <h3>Valores para esta data</h3>

    <div class="price-grid">
      <div class="price-card">
        <strong>👤 Visitante</strong>
        <span>12 a 59 anos</span>
        <b>${formatMoney(online.visitante)}</b>
      </div>

      <div class="price-card">
        <strong>🧒 Kids</strong>
        <span>5 a 11 anos</span>
        <b>${formatMoney(online.kids)}</b>
      </div>

      <div class="price-card">
        <strong>👴 Melhor Idade</strong>
        <span>60 anos ou mais</span>
        <b>${formatMoney(online.melhorIdade)}</b>
      </div>
    </div>

    <div class="conditions">
      <h3>📋 Informações importantes para sua visita</h3>

      <ul>
        <li>Compras online devem ser realizadas com pelo menos 1 dia de antecedência.</li>
        <li>Não é possível comprar ingressos para uso no mesmo dia.</li>
        <li>A meia-entrada é vendida exclusivamente na bilheteria mediante comprovação.</li>
        <li>PCD e TEA possuem regras específicas de gratuidade.</li>
        <li>Crianças de 0 a 4 anos possuem entrada gratuita mediante documento oficial com foto.</li>
        <li>Crianças e Melhor Idade devem apresentar documento oficial com foto na validação do ingresso.</li>
      </ul>
    </div>

    <label class="check-row">
      <input type="checkbox" id="checkCiente">
      <span>Li e estou ciente das condições acima.</span>
    </label>

    <button class="btn primary" id="btnComprar" disabled>
      🎟️ Quero garantir essa data
    </button>
  `;

  $("#checkCiente").addEventListener("change", (event) => {
    $("#btnComprar").disabled = !event.target.checked;
  });

  $("#btnComprar").addEventListener("click", () => {
    window.open(item.linkSofalta || "#", "_blank");
  });
}

function openModal(id) {
  const modal = document.getElementById(id);
  modal.classList.add("open");

  if (id === "modalCalendario") {
    renderCalendar();
  }
}

function closeModal(id) {
  document.getElementById(id).classList.remove("open");
}

function setupLinks() {
  $("#linkHospedagem").href = CONFIG.links.hospedagem;
  $("#linkAssociados").href = CONFIG.links.associados;

  $("#zapIngressos").href = CONFIG.links.whatsappIngressos;
  $("#zapHospedagem").href = CONFIG.links.whatsappHospedagem;
  $("#zapAssociados").href = CONFIG.links.whatsappAssociados;
  $("#zapGeral").href = CONFIG.links.whatsappGeral;

  $("#abrirMapa").addEventListener("click", () => {
    window.open(CONFIG.links.googleMaps, "_blank");
  });
}

const helpData = {
  "🎟️ Ingressos e Valores": [
    [
      "Qual o valor do ingresso?",
      "Os valores variam conforme a data da visita. Consulte o calendário para ver os valores da compra online ou a barra superior para ver a bilheteria de hoje."
    ],
    [
      "Posso comprar na hora?",
      "Sim. A compra presencial pode ser feita diretamente na bilheteria do parque, conforme funcionamento do dia."
    ],
    [
      "Posso comprar para hoje pelo site?",
      "Não. Compras online devem ser realizadas com pelo menos 1 dia de antecedência."
    ],
    [
      "O que está incluso no ingresso?",
      "O ingresso dá acesso às atrações e áreas de lazer disponíveis no parque durante o dia da visita. ECO Parque Aventura, Bahamas Bar e Império do Tererê possuem cobrança separada."
    ],
    [
      "Tem meia-entrada?",
      "Sim. A meia-entrada é vendida exclusivamente na bilheteria mediante comprovação."
    ]
  ],

  "👶 Crianças e Gratuidade": [
    [
      "Criança paga ingresso?",
      "Crianças de 0 a 4 anos têm entrada gratuita mediante documento oficial com foto. De 5 a 11 anos utilizam ingresso Kids. A partir de 12 anos utilizam ingresso Visitante."
    ],
    [
      "Crianças precisam apresentar documento?",
      "Sim. Crianças devem apresentar documento oficial com foto para validação da idade."
    ],
    [
      "Como funciona Melhor Idade?",
      "Visitantes com 60 anos ou mais utilizam ingresso Melhor Idade e devem apresentar documento oficial com foto na validação."
    ],
    [
      "PCD tem gratuidade?",
      "PCD possui regra específica de gratuidade. Consulte as regras completas na bilheteria ou com atendimento."
    ],
    [
      "TEA tem gratuidade?",
      "TEA possui regra específica de gratuidade. Consulte as regras completas na bilheteria ou com atendimento."
    ]
  ],

  "🍔 Estrutura do Parque": [
    [
      "Posso levar alimentos e bebidas?",
      "Não é permitida a entrada com alimentos e bebidas. Exceções: água para consumo pessoal, leite e alimentação para bebês, e alimentos para visitantes com restrições alimentares ou condições de saúde específicas mediante laudo ou documento comprobatório."
    ],
    [
      "Quais trajes de banho são permitidos?",
      "Para usar as piscinas, é obrigatório traje de banho adequado: biquíni, maiô, sunga, shorts de tactel ou lycra. Não são permitidos jeans, algodão, peças com zíper ou botões."
    ],
    [
      "Tem estacionamento?",
      "Sim. O estacionamento do parque é gratuito para visitantes."
    ],
    [
      "Tem guarda-volumes?",
      "Sim. O guarda-volumes fica ao lado da lanchonete e possui cobrança à parte."
    ],
    [
      "Quais formas de pagamento são aceitas?",
      "Aceitamos PIX, cartões de débito, cartões de crédito e dinheiro. O dinheiro pode ser utilizado para realizar recargas dentro do parque. Nos pontos de alimentação do Curupy, o pagamento é realizado pelo sistema de consumo interno."
    ],
    [
      "Posso sair e retornar ao parque?",
      "Sim, desde que a pulseira de acesso permaneça intacta e identificável. Caso seja retirada, rompida ou danificada, será necessário adquirir um novo Day Use."
    ]
  ],

  "💎 Associados": [
    [
      "Como funciona o ingresso para convidado de sócio?",
      "O ingresso para convidado de sócio é adquirido exclusivamente na bilheteria, no dia da visita."
    ],
    [
      "O sócio precisa estar presente para liberar o convidado?",
      "Sim. O associado deve estar presente para realizar a liberação do convidado na bilheteria."
    ]
  ],

  "💬 Atendimento": [
    [
      "Quero falar com atendimento",
      "Escolha o assunto correto para falar com nossa equipe."
    ]
  ]
};

function renderHelpRoot() {
  const root = $("#helpRoot");
  root.innerHTML = "";

  Object.keys(helpData).forEach((category) => {
    const btn = document.createElement("button");
    btn.className = "help-category";
    btn.textContent = category;

    btn.addEventListener("click", () => renderQuestions(category));

    root.appendChild(btn);
  });
}

function renderQuestions(category) {
  const root = $("#helpRoot");

  root.innerHTML = `
    <button class="meia-link" id="voltarAjuda">← Voltar</button>
    <h3>${category}</h3>
  `;

  $("#voltarAjuda").addEventListener("click", renderHelpRoot);

  helpData[category].forEach(([question, answer]) => {
    const q = document.createElement("button");
    q.className = "question-btn";
    q.textContent = question;

    q.addEventListener("click", () => {
      const existing = q.nextElementSibling;

      if (existing && existing.classList.contains("answer")) {
        existing.remove();
        return;
      }

      const box = document.createElement("div");
      box.className = "answer";

      box.innerHTML = `
        <p>${answer}</p>

        <strong>Isso resolveu sua dúvida?</strong>

        <div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap">
          <button class="btn tertiary">✅ Sim, obrigado</button>
          <button class="btn secondary" onclick="openModal('modalAtendimento')">
            💬 Não, quero falar com atendimento
          </button>
        </div>
      `;

      q.after(box);
    });

    root.appendChild(q);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  state.viewDate = new Date();

  renderStatusBar();
  setupLinks();
  renderHelpRoot();

  $("#abrirCalendario").addEventListener("click", () => openModal("modalCalendario"));
  $("#abrirCalendario2").addEventListener("click", () => openModal("modalCalendario"));
  $("#abrirMeiaEntradaInfo").addEventListener("click", () => openModal("modalMeiaEntrada"));
  $("#abrirAjuda").addEventListener("click", () => openModal("modalAjuda"));
  $("#abrirAtendimento").addEventListener("click", () => openModal("modalAtendimento"));

  $("#mesAnterior").addEventListener("click", () => {
    state.viewDate = new Date(
      state.viewDate.getFullYear(),
      state.viewDate.getMonth() - 1,
      1
    );

    renderCalendar();
  });

  $("#mesProximo").addEventListener("click", () => {
    state.viewDate = new Date(
      state.viewDate.getFullYear(),
      state.viewDate.getMonth() + 1,
      1
    );

    renderCalendar();
  });

  document.querySelectorAll("[data-close]").forEach((el) => {
    el.addEventListener("click", () => closeModal(el.dataset.close));
  });

  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeModal(modal.id);
      }
    });
  });
});
