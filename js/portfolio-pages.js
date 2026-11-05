const menuButton = document.querySelector('.hamburger');
const siteMenu = document.querySelector('#menu');
const siteHeader = document.querySelector('.site-header');
const menuLinks = siteMenu ? [...siteMenu.querySelectorAll('a')] : [];
const isMobileMenu = window.matchMedia('(max-width: 900px)');

function setMenuOpen(open, { returnFocus = true } = {}) {
  if (!menuButton || !siteMenu || !siteHeader) return;
  siteMenu.classList.toggle('open', open);
  siteHeader.classList.toggle('menu-active', open);
  document.body.classList.toggle('menu-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');

  if (open && isMobileMenu.matches) {
    siteMenu.setAttribute('role', 'dialog');
    siteMenu.setAttribute('aria-modal', 'true');
    siteMenu.setAttribute('aria-label', 'サイトメニュー');
    window.portfolioLenis?.stop();
    menuLinks[0]?.focus();
  } else {
    siteMenu.removeAttribute('role');
    siteMenu.removeAttribute('aria-modal');
    siteMenu.removeAttribute('aria-label');
    window.portfolioLenis?.start();
    if (returnFocus) menuButton.focus();
  }
}

if (menuButton && siteMenu) {
  menuButton.setAttribute('aria-controls', 'menu');
  menuButton.setAttribute('aria-label', 'メニューを開く');
  menuButton.addEventListener('click', () => {
    setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true');
  });

  menuLinks.forEach(link => link.addEventListener('click', () => {
    if (menuButton.getAttribute('aria-expanded') === 'true') setMenuOpen(false);
  }));

  document.addEventListener('keydown', event => {
    if (menuButton.getAttribute('aria-expanded') !== 'true' || !isMobileMenu.matches) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      setMenuOpen(false);
      return;
    }
    if (event.key !== 'Tab') return;

    const focusable = [menuButton, ...menuLinks];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  isMobileMenu.addEventListener('change', event => {
    if (!event.matches && menuButton.getAttribute('aria-expanded') === 'true') {
      setMenuOpen(false, { returnFocus: false });
    }
  });
}

const toTop = document.querySelector('.portfolio-top');
window.addEventListener('scroll', () => toTop?.classList.toggle('visible', window.scrollY > 300), { passive: true });
