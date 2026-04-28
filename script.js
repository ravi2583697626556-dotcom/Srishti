/* ══════════════════════════════
   IMAGE PATH HELPER
══════════════════════════════ */
const BASE = 'img/img ';
const img = n => `${BASE}(${n}).jpeg`;

/* ══════════════════════════════
   FIREFLIES
══════════════════════════════ */
const fireflyCanvas = document.getElementById('firefly-canvas');
const ffCtx = fireflyCanvas.getContext('2d');

function resizeFireflyCanvas() {
  fireflyCanvas.width  = window.innerWidth;
  fireflyCanvas.height = window.innerHeight;
}
resizeFireflyCanvas();
window.addEventListener('resize', resizeFireflyCanvas);

const flies = Array.from({ length: 55 }, () => ({
  x:     Math.random() * window.innerWidth,
  y:     Math.random() * window.innerHeight,
  r:     Math.random() * 1.8 + 0.6,
  vx:    (Math.random() - 0.5) * 0.5,
  vy:    (Math.random() - 0.5) * 0.5,
  phase: Math.random() * Math.PI * 2,
  speed: Math.random() * 0.02 + 0.01,
}));

function animateFireflies() {
  ffCtx.clearRect(0, 0, fireflyCanvas.width, fireflyCanvas.height);
  const t = Date.now() * 0.001;

  flies.forEach(f => {
    f.x += f.vx + Math.sin(t * f.speed + f.phase) * 0.4;
    f.y += f.vy + Math.cos(t * f.speed + f.phase) * 0.3;

    // wrap around edges
    if (f.x < 0) f.x = fireflyCanvas.width;
    if (f.x > fireflyCanvas.width)  f.x = 0;
    if (f.y < 0) f.y = fireflyCanvas.height;
    if (f.y > fireflyCanvas.height) f.y = 0;

    const alpha = 0.4 + 0.6 * Math.abs(Math.sin(t * f.speed * 3 + f.phase));

    ffCtx.beginPath();
    ffCtx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
    ffCtx.fillStyle    = `rgba(232,255,128,${alpha * 0.8})`;
    ffCtx.shadowColor  = 'rgba(232,255,128,.6)';
    ffCtx.shadowBlur   = 8;
    ffCtx.fill();
    ffCtx.shadowBlur   = 0;
  });

  requestAnimationFrame(animateFireflies);
}
animateFireflies();

/* ══════════════════════════════
   HEX GRID  (photos 1–6)
══════════════════════════════ */
const hexGrid = document.getElementById('hex-grid');

for (let n = 1; n <= 6; n++) {
  const wrap = document.createElement('div');
  wrap.className = 'hex-wrap';

  const item = document.createElement('div');
  item.className = 'hex-item reveal';
  item.innerHTML = `<img src="${img(n)}" alt="Srishti photo ${n}" loading="lazy">
                    <div class="hex-glow"></div>`;
  item.addEventListener('click', () => openLightbox(img(n)));

  wrap.appendChild(item);
  hexGrid.appendChild(wrap);
}

/* ══════════════════════════════
   STRING LIGHTS  (photos 7–14)
══════════════════════════════ */
const bulbsRow    = document.getElementById('bulbs-row');
const stringPhotos = document.getElementById('string-photos');

const cardRotations = [-4, 2, -3, 5, -2, 3, -5, 2];
const cardCaptions  = ['Pure Joy', 'My Star', 'Sunshine', 'Glowing', 'Lovely', 'Precious', 'Radiant', 'Golden'];

// Spawn bulbs along the rope
for (let i = 0; i < 10; i++) {
  const bulb = document.createElement('div');
  bulb.className = 'bulb';
  bulb.style.setProperty('--fspd',        (1.5 + Math.random() * 2) + 's');
  bulb.style.setProperty('animation-delay', (Math.random() * 2) + 's');
  bulbsRow.appendChild(bulb);
}

// Polaroid cards — doubled for seamless infinite loop
function buildCards() {
  for (let i = 0; i < 8; i++) {
    const n    = 7 + i;
    const card = document.createElement('div');
    card.className = 'string-card';
    card.style.setProperty('--rot', cardRotations[i] + 'deg');
    card.innerHTML = `<img src="${img(n)}" alt="Srishti photo ${n}" loading="lazy">
                      <p class="string-caption">${cardCaptions[i]}</p>`;
    card.addEventListener('click', () => openLightbox(img(n)));
    stringPhotos.appendChild(card);
  }
}
buildCards(); // original set
buildCards(); // duplicate set — keeps animation seamless

// Force animation to start clean from position 0 (slide LEFT)
stringPhotos.style.transform = 'translateX(0)';
stringPhotos.style.animation = 'none';
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    stringPhotos.style.animation = '';
  });
});

/* ══════════════════════════════
   CIRCULAR PORTRAITS  (photos 16–21)
══════════════════════════════ */
const circlesGrid = document.getElementById('circles-grid');
const circleLabels = ['Timeless', 'Joyful', 'Fierce', 'Graceful', 'Radiant', 'Golden'];

for (let i = 0; i < 6; i++) {
  const n    = 16 + i;
  const item = document.createElement('div');
  item.className = 'circle-item reveal';
  item.innerHTML = `
    <div class="circle-img-wrap">
      <img src="${img(n)}" alt="Srishti photo ${n}" loading="lazy">
    </div>
    <span class="circle-label">${circleLabels[i]}</span>`;
  item.addEventListener('click', () => openLightbox(img(n)));
  circlesGrid.appendChild(item);
}

/* ══════════════════════════════
   WISHES
══════════════════════════════ */
const wishesGrid = document.getElementById('wishes-grid');

const wishes = [
  { e: '🌿', t: 'May every dream you dare to dream come true this year.' },
  { e: '✨', t: 'May joy find you in the most unexpected, beautiful places.' },
  { e: '💪', t: 'May your strength never waver, even on the hardest days.' },
  { e: '🌙', t: 'May your nights be filled with peace and your mornings with hope.' },
  { e: '💛', t: 'May you always be surrounded by people who truly see you.' },
  { e: '🔥', t: 'May the fire inside you burn brighter than ever before.' },
  { e: '🌸', t: 'May every chapter this year be better than the last.' },
  { e: '🎓', t: 'May every goal you set become a story worth telling.' },
  { e: '✈️', t: 'May adventure find your doorstep and take you somewhere magical.' },
  { e: '😂', t: 'May laughter be the soundtrack of every single day.' },
  { e: '💖', t: 'May you love yourself as deeply as those who love you do.' },
  { e: '🌟', t: 'May this be the year the whole world sees what I already know.' },
];

wishes.forEach(w => {
  const card = document.createElement('div');
  card.className = 'wish-card reveal';
  card.innerHTML = `<span class="wish-icon">${w.e}</span>
                    <p class="wish-text">${w.t}</p>`;
  wishesGrid.appendChild(card);
});

/* ══════════════════════════════
   FOOTER PHOTOS  (21, 22, 23)
══════════════════════════════ */
const footerPhotos = document.getElementById('footer-photos');

[22, 23, 21].forEach(n => {
  const div = document.createElement('div');
  div.className = 'footer-photo';
  div.innerHTML = `<img src="${img(n)}" alt="Srishti photo ${n}" loading="lazy">`;
  div.addEventListener('click', () => openLightbox(img(n)));
  footerPhotos.appendChild(div);
});

/* ══════════════════════════════
   LIGHTBOX
══════════════════════════════ */
const lightbox    = document.getElementById('lb');
const lightboxImg = document.getElementById('lb-img');
const lightboxClose = document.getElementById('lb-x');

function openLightbox(src) {
  lightboxImg.src = src;
  lightbox.classList.add('on');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('on');
  lightboxImg.src = '';
  document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

/* ══════════════════════════════
   SCROLL REVEAL
══════════════════════════════ */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('on');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
