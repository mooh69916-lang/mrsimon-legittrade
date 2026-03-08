function el(id){return document.getElementById(id)}
document.addEventListener('DOMContentLoaded', ()=>{
  const checkBtn = el('checkBtn');
  const codeInput = el('codeInput');
  const result = el('result');
  const resContent = el('resContent');
  const invalid = el('invalid');
  const withdrawBtn = el('withdrawBtn');

  function showInvalid(){ invalid.hidden = false; result.hidden = true; }
    function showResult(html, code){ invalid.hidden = true; result.hidden = false; resContent.innerHTML = html; withdrawBtn.onclick = ()=>{
      const msg = `Hello, I want to request withdrawal for code ${code}`;
      const url = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank');
    }}

  checkBtn.addEventListener('click', ()=>{
    const code = (codeInput.value||'').trim().toUpperCase();
    if(!code || !CODES[code]){ showInvalid(); return; }
    const d = CODES[code];
    const html = `<div>Investment: <strong>${formatK(d.amount)}</strong></div><div>Profit: <strong>${formatK(d.profit)}</strong></div><div>Total Return: <strong>${formatK(d.total)}</strong></div>`;
    showResult(html, code);
  });
});
