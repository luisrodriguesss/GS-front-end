document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');

  function closeMenu() {
    if (menu) menu.classList.remove('menu-open');
    if (toggle) {
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  }

  if (toggle && menu) {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = menu.classList.toggle('menu-open');
      toggle.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && !toggle.contains(e.target) && menu.classList.contains('menu-open')) {
        closeMenu();
      }
    });

    menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => closeMenu()));
  }

  const form = document.querySelector('form.formulario-contato');
  if (form) {
    form.addEventListener('submit', (e) => {
      
      form.querySelectorAll('.error-message').forEach(el => el.remove());

      const requiredFields = Array.from(form.querySelectorAll('[required]'));
      let valid = true;

      requiredFields.forEach(field => {
        const value = (field.value || '').trim();
        if (!value) {
          valid = false;
          const msg = document.createElement('div');
          msg.className = 'error-message';
          msg.textContent = 'Este campo é obrigatório';
          field.parentNode.appendChild(msg);
        }
      });

      if (!valid) {
        e.preventDefault();
        const firstError = form.querySelector('.error-message');
        if (firstError) {
          const focusTarget = firstError.previousElementSibling;
          if (focusTarget && typeof focusTarget.focus === 'function') focusTarget.focus();
        }
      }
    });

    form.addEventListener('input', (e) => {
      const field = e.target;
      if (!(field instanceof HTMLElement)) return;
      const msg = field.parentNode && field.parentNode.querySelector && field.parentNode.querySelector('.error-message');
      if (msg && (field.value || '').trim()) msg.remove();
    });
  }
});
