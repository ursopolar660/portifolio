// Seletores globais
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');
const logo = document.querySelector('.logo');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav ul');
const contactButton = document.querySelector('.contact-button');

// Função: Atualizar link ativo no menu com base no scroll
function changeActiveLink() {
    let index = sections.length;

    while (--index && window.scrollY + 150 < sections[index].offsetTop) {}

    navLinks.forEach(link => link.classList.remove('active'));
    navLinks[index].classList.add('active');
}

// Evento: Atualizar link ativo ao rolar a página
window.addEventListener('scroll', changeActiveLink);
changeActiveLink(); // Chamada inicial

// Função: Suavizar scroll ao clicar nos links do menu
function smoothScroll() {
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
}
smoothScroll();

// Função: Efeito de fade-in ao rolar para as seções
function fadeInSections() {
    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Remove o observador após a animação
                }
            });
        },
        { threshold: 0.2 } // Inicia o efeito quando 20% da seção está visível
    );

    sections.forEach(section => {
        section.classList.add('hidden'); // Adiciona a classe inicial de ocultação
        observer.observe(section);
    });
}
fadeInSections();

// Evento: Exibir mensagem ao clicar no botão de contato
contactButton.addEventListener('click', () => {
    alert('Obrigado por entrar em contato! Entraremos em breve.');
});

// Evento: Suavizar foco no header ao pressionar Enter no logo
logo.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// Função: Alternar menu hamburguer
function toggleHamburgerMenu() {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('open');
    });

    // Fechar menu ao clicar em um link
    navMenu.addEventListener('click', e => {
        if (e.target.tagName === 'A') {
            navMenu.classList.remove('active');
            hamburger.classList.remove('open');
        }
    });
}
toggleHamburgerMenu();