/* K12Launch — Main JavaScript */

/* ── Mobile Navigation ─────────────────────────────────────── */
(function () {
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileNav = document.querySelector('.nav-mobile');
  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
      mobileNav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
})();

/* ── Active nav link ───────────────────────────────────────── */
(function () {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

/* ── FAQ Accordion ─────────────────────────────────────────── */
(function () {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
})();

/* ── Scroll reveal ─────────────────────────────────────────── */
(function () {
  const els = document.querySelectorAll('.card, .feature-card, .pricing-card, .testimonial, .step, .blog-card, .reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  els.forEach(el => { el.classList.add('reveal'); obs.observe(el); });
})();

/* ── Form handling (contact / application) ─────────────────── */
(function () {
  document.querySelectorAll('form[data-form]').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const successEl = form.querySelector('.alert--success');
      const errorEl   = form.querySelector('.alert--error');

      btn.disabled = true;
      btn.textContent = 'Sending…';
      if (successEl) successEl.style.display = 'none';
      if (errorEl)   errorEl.style.display   = 'none';

      /* Collect form data */
      const data = Object.fromEntries(new FormData(form).entries());
      const formType = form.dataset.form;

      /*
        INTEGRATION POINT:
        Replace the setTimeout below with a real fetch() to your backend,
        Formspree, EmailJS, or GoDaddy form handler.

        Example with Formspree:
        const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(data)
        });
        const ok = res.ok;
      */

      await new Promise(r => setTimeout(r, 900)); // remove when wired to backend
      const ok = true; // replace with actual response check

      btn.disabled = false;
      btn.textContent = btn.dataset.label || 'Submit';

      if (ok) {
        if (successEl) successEl.style.display = 'block';
        form.reset();
        /* Scroll to success message */
        successEl?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        if (errorEl) errorEl.style.display = 'block';
      }
    });

    /* Store original button label */
    const btn = form.querySelector('[type="submit"]');
    if (btn) btn.dataset.label = btn.textContent;
  });
})();

/* ── Pricing toggle (monthly / annual) ─────────────────────── */
(function () {
  const toggle = document.getElementById('billing-toggle');
  if (!toggle) return;

  const prices = {
    starter: { monthly: 49,  annual: 39  },
    growth:  { monthly: 89,  annual: 71  },
    pro:     { monthly: 149, annual: 119 },
  };

  toggle.addEventListener('change', () => {
    const isAnnual = toggle.checked;
    const label = document.getElementById('billing-label');
    if (label) label.textContent = isAnnual ? 'Billed annually (save 20%)' : 'Billed monthly';

    Object.keys(prices).forEach(tier => {
      const el = document.getElementById(`price-${tier}`);
      if (el) el.textContent = isAnnual ? prices[tier].annual : prices[tier].monthly;
    });
  });
})();

/* ── Smooth anchor scroll ───────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
