const progress = document.querySelector('.scroll-progress');
const backToTop = document.querySelector('.back-to-top');
const sectionIds = ['aboutme', 'subtitle2', 'subtitle3'];
const routeBySectionId = {
    aboutme: 'aboutme',
    subtitle2: 'experiences',
    subtitle3: 'contact'
};
const sectionIdByRoute = Object.fromEntries(
    Object.entries(routeBySectionId).map(([sectionId, route]) => [route, sectionId])
);

function navigateToSection(route, updateUrl = true) {
    const sectionId = sectionIdByRoute[route];
    const section = sectionId ? document.getElementById(sectionId) : null;

    if (!section) return;

    if (updateUrl) {
        window.history.pushState({}, '', `/${route}`);
    }

    section.scrollIntoView({ behavior: 'smooth' });
}

function updateScrollState() {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progressPercent = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;

    if (progress) progress.style.width = `${progressPercent}%`;
    if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 400);
}

function setActiveNavigation(entries) {
    entries.forEach((entry) => {
        const route = routeBySectionId[entry.target.id];
        const navigationLink = document.querySelector(`a[href="https://irisli1.github.io/${route}"]`);
        if (navigationLink) {
            navigationLink.parentElement.classList.toggle('active', entry.isIntersecting);
        }
    });
}

window.addEventListener('scroll', updateScrollState, { passive: true });
updateScrollState();

document.querySelectorAll('.navigationbuttons a[href^="https://irisli1.github.io/"]').forEach((link) => {
    link.addEventListener('click', (event) => {
        const route = link.pathname.replace(/^\//, '');
        if (sectionIdByRoute[route]) {
            event.preventDefault();
            navigateToSection(route);
        }
    });
});

const initialRoute = window.location.pathname.replace(/^\//, '');
if (sectionIdByRoute[initialRoute]) {
    navigateToSection(initialRoute, false);
}

window.addEventListener('popstate', () => {
    const route = window.location.pathname.replace(/^\//, '');
    if (sectionIdByRoute[route]) {
        navigateToSection(route, false);
    }
});

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

const sectionObserver = new IntersectionObserver(setActiveNavigation, {
    rootMargin: '-35% 0px -55%'
});

sectionIds.forEach((id) => {
    const section = document.getElementById(id);
    if (section) {
        sectionObserver.observe(section);
    }
});
