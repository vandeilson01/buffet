// ==================== MENU MOBILE ====================

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle) {
  menuToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
  });

  // Fechar menu ao clicar em um link
  const navLinks = navMenu.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navMenu.classList.remove('active');
    });
  });
}

// ==================== FORMULÁRIO DE CONTATO ====================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const assunto = document.getElementById('assunto').value;
    const mensagem = document.getElementById('mensagem').value;

    // Validação básica
    if (!nome || !email || !telefone || !assunto || !mensagem) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Por favor, insira um email válido!');
      return;
    }

    // Simular envio (em produção, isso seria enviado para um servidor)
    const mensagemWhatsApp = `Olá! Meu nome é ${nome}.\n\nAssunto: ${assunto}\n\nMensagem: ${mensagem}\n\nMeu email: ${email}\nMeu telefone: ${telefone}`;
    const urlWhatsApp = `https://wa.me/5511963146223?text=${encodeURIComponent(mensagemWhatsApp)}`;

    // Abrir WhatsApp
    window.open(urlWhatsApp, '_blank');

    // Limpar formulário
    contactForm.reset();
    alert('Sua mensagem foi preparada! Você será redirecionado para o WhatsApp.');
  });
}

// ==================== ANIMAÇÕES DE SCROLL ====================

// Adicionar efeito de fade-in aos cards quando aparecerem na tela
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Aplicar observer aos cards
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(card);
});

// ==================== SCROLL SUAVE ====================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// ==================== EFEITO DE HOVER NOS BOTÕES ====================

const buttons = document.querySelectorAll('.cta-button');
buttons.forEach(button => {
  button.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.05)';
  });

  button.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
  });
});

// ==================== GALERIA INTERATIVA ====================

const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
  item.addEventListener('click', function() {
    const img = this.querySelector('img');
    const src = img.src;
    const alt = img.alt;

    // Criar modal
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2000;
      cursor: pointer;
    `;

    const modalImg = document.createElement('img');
    modalImg.src = src;
    modalImg.alt = alt;
    modalImg.style.cssText = `
      max-width: 90%;
      max-height: 90%;
      border-radius: 15px;
      box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
    `;

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '✕';
    closeBtn.style.cssText = `
      position: absolute;
      top: 20px;
      right: 20px;
      background: white;
      border: none;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      font-size: 24px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
    `;

    closeBtn.addEventListener('mouseenter', function() {
      this.style.background = '#8B3A8B';
      this.style.color = 'white';
    });

    closeBtn.addEventListener('mouseleave', function() {
      this.style.background = 'white';
      this.style.color = 'black';
    });

    modal.appendChild(modalImg);
    modal.appendChild(closeBtn);

    const closeModal = function() {
      modal.remove();
    };

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeModal();
      }
    });

    document.body.appendChild(modal);
  });
});

// ==================== CONTADOR DE NÚMEROS ====================

function animateCounter(element, target, duration = 2000) {
  let current = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// ==================== VALIDAÇÃO DE FORMULÁRIO EM TEMPO REAL ====================

const inputs = document.querySelectorAll('input, textarea');
inputs.forEach(input => {
  input.addEventListener('blur', function() {
    if (this.value.trim() === '') {
      this.style.borderColor = '#ff6b6b';
    } else {
      this.style.borderColor = '#ddd';
    }
  });

  input.addEventListener('focus', function() {
    this.style.borderColor = '#8B3A8B';
  });
});

// ==================== EFEITO PARALLAX ====================

window.addEventListener('scroll', function() {
  const scrolled = window.pageYOffset;
  const heroSections = document.querySelectorAll('.hero');

  heroSections.forEach(hero => {
    const rect = hero.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      hero.style.backgroundPosition = `center ${scrolled * 0.5}px`;
    }
  });
});

// ==================== NOTIFICAÇÃO DE SUCESSO ====================

function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 2rem;
    background: ${type === 'success' ? '#4CAF50' : '#f44336'};
    color: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 3000;
    animation: slideIn 0.3s ease;
  `;

  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// ==================== ADICIONAR ESTILOS DE ANIMAÇÃO ====================

const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

document.head.appendChild(style);

// ==================== INICIALIZAÇÃO ====================

console.log('✨ Carinha de Anjo Buffet - Site carregado com sucesso!');
