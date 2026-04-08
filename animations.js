/* ============================================
   SCROLL ANIMATIONS & INTERACTIONS
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all animations and interactions
  initTypewriterEffect();
  initSectionHeadingTypewriter();
  initScrollAnimations();
  initNavigation();
  initMobileMenu();
  initSmoothScroll();
  initElementAnimations();
  initNavbarHide();
  initPageTransitions();
});

/* ============================================
   TYPEWRITER EFFECT FOR HOME PAGE HERO
   ============================================ */

function initTypewriterEffect() {
  // Detect home page - check multiple conditions
  const pathname = window.location.pathname;
  const isHomePage = pathname === '/' || pathname === '' || pathname.endsWith('index.html');
  
  if (!isHomePage) return;

  const heroHeading = document.querySelector('h1');
  if (!heroHeading) return;

  // Hide rest of page until hero typewriter (including dots) completes
  hideContentUntilHeadingDone(heroHeading);

  // Remove animation-related classes that might interfere
  heroHeading.classList.remove('text-mask-up');
  
  // Clear any animations that might interfere with ALL priority
  heroHeading.style.cssText = `
    animation: none !important;
    opacity: 1 !important;
    visibility: visible !important;
    display: inline-block !important;
    clip-path: none !important;
    transform: none !important;
  `;
  
  const headingText = heroHeading.textContent.trim();
  heroHeading.textContent = '';
  
  // Mark as typewriter to skip scroll animations
  heroHeading.classList.add('typewriter-done');
  
  let charIndex = 0;
  const typewriterSpeed = 60; // ms per character - slower for smooth effect

  function type() {
    if (charIndex < headingText.length) {
      heroHeading.textContent += headingText.charAt(charIndex);
      charIndex++;
      setTimeout(type, typewriterSpeed);
    } else {
      // Typewriter effect done - make the period blink
      setTimeout(() => {
        blinkPeriod();
      }, 200);
    }
  }

  // Start typewriter immediately
  type();
}

function blinkPeriod() {
  const heroHeading = document.querySelector('h1');
  if (!heroHeading) return;

  const text = heroHeading.textContent;
  const lastCharIndex = text.length - 1;
  
  // Split text into everything before period
  const beforePeriod = text.substring(0, lastCharIndex);
  
  // Clear and rebuild with 3 loading dots
  heroHeading.innerHTML = beforePeriod + '<span class="period-dot dot1">.</span><span class="period-dot dot2">.</span><span class="period-dot dot3">.</span>';
  
  const dot1 = heroHeading.querySelector('.dot1');
  const dot2 = heroHeading.querySelector('.dot2');
  const dot3 = heroHeading.querySelector('.dot3');
  
  // Apply staggered animations to each dot
  dot1.style.animation = 'blinkDot1 1.2s ease-in-out infinite';
  dot2.style.animation = 'blinkDot2 1.2s ease-in-out infinite';
  dot3.style.animation = 'blinkDot3 1.2s ease-in-out infinite';
  
  // Let them blink smoothly for 2.4 seconds
  setTimeout(() => {
    dot1.style.animation = 'none';
    dot2.style.animation = 'none';
    dot3.style.animation = 'none';
    dot1.style.opacity = '1';
    dot2.style.opacity = '1';
    dot3.style.opacity = '1';
    revealHeroContent();
    revealDelayedContent();
  }, 2400);
}

function revealHeroContent() {
  // Get all sibling elements after the h1 and fade them in
  const heroHeading = document.querySelector('h1');
  if (!heroHeading) return;

  let current = heroHeading.nextElementSibling;
  
  // Fade in all elements smoothly
  while (current) {
    if (current.nodeType === 1 && !current.classList.contains('absolute')) {
      current.style.opacity = '1';
      current.style.visibility = 'visible';
    }
    current = current.nextElementSibling;
  }
}

/* ============================================
   SECTION HEADING TYPEWRITER EFFECT
   ============================================ */

function initSectionHeadingTypewriter() {
  // Find headings (non-home includes h1 for hero)
  const isHomePage = window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname === '';
  const allHeadings = document.querySelectorAll('h2, h3, h4, h5, h6');

  // Remove typewriter from non-home pages
  if (!isHomePage) {
    revealDelayedContent();
    return;
  }
  
  // Regular typewriter effect for all other headings
  allHeadings.forEach((heading, index) => {
    // Skip if it's already been processed (e.g., hero heading or home page h1)
    if (heading.classList.contains('typewriter-done')) {
      return;
    }
    
    // Check if heading is already visible on page load
    const rect = heading.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isVisible) {
      // Start typewriter immediately for visible headings
      heading.classList.add('typewriter-done');
      applyTypewriterEffect(heading);
    } else {
      // Use Intersection Observer for headings not yet visible
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !heading.classList.contains('typewriter-animating') && !heading.classList.contains('typewriter-done')) {
            heading.classList.add('typewriter-done');
            applyTypewriterEffect(heading);
            observer.unobserve(heading);
          }
        });
      }, { threshold: 0.2 });
      
      observer.observe(heading);
    }
  });
}

function applyHeroTypewriterEffect(heading, onComplete) {
  // Same effect as home page hero: typewriter + loading dots
  const headingText = heading.innerHTML.replace(/<br\s*\/?>\s*/gi, '\n').trim();
  let output = '';
  heading.innerHTML = '';
  heading.style.display = 'inline-block';
  
  let charIndex = 0;
  const typewriterSpeed = 60;

  function type() {
    if (charIndex < headingText.length) {
      const char = headingText.charAt(charIndex);
      output += char === '\n' ? '<br/>' : char;
      heading.innerHTML = output;
      charIndex++;
      setTimeout(type, typewriterSpeed);
    } else {
      // Typewriter done - add loading dots
      setTimeout(() => {
        blinkPeriodOnPageHeading(heading, onComplete);
      }, 200);
    }
  }

  setTimeout(type, 300);
}

function blinkPeriodOnPageHeading(heading, onComplete) {
  const text = heading.textContent;
  
  // Add three loading dots like home page
  heading.innerHTML = text + '<span class="period-dot dot1">.</span><span class="period-dot dot2">.</span><span class="period-dot dot3">.</span>';
  
  const dot1 = heading.querySelector('.dot1');
  const dot2 = heading.querySelector('.dot2');
  const dot3 = heading.querySelector('.dot3');
  
  // Apply staggered animations to each dot
  dot1.style.animation = 'blinkDot1 1.2s ease-in-out infinite';
  dot2.style.animation = 'blinkDot2 1.2s ease-in-out infinite';
  dot3.style.animation = 'blinkDot3 1.2s ease-in-out infinite';
  
  // Let them blink smoothly for 2.4 seconds
  setTimeout(() => {
    dot1.style.animation = 'none';
    dot2.style.animation = 'none';
    dot3.style.animation = 'none';
    dot1.style.opacity = '1';
    dot2.style.opacity = '1';
    dot3.style.opacity = '1';
    if (typeof onComplete === 'function') {
      onComplete();
    }
  }, 2400);
}

function applyTypewriterEffect(heading) {
  // Prevent double animation
  if (heading.classList.contains('typewriter-animating')) return;
  
  heading.classList.add('typewriter-animating');
  
  const originalText = heading.innerHTML.replace(/<br\s*\/?>\s*/gi, '\n').trim();
  heading.innerHTML = '';
  let output = '';
  
  let charIndex = 0;
  const typewriterSpeed = 50; // ms per character

  function type() {
    if (charIndex < originalText.length) {
      const char = originalText.charAt(charIndex);
      output += char === '\n' ? '<br/>' : char;
      heading.innerHTML = output;
      charIndex++;
      setTimeout(type, typewriterSpeed);
    } else {
      // Animation complete
      heading.classList.remove('typewriter-animating');
    }
  }

  // Start typewriter immediately
  type();
}

/* ============================================
   SCROLL TRIGGERED ANIMATIONS
   ============================================ */

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add appropriate animation class based on data attribute
        const animationType = entry.target.dataset.animation || 'scroll-animate-up';
        entry.target.classList.add('visible');
        entry.target.classList.add(animationType);
        
        // Optional: remove observer after animation triggers (for better performance)
        if (entry.target.dataset.animateOnce === 'true') {
          observer.unobserve(entry.target);
        }
      }
    });
  }, observerOptions);

  // Observe all elements with scroll animation classes
  document.querySelectorAll(
    '.scroll-animate, .scroll-animate-up, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale'
  ).forEach(el => {
    observer.observe(el);
  });

  // Also observe sections for staggered animations
  document.querySelectorAll('section, .section-reveal').forEach(section => {
    observer.observe(section);
  });
}

/* ============================================
   NAVIGATION ACTIVE STATE
   ============================================ */

function initNavigation() {
  const navLinks = document.querySelectorAll('nav a[href]');
  
  function setActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      
      // Remove active class from all links
      link.classList.remove('active-nav-link');
      link.classList.remove('text-blue-600', 'dark:text-blue-400', 'font-bold', 'border-b-2', 'border-blue-600', 'pb-1');
      link.classList.add('text-zinc-600', 'dark:text-zinc-400', 'hover:text-zinc-900', 'dark:hover:text-zinc-100');
      
      // Add active class to current page link
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active-nav-link', 'text-blue-600', 'dark:text-blue-400', 'font-bold', 'border-b-2', 'border-blue-600', 'pb-1');
        link.classList.remove('text-zinc-600', 'dark:text-zinc-400', 'hover:text-zinc-900', 'dark:hover:text-zinc-100');
      }
    });
  }
  
  // Set active link on page load
  setActiveLink();
  
  // Update active link when navigation changes
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      setTimeout(setActiveLink, 100);
    });
  });
}

/* ============================================
   MOBILE MENU TOGGLE
   ============================================ */

function initMobileMenu() {
  const toggle = document.querySelector('[data-mobile-menu-toggle]');
  const menu = document.querySelector('[data-mobile-menu]');
  if (!toggle || !menu) return;

  const icon = toggle.querySelector('.material-symbols-outlined');
  let closeTimeout;

  const closeMenu = () => {
    if (closeTimeout) clearTimeout(closeTimeout);
    menu.classList.add('opacity-0', 'pointer-events-none');
    menu.classList.remove('is-open');
    document.body.classList.remove('mobile-menu-open');
    toggle.setAttribute('aria-expanded', 'false');
    if (icon) icon.textContent = 'menu';
    closeTimeout = setTimeout(() => menu.classList.add('hidden'), 180);
  };

  const openMenu = () => {
    if (closeTimeout) clearTimeout(closeTimeout);
    menu.classList.remove('hidden');
    menu.classList.remove('pointer-events-none');
    // force reflow for transition
    void menu.offsetHeight;
    menu.classList.remove('opacity-0');
    menu.classList.add('is-open');
    document.body.classList.add('mobile-menu-open');
    toggle.setAttribute('aria-expanded', 'true');
    if (icon) icon.textContent = 'close';
  };

  closeMenu();

  toggle.addEventListener('click', () => {
    const isHidden = menu.classList.contains('hidden');
    if (isHidden) {
      openMenu();
    } else {
      closeMenu();
    }
  });

  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      closeMenu();
    }
  });
}

/* ============================================
   SMOOTH SCROLLING FOR ANCHOR LINKS
   ============================================ */

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
}

/* ============================================
   ELEMENT ENTRANCE ANIMATIONS
   ============================================ */

function initElementAnimations() {
  // Animate hero headings
  const heroHeadings = document.querySelectorAll('h1, h2');
  heroHeadings.forEach((heading, index) => {
    heading.style.opacity = '0';
    heading.style.animation = `fadeInUp 0.8s ease-out ${index * 0.2}s forwards`;
  });

  // Animate paragraphs
  const paragraphs = document.querySelectorAll('p');
  paragraphs.forEach((para, index) => {
    if (!para.closest('nav') && !para.closest('footer')) {
      para.style.animation = `fadeInUp 0.8s ease-out ${0.3 + index * 0.1}s forwards`;
      para.style.opacity = '0';
    }
  });

  // Animate buttons
  const buttons = document.querySelectorAll('button, .lustre-button, .lustre-btn');
  buttons.forEach((btn, index) => {
    btn.style.animation = `fadeInUp 0.8s ease-out ${0.5 + index * 0.1}s forwards`;
    btn.style.opacity = '0';
  });

  // Animate images
  const images = document.querySelectorAll('img');
  images.forEach((img, index) => {
    img.style.animation = `fadeInUp 0.8s ease-out ${0.4 + index * 0.1}s forwards`;
    img.style.opacity = '0';
  });
}

/* ============================================
   NAVBAR HIDE ON SCROLL
   ============================================ */

function initNavbarHide() {
  const nav = document.querySelector('nav');
  if (!nav) return;

  nav.classList.add('show-navbar');

  let lastScrollY = window.scrollY;
  let ticking = false;
  const hideThreshold = nav.offsetHeight + 20; // wait until nav is fully visible before hiding
  const directionTolerance = 6; // minimal delta to avoid jitter on micro scrolls

  function updateNavVisibility() {
    const currentY = window.scrollY;
    if (document.body.classList.contains('mobile-menu-open')) {
      nav.classList.add('show-navbar');
      nav.classList.remove('hide-navbar');
      lastScrollY = currentY;
      ticking = false;
      return;
    }

    const scrolledEnough = currentY > hideThreshold;
    const scrollingDown = currentY - lastScrollY > directionTolerance;
    const scrollingUp = lastScrollY - currentY > directionTolerance;

    if (scrolledEnough && scrollingDown) {
      nav.classList.remove('show-navbar');
      nav.classList.add('hide-navbar');
    } else if (scrollingUp || currentY <= hideThreshold) {
      nav.classList.add('show-navbar');
      nav.classList.remove('hide-navbar');
    }

    lastScrollY = currentY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateNavVisibility);
      ticking = true;
    }
  });
}

/* ============================================
   PAGE CONTENT REVEAL AFTER HERO TYPEWRITER
   ============================================ */

function hideContentUntilHeadingDone(heading) {
  const main = heading.closest('main') || document.body;
  const protectedSet = new Set();
  
  // Keep heading and its ancestor chain visible
  let node = heading;
  while (node) {
    protectedSet.add(node);
    if (node === main || node.tagName === 'BODY') break;
    node = node.parentElement;
  }

  // Hide all other elements within main
  main.querySelectorAll('*').forEach(el => {
    if (!protectedSet.has(el)) {
      el.classList.add('delayed-content');
    }
  });

  // Hide body-level siblings (e.g., footer) while keeping nav visible
  Array.from(document.body.children).forEach(el => {
    const isNav = el.tagName === 'NAV';
    if (!protectedSet.has(el) && !isNav) {
      el.classList.add('delayed-content');
    }
  });
}

function revealDelayedContent() {
  document.querySelectorAll('.delayed-content').forEach(el => {
    el.classList.remove('delayed-content');
    el.classList.add('post-typewriter-reveal');
  });
}

/* ============================================
   PAGE TRANSITIONS
   ============================================ */

function initPageTransitions() {
  // Page transitions disabled - direct navigation
}

/* ============================================
   DARK MODE TOGGLE
   ============================================ */

function initDarkMode() {
  const darkModeButtons = document.querySelectorAll('[data-icon="dark_mode"], .material-symbols-outlined[data-icon="dark_mode"]');
  
  darkModeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const html = document.documentElement;
      const isDark = html.classList.contains('dark');
      
      if (isDark) {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      } else {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      }
    });
  });

  // Check saved theme preference
  const savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
  }
}

// Initialize dark mode
initDarkMode();

/* ============================================
   FORM ANIMATIONS
   ============================================ */

function initFormAnimations() {
  const formInputs = document.querySelectorAll('input, textarea, select');
  
  formInputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.style.transform = 'translateY(-2px)';
      this.style.boxShadow = '0 4px 12px rgba(0, 78, 159, 0.1)';
    });
    
    input.addEventListener('blur', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = 'none';
    });
  });
}

document.addEventListener('DOMContentLoaded', initFormAnimations);

/* ============================================
   SCROLL PROGRESS INDICATOR
   ============================================ */

function initScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-progress';
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #004e9f 0%, #0066cc 100%);
    width: 0%;
    z-index: 1000;
    transition: width 0.1s ease;
  `;
  
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

// Uncomment to enable scroll progress bar
// initScrollProgress();

/* ============================================
   ELEMENT HOVER ANIMATIONS
   ============================================ */

function initHoverAnimations() {
  document.querySelectorAll('.group').forEach(group => {
    group.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
  });
}

document.addEventListener('DOMContentLoaded', initHoverAnimations);

/* ============================================
   PARALLAX SCROLL EFFECT
   ============================================ */

function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  if (parallaxElements.length === 0) return;
  
  window.addEventListener('scroll', () => {
    parallaxElements.forEach(el => {
      const scrollPosition = window.pageYOffset;
      const elementOffset = el.offsetTop;
      const distance = scrollPosition - elementOffset;
      
      el.style.backgroundPosition = `center ${distance * 0.5}px`;
    });
  });
}

document.addEventListener('DOMContentLoaded', initParallax);

/* ============================================
   COUNTER ANIMATIONS
   ============================================ */

function animateCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  
  const observerOptions = {
    threshold: 0.7
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-counter'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            counter.innerText = target;
            clearInterval(timer);
          } else {
            counter.innerText = Math.floor(current);
          }
        }, 16);
        
        counter.classList.add('counted');
        observer.unobserve(counter);
      }
    });
  }, observerOptions);
  
  counters.forEach(counter => observer.observe(counter));
}

document.addEventListener('DOMContentLoaded', animateCounters);

/* ============================================
   SCROLL TO TOP BUTTON
   ============================================ */

function initScrollToTop() {
  const scrollToTopBtn = document.createElement('button');
  scrollToTopBtn.id = 'scroll-to-top';
  scrollToTopBtn.innerHTML = '<span class="material-symbols-outlined">arrow_upward</span>';
  scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #004e9f 0%, #0066cc 100%);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 999;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    box-shadow: 0 4px 12px rgba(0, 78, 159, 0.3);
  `;
  
  document.body.appendChild(scrollToTopBtn);
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.style.display = 'flex';
      scrollToTopBtn.style.opacity = '1';
    } else {
      scrollToTopBtn.style.display = 'none';
      scrollToTopBtn.style.opacity = '0';
    }
  });
  
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  scrollToTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1) translateY(-3px)';
  });
  
  scrollToTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
  });
}

// Uncomment to enable scroll to top button
// document.addEventListener('DOMContentLoaded', initScrollToTop);

/* ============================================
   PRELOAD PAGE ANIMATION
   ============================================ */

function pageLoadAnimation() {
  document.body.style.opacity = '0';
  document.body.style.animation = 'fadeIn 0.6s ease-out forwards';
}

window.addEventListener('load', pageLoadAnimation);
