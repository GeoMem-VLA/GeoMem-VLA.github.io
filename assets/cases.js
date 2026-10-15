'use strict';

// Small, dependency-free case switchers for the three analysis sections.
// Each showcase owns its state so the controls remain usable with keyboard and
// do not interfere with the benchmark tabs in main.js.
document.querySelectorAll('[data-case-showcase]').forEach(showcase => {
  const tabs = [...showcase.querySelectorAll('[data-case-tab]')];
  const panels = [...showcase.querySelectorAll('[data-case-panel]')];
  if (!tabs.length || !panels.length) return;
  const name = showcase.dataset.caseShowcase || 'cases';
  panels.forEach(panel => {
    panel.id = `${name}-${panel.dataset.casePanel}-panel`;
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', `${name}-${panel.dataset.casePanel}-tab`);
  });
  tabs.forEach(tab => {
    tab.id = `${name}-${tab.dataset.caseTab}-tab`;
    tab.setAttribute('aria-controls', `${name}-${tab.dataset.caseTab}-panel`);
  });
  const activate = key => {
    tabs.forEach(tab => {
      const active = tab.dataset.caseTab === key;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    panels.forEach(panel => { panel.hidden = panel.dataset.casePanel !== key; });
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(tab.dataset.caseTab));
    tab.addEventListener('keydown', event => {
      const delta = {ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1}[event.key];
      let next = delta === undefined ? ({Home: 0, End: tabs.length - 1}[event.key]) : undefined;
      if (delta !== undefined) next = (index + delta + tabs.length) % tabs.length;
      if (next === undefined) return;
      event.preventDefault();
      tabs[next].focus();
      activate(tabs[next].dataset.caseTab);
    });
  });
  const selected = tabs.find(tab => tab.getAttribute('aria-selected') === 'true') || tabs[0];
  activate(selected.dataset.caseTab);
});
