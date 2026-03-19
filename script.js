'use strict';
document.getElementById('yr').textContent = new Date().getFullYear();

/* ── LANGUAGE ── */
let lang = 'bn';
const TX = {
  bn: {
    lbl: 'Eid ul Fitr',
    ttl: 'Eid Mubarak',
    dua: 'তাকাব্বালাল্লাহু মিন্না ওয়া মিনকুম',
    ask: 'Ei Eid-e, Fahim-ke ki ektu salami deben? 🥺',
    asub: 'Emon manush nai je Fahim-er jonno kichhu korte raaji na...',
    nudge: 'Eita ki thik hobe? Bhaben ektu... 😔',
    yes: '✓&nbsp;Dibo, in sha Allah',
    no:  '✕&nbsp;Na, dibo na',
    infoTag: 'bKash',
    copy: 'Copy Number',
    copied: 'Copied ✓',
    duaTxt: 'JazakAllahu Khayran 🤲 — may this Eid bring you immeasurable joy. Ameen.',
    clbl: 'Eid Card',
    dl: '↓ Download',
    gen: 'Generate Eid Card',
    lgBtn: 'EN',
    noMsgs: [
      'Seriously? Fahim-er sathe ei panga? 😤',
      'Bhai, ekta dua-o dite parben na? 😢',
      'Ei Eid-e o na? Maan gelo... 💔',
      'Ei moment ta mone thakbe, bhai 😶',
      'Thik ache, dekhi tumi ki... 👁️',
      'Fahim chup thakbe. Kintu mone rakhbe. 😑',
      'Duniya-ta choto, bhai. Choto. 🌍',
      'Ekta chance-i chilo... 😞',
      'Roz hashar din bujhben keno bollam 😶‍🌫️',
      'Ja, Allah hafez. Tumi jano tumi ki korecho. 💀'
    ]
  },
  en: {
    lbl: 'Eid ul Fitr',
    ttl: 'Eid Mubarak',
    dua: 'Taqabbalallahu Minna Wa Minkum',
    ask: 'This Eid — could you send a little salami to Fahim? 🥺',
    asub: "There's no one out there who wouldn't do something for Fahim...",
    nudge: 'Is this really how it ends? Think about it... 😔',
    yes: '✓&nbsp;Yes, inshallah',
    no:  '✕&nbsp;No, I won\'t',
    infoTag: 'bKash',
    copy: 'Copy Number',
    copied: 'Copied ✓',
    duaTxt: 'JazakAllahu Khayran 🤲 — may this Eid bring you immeasurable joy. Ameen.',
    clbl: 'Eid Card',
    dl: '↓ Download',
    gen: 'Generate Eid Card',
    lgBtn: 'বাংলিশ',
    noMsgs: [
      'Seriously? To Fahim? 😤',
      'Not even a prayer? Wow. 😢',
      'This Eid too, huh? Heartbreaking. 💔',
      'This moment will be remembered. 😶',
      "Fine. We'll see. 👁️",
      'Fahim will stay silent. But he will remember. 😑',
      'The world is small, friend. Very small. 🌍',
      'There was only one chance... 😞',
      "You'll understand on the Day of Judgement 😶‍🌫️",
      'Go. Allah hafez. You know what you did. 💀'
    ]
  }
};
const tx = () => TX[lang];

function applyLang() {
  const t = tx();
  document.getElementById('lbl').textContent     = t.lbl;
  document.getElementById('ttl').textContent     = t.ttl;
  document.getElementById('dua').textContent     = t.dua;
  document.getElementById('ask').innerHTML       = t.ask;
  document.getElementById('asub').textContent    = t.asub;
  if (!currentNudge) document.getElementById('nudge').textContent = t.nudge;
  document.getElementById('yesBtn').innerHTML    = t.yes;
  document.getElementById('noBtn').innerHTML     = t.no;
  document.getElementById('infoTag').textContent = t.infoTag;
  document.getElementById('cpBtn').textContent   = t.copy;
  document.getElementById('duaTxt').textContent  = t.duaTxt;
  document.getElementById('clbl').textContent    = t.clbl;
  document.getElementById('dlBtn').textContent   = t.dl;
  document.getElementById('genBtn').textContent  = t.gen;
  document.getElementById('lgBtn').textContent   = t.lgBtn;
}
function toggleL() { lang = lang === 'bn' ? 'en' : 'bn'; applyLang(); }

/* ── THEME ── */
let theme = 'ember';
const THEMES = [
  { key: 'ember', label: '🔥 Ember' },
  { key: 'steel', label: '🔩 Steel' }
];
let themeIdx = 0;
function cycleTheme() {
  themeIdx = (themeIdx + 1) % THEMES.length;
  const { key, label } = THEMES[themeIdx];
  theme = key;
  document.body.className = key;
  document.getElementById('tpLbl').textContent = label;
  initPts(); drawBg();
  if (cardMade) makeCard();
}

/* ── BACKGROUND CANVAS ── */
const cv = document.getElementById('bg');
const ctx = cv.getContext('2d');
let pts = [], raf = null;
function rsz() { cv.width = innerWidth; cv.height = innerHeight; initPts(); }
function initPts() {
  pts = [];
  for (let i = 0; i < 90; i++) pts.push({
    x: Math.random() * cv.width, y: Math.random() * cv.height,
    r: Math.random() * 1.2 + 0.2,
    vy: Math.random() * 0.12 + 0.01,
    ph: Math.random() * Math.PI * 2,
    spd: Math.random() * 0.018 + 0.004
  });
}
const BG = {
  ember: { base: '#140608', pt: '200,80,50' },
  steel: { base: '#060c14', pt: '80,130,210' }
};
function drawBg() {
  if (raf) cancelAnimationFrame(raf);
  const col = BG[theme] || BG.ember;
  function frame() {
    const W = cv.width, H = cv.height;
    ctx.fillStyle = col.base; ctx.fillRect(0, 0, W, H);
    pts.forEach(p => {
      p.ph += p.spd; p.y += p.vy * 0.35;
      if (p.y > H + 8) { p.y = -8; p.x = Math.random() * W; }
      const a = 0.08 + Math.sin(p.ph) * 0.18;
      ctx.fillStyle = `rgba(${col.pt},${Math.max(0, a)})`;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      if (p.r > 0.9) {
        ctx.strokeStyle = `rgba(${col.pt},${Math.max(0, a * 0.3)})`; ctx.lineWidth = 0.4;
        ctx.beginPath();
        ctx.moveTo(p.x - p.r * 3.5, p.y); ctx.lineTo(p.x + p.r * 3.5, p.y);
        ctx.moveTo(p.x, p.y - p.r * 3.5); ctx.lineTo(p.x, p.y + p.r * 3.5);
        ctx.stroke();
      }
    });
    raf = requestAnimationFrame(frame);
  }
  frame();
}
window.addEventListener('resize', rsz);
rsz(); drawBg();

/* ── NO BUTTON — 10 escapes then vanish ── */
let nCount = 0, ySize = 14, currentNudge = '';
function flee(e) {
  if (e) e.stopPropagation();
  const btn = document.getElementById('noBtn');
  btn.classList.add('floating');
  const bw = btn.offsetWidth || 140, bh = btn.offsetHeight || 52;
  btn.style.left   = Math.max(10, Math.random() * (innerWidth - bw - 10)) + 'px';
  btn.style.top    = Math.max(62, Math.random() * (innerHeight - bh - 10)) + 'px';
  btn.style.right  = 'auto'; btn.style.bottom = 'auto';
  nCount++;
  if (ySize < 24) { ySize += 1.2; document.getElementById('yesBtn').style.fontSize = ySize + 'px'; }
  currentNudge = tx().noMsgs[Math.min(nCount - 1, tx().noMsgs.length - 1)];
  document.getElementById('nudge').textContent = currentNudge;
  if (nCount >= 10) {
    btn.style.transition = 'opacity 0.5s, transform 0.5s';
    btn.style.opacity = '0'; btn.style.transform = 'scale(0.05) rotate(45deg)';
    btn.style.pointerEvents = 'none';
    setTimeout(() => btn.style.display = 'none', 600);
  }
}

/* ── YES ── */
function onYes() {
  document.getElementById('yesBtn').disabled = true;
  document.getElementById('noBtn').style.display = 'none';
  document.getElementById('info').classList.add('show');
  burst();
  makeCard();
}

/* ── COPY ── */
function doCopy() {
  navigator.clipboard.writeText('01810343064').catch(() => {});
  const b = document.getElementById('cpBtn');
  b.textContent = tx().copied;
  setTimeout(() => b.textContent = tx().copy, 2200);
}

/* ── CONFETTI ── */
function burst() {
  const palettes = {
    ember: ['#c8624a', '#e8a080', '#f0c8a0', '#a84830', '#fff'],
    steel: ['#6090c8', '#a8c8f0', '#4070a8', '#c8d8f0', '#fff']
  };
  const cols = palettes[theme];
  const chars = ['◆', '●', '▲', '★', '✦', '◇', '○'];
  for (let i = 0; i < 80; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'cp';
      el.textContent = chars[Math.floor(Math.random() * chars.length)];
      el.style.left = Math.random() * 100 + 'vw';
      el.style.color = cols[Math.floor(Math.random() * cols.length)];
      el.style.fontSize = (8 + Math.random() * 14) + 'px';
      el.style.animationDuration = (1.2 + Math.random() * 2.2) + 's';
      el.style.animationDelay = Math.random() * 0.4 + 's';
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 4000);
    }, i * 12);
  }
}

/* ── EID CARD ── */
let cardMade = false;
function makeCard() {
  cardMade = true;
  document.getElementById('cardWrap').classList.add('show');
  document.getElementById('genWrap').style.display = 'none';
  drawCard();
}
function drawCard() {
  const c = document.getElementById('ec');
  const x = c.getContext('2d');
  const W = c.width, H = c.height;
  const P = {
    ember: { bg1: '#140608', bg2: '#200c0a', acc: '#c8624a', sub: '#a07060', txt: '#f0e2cc', muted: '#604030' },
    steel: { bg1: '#060c14', bg2: '#0c1828', acc: '#6090c8', sub: '#5080a8', txt: '#d8e0ec', muted: '#304060' }
  };
  const p = P[theme];
  const g = x.createLinearGradient(0, 0, W, H);
  g.addColorStop(0, p.bg1); g.addColorStop(1, p.bg2);
  x.fillStyle = g; x.fillRect(0, 0, W, H);

  x.strokeStyle = p.acc + '44'; x.lineWidth = 1; x.strokeRect(10, 10, W - 20, H - 20);
  x.strokeStyle = p.acc + '22'; x.lineWidth = 0.6; x.strokeRect(16, 16, W - 32, H - 32);

  [[20, 20], [W - 20, 20], [20, H - 20], [W - 20, H - 20]].forEach(([cx2, cy2]) => {
    x.fillStyle = p.acc + '88';
    x.beginPath(); x.moveTo(cx2, cy2 - 6); x.lineTo(cx2 + 6, cy2);
    x.lineTo(cx2, cy2 + 6); x.lineTo(cx2 - 6, cy2); x.closePath(); x.fill();
  });

  x.font = '32px serif'; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.fillText('🌙', W / 2 - 24, 50);
  x.font = '20px serif'; x.fillText('✦', W / 2 + 24, 50);

  x.fillStyle = p.acc;
  x.font = '300 34px "Playfair Display",serif';
  x.shadowColor = p.acc; x.shadowBlur = 18;
  x.fillText('Eid Mubarak', W / 2, 100);
  x.shadowBlur = 0;

  x.fillStyle = p.muted; x.font = 'italic 13px "Playfair Display",serif';
  x.fillText('Taqabbalallahu Minna Wa Minkum', W / 2, 125);

  x.strokeStyle = p.acc + '40'; x.lineWidth = 0.7;
  x.beginPath(); x.moveTo(60, 142); x.lineTo(W - 60, 142); x.stroke();

  x.fillStyle = p.sub; x.font = '300 14px "DM Sans",sans-serif';
  x.fillText("With warmest wishes and du'a,", W / 2, 165);
  x.fillStyle = p.txt;
  x.font = '700 22px "Playfair Display",serif';
  x.fillText('Fahim', W / 2, 194);
  x.fillStyle = p.muted; x.font = '300 12px "DM Sans",sans-serif';
  x.fillText('EID UL FITR  ' + new Date().getFullYear(), W / 2, 218);

  x.fillStyle = p.acc + '15'; x.fillRect(0, H - 32, W, 32);
  x.fillStyle = p.muted; x.font = '11px "DM Sans",sans-serif';
  x.fillText('May Allah accept from us and from you  ·  Ameen', W / 2, H - 13);
}
function dlCard() {
  const a = document.createElement('a');
  a.download = `EidCard-Fahim-${theme}.png`;
  a.href = document.getElementById('ec').toDataURL(); a.click();
}

/* ── INIT ── */
applyLang();