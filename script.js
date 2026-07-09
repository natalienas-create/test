/* =========================================================
   CASE STUDY DATA
   Add a new project by adding an object to this array —
   the knot on the thread and the full case-study page are
   both generated from it automatically.
========================================================= */
const CASE_STUDIES = [
  {
    id: "recibo",
    eyebrow: "app fintech · pesquisa + ux",
    title: "Recibo",
    subtitle: "organizando o caos de notas fiscais para pequenos autônomos",
    role: "pesquisa, ux, ui",
    timeline: "2024 · 4 meses",
    team: "1 pm, 2 eng, 1 design (eu)",
    sections: [
      {
        heading: "o nó",
        body: "Autônomos guardavam recibos em fotos soltas no celular e perdiam prazos de declaração. O time de negócio queria automação; a pesquisa mostrava que o problema real era confiança em soltar o controle."
      },
      {
        heading: "puxando o fio",
        body: "Entrevistei 14 autônomos, mapeei o fluxo de \"o que eles diziam\" fazer versus o que realmente faziam ao guardar comprovantes, e cruzei isso com as restrições técnicas do time de dados."
      },
      {
        heading: "o que ficou claro do outro lado",
        body: "Um fluxo de captura em duas etapas — automática, mas sempre revisável — aumentou a adoção em 3x nos testes com usuários, sem exigir que a pessoa abrisse mão do controle."
      }
    ]
  },
  {
    id: "malha",
    eyebrow: "plataforma b2b · design de sistema",
    title: "Malha",
    subtitle: "um design system para conectar 6 times que falavam línguas diferentes",
    role: "design de sistema, facilitação",
    timeline: "2023 · 7 meses",
    team: "6 times de produto",
    sections: [
      {
        heading: "o nó",
        body: "Cada time tinha seu próprio botão, seu próprio espaçamento e sua própria opinião sobre qual era a certa. Unificar viraria um projeto político antes de virar um projeto de design."
      },
      {
        heading: "puxando o fio",
        body: "Em vez de propor um sistema pronto, mapeei publicamente as decisões conflitantes de cada stakeholder e construí o sistema junto, nó por nó, com sessões curtas e decisões documentadas."
      },
      {
        heading: "o que ficou claro do outro lado",
        body: "O sistema resultante reduziu o tempo de handoff entre design e engenharia em 40% e, mais importante, todo mundo sabia por que cada decisão tinha sido tomada."
      }
    ]
  },
  {
    id: "farol",
    eyebrow: "produto de saúde · onboarding",
    title: "Farol",
    subtitle: "reduzindo a ansiedade do primeiro acesso em um app de saúde mental",
    role: "ux research, ui, teste de usabilidade",
    timeline: "2022 · 3 meses",
    team: "1 pm, 3 eng, 1 design (eu)",
    sections: [
      {
        heading: "o nó",
        body: "O onboarding tinha 9 telas de formulário antes de qualquer valor aparecer. A taxa de abandono no primeiro acesso era de 61%."
      },
      {
        heading: "puxando o fio",
        body: "Testei um onboarding progressivo, onde a pessoa via valor real (uma respiração guiada) antes de qualquer pergunta pessoal, movendo a coleta de dados para depois da primeira vitória."
      },
      {
        heading: "o que ficou claro do outro lado",
        body: "Abandono caiu para 24% e o tempo até a primeira ação de valor passou de 6 minutos para 40 segundos."
      }
    ]
  }
];

/* =========================================================
   RENDER KNOTS
========================================================= */
const knotsEl = document.getElementById('knots');

CASE_STUDIES.forEach((cs) => {
  const knot = document.createElement('div');
  knot.className = 'knot';
  knot.innerHTML = `
    <div class="billboard">
      <p class="billboard__eyebrow">${cs.eyebrow}</p>
      <h3 class="billboard__title">${cs.title}</h3>
      <p class="billboard__subtitle">${cs.subtitle}</p>
    </div>
    <svg class="knot__arrow" viewBox="0 0 70 40" aria-hidden="true">
      <path d="M5,5 C30,5 30,35 65,35 M52,25 L65,35 L54,40"/>
    </svg>
    <div class="hole-wrap">
      <div class="hole" data-case="${cs.id}" tabindex="0" role="button"
           aria-label="Abrir estudo de caso: ${cs.title}">
        <svg class="hole__figure" viewBox="0 0 120 160" aria-hidden="true">
          <circle cx="60" cy="26" r="14" fill="none"/>
          <line x1="60" y1="40" x2="60" y2="95"/>
          <line x1="60" y1="55" x2="30" y2="75"/>
          <line x1="60" y1="55" x2="90" y2="75"/>
          <line x1="60" y1="95" x2="40" y2="140"/>
          <line x1="60" y1="95" x2="80" y2="140"/>
        </svg>
      </div>
      <span class="hole-label">mergulhar</span>
    </div>
  `;
  knotsEl.appendChild(knot);
});

/* =========================================================
   FIGURE WALKS THE THREAD ON SCROLL
========================================================= */
const threadPathEl = document.getElementById('threadPath');
const threadFigure = document.getElementById('threadFigure');
const threadSection = document.querySelector('.thread-path');
const pathLen = threadPathEl.getTotalLength();

function updateThreadFigure(){
  const rect = threadSection.getBoundingClientRect();
  const vh = window.innerHeight;
  const total = rect.height + vh;
  const progressed = vh - rect.top;
  let t = progressed / total;
  t = Math.max(0, Math.min(1, t));

  const pt = threadPathEl.getPointAtLength(t * pathLen);
  // map svg viewBox coords (0-100 width, 0-1600 height) to section pixel space
  const xPct = pt.x; // already 0-100 -> use as %
  const yPx = (pt.y / 1600) * rect.height;

  threadFigure.style.left = xPct + '%';
  threadFigure.style.top = yPx + 'px';
}

/* =========================================================
   HERO LOOK-UP STATE
========================================================= */
const heroSection = document.querySelector('.hero');
function updateHero(){
  const scrolled = window.scrollY;
  heroSection.classList.toggle('hero--looking', scrolled > 40 && scrolled < window.innerHeight);
}

/* single scroll listener, rAF-throttled */
let ticking = false;
function onScroll(){
  if(!ticking){
    requestAnimationFrame(() => {
      updateThreadFigure();
      updateHero();
      ticking = false;
    });
    ticking = true;
  }
}
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll);
onScroll();

document.getElementById('scrollCue').addEventListener('click', () => {
  document.getElementById('trabalhos').scrollIntoView({ behavior: 'smooth' });
});

/* =========================================================
   BLACK HOLE OVERLAY
========================================================= */
const overlay = document.getElementById('overlay');
const overlayHole = document.getElementById('overlayHole');
const overlayClose = document.getElementById('overlayClose');
const caseArticle = document.getElementById('caseArticle');
let lastFocused = null;

function renderCase(cs){
  caseArticle.innerHTML = `
    <p class="case__eyebrow">${cs.eyebrow}</p>
    <h2 class="case__title">${cs.title}</h2>
    <p class="case__subtitle">${cs.subtitle}</p>
    <div class="case__meta">
      <span><b>${cs.role}</b>papel</span>
      <span><b>${cs.timeline}</b>quando</span>
      <span><b>${cs.team}</b>time</span>
    </div>
    ${cs.sections.map((s, i) => `
      <div class="case__section">
        <h3>${s.heading}</h3>
        <p>${s.body}</p>
        ${i === 0 ? '<div class="case__frame">imagem / captura do projeto</div>' : ''}
      </div>
    `).join('')}
  `;
}

function openCase(id, originEvent){
  const cs = CASE_STUDIES.find(c => c.id === id);
  if(!cs) return;

  lastFocused = document.activeElement;
  renderCase(cs);

  // set the clip-path origin to where the user clicked/activated
  let ox = '50%', oy = '50%';
  if(originEvent && originEvent.clientX !== undefined && originEvent.clientX !== 0){
    ox = originEvent.clientX + 'px';
    oy = originEvent.clientY + 'px';
  } else {
    const holeEl = document.querySelector(`.hole[data-case="${id}"]`);
    if(holeEl){
      const r = holeEl.getBoundingClientRect();
      ox = (r.left + r.width/2) + 'px';
      oy = (r.top + r.height/2) + 'px';
    }
  }
  overlayHole.style.setProperty('--ox', ox);
  overlayHole.style.setProperty('--oy', oy);

  overlay.classList.add('is-open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  overlayClose.focus();
}

function closeCase(){
  overlay.classList.remove('is-open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if(lastFocused) lastFocused.focus();
}

document.addEventListener('click', (e) => {
  const hole = e.target.closest('.hole');
  if(hole){ openCase(hole.dataset.case, e); }
});
document.addEventListener('keydown', (e) => {
  if((e.key === 'Enter' || e.key === ' ') && document.activeElement.classList.contains('hole')){
    e.preventDefault();
    openCase(document.activeElement.dataset.case, null);
  }
  if(e.key === 'Escape' && overlay.classList.contains('is-open')){
    closeCase();
  }
});
overlayClose.addEventListener('click', closeCase);

/* footer year */
document.getElementById('year').textContent = new Date().getFullYear();
