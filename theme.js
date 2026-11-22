(() => {
  const themeScript = document.createElement("script");
  themeScript.src = "https://comfy-themes.github.io/Spicetify/Comfy/theme.script.js";
  document.head.appendChild(themeScript);
  
const observer = new MutationObserver(() => {
    ['Update Spicetify', 'Marketplace', 'Comfy Settings', "What's New"].forEach(label => {
      document.querySelector(`[aria-label="${label}"]`)?.remove();
    });
    document.querySelectorAll('.main-entityHeader-backgroundColore').forEach(el => el.style.removeProperty('--background-base'));
    document.querySelectorAll('.playlist-playlist-actionBarBackground-background').forEach(el => el.removeAttribute('style'));
    
    const nav = document.querySelector('.custom-navlinks-scrollable_container');
    if (nav && !document.querySelector('#simo-label')) {
      nav.insertAdjacentHTML('beforebegin', '<span id="simo-label" style="color:var(--spice-play-button);font-weight:900;font-style:italic;letter-spacing:0.2em;text-transform:uppercase;text-shadow:0 0 4px rgba(var(--spice-rgb-play-button),0.95),0 0 9px rgba(var(--spice-rgb-play-button),0.75),0 0 18px rgba(var(--spice-rgb-play-button),0.55),0 0 34px rgba(var(--spice-rgb-play-button),0.35);">SIMO THATS WHY</span>');
    }
    
const topbarRight = document.querySelector('.main-topBar-topbarContentRight');
if (topbarRight && !document.querySelector('#simo-label2')) {
  topbarRight.insertAdjacentHTML('beforebegin', '<span id="simo-label2" style="color:var(--spice-heart);display:flex;align-items:center;font-weight:900;font-style:italic;letter-spacing:0.2em;text-transform:uppercase;text-shadow:0 0 4px rgba(var(--spice-rgb-heart),0.95),0 0 9px rgba(var(--spice-rgb-heart),0.75),0 0 18px rgba(var(--spice-rgb-heart),0.55),0 0 34px rgba(var(--spice-rgb-heart),0.35);">I LOVE U</span>');
}

  
document.querySelector('.main-globalNav-browseButtonWrapper')?.remove();
document.querySelector('[aria-label="Home"]')?.closest('button')?.remove();

  });
  observer.observe(document.body, { childList: true, subtree: true });
})();

(function () {
  const applyFix = () => {
    document.documentElement.style.setProperty("--comfy-topbar-height", "48px", "important");
  };
  applyFix();
  const observer = new MutationObserver(applyFix);
  observer.observe(document.documentElement, { attributes: true, childList: true, subtree: true });
})();

(function () {
  const observer = new MutationObserver(() => {
    const wrapper = document.querySelector('.main-nowPlayingWidget-actionButtonWrapper');
    if (!wrapper || wrapper.querySelector('.custom-suffix')) return;
    const span = document.createElement('span');
    span.className = 'custom-suffix';
    span.textContent = 'SIMO MADE THIS SHIT';
    span.style.cssText = 'color: var(--spice-subtext); font-size: 0.8em; margin-left: 8px; align-self: center;';
    wrapper.appendChild(span);
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();

(function () {
  const observer = new MutationObserver(() => {
    const input = document.querySelector('.main-globalNav-searchInputContainer input');
    if (input) input.placeholder = 'Merry Christmas! Family time! 🎄';
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();

(function () {
  const observer = new MutationObserver(() => {
    const title = document.querySelector('.main-entityHeader-title');
    const isLikedSongs = title && (title.textContent === 'Liked Songs' || title.textContent === 'not liked playlist');
    if (title && title.textContent === 'Liked Songs') title.textContent = 'not liked playlist';
    const pretitle = document.querySelector('.main-entityHeader-pretitle');
    if (pretitle) pretitle.style.display = 'none';
    const divider = document.querySelector('.fpf23YsCBf9MHAT_ZgnA');
    if (divider) divider.remove();
    if (isLikedSongs) {
      const img = document.querySelector('.main-entityHeader-image img');
      if (img && img.src !== 'https://i.imgur.com/GWeVKcP.png') {
        img.src = 'https://i.imgur.com/GWeVKcP.png';
        img.srcset = '';
      }
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();

// Live clock + date, centered in the top bar (interval only -- no observer)
(function () {
  const pad = (n) => String(n).padStart(2, '0');
  const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const tick = () => {
    let clock = document.querySelector('#simo-clock');
    if (!clock) {
      const anchor = document.querySelector('.main-topBar-container');
      if (!anchor) return;
      if (getComputedStyle(anchor).position === 'static') anchor.style.position = 'relative';
      clock = document.createElement('div');
      clock.id = 'simo-clock';
      clock.style.cssText = 'position:absolute;right:14px;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;align-items:flex-end;line-height:1.1;pointer-events:none;z-index:5;white-space:nowrap;font-variant-numeric:tabular-nums;';
      const time = document.createElement('span');
      time.className = 'simo-clock-time';
      time.style.cssText = 'color:var(--spice-play-button);font-weight:800;font-size:17px;letter-spacing:0.2em;text-shadow:0 0 8px rgba(var(--spice-rgb-play-button),0.5);';
      const date = document.createElement('span');
      date.className = 'simo-clock-date';
      date.style.cssText = 'color:var(--spice-subtext);font-weight:600;font-size:11px;letter-spacing:0.28em;margin-top:2px;';
      clock.appendChild(time);
      clock.appendChild(date);
      anchor.appendChild(clock);
    }
    const d = new Date();
    const t = pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
    const ds = DAYS[d.getDay()] + ' ' + pad(d.getDate()) + ' ' + MONTHS[d.getMonth()] + ' ' + d.getFullYear();
    const timeEl = clock.querySelector('.simo-clock-time');
    const dateEl = clock.querySelector('.simo-clock-date');
    let xm = document.querySelector('#simo-xmas');
    if (!xm) { xm = document.querySelector('#simo-xmas'); }
    if (!xm) {
      xm = document.createElement('div'); xm.id = 'simo-xmas'; xm.className = 'simo-clock-xmas';
      xm.style.cssText = 'position:absolute;left:55%;top:50%;transform:translate(-50%,-50%);pointer-events:none;z-index:5;white-space:nowrap;margin:0;';
      clock.parentElement.appendChild(xm);
    }
    const today = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    let xd = new Date(d.getFullYear(), 11, 25);
    if (today > xd) xd = new Date(d.getFullYear() + 1, 11, 25);
    const left = Math.round((xd - today) / 86400000);
    const xt = left === 0 ? '🎅 MERRY CHRISTMAS 🎅' : '🎄 ' + left + ' DAYS TO XMAS';
    if (xm.textContent !== xt) xm.textContent = xt;
    if (timeEl && timeEl.textContent !== t) timeEl.textContent = t;
    if (dateEl && dateEl.textContent !== ds) dateEl.textContent = ds;
  };
  setInterval(tick, 1000);
})();

// Hide the "Related music videos" section
(function () {
  const TARGET = 'related music videos';
  const removeSection = (el) => {
    let node = el.closest('section, [data-testid="component-shelf"], .main-shelf-shelf') || el;
    // climb up through wrappers that exist only to hold this section, so no empty gap is left
    while (
      node.parentElement &&
      node.parentElement !== document.body &&
      node.parentElement.children.length === 1
    ) {
      node = node.parentElement;
    }
    node.remove();
  };
  const kill = () => {
    document.querySelectorAll('[aria-label]').forEach(el => {
      if (el.getAttribute('aria-label').trim().toLowerCase() === TARGET) removeSection(el);
    });
    document.querySelectorAll('h1, h2, h3, [role="heading"], .main-shelf-title').forEach(el => {
      if (el.textContent && el.textContent.trim().toLowerCase() === TARGET) removeSection(el);
    });
  };
  const observer = new MutationObserver(kill);
  observer.observe(document.body, { childList: true, subtree: true });
})();


// ===== Christmas: falling snow + twinkling lights (low CPU, no observers) =====
(function () {
  if (window.__xmas) return; window.__xmas = true;
  const init = () => {
    if (!document.body) return setTimeout(init, 300);
    // lights
    const lights = document.createElement('div'); lights.id = 'xmas-lights';
    const colors = ['#ff3b3b', '#2ecc5f', '#f5c451', '#ffffff', '#3b8bff'];
    const n = Math.ceil(window.innerWidth / 34);
    for (let i = 0; i < n; i++) {
      const b = document.createElement('span'); b.className = 'bulb';
      b.style.setProperty('--c', colors[i % colors.length]);
      b.style.setProperty('--d', ((i * 0.37) % 1.6).toFixed(2) + 's');
      lights.appendChild(b);
    }
    document.body.appendChild(lights);
    // snow
    const cv = document.createElement('canvas'); cv.id = 'xmas-snow'; document.body.appendChild(cv);
    const ctx = cv.getContext('2d'); let w, h, flakes = [];
    const resize = () => { w = cv.width = innerWidth; h = cv.height = innerHeight; };
    resize(); addEventListener('resize', resize);
    for (let i = 0; i < 140; i++) flakes.push({ x: Math.random() * innerWidth, y: Math.random() * innerHeight, r: 1 + Math.random() * 2.6, s: .4 + Math.random() * 1.1, d: Math.random() * Math.PI * 2 });
    let last = 0;
    const frame = (t) => {
      requestAnimationFrame(frame);
      if (document.hidden || t - last < 33) return; last = t;
      ctx.clearRect(0, 0, w, h); ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.beginPath();
      for (const f of flakes) {
        f.y += f.s; f.d += .01; f.x += Math.sin(f.d) * .5;
        if (f.y > h + 5) { f.y = -5; f.x = Math.random() * w; }
        ctx.moveTo(f.x + f.r, f.y); ctx.arc(f.x, f.y, f.r, 0, 6.2832);
      }
      ctx.fill();
    };
    requestAnimationFrame(frame);
  };
  init();
})();
