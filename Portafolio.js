
  // ---------- Sidebar toggle (mobile off-canvas) ----------
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const menuToggle = document.getElementById('menuToggle');

  function openSidebar(){
    sidebar.classList.add('open');
    overlay.classList.add('visible');
    menuToggle.classList.add('active');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeSidebar(){
    sidebar.classList.remove('open');
    overlay.classList.remove('visible');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  function toggleSidebar(){
    sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
  }

  menuToggle.addEventListener('click', toggleSidebar);
  overlay.addEventListener('click', closeSidebar);

  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') closeSidebar();
  });

  window.addEventListener('resize', () => {
    if(window.innerWidth >= 768) closeSidebar();
  });

  // Close sidebar automatically when a nav link is tapped (mobile)
  document.querySelectorAll('.side-nav a').forEach(link => {
    link.addEventListener('click', () => {
      if(window.innerWidth < 768) closeSidebar();
    });
  });

  // ---------- Highlight active section in sidebar ----------
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.side-nav a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const link = document.querySelector(`.side-nav a[href="#${entry.target.id}"]`);
      if(!link) return;
      if(entry.isIntersecting){
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' }); 

  sections.forEach(s => sectionObserver.observe(s));

  // ---------- Reveal-on-scroll animation ----------
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ---------- Footer year ----------
  document.getElementById('year').textContent = new Date().getFullYear();

