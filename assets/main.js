'use strict';

const config = window.GEOMEM_CONFIG || {};
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

// Data transcribed from Tables 1–4. Keep the paper's reported precision.
const benchmarks = {
  libero: {
    caption: 'LIBERO success rates (%) — Table 1',
    description: 'Four suites with 10 tasks each · 50 trials per task · Table 1',
    headers: ['Method', 'Spatial', 'Object', 'Goal', 'Long', 'Average'],
    rows: [
      ['GeoMem-VLA', '99.6', '99.8', '99.6', '96.6', '98.9'],
      ['3DThinkVLA', '100.0', '100.0', '98.8', '95.8', '98.7'],
      ['Spatial Forcing', '99.4', '99.6', '98.8', '96.0', '98.5'],
      ['AVA-VLA', '99.2', '99.6', '97.9', '96.2', '98.2'],
      ['GeoVLA', '98.4', '99.0', '96.6', '96.6', '97.7'],
      ['OpenVLA-OFT', '97.6', '98.4', '97.9', '94.5', '97.1'],
      ['CronusVLA', '97.3', '99.6', '96.9', '94.0', '97.0'],
      ['π0.5', '98.8', '98.2', '98.0', '92.4', '96.9'],
      ['MemoryVLA', '98.4', '98.4', '96.4', '93.4', '96.7'],
      ['GeoPredict', '98.0', '98.2', '95.7', '94.0', '96.5'],
      ['π0', '96.8', '98.8', '95.8', '85.2', '94.2'],
      ['DreamVLA', '97.5', '94.0', '89.5', '89.5', '92.6'],
      ['4D-VLA', '88.9', '95.2', '90.9', '79.1', '88.6'],
      ['SpatialVLA', '88.2', '89.9', '78.6', '55.5', '78.1'],
      ['OpenVLA (FT)', '84.7', '88.4', '79.2', '53.7', '76.5'],
      ['TraceVLA', '84.6', '85.2', '75.1', '54.1', '74.8']
    ]
  },
  robotwin: {
    caption: 'RoboTwin 2.0 success rates (%) — Table 2',
    description: '50 bimanual tasks · 100 episodes per task and setting · Table 2',
    headers: ['Method', 'Clean', 'Randomized', 'Average'],
    rows: [
      ['GeoMem-VLA', '91.10', '91.24', '91.17'],
      ['HyVLA-0.5', '90.90', '90.10', '90.50'],
      ['JoyAI-RA 0.1', '90.48', '89.28', '89.88'],
      ['StarVLA-GR00T', '88.00', '88.50', '88.25'],
      ['StarVLA-OFT', '88.18', '88.32', '88.25'],
      ['LingBot-VLA', '88.56', '86.68', '87.62'],
      ['Qwen-VLA-Instruct', '86.10', '87.20', '86.65'],
      ['ABot-M0', '86.06', '85.08', '85.57'],
      ['Track4Action', '80.44', '81.48', '80.96'],
      ['X-VLA', '70.00', '39.00', '54.50']
    ]
  },
  ablation: {
    caption: 'Component ablations, success rates (%) — Tables 3 and 4',
    description: 'Matched component ablations · LIBERO and RoboTwin averages · Tables 3–4',
    headers: ['Configuration', 'Geometry', 'Memory', 'LIBERO avg.', 'LIBERO Long', 'RoboTwin avg.'],
    rows: [
      ['GeoMem-VLA', 'Yes', 'Yes', '98.9', '96.6', '91.17'],
      ['w/o geometry branch', 'No', 'Yes', '97.9', '95.2', '89.71'],
      ['w/o temporal memory', 'Yes', 'No', '98.2', '94.2', '90.18'],
      ['StarVLA-GR00T', 'No', 'No', '96.5', '92.0', '88.25']
    ]
  }
};

function renderBenchmark(name) {
  const data = benchmarks[name];
  const table = $('#benchmark-table');
  table.replaceChildren();
  const caption = table.createCaption();
  caption.textContent = data.caption;
  caption.className = 'sr-only';
  const header = table.createTHead().insertRow();
  data.headers.forEach(text => {
    const th = document.createElement('th');
    th.scope = 'col'; th.textContent = text; header.append(th);
  });
  const tbody = table.createTBody();
  data.rows.forEach((values, index) => {
    const row = tbody.insertRow();
    if (index === 0) row.className = 'ours';
    values.forEach((text, col) => {
      const cell = document.createElement(col === 0 ? 'th' : 'td');
      cell.textContent = text;
      if (col === 0) cell.scope = 'row';
      if (index === 0 && col === 0) {
        const badge = document.createElement('span'); badge.textContent = 'Ours'; cell.append(' ', badge);
      }
      row.append(cell);
    });
  });
  $('#benchmark-description').textContent = data.description;
  $('#benchmark-panel').setAttribute('aria-labelledby', `${name}-tab`);
  $('.table-scroll').scrollLeft = 0;
}
renderBenchmark('libero');

$$('[role="tablist"]').forEach(list => {
  const tabs = $$('[role="tab"]', list);
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(item => {
        item.setAttribute('aria-selected', String(item === tab));
        item.tabIndex = item === tab ? 0 : -1;
      });
      if (tab.dataset.benchmark) renderBenchmark(tab.dataset.benchmark);

    });
    tab.addEventListener('keydown', event => {
      const index = tabs.indexOf(tab);
      const next = {ArrowRight:(index+1)%tabs.length, ArrowLeft:(index-1+tabs.length)%tabs.length, Home:0, End:tabs.length-1}[event.key];
      if (next !== undefined) {event.preventDefault(); tabs[next].focus(); tabs[next].click();}
    });
  });
});

const dialog = $('#figure-dialog');
let lastFigureTrigger;
$$('[data-zoom]').forEach(button => button.addEventListener('click', () => {
  lastFigureTrigger = button;
  $('#dialog-image').src = button.dataset.zoom;
  $('#dialog-image').alt = $('img', button).alt;
  $('#dialog-title').textContent = button.getAttribute('aria-label').replace(/^Enlarge /, '');
  dialog.showModal();
  $('.dialog-image-wrap').scrollTo(0, 0);
}));
$('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {if (event.target === dialog) dialog.close();});
dialog.addEventListener('close', () => lastFigureTrigger?.focus({preventScroll:true}));

function safeURL(value) {
  if (typeof value !== 'string' || !value.trim()) return null;
  try {const url=new URL(value,document.baseURI);return ['https:','http:','file:'].includes(url.protocol)?url.href:null;} catch {return null;}
}
for (const key of ['arxiv','code']) {
  const url=safeURL(config.links?.[key]);
  if (!url) continue;
  const placeholder=$(`#${key}-link`);
  const link=document.createElement('a');
  link.href=url;link.id=placeholder.id;link.className='resource';link.target='_blank';link.rel='noopener';
  // Preserve the arXiv/GitHub marks when enabling the real links.
  link.append(...[...placeholder.childNodes].filter(node=>node.nodeName!=='SMALL'));
  placeholder.replaceWith(link);
}
if (config.authors?.length) {
  $('#authors').replaceChildren();
  config.authors.forEach(author=>{
    const url=safeURL(author.url),name=document.createElement(url?'a':'span');
    name.textContent=author.name;
    if(url){name.href=url;name.target='_blank';name.rel='noopener';}
    if(author.affiliation){const sup=document.createElement('sup');sup.textContent=author.affiliation;name.append(sup);}
    $('#authors').append(name);
  });
}
if(config.affiliations?.length){$('#affiliations').textContent=config.affiliations.join(' · ');$('#affiliations').hidden=false;}

for (const [key,path] of Object.entries(config.videos||{})) {
  const url=safeURL(path),slot=$(`[data-media-slot="${key}"]`);
  if(!url||!slot)continue;
  const video=document.createElement('video');
  video.className='media-video';video.controls=true;video.playsInline=true;video.preload='metadata';video.src=url;
  video.muted=true;video.defaultMuted=true;video.loop=true;
  video.setAttribute('aria-label',`${key} demonstration video`);
  const still=$('img',slot);video.poster=safeURL(config.posters?.[key])||still?.src||'';
  if(slot.classList.contains('task-media')){
    const fallback=[...slot.childNodes];slot.replaceChildren(video);
    // The native poster is only shown before playback. Pausing, buffering,
    // looping and returning to a slide retain the video's decoded frame.
    const kind=$('.media-kind',slot.closest('figure'));
    if(kind)kind.textContent=config.videoSpeeds?.[key] > 1 ? ` · ${config.videoSpeeds[key]}× speed` : ' · Video';
    video.addEventListener('error',()=>{
      slot.replaceChildren(...fallback);
      if(kind)kind.textContent=' · Task setup';
    },{once:true});
  }else{
    const figure=document.createElement('figure');figure.className='extra-video';figure.append(video);slot.append(figure);
    const placeholder=$('.case-placeholder',slot);
    if(placeholder)placeholder.hidden=true;
    video.addEventListener('error',()=>{figure.remove();if(placeholder)placeholder.hidden=false;},{once:true});
  }
}
if(config.bibtex){
  $('#citation-block').hidden=false;$('#bibtex').textContent=config.bibtex;
  $('#copy-citation').addEventListener('click',async()=>{
    try{await navigator.clipboard.writeText(config.bibtex);$('#copy-status').textContent='Copied.';}
    catch{$('#copy-status').textContent='Select the entry to copy.';}
  });
}

// Paginate related media; preserve every figure when JavaScript is unavailable.
function playSlideVideos(slide) {
  // Wait until the new section/slide has a rendered box before playback.
  requestAnimationFrame(() => $$('video', slide).forEach(video => {
    if(video.closest('[hidden]') || document.hidden || !video.closest('.chapter.is-in-view'))return;
    video.autoplay=true;
    video.play().catch(()=>{});
  }));
}
function syncVideoPlayback() {
  $$('video').forEach(video=>{
    if(video.closest('[hidden]') || document.hidden || !video.closest('.chapter.is-in-view')){video.autoplay=false;video.pause();}
  });
  if(!document.hidden)$$('.chapter.is-in-view').forEach(playSlideVideos);
}

$$('[data-gallery]').forEach(gallery => {
  const slides = $$('[data-slide]', gallery);
  const stage = $('.gallery-stage', gallery);
  const pager = $('.pager', gallery);
  let current = 0;
  let touchStart;
  slides.forEach((slide, index) => {
    slide.setAttribute('role', 'group');
    slide.setAttribute('aria-roledescription', 'slide');
    slide.setAttribute('aria-label', `${index + 1} of ${slides.length}: ${slide.dataset.title}`);
    slide.hidden = index !== 0;
  });
  const count = $('.page-count', gallery);
  count.textContent = `1 / ${slides.length}`;
  pager.hidden = slides.length < 2;
  gallery.classList.add('is-paged');
  function show(index) {
    const next = (index + slides.length) % slides.length;
    if (next === current) return;
    $$('video', slides[current]).forEach(video => {
      video.autoplay = false;
      video.pause();
    });
    if (slides[current].contains(document.activeElement)) {
      $(index > current ? '[data-next]' : '[data-prev]', gallery).focus({preventScroll:true});
    }
    slides[current].hidden = true;
    const slide = slides[next];
    slide.hidden = false;
    current = next;
    count.textContent = `${current + 1} / ${slides.length}`;
    playSlideVideos(slide);
  }
  $('[data-prev]', gallery).addEventListener('click', () => show(current - 1));
  $('[data-next]', gallery).addEventListener('click', () => show(current + 1));
  gallery.addEventListener('keydown', event => {
    // Keep native video seeking, volume and fullscreen shortcuts intact.
    if (event.target.closest('video')) return;
    const next = {ArrowLeft:current-1, ArrowRight:current+1, Home:0, End:slides.length-1}[event.key];
    if (next !== undefined) {event.preventDefault();show(next);}
  });
  stage.addEventListener('touchstart', event => {
    touchStart = event.touches.length === 1 && !event.target.closest('video')
      ? {x:event.touches[0].clientX,y:event.touches[0].clientY} : null;
  }, {passive:true});
  stage.addEventListener('touchend', event => {
    if (!touchStart || !event.changedTouches.length) return;
    const dx=event.changedTouches[0].clientX-touchStart.x;
    const dy=event.changedTouches[0].clientY-touchStart.y;
    if(Math.abs(dx)>60 && Math.abs(dx)>Math.abs(dy)*1.5)show(current+(dx<0?1:-1));
    touchStart=null;
  }, {passive:true});
  stage.addEventListener('touchcancel',()=>{touchStart=null;},{passive:true});
});

// Prevent multiple demonstrations from playing over one another.
$$('video').forEach(video => video.addEventListener('play', () => {
  // A pending play request may finish after a quick page change.
  if (video.closest('[hidden]') || document.hidden || !video.closest('.chapter.is-in-view')) {video.pause();return;}
  $$('video').forEach(other => {if (other !== video) other.pause();});
}));
document.addEventListener('chapterchange',syncVideoPlayback);
document.addEventListener('visibilitychange',syncVideoPlayback);
