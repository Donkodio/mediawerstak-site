// Public examples only: no private API calls and no simulated posting actions.
(() => {
  const tabs=[...document.querySelectorAll('[data-preview-tab]')];
  function show(tab){for(const item of tabs){const active=item===tab;item.setAttribute('aria-selected',String(active));item.tabIndex=active?0:-1;document.getElementById(item.getAttribute('aria-controls')).hidden=!active;}}
  for(const tab of tabs){tab.addEventListener('click',()=>show(tab));tab.addEventListener('keydown',e=>{let i=tabs.indexOf(tab);if(e.key==='ArrowRight')i=(i+1)%tabs.length;else if(e.key==='ArrowLeft')i=(i+tabs.length-1)%tabs.length;else if(e.key==='Home')i=0;else if(e.key==='End')i=tabs.length-1;else return;e.preventDefault();show(tabs[i]);tabs[i].focus();});}
  const search=document.getElementById('module-search'),status=document.getElementById('module-status'),cards=[...document.querySelectorAll('[data-module]')];
  function filter(){const q=search.value.trim().toLocaleLowerCase();let count=0;for(const card of cards){card.hidden=!!((q&&!card.textContent.toLocaleLowerCase().includes(q))||(status.value&&card.dataset.status!==status.value));if(!card.hidden)count++;}document.getElementById('module-count').textContent=`Показано модулей: ${count} из ${cards.length}`;document.getElementById('module-empty').hidden=count>0;}
  if(search){search.addEventListener('input',filter);status.addEventListener('change',filter);}
  const helpSearch=document.getElementById('help-search'),help=[...document.querySelectorAll('[data-help-section]')];
  function openAnchor(){const key=location.hash.slice(1),section=document.getElementById(key);if(section&&section.matches('[data-help-section]')){section.hidden=false;section.open=true;}}
  if(helpSearch){helpSearch.addEventListener('input',()=>{const q=helpSearch.value.trim().toLocaleLowerCase(),words=q.split(/\s+/).filter(x=>x&&!['как','в','на','и','с','по'].includes(x));let count=0;for(const section of help){section.hidden=words.some(word=>!section.textContent.toLocaleLowerCase().includes(word));if(!section.hidden)count++;if(q)section.open=!section.hidden;}document.getElementById('help-count').textContent=`Показано разделов: ${count} из ${help.length}`;document.getElementById('help-empty').hidden=count>0;});window.addEventListener('hashchange',openAnchor);openAnchor();}
})();
