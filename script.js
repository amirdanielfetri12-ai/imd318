
// Theme toggle
(function(){
  var saved = localStorage.getItem('aw-theme');
  if(saved === 'dark') document.documentElement.classList.add('dark');
  window.toggleTheme = function(){
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('aw-theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
  };
})();

document.addEventListener('DOMContentLoaded', function(){
  // Mobile menu
  var burger = document.querySelector('.hamburger');
  var links = document.querySelector('.nav-links');
  if(burger) burger.addEventListener('click', function(){ links.classList.toggle('open'); });

  // Active nav
  var path = decodeURI(location.pathname.split('/').pop()) || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function(a){
    if(a.getAttribute('href') === path) a.classList.add('active');
  });

  // Reveal on scroll
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
  }, {threshold:0.15});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  // Counters
  document.querySelectorAll('[data-count]').forEach(function(el){
    var target = parseFloat(el.getAttribute('data-count'));
    var dur = 1600, start = null;
    function step(ts){
      if(!start) start = ts;
      var p = Math.min(1,(ts-start)/dur);
      var val = target * (0.2 + 0.8*p);
      el.textContent = (target % 1 === 0 ? Math.floor(val) : val.toFixed(1));
      if(p<1) requestAnimationFrame(step); else el.textContent = target;
    }
    var ob = new IntersectionObserver(function(es){
      es.forEach(function(en){ if(en.isIntersecting){ requestAnimationFrame(step); ob.disconnect(); } });
    });
    ob.observe(el);
  });

  // Skill bars
  document.querySelectorAll('.bar').forEach(function(b){
    var v = b.getAttribute('data-v') || '70';
    var ob = new IntersectionObserver(function(es){
      es.forEach(function(en){ if(en.isIntersecting){ b.querySelector('i').style.width = v+'%'; ob.disconnect(); } });
    });
    ob.observe(b);
  });

  // Back to top
  var top = document.querySelector('.totop');
  if(top){
    window.addEventListener('scroll', function(){ top.classList.toggle('show', window.scrollY > 400); });
    top.addEventListener('click', function(){ window.scrollTo({top:0,behavior:'smooth'}); });
  }

  // Lightbox
  var lb = document.querySelector('.lightbox');
  if(lb){
    document.querySelectorAll('section img').forEach(function(img){
      img.addEventListener('click', function(){
        lb.querySelector('img').src = img.src;
        lb.classList.add('open');
      });
    });
    lb.addEventListener('click', function(e){ if(e.target === lb || e.target.classList.contains('close')) lb.classList.remove('open'); });
  }

  // Carousel
  var car = document.querySelector('.carousel');
  if(car){
    var track = car.querySelector('.car-track');
    var slides = track.children.length;
    var i = 0;
    var dotsWrap = document.querySelector('.dots');
    for(var k=0;k<slides;k++){ var d=document.createElement('i'); if(k===0)d.className='on'; d.dataset.i=k; dotsWrap.appendChild(d); }
    function go(n){ i = (n+slides)%slides; track.style.transform='translateX(-'+(i*100)+'%)'; dotsWrap.querySelectorAll('i').forEach(function(d,idx){ d.className = idx===i?'on':''; }); }
    document.querySelector('.car-prev').onclick = function(){ go(i-1); };
    document.querySelector('.car-next').onclick = function(){ go(i+1); };
    dotsWrap.addEventListener('click', function(e){ if(e.target.dataset.i!==undefined) go(parseInt(e.target.dataset.i)); });
    setInterval(function(){ go(i+1); }, 6000);
  }

  // Contact form
  var form = document.querySelector('.form');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var msg = document.querySelector('.form-msg');
      msg.textContent = 'Thanks — your message is on its way. I\u2019ll reply within 48 hours.';
      msg.style.color = 'var(--accent-fg)';
      msg.style.background = 'var(--accent)';
      msg.style.padding = '14px';
      form.reset();
    });
  }
// --- PAGE TRANSITION LOADER ---
  
  // 1. Automatically create and add the loader to the page
  var loader = document.createElement('div');
  loader.className = 'page-loader';
  loader.innerHTML = '<div class="loader-text">Amir<span class="dot"></span>Biodata</div>';
  document.body.appendChild(loader);

  // 2. Fade out the loader once the new page has fully loaded
  window.addEventListener('load', function() {
    setTimeout(function() {
      loader.classList.add('hidden');
    }, 250); // A tiny 250ms delay makes the transition feel smoother
  });

  // 3. Fade in the loader when clicking a link to leave the page
  document.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function(e) {
      var href = link.getAttribute('href');
      var target = link.getAttribute('target');
      
      // Only trigger if it's a real internal link (ignores mailto: and empty links)
      if (href && !href.startsWith('mailto:') && !href.startsWith('#') && target !== '_blank') {
        e.preventDefault(); // Pause the instant navigation
        loader.classList.remove('hidden'); // Show the loading screen
        
        // Wait 400ms for the fade-in animation to finish, then go to the next page
        setTimeout(function() {
          window.location.href = href;
        }, 400); 
      }
    });
  });
});
