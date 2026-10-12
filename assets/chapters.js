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
