function toggleMenu(open) {
  const d = document.getElementById('drawer');
  const o = document.getElementById('overlay');
  if (!d || !o) return;

  const willOpen = typeof open === 'boolean' ? open : !d.classList.contains('open');
  d.classList.toggle('open', willOpen);
  o.classList.toggle('open', willOpen);
  document.body.classList.toggle('menu-open', willOpen);
  d.setAttribute('aria-hidden', willOpen ? 'false' : 'true');
}

function normalizeBrokenLinks() {
  document.querySelectorAll('a[href="usage.html"]').forEach((a) => {
    a.setAttribute('href', 'guilu-howto-eat.html');
    if (a.textContent.trim() === '使用方式') a.textContent = '使用方式';
  });
}

function markCurrentLinks() {
  const path = location.pathname.split('/').pop() || 'index.html';
  const groups = {
    product: ['guilu-series.html', 'products.html', 'choose.html'],
    knowledge: ['what-is-guilu.html', 'ingredients.html', 'guilu-howto-eat.html', 'pairing.html', 'seasons.html', 'guilu-recipes.html', 'videos.html'],
    brand: ['brand-story.html', 'brand-origin.html', 'founder.html', 'about.html'],
    support: ['faq.html', 'contact.html', 'line.html']
  };

  document.querySelectorAll('a[href]').forEach((a) => {
    const href = a.getAttribute('href');
    if (!href || href.startsWith('http') || href.startsWith('#')) return;
    if (href === path) {
      a.classList.add('is-current');
      a.setAttribute('aria-current', 'page');
      const sec = a.closest('.drawer-section');
      if (sec) sec.open = true;
    }
  });

  Object.entries(groups).forEach(([name, pages]) => {
    if (pages.includes(path)) {
      const sec = document.querySelector(`.drawer-section[data-group="${name}"]`);
      if (sec) sec.open = true;
      document.querySelectorAll('.topnav .nav-item.has-drop > a').forEach((a) => {
        const href = a.getAttribute('href');
        if (pages.includes(href) || 
            (name === 'product' && href === 'guilu-series.html') ||
            (name === 'knowledge' && href === 'what-is-guilu.html') ||
            (name === 'brand' && href === 'brand-story.html') ||
            (name === 'support' && href === 'faq.html')) {
          a.classList.add('is-current-parent');
        }
      });
    }
  });
}

function setupDrawer() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') toggleMenu(false);
  });

  document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'overlay') toggleMenu(false);
  });

  document.addEventListener('click', (e) => {
    const drawer = document.getElementById('drawer');
    if (!drawer || !drawer.classList.contains('open')) return;
    const link = e.target.closest('a');
    if (link && drawer.contains(link)) toggleMenu(false);
  });

  document.querySelectorAll('.drawer-section > summary').forEach((summary) => {
    summary.addEventListener('click', () => {
      const current = summary.parentElement;
      document.querySelectorAll('.drawer-section').forEach((sec) => {
        if (sec !== current) sec.removeAttribute('open');
      });
    });
  });
}

function ensureLineFloat() {
  if (document.querySelector('.line-float')) return;
  const a = document.createElement('a');
  a.className = 'line-float';
  a.href = 'line.html';
  a.setAttribute('aria-label', 'LINE 詢問');
  a.innerHTML = '<span class="line-float__text">LINE</span>';
  document.body.appendChild(a);
}

function setupVideoEmbed() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.video-load');
    if (!btn) return;

    const wrap = btn.closest('.video-embed');
    if (!wrap) return;

    const videoId = wrap.getAttribute('data-video-id');
    if (!videoId) return;

    wrap.innerHTML = `<iframe class="video-frame" src="https://www.tiktok.com/embed/v2/${videoId}" allowfullscreen loading="lazy"></iframe>`;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  normalizeBrokenLinks();
  markCurrentLinks();
  setupDrawer();
  ensureLineFloat();
  setupVideoEmbed();
});
