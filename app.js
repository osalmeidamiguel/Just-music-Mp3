// Just Music MP3 — front-end demonstrativo para GitHub Pages.
// Configure as chaves no backend (nunca publique segredos no JavaScript do navegador).
const state={source:'all',tracks:[],current:null};
const $=s=>document.querySelector(s);
const status=$('#status'),results=$('#results');
function setStatus(msg){status.textContent=msg}
function safeText(s=''){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function render(items){
  results.innerHTML='';
  if(!items.length){setStatus('Nenhuma faixa encontrada. Tente outro termo.');return}
  setStatus(`${items.length} resultado(s)`);
  items.forEach((t,i)=>{
    const el=document.createElement('div');el.className='track';
    el.innerHTML=`<div class="cover">♫</div><div><b>${safeText(t.title)}</b><small>${safeText(t.artist||'Artista desconhecido')} · ${safeText(t.source)}</small></div><button data-play="${i}">▶ Ouvir</button><button data-open="${i}">Abrir origem ↗</button>`;
    results.append(el);
  });
  results.querySelectorAll('[data-play]').forEach(b=>b.onclick=()=>play(items[+b.dataset.play]));
  results.querySelectorAll('[data-open]').forEach(b=>b.onclick=()=>window.open(items[+b.dataset.open].url,'_blank','noopener'));
}
async function search(q){
  if(!q.trim())return;
  setStatus('Buscando nas plataformas…');results.innerHTML='';
  // API própria recomendada: /api/search?q=...&source=...
  // O GitHub Pages é estático; implemente a rota em um backend/worker separado.
  try{
    const r=await fetch(`/api/search?q=${encodeURIComponent(q)}&source=${state.source}`);
    if(!r.ok)throw new Error('API não configurada');
    const data=await r.json();state.tracks=data.results||[];render(state.tracks);
  }catch(e){
    setStatus('A busca por API ainda não foi conectada. Consulte README.md para configurar um backend seguro. Nenhum áudio é extraído ou baixado sem autorização.');
  }
}
function play(t){
  state.current=t;$('#now-title').textContent=t.title;$('#now-artist').textContent=t.artist||t.source;
  // O backend deve devolver somente URLs de stream oficialmente autorizadas.
  const host=$('#audio-host');host.innerHTML='';
  if(t.streamUrl){const a=document.createElement('audio');a.controls=false;a.src=t.streamUrl;a.autoplay=true;host.append(a);a.play().catch(()=>setStatus('Não foi possível iniciar a reprodução.'))}
  else if(t.embedUrl){host.innerHTML=t.embedUrl;setStatus('Reprodução incorporada pela plataforma de origem.')}
  else setStatus('Esta faixa não possui stream autorizado disponível.');
}
$('#search-form').addEventListener('submit',e=>{e.preventDefault();search($('#query').value)});
$('.primary').onclick=()=>$('#query').focus();
document.querySelectorAll('.filter').forEach(b=>b.onclick=()=>{document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');state.source=b.dataset.source});
document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>{document.querySelectorAll('.nav').forEach(x=>x.classList.remove('active'));if(b.classList.contains('nav'))b.classList.add('active');if(b.dataset.view==='search')$('#query').focus();else if(b.dataset.view!=='home')setStatus('Esta seção será preenchida com os dados da sua biblioteca.')});
$('#play').onclick=()=>{if(state.current)play(state.current)};
