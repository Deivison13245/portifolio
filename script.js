/* ========================================
   SCRIPT PRINCIPAL - PERSONA 3 RELOAD
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Elementos
    const moonPhases = document.querySelectorAll('.moon-phase');
    const sections = document.querySelectorAll('main > section');

    // Atualizar lua ativa baseado na seção visível
    function updateActiveMoon() {
        let currentSection = null;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop - 300 && window.scrollY < sectionTop + sectionHeight - 300) {
                currentSection = section.id;
            }
        });

        if (currentSection) {
            moonPhases.forEach(moon => {
                moon.classList.remove('active');
            });
            const activeMoon = document.querySelector(`[data-section="${currentSection}"]`);
            if (activeMoon) {
                activeMoon.classList.add('active');
            }
        }
    }

    // Click em luas de navegação - deixar o link funcionar normalmente
    moonPhases.forEach(moon => {
        moon.addEventListener('click', function() {
            // Remover active de todas as luas
            moonPhases.forEach(m => m.classList.remove('active'));
            // Adicionar active na lua clicada
            this.classList.add('active');
            // O navegador vai naturalmente seguir o href
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

    // Scroll para atualizar lua ativa
    window.addEventListener('scroll', function() {
        updateActiveMoon();
    });

    // Inicializar com primeira lua ativa
    if (moonPhases.length > 0) {
        moonPhases[0].classList.add('active');
    }

    // Ajustar ao redimensionar
    window.addEventListener('resize', function() {
        updateActiveMoon();
    });
});
