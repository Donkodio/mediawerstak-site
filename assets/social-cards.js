/* Read-only gallery: no login, account mutation or publication requests. */
document.addEventListener('DOMContentLoaded', () => {
  const tabs = [...document.querySelectorAll('[data-sc-tab]')];
  function select(tab, focus = false) {
    tabs.forEach(t => {
      const active = t === tab;
      t.setAttribute('aria-selected', String(active));
      t.tabIndex = active ? 0 : -1;
      const panel = document.getElementById(t.getAttribute('aria-controls'));
      if (panel) panel.hidden = !active;
    });
    if (focus) tab.focus();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', event => {
      const actions = {ArrowRight: (index + 1) % tabs.length,
        ArrowLeft: (index + tabs.length - 1) % tabs.length, Home: 0, End: tabs.length - 1};
      if (Object.hasOwn(actions, event.key)) {
        event.preventDefault(); select(tabs[actions[event.key]], true);
      }
    });
  });
  const dialog = document.getElementById('sc-dialog');
  if (!dialog) return;
  const image = document.getElementById('sc-dialog-image');
  let trigger;
  document.querySelectorAll('[data-sc-shot]').forEach(button => {
    button.addEventListener('click', () => {
      trigger = button;
      image.src = button.dataset.scShot;
      image.alt = 'Скриншот ' + button.dataset.scTitle;
      document.getElementById('sc-dialog-title').textContent = button.dataset.scTitle;
      dialog.showModal();
    });
  });
  document.getElementById('sc-dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => { image.removeAttribute('src'); if (trigger) trigger.focus(); });
});
