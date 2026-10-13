'use strict';

// Native scrolling keeps the paper continuous; sections reveal as they enter.
(() => {
  const chapters = [...document.querySelectorAll('#top, #main > .section:not([hidden])')];
  chapters.forEach(chapter => {
    chapter.classList.add('chapter');
    const content = document.createElement('div');
    content.className = 'chapter-content';
    content.append(...chapter.childNodes);
    const wrapper = document.createElement('div');
    wrapper.className = 'chapter-scroll';
    wrapper.append(content);
    chapter.append(wrapper);
  });
  const method = document.querySelector('#method .chapter-content');
  const layout = document.createElement('div');
  layout.className = 'method-layout';
  layout.append(method.querySelector('.figure'), method.querySelector('.method-description'));
  method.append(layout);
  document.body.classList.add('flow-mode');

  // Group the abstract with Overview, and the three diagnostics with Analysis.
  // Native anchors keep keyboard navigation, history and continuous scrolling.
  const nav = document.querySelector('.site-nav');
  const links = [...nav.querySelectorAll('.nav-links a')];
  const destinations = links.map(link => document.querySelector(link.hash));
  function updateNavigation() {
    const readingLine = nav.offsetHeight + 100;
    let active = -1;
    destinations.forEach((section, index) => {
      if (section.getBoundingClientRect().top <= readingLine) active = index;
    });
    // The short Citation section cannot always reach the reading line.
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
      active = links.length - 1;
    }
    links.forEach((link, index) => {
      if (index === active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
  let navigationPending = false;
  window.addEventListener('scroll', () => {
    if (navigationPending) return;
    navigationPending = true;
    requestAnimationFrame(() => {
      updateNavigation();
      navigationPending = false;
    });
  }, {passive:true});
  window.addEventListener('resize', updateNavigation);
  window.addEventListener('load', updateNavigation);
  updateNavigation();

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        entry.target.classList.toggle('is-in-view', entry.isIntersecting);
        if (entry.isIntersecting) entry.target.classList.add('has-entered');
      });
      document.dispatchEvent(new Event('chapterchange'));
    }, {threshold:0, rootMargin:'-8% 0px -8% 0px'});
    chapters.forEach(chapter => observer.observe(chapter));
  } else {
    chapters.forEach(chapter => chapter.classList.add('is-in-view','has-entered'));
    document.dispatchEvent(new Event('chapterchange'));
  }
})();
