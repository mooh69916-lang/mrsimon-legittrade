function el(id){return document.getElementById(id)}

// Render plan cards
function renderPlans(){
  const container = document.getElementById('plans');
  container.innerHTML = '';
  PLANS.forEach((p, idx)=>{
    const card = document.createElement('div');
    card.className = 'card plan-card';
    const invStart = p.amount < 100 ? 100 : 200;
    card.innerHTML = `
      <div class="title">${p.name} <span style="float:right" class="plan-amount">${formatK(p.amount)}</span></div>
      <div>Receive <strong>${formatK(p.ret)}</strong></div>
      <div class="progress"><i id="prog-${p.code}"></i></div>
      <div class="meta">
        <div>Rating: <span class="count">${(4 + Math.random()).toFixed(1)}</span></div>
        <div>Investors: <span id="inv-${p.code}">${invStart}</span></div>
      </div>
      <div class="plan-ends">Closes in <span id="time-${p.code}">--:--:--</span></div>
      <div class="plan-card cta">
        <button class="btn" data-code="${p.code}" data-name="${p.name}" data-amount="${p.amount}">Invest Now</button>
      </div>
    `;
    container.appendChild(card);
  });
}

// Counters with localStorage persistence
const viewerKey = 'gv_viewers';
const investorKey = 'gv_investors';
function initCounters(){
  let viewers = parseInt(localStorage.getItem(viewerKey) || '0',10);
  if(!viewers){ viewers = 1000 + Math.floor(Math.random()*300); localStorage.setItem(viewerKey, viewers); }
  let investors = parseInt(localStorage.getItem(investorKey) || '0',10);
  if(!investors){ investors = 200 + Math.floor(Math.random()*80); localStorage.setItem(investorKey, investors); }
  el('viewerCount').textContent = viewers;
  el('investorCount').textContent = investors;

  // slowly increase
  setInterval(()=>{
    viewers += Math.floor(Math.random()*2);
    investors += Math.random() < 0.2 ? 1 : 0;
    localStorage.setItem(viewerKey, viewers);
    localStorage.setItem(investorKey, investors);
    el('viewerCount').textContent = viewers;
    el('investorCount').textContent = investors;
  },3000);
}

// Progress bars per plan (persist up to ~95%)
function initProgress(){
  PLANS.forEach(p=>{
    const key = 'gv_prog_' + p.code;
    let v = parseInt(localStorage.getItem(key) || '0',10);
    if(!v) v = 20 + Math.floor(Math.random()*40);
    const elem = document.getElementById('prog-'+p.code);
    if(elem) elem.style.width = v + '%';
    // slowly grow
    const grow = setInterval(()=>{
      if(v >= 95){ clearInterval(grow); return; }
      v += Math.floor(Math.random()*3);
      if(v>95) v=95;
      localStorage.setItem(key, v);
      if(elem) elem.style.width = v + '%';
      // sometimes increase investor count
      if(Math.random()<0.08){
        const invEl = document.getElementById('inv-'+p.code);
        if(invEl) invEl.textContent = parseInt(invEl.textContent||'0') + 1;
      }
    },2000 + Math.random()*3000);
  });
}

// Countdown timers: set an end time per plan (now + random hours)
const endTimes = {};
function initTimers(){
  PLANS.forEach(p=>{
    const key = 'gv_end_' + p.code;
    let end = localStorage.getItem(key);
    if(!end){
      const hours = 2 + Math.floor(Math.random()*48);
      end = Date.now() + hours*3600*1000;
      localStorage.setItem(key, end);
    }
    endTimes[p.code] = parseInt(end,10);
  });
  setInterval(()=>{
    PLANS.forEach(p=>{
      const elTime = document.getElementById('time-'+p.code);
      if(!elTime) return;
      const diff = endTimes[p.code] - Date.now();
      if(diff<=0){ elTime.textContent = 'Closed'; return; }
      const h = Math.floor(diff/3600000); const m = Math.floor((diff%3600000)/60000); const s = Math.floor((diff%60000)/1000);
      elTime.textContent = `${h}h ${m}m ${s}s`;
    });
  },1000);
}

// Notification popups
function notify(text){
  const box = document.getElementById('notif');
  box.textContent = text; box.style.display = 'block';
  setTimeout(()=>box.style.display='none',4000);
}

function randomNotifications(){
  setInterval(()=>{
    const name = FAKE_NAMES[Math.floor(Math.random()*FAKE_NAMES.length)];
    const city = FAKE_CITIES[Math.floor(Math.random()*FAKE_CITIES.length)];
    const plan = PLANS[Math.floor(Math.random()*PLANS.length)];
    const amt = plan.amount;
    notify(`${name} from ${city} just invested ${formatK(amt)}`);
  }, 6000 + Math.random()*6000);
}

// Invest button -> WhatsApp
function attachInvestHandlers(){
  document.addEventListener('click', e=>{
    const b = e.target.closest('button[data-code]');
    if(!b) return;
    const code = b.dataset.code; const amount = b.dataset.amount; const name = b.dataset.name;
    const msg = `I want to invest in ${name} (${code}) - ${formatK(amount)}`;
    const url = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(msg)}`;
    // open in new tab
    window.open(url, '_blank');
    // small UI effect: bump progress locally
    const key = 'gv_prog_' + code; let v = parseInt(localStorage.getItem(key)||'0',10); v = Math.min(95, v + 3 + Math.floor(Math.random()*6)); localStorage.setItem(key, v);
  });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', ()=>{
  renderPlans();
  initCounters();
  initProgress();
  initTimers();
  randomNotifications();
  attachInvestHandlers();
});
