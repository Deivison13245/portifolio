/* ========================================
   SCRIPT PRINCIPAL - PERSONA 3 RELOAD
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Elementos
    const navIndicator = document.querySelector('.nav-indicator');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main > section');

    // Configuração do indicador
    function updateIndicator(link) {
        const navMenu = document.querySelector('.nav-menu');
        const linkIndex = Array.from(navLinks).indexOf(link);
        
        if (navMenu.offsetWidth > navMenu.offsetHeight) {
            // Modo horizontal (mobile)
            const offset = link.offsetLeft;
            const width = link.offsetWidth;
            navIndicator.style.transform = `translateX(calc(${offset}px + ${width / 2}px - 3px))`;
        } else {
            // Modo vertical (desktop)
            const offset = link.offsetTop;
            const height = link.offsetHeight;
            navIndicator.style.transform = `translateY(calc(${offset}px + ${height / 2}px - 20px))`;
        }
    }

    // Click em links de navegação
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            updateIndicator(this);
        });
    });

    // Intersection Observer para animações de entrada
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Encontrar elementos dentro da seção para animar
                const animatedElements = entry.target.querySelectorAll(
                    '.about-text, .skill-card, .project-card'
                );
                animatedElements.forEach(el => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // Scroll para atualizar indicador de navegação
    window.addEventListener('scroll', function() {
        let currentSection = null;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop - 200 && window.scrollY < sectionTop + sectionHeight - 200) {
                currentSection = section.id;
            }
        });

        if (currentSection) {
            const correspondingLink = document.querySelector(`[data-section="${currentSection}"]`);
            if (correspondingLink) {
                navLinks.forEach(l => l.classList.remove('active'));
                correspondingLink.classList.add('active');
                updateIndicator(correspondingLink);
            }
        }
    });

    // Inicializar com primeiro link ativo
    if (navLinks.length > 0) {
        navLinks[0].classList.add('active');
        updateIndicator(navLinks[0]);
    }

    // Ajustar indicador ao redimensionar
    window.addEventListener('resize', function() {
        const activeLink = document.querySelector('.nav-link.active');
        if (activeLink) {
            updateIndicator(activeLink);
        }
    });
});
