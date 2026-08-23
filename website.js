const progress = document.querySelector('.scroll-progress');
const backToTop = document.querySelector('.back-to-top');
const sectionIds = ['aboutme', 'experiences', 'contactme'];

function updateScrollState() {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progressPercent = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;

    if (progress) progress.style.width = `${progressPercent}%`;
    if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 400);
}

function setActiveNavigation(entries) {
    entries.forEach((entry) => {
        const navigationLink = document.querySelector(`a[href="#${entry.target.id}"]`);
        if (navigationLink) {
            navigationLink.parentElement.classList.toggle('active', entry.isIntersecting);
        }
    });
}

window.addEventListener('scroll', updateScrollState, { passive: true });
updateScrollState();

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
