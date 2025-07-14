// Slow fade-in and fade-out scroll animation for all sections
// Adds/removes .visible on .section-fade elements as they enter/exit viewport

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section, header, footer');
    sections.forEach(sec => sec.classList.add('section-fade'));
    function fadeSectionsOnScroll() {
        const windowHeight = window.innerHeight;
        sections.forEach(sec => {
            const rect = sec.getBoundingClientRect();
            if (rect.top < windowHeight - 60 && rect.bottom > 60) {
                sec.classList.add('visible');
            } else {
                sec.classList.remove('visible');
            }
        });
    }
    window.addEventListener('scroll', fadeSectionsOnScroll);
    window.addEventListener('resize', fadeSectionsOnScroll);
    fadeSectionsOnScroll();
});
