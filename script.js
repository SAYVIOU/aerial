  /* ─── Curseur personnalisé ─── */
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursorRing');

  // Cacher le curseur seulement si on détecte une vraie souris
  let hasMouse = false;
  let mx = window.innerWidth / 2;
  let my = window.innerHeight / 2;
  let rx = mx, ry = my;

  document.addEventListener('mousemove', e => {
    if (!hasMouse) {
      hasMouse = true;
      document.body.style.cursor = 'none';
      cursor.style.opacity = '1';
      ring.style.opacity = '1';
    }
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  // Curseur caché par défaut, affiché seulement quand la souris bouge
  cursor.style.opacity = '0';
  ring.style.opacity   = '0';
  document.body.style.cursor = 'auto';

  (function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  })();

  document.querySelectorAll('a, .portfolio-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.transform = 'translate(-50%,-50%) scale(1.8)';
      ring.style.borderColor = 'rgba(201,168,76,0.9)';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.transform = 'translate(-50%,-50%) scale(1)';
      ring.style.borderColor = 'rgba(201,168,76,0.5)';
    });
  });

  /* ─── Scroll reveal (robuste) ─── */
  function revealAll() {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }

  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(r => obs.observe(r));

    // Filet de sécurité : si après 2s des éléments sont encore cachés, on les force
    setTimeout(() => {
      document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
        el.classList.add('visible');
      });
    }, 2000);
  } else {
    // Navigateur sans IntersectionObserver : tout afficher immédiatement
    revealAll();
  }

  /* ─── Nav fond au scroll ─── */
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 60) {
      nav.style.background     = 'rgba(8,8,8,0.97)';
      nav.style.backdropFilter = 'blur(20px)';
      nav.style.borderBottom   = '1px solid rgba(201,168,76,0.1)';
    } else {
      nav.style.background     = '';
      nav.style.backdropFilter = '';
      nav.style.borderBottom   = '';
    }
  });

  /* ─── Smooth scroll ─── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });
