// ==================== ENHANCED PORTFOLIO JAVASCRIPT ====================

document.addEventListener("DOMContentLoaded", function () {
  // ==================== CONFIGURATION ====================
  const config = {
    logoRotationInterval: 500,
    autoRotateInterval: 5000,
    transitionDuration: 600,
  };

  // ==================== LOGO IMAGE ROTATION ====================
  const images = [
    'images/mino1.png',
    'images/mino2.png',
    'images/mino3.png',
    'images/mino4.png',
    'images/mino7.png',
    'images/mino8.png',
    'images/mino5.png',
    'images/mino6.png'
  ];

  const imgElement = document.getElementById('logo-image');
  let currentIndex = 0;

  function switchImage() {
    if (imgElement) {
      currentIndex = (currentIndex + 1) % images.length;
      imgElement.src = images[currentIndex];
      
      // Add subtle animation on each change
      imgElement.style.transform = 'scale(1.1) rotate(5deg)';
      setTimeout(() => {
        imgElement.style.transform = 'scale(1) rotate(0deg)';
      }, 200);
    }
  }

  // Start logo rotation
  setInterval(switchImage, config.logoRotationInterval);

  // ==================== PULSE ANIMATION ====================
  const introLink = document.getElementById('intro-link');
  const pulseImage = document.getElementById('pulse-image');

  if (introLink && pulseImage) {
    introLink.addEventListener('click', function (e) {
      e.preventDefault();
      pulseImage.classList.add('pulse');
      
      // Smooth scroll to section
      setTimeout(() => {
        document.getElementById('intro').scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 300);
    });

    pulseImage.addEventListener('animationend', function () {
      pulseImage.classList.remove('pulse');
    });
  }

  // ==================== ENHANCED PROJECT CAROUSEL ====================
  let currentProject = 0;
  const projects = document.querySelectorAll('#projects-wrapper .project');
  const totalProjects = projects.length;
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const projectsContainer = document.getElementById('projects-container');
  let autoRotateInterval;
  let isTransitioning = false;

  if (totalProjects > 0 && prevBtn && nextBtn && projectsContainer) {
    // ==================== CREATE INDICATOR DOTS ====================
    const indicatorsContainer = document.getElementById('project-indicators');

    for (let i = 0; i < totalProjects; i++) {
      const dot = document.createElement('span');
      dot.className = 'indicator-dot';
      dot.setAttribute('aria-label', `Go to project ${i + 1}`);
      dot.setAttribute('role', 'button');
      dot.setAttribute('tabindex', '0');
      
      if (i === 0) dot.classList.add('active');
      
      // Click handler
      dot.addEventListener('click', () => goToProject(i));
      
      // Keyboard accessibility
      dot.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          goToProject(i);
        }
      });
      
      indicatorsContainer.appendChild(dot);
    }

    // ==================== PROJECT NAVIGATION FUNCTIONS ====================
    function showProject(index) {
      if (isTransitioning) return;
      isTransitioning = true;

      // Remove active class from all projects and dots
      projects.forEach(project => {
        project.classList.remove('active');
        project.style.pointerEvents = 'none';
      });
      
      const dots = document.querySelectorAll('.indicator-dot');
      dots.forEach(dot => dot.classList.remove('active'));

      // Add loading state
      projectsContainer.classList.add('loading');

      // Show new project with delay for smooth transition
      setTimeout(() => {
        projects[index].classList.add('active');
        if (dots[index]) dots[index].classList.add('active');
        
        projectsContainer.classList.remove('loading');
        
        // Re-enable pointer events
        setTimeout(() => {
          projects[index].style.pointerEvents = 'auto';
          isTransitioning = false;
        }, config.transitionDuration);
      }, 100);

      updateButtonStates();
      announceProjectChange(index);
    }

    function goToProject(index) {
      if (index >= 0 && index < totalProjects && index !== currentProject) {
        currentProject = index;
        showProject(currentProject);
        resetAutoRotate();
      }
    }

    function nextProject() {
      if (isTransitioning) return;
      currentProject = (currentProject + 1) % totalProjects;
      showProject(currentProject);
    }

    function prevProject() {
      if (isTransitioning) return;
      currentProject = (currentProject - 1 + totalProjects) % totalProjects;
      showProject(currentProject);
    }

    function updateButtonStates() {
      // Always enable buttons for circular navigation
      prevBtn.disabled = false;
      nextBtn.disabled = false;
      
      // Add visual feedback
      prevBtn.setAttribute('aria-label', `Previous project (${totalProjects})`);
      nextBtn.setAttribute('aria-label', `Next project (1)`);
    }

    function resetAutoRotate() {
      clearInterval(autoRotateInterval);
      autoRotateInterval = setInterval(nextProject, config.autoRotateInterval);
    }

    function announceProjectChange(index) {
      const projectTitle = projects[index].querySelector('h3').textContent;
      const announcement = document.createElement('div');
      announcement.className = 'sr-only';
      announcement.setAttribute('role', 'status');
      announcement.setAttribute('aria-live', 'polite');
      announcement.textContent = `Now showing: ${projectTitle}`;
      document.body.appendChild(announcement);
      setTimeout(() => announcement.remove(), 1000);
    }

    // ==================== EVENT LISTENERS ====================
    nextBtn.addEventListener('click', () => {
      nextProject();
      resetAutoRotate();
    });

    prevBtn.addEventListener('click', () => {
      prevProject();
      resetAutoRotate();
    });

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
      // Don't interfere with form inputs
      if (e.target.tagName === 'INPUT' || 
          e.target.tagName === 'TEXTAREA' || 
          e.target.tagName === 'SELECT') {
        return;
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextProject();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevProject();
      }
    });

    // Hover interactions removed - no auto-rotate
    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    projectsContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    projectsContainer.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Swipe left - next project
          nextProject();
        } else {
          // Swipe right - previous project
          prevProject();
        }
      }
    }

    // ==================== INITIALIZE ====================
    showProject(currentProject);
    updateButtonStates();
    // Auto-rotate removed - user navigates manually
  }

  // ==================== ENHANCED SKILLS ANIMATIONS ====================
  function initializeSkillsAnimations() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    // Create intersection observer for skill animations
    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const skillLevel = entry.target.querySelector('.skill-level');
          const width = skillLevel.style.width;
          
          // Reset width to 0 for animation
          skillLevel.style.width = '0%';
          
          // Animate to the actual width
          setTimeout(() => {
            skillLevel.style.transition = 'width 1s ease-in-out';
            skillLevel.style.width = width;
          }, 100);
          
          skillsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    
    // Observe each skill item
    skillItems.forEach(item => {
      skillsObserver.observe(item);
      
      // Add hover effects
      item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(5px)';
        this.style.transition = 'transform 0.2s ease';
      });
      
      item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
      });
    });
  }

  // ==================== ACHIEVEMENTS SECTION ANIMATIONS ====================
  function initializeAchievementsAnimations() {
    const achievementCards = document.querySelectorAll('.achievement-card');
    
    const achievementsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Staggered animation
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
          }, index * 150);
          
          achievementsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    // Set initial state and observe
    achievementCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px) scale(0.9)';
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      achievementsObserver.observe(card);
    });
  }

  // ==================== SMOOTH SCROLL FOR ALL LINKS ====================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || !href) return;

      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        // Update URL without jumping
        history.pushState(null, null, href);
      }
    });
  });

  // ==================== INTERSECTION OBSERVER FOR ANIMATIONS ====================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe sections for scroll animations
  document.querySelectorAll('.main').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });

  // ==================== BUTTON RIPPLE EFFECT ====================
  document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');

      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });

  // ==================== SCROLL TO TOP BUTTON ====================
  const scrollToTopBtn = document.createElement('button');
  scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollToTopBtn.className = 'scroll-to-top';
  scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
  scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 2em;
    right: 2em;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: rgba(100, 181, 246, 0.9);
    color: white;
    border: none;
    cursor: pointer;
    opacity: 0;
    transform: scale(0);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(100, 181, 246, 0.4);
  `;

  document.body.appendChild(scrollToTopBtn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollToTopBtn.style.opacity = '1';
      scrollToTopBtn.style.transform = 'scale(1)';
    } else {
      scrollToTopBtn.style.opacity = '0';
      scrollToTopBtn.style.transform = 'scale(0)';
    }
  });

  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  scrollToTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
    this.style.boxShadow = '0 6px 20px rgba(100, 181, 246, 0.6)';
  });

  scrollToTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
    this.style.boxShadow = '0 4px 12px rgba(100, 181, 246, 0.4)';
  });

  // ==================== PERFORMANCE OPTIMIZATION ====================
  // Debounce function for performance
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Throttle function for scroll events
  function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  // ==================== LAZY LOAD IMAGES ====================
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });

  // ==================== INITIALIZE NEW SECTIONS ====================
  // Initialize skills animations
  initializeSkillsAnimations();
  
  // Initialize achievements animations
  initializeAchievementsAnimations();

  // ==================== CONSOLE MESSAGE ====================
  console.log(
    '%c👋 Hello! Thanks for checking out my portfolio!',
    'color: #64b5f6; font-size: 16px; font-weight: bold;'
  );
  console.log(
    '%cFeel free to reach out if you want to collaborate!',
    'color: #a89cc8; font-size: 14px;'
  );

  // ==================== INITIALIZATION COMPLETE ====================
  console.log('%c✨ Portfolio initialized successfully!', 'color: #8cc9f0; font-size: 12px;');
});