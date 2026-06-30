const body = document.body;
const nav = document.querySelector('.nav');
const menuToggle = document.querySelector('.menu-toggle');

const closeMenu = () => {
    body.classList.remove('nav-open');
    if (menuToggle) {
        menuToggle.setAttribute('aria-expanded', 'false');
    }
};

const openMenu = () => {
    body.classList.add('nav-open');
    if (menuToggle) {
        menuToggle.setAttribute('aria-expanded', 'true');
    }
};

menuToggle?.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    if (expanded) {
        closeMenu();
    } else {
        openMenu();
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeMenu();
    }
});

window.addEventListener('click', (event) => {
    if (!body.classList.contains('nav-open')) return;
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (target.closest('.nav')) return;
    closeMenu();
});

const scrollLinks = document.querySelectorAll('[data-scroll]');
scrollLinks.forEach((el) => {
    el.addEventListener('click', (event) => {
        const selector = el.getAttribute('data-scroll');
        if (!selector) return;
        const target = document.querySelector(selector);
        if (target) {
            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            closeMenu();
        }
    });
});

document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => {
        if (body.classList.contains('nav-open')) {
            closeMenu();
        }
    });
});

const updateNavState = () => {
    if (!nav) return;
    if (window.scrollY > 24) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
};

window.addEventListener('scroll', updateNavState);
updateNavState();

const yearHolder = document.querySelector('.js-year');
if (yearHolder) {
    yearHolder.textContent = new Date().getFullYear().toString();
}
