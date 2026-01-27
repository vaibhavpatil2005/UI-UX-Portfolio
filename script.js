// Loader
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById("loader").style.opacity = '0';
    document.getElementById("loader").style.pointerEvents = 'none';
  }, 1500);
});

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const nav = document.querySelector('nav');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    hamburger.classList.toggle('active');
  });

  // Only close menu on mobile when link is clicked
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      // Only hide nav if hamburger is visible (mobile)
      if (window.innerWidth <= 768) {
        nav.style.display = 'none';
        hamburger.classList.remove('active');
      }
    });
  });
}

// Reset nav display on window resize
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    nav.style.display = 'flex';
    hamburger.classList.remove('active');
  }
});

// Scroll Animation
const sections = document.querySelectorAll(".section");

const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "fadeUp 0.8s ease forwards";
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

sections.forEach((section, index) => {
  section.style.opacity = '0';
  section.style.animationDelay = `${index * 0.1}s`;
  observer.observe(section);
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(15, 23, 42, 0.95)';
    navbar.style.backdropFilter = 'blur(20px)';
  } else {
    navbar.style.background = 'rgba(15, 23, 42, 0.7)';
  }
});

// Active Navigation Link
window.addEventListener('scroll', () => {
  let current = '';
  const sections_list = document.querySelectorAll('section');

  sections_list.forEach(section => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = '#38bdf8';
    } else {
      link.style.color = '#e2e8f0';
    }
  });
});

// Card Hover Effect
document.querySelectorAll('.card, .cert-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-15px)';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
  });
});

// Button Click Effects
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const ripple = document.createElement('span');
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    btn.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
});

// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Parallax Effect
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.backgroundPosition = `0 ${window.pageYOffset * 0.5}px`;
  }
});

// Counter Animation
const animateCounters = () => {
  document.querySelectorAll('.stat-number').forEach(stat => {
    const target = parseInt(stat.textContent);
    let current = 0;
    const increment = target / 50;

    const updateCount = () => {
      if (current < target) {
        current += increment;
        stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '');
        requestAnimationFrame(updateCount);
      } else {
        stat.textContent = target + (stat.textContent.includes('+') ? '+' : '');
      }
    };

    // Trigger animation when element is in view
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        updateCount();
        observer.unobserve(stat);
      }
    });

    observer.observe(stat);
  });
};

animateCounters();

// Particles/Stars animation
function createStars() {
  const starsContainer = document.querySelector('.stars');
  if (!starsContainer) return;

  const stars = [];
  for (let i = 0; i < 50; i++) {
    const star = document.createElement('div');
    star.style.position = 'fixed';
    star.style.width = Math.random() * 2 + 'px';
    star.style.height = star.style.width;
    star.style.background = 'white';
    star.style.borderRadius = '50%';
    star.style.left = Math.random() * window.innerWidth + 'px';
    star.style.top = Math.random() * window.innerHeight + 'px';
    star.style.zIndex = '1';
    star.style.opacity = Math.random() * 0.5 + 0.3;
    star.style.pointerEvents = 'none';
    
    starsContainer.appendChild(star);
    stars.push({
      element: star,
      x: parseFloat(star.style.left),
      y: parseFloat(star.style.top),
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5
    });
  }

  // Animate stars
  const animateStars = () => {
    stars.forEach(star => {
      star.x += star.vx;
      star.y += star.vy;

      if (star.x > window.innerWidth) star.x = 0;
      if (star.x < 0) star.x = window.innerWidth;
      if (star.y > window.innerHeight) star.y = 0;
      if (star.y < 0) star.y = window.innerHeight;

      star.element.style.left = star.x + 'px';
      star.element.style.top = star.y + 'px';
    });

    requestAnimationFrame(animateStars);
  };

  animateStars();
}

createStars();

// Add ripple CSS if not already added
if (!document.querySelector('style[data-ripple]')) {
  const rippleStyle = document.createElement('style');
  rippleStyle.setAttribute('data-ripple', 'true');
  rippleStyle.innerHTML = `
    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.6);
      transform: scale(0);
      animation: rippleAnimation 0.6s ease-out;
      pointer-events: none;
    }

    @keyframes rippleAnimation {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(rippleStyle);
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown') {
    window.scrollBy({ top: 100, behavior: 'smooth' });
  }
  if (e.key === 'ArrowUp') {
    window.scrollBy({ top: -100, behavior: 'smooth' });
  }
});