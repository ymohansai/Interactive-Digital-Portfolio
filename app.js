// app.js - adds interactivity: project cards, modal, smooth scroll, theme, simple animations
document.addEventListener('DOMContentLoaded', () => {
  // Simple data for projects — replace with your real projects
  const projects = [
    {
      id: 'p1',
      title: 'Portfolio Website',
      desc: 'A responsive, accessible portfolio built with vanilla JS and CSS. Features: dark mode, project modal, smooth scroll.',
      img: 'https://via.placeholder.com/720x420?text=Project+1',
      links: [{label:'Live',url:'#'},{label:'Code',url:'#'}]
    },
    {
      id: 'p2',
      title: 'E-commerce UI',
      desc: 'Front-end for a shopping experience with product filters and cart interactions.',
      img: 'https://via.placeholder.com/720x420?text=Project+2',
      links: [{label:'Case study',url:'#'}]
    },
    // add more objects as needed
  ];

  // inject project cards
  const grid = document.getElementById('projectGrid');
  projects.forEach(p => {
    const el = document.createElement('article');
    el.className = 'card';
    el.setAttribute('data-animate','fade-up');
    el.innerHTML = `
      <img src="${p.img}" alt="${p.title} screenshot">
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <p><button class="btn ghost open-project" data-id="${p.id}">View</button></p>
    `;
    grid.appendChild(el);
  });

  // Modal logic
  const modal = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalLinks = document.getElementById('modalLinks');

  document.body.addEventListener('click', (e) => {
    const openBtn = e.target.closest('.open-project');
    if(openBtn){
      const id = openBtn.dataset.id;
      const p = projects.find(x=>x.id===id);
      if(!p) return;
      modalTitle.textContent = p.title;
      modalDesc.textContent = p.desc;
      modalLinks.innerHTML = p.links.map(l => `<a class="btn ghost" href="${l.url}" target="_blank" rel="noopener noreferrer">${l.label}</a>`).join(' ');
      modal.setAttribute('aria-hidden', 'false');
      // move focus to modal for accessibility
      modal.querySelector('.modal-close').focus();
    }
  });

  modal.querySelector('.modal-close').addEventListener('click', () => {
    modal.setAttribute('aria-hidden','true');
  });
  modal.addEventListener('click', (e)=> {
    if(e.target === modal) modal.setAttribute('aria-hidden','true');
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href');
      if(href === '#') return;
      const target = document.querySelector(href);
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });

  // Theme toggle
  const themeToggle = document.getElementById('themeToggle');
  themeToggle.addEventListener('click', () => {
    const isLight = document.documentElement.classList.toggle('light');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
  // persist theme
  const saved = localStorage.getItem('theme');
  if(saved === 'light') document.documentElement.classList.add('light');

  // Update year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Contact form simple validation + fake submit
  const contactForm = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData(contactForm);
    // Basic validation
    if(!form.get('name') || !form.get('email') || !form.get('message')) {
      formNote.textContent = 'Please fill all fields.';
      return;
    }
    formNote.textContent = 'Thanks! Message sent (demo).';
    contactForm.reset();
    setTimeout(()=> formNote.textContent = '', 4000);
  });

  // Simple intersection observer for in-view animations
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        // optionally unobserve to run once
        io.unobserve(entry.target);
      }
    });
  }, {threshold:0.12});

  document.querySelectorAll('[data-animate]').forEach(node => io.observe(node));

  // Hamburger menu for small screens (simple)
  const menuBtn = document.getElementById('menuBtn');
  menuBtn.addEventListener('click', () => {
    const nav = document.querySelector('.nav');
    if(!nav) return;
    const isOpen = nav.style.display === 'block';
    nav.style.display = isOpen ? '' : 'block';
  });

  // Accessibility: close modal with Escape
  window.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
      modal.setAttribute('aria-hidden','true');
    }
  });

  // OPTIONAL: GSAP hook example (uncomment if GSAP is loaded)
  // if(window.gsap){
  //   gsap.from('[data-animate="fade-up"]', {opacity:0, y:20, stagger:0.12, duration:0.7, ease:"power3.out"});
  // }
});
