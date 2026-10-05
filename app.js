/* ReUsa – prototipo final (HTML + CSS + JS, sin librerías) */
(function(){
var SHOT=/[?&]shot=1/.test(location.search),WF=/[?&]fid=wf/.test(location.search);if(SHOT)document.documentElement.classList.add('shot');if(WF)document.documentElement.classList.add('wf');

var $=function(s,c){return (c||document).querySelector(s)}, $$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};

/* ---------- Reu ---------- */
function reu(mood){var happy=mood==='feliz';
return '<svg class="reu'+(happy?' happy':'')+'" viewBox="0 0 520 540" role="img" aria-label="Reu, la mascota de ReUsa">'+
'<path d="M268 30c96-6 196 52 222 150 26 98-20 196-96 262s-196 82-282 26S-6 324 22 222 172 36 268 30z" fill="#DCE3C9"/>'+
'<path d="M360 330c56-8 112 28 120 84s-38 102-94 102-104-28-104-84 22-94 78-102z" fill="#F4C9A6"/>'+
'<ellipse class="r-shadow" cx="262" cy="468" rx="110" ry="16" fill="#C3CCA7"/>'+
'<g class="r-drop"><path d="M110 250c10 13 16 21 16 30a16 16 0 0 1-32 0c0-9 6-17 16-30z" fill="#5F7341"/></g>'+
'<g class="r-drop r-drop2"><path d="M420 200c8 10 12 16 12 23a12 12 0 0 1-24 0c0-7 4-13 12-23z" fill="#E89A6B"/></g>'+
'<g class="r-spark"><path d="M440 120l6 14 14 6-14 6-6 14-6-14-14-6 14-6z" fill="#E89A6B"/><path d="M96 150l4 9 9 4-9 4-4 9-4-9-9-4 9-4z" fill="#5F7341"/>'+(happy?'<path d="M150 90l5 11 11 5-11 5-5 11-5-11-11-5 11-5z" fill="#B54A26"/><path d="M380 60l4 9 9 4-9 4-4 9-4-9-9-4 9-4z" fill="#5F7341"/>':'')+'</g>'+
'<g class="r-body">'+
'<g class="r-sprout"><path d="M262 112c0-14 0-24 0-32" stroke="#5F7341" stroke-width="6" stroke-linecap="round"/><path d="M262 88c-4-24 14-40 38-42 2 24-14 42-38 42z" fill="#5F7341"/><path d="M262 98c2-18-12-32-30-32-2 18 12 32 30 32z" fill="#8FA368"/></g>'+
'<path d="M188 146c6-24 40-36 74-36s68 12 74 36z" fill="#2F3B24"/><rect x="244" y="118" width="36" height="8" rx="4" fill="#1F2818"/>'+
'<rect x="164" y="142" width="196" height="32" rx="14" fill="#3D4B2F"/>'+
'<path d="M177 174h170l-25 248a20 20 0 0 1-20 18h-80a20 20 0 0 1-20-18z" fill="#B54A26"/>'+
'<path d="M196 196l10 96" fill="none" stroke="#D2734B" stroke-width="9" stroke-linecap="round"/>'+
'<path d="M189 300h146l-6 62H195z" fill="#F4C9A6"/>'+
'<text x="262" y="340" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-weight="700" font-size="24" fill="#2F3B24">ReUsa</text>'+
'<g class="r-eyes"><ellipse cx="236" cy="226" rx="10" ry="13" fill="#2A2A22"/><ellipse cx="288" cy="226" rx="10" ry="13" fill="#2A2A22"/><circle cx="240" cy="221" r="3.5" fill="#fff"/><circle cx="292" cy="221" r="3.5" fill="#fff"/></g>'+
'<circle cx="216" cy="252" r="10" fill="#F4C9A6" opacity=".9"/><circle cx="308" cy="252" r="10" fill="#F4C9A6" opacity=".9"/>'+
(happy?'<path d="M242 252c8 18 32 18 40 0z" fill="#2A2A22"/>':'<path d="M246 256c8 12 24 12 32 0" fill="none" stroke="#2A2A22" stroke-width="5" stroke-linecap="round"/>')+
(happy?'<path d="M190 282c-26-10-40-30-46-58" fill="none" stroke="#B54A26" stroke-width="15" stroke-linecap="round"/><circle cx="142" cy="222" r="15" fill="#B54A26"/>'
:'<path d="M190 282c-30 10-46 30-50 54" fill="none" stroke="#B54A26" stroke-width="15" stroke-linecap="round"/><g class="r-leaf"><path d="M140 336c-34 0-52 22-52 50 30 0 52-20 52-50z" fill="#5F7341"/><path d="M140 336 100 380" stroke="#DCE3C9" stroke-width="3" stroke-linecap="round"/></g>')+
'<g class="r-wave"><path d="M334 282c26-10 44-30 50-58" fill="none" stroke="#B54A26" stroke-width="15" stroke-linecap="round"/><circle cx="386" cy="222" r="15" fill="#B54A26"/></g>'+
'<path d="M238 438v22M286 438v22" stroke="#2F3B24" stroke-width="14" stroke-linecap="round"/>'+
'</g></svg>';}
function paintReu(root){$$('[data-reu]',root).forEach(function(el){el.innerHTML=reu(el.getAttribute('data-reu'));});}
paintReu(document);

/* ---------- Estado (en memoria) ---------- */
var S={streak:12,todayDone:false,pts:86,kinds:{botella:18,vaso:6,taper:4,cubiertos:3,bolsa:2},scans:{},today:0,reacted:false,pending:null,av:'🦊'};
var GR={botella:12,vaso:12,taper:8,cubiertos:6,bolsa:6};
var KN={botella:['💧','Botellas'],vaso:['☕','Vasos'],taper:['🍱','Tápers'],cubiertos:['🍴','Cubiertos'],bolsa:['🛍️','Bolsas']};
var DATOS=[
 {n:'886',t:'toneladas de residuos plásticos generan cada día Lima y Callao.',f:'Fuente: MINAM, "Menos plástico, más vida"',r:'¡886 toneladas al día! 😮 Tócame para otro dato'},
 {n:'46 %',t:'de los residuos plásticos del país se genera solo en Lima y Callao.',f:'Fuente: MINAM',r:'Casi la mitad está en Lima… ¡y la UPC está aquí! 👀'},
 {n:'30 kg',t:'de plástico consume en promedio cada peruano al año.',f:'Fuente: MINAM',r:'¿Cuántos de esos 30 kg serán tuyos? 🤔'},
 {n:'6 000',t:'bolsas plásticas se usan por minuto en el Perú: casi 3 000 millones al año.',f:'Fuente: MINAM',r:'¡6 000 por minuto! Lleva tu bolsa 🛍️'},
 {n:'50 %',t:'de todo el plástico que se desecha en el mundo es de un solo uso.',f:'Fuente: MINAM, cifras del mundo',r:'Usar una vez y botar… mejor reúsa ♻️'}
];
var me={n:'Camila T. (tú)',s:'San Isidro',me:true};
var SEM=[{n:'Ana R.',s:'Monterrico',v:142},{n:'Luis P.',s:'Villa',v:131},{n:'Sofía M.',s:'San Miguel',v:124},{n:'Mateo G.',s:'Monterrico',v:117},{n:'Valeria Q.',s:'San Isidro',v:109},{n:'Diego M.',s:'Villa',v:100},{n:'Renzo L.',s:'San Isidro',v:84},{n:'Andrea C.',s:'Monterrico',v:79},{n:'Joaquín V.',s:'San Miguel',v:71}];
var RACHA=[{n:'Lucía F.',s:'Villa',v:64},{n:'Mateo G.',s:'Monterrico',v:51},{n:'Ana R.',s:'Monterrico',v:40},{n:'Pedro S.',s:'San Isidro',v:33},{n:'Sofía M.',s:'San Miguel',v:27},{n:'Renzo L.',s:'San Isidro',v:21},{n:'Daniela H.',s:'Villa',v:18},{n:'Bruno A.',s:'San Miguel',v:15},{n:'Luis P.',s:'Villa',v:9}];
var SEDES=[{n:'San Isidro',v:3.4,ev:612,d:'+14 %',up:true,t:'🟢 Menos'},{n:'Villa',v:3.1,ev:705,d:'+9 %',up:true,t:'🟡 Igual'},{n:'Monterrico',v:2.6,ev:1340,d:'+4 %',up:true,t:'🟢 Menos'},{n:'San Miguel',v:2.2,ev:398,d:'−3 %',up:false,t:'🔴 Más'}];
var POINTS=[{id:'b1',code:'3107',e:'💧',bg:'var(--salvia)',n:'Bebedero Pabellón A, piso 1',s:'San Isidro · bebedero',k:'botella'},{id:'b2',code:'2084',e:'💧',bg:'var(--salvia)',n:'Bebedero Torre C, piso 3',s:'San Isidro · bebedero',k:'botella'},{id:'c1',code:'7790',e:'☕',bg:'var(--melo)',n:'Cafetería Central',s:'San Isidro · local amigo',k:'cafe'}];
var TICK=['Lima y Callao generan <b>886 toneladas</b> de plástico al día (MINAM) 😮','En el Perú se usan <b>6 000 bolsas por minuto</b> (MINAM) 🛍️','<b>San Isidro</b> lidera la Copa de Sedes 🏆','Esta semana se evitaron <b>3 055 descartables</b> en la UPC 💧','<b>Lucía F.</b> llegó a 64 días de racha 🔥','Limpieza de Monterrico vio <b>menos botellas</b> en los tachos 🟢','Nueva cafetería amiga en Villa ☕'];
var FEED=[
 {id:'p1',when:'Hoy',tag:'📊 La UPC esta semana',m:'m-oliva',num:'3 055',unit:'descartables evitados',t:'Los estudiantes de las 4 sedes evitaron más descartables que la semana pasada',chart:[['L',48],['M',62],['M',55],['J',71],['V',86]],src:'Datos de registros ReUsa (ejemplo)',b:'<p>Entre lunes y viernes se registraron <b>3 055 descartables evitados</b> en las 4 sedes: botellas, vasos, tápers, cubiertos y bolsas.</p><p>El viernes fue el mejor día de la semana. ¿Lo superamos la próxima? 💪</p><p class="src">Fuente: registros de la app ReUsa (datos de ejemplo).</p>'},
 {id:'p2',when:'Sábado',tag:'🗑️ Reporte del tacho',m:'m-salvia',num:'🟢',unit:'Menos botellas',t:'Limpieza de San Isidro vio menos botellas en el tacho de plásticos',src:'Reporte semanal del personal de limpieza',b:'<p>El personal de limpieza de las torres C y D reportó <b>menos botellas</b> en el tacho de plásticos que la semana pasada. 🟢</p><p>Coincide con los <b>612 descartables evitados</b> que registraron los escaneos de San Isidro esta semana.</p><p class="src">Fuente: reporte semanal del personal de limpieza.</p>'},
 {id:'p3',when:'Hace 2 días',tag:'🛍️ Perú en cifras',m:'m-melo',num:'3 000',unit:'millones de bolsas al año',t:'Es lo que se usa en el Perú: unas 6 000 bolsas por minuto',src:'Fuente: MINAM',b:'<p>Según el Ministerio del Ambiente, en el Perú se usan <b>casi 3 000 millones de bolsas plásticas al año</b>, unas <b>6 000 por minuto</b>.</p><p>En ReUsa, si compras en la cafetería o en la tiendita con tu propia bolsa, también lo puedes registrar 🛍️.</p><p class="src">Fuente: MINAM, campaña "Menos plástico, más vida".</p>'},
 {id:'p4',when:'Lunes',tag:'🏆 Copa de Sedes',m:'m-arena',num:'3,4',unit:'por estudiante activo',t:'San Isidro ganó la Copa de la semana pasada',chart:[['SI',3.4],['VI',3.1],['MO',2.6],['SM',2.2]],src:'Datos de registros ReUsa (ejemplo)',b:'<p>Con <b>3,4 descartables evitados por estudiante activo</b>, San Isidro superó a Villa por muy poco.</p><p>La Copa se mide por estudiante activo para que todas las sedes compitan en igualdad.</p>'},
 {id:'p5',when:'Hace 4 días',tag:'🍱 Tip',m:'m-salvia',num:'+8 g',unit:'por cada táper',t:'¿Comida para llevar? Tu táper evita el envase de tecnopor',src:'Peso referencial estimado',b:'<p>Si compras comida para llevar, pide que te la sirvan en tu táper. Es un envase de tecnopor menos.</p><p>Al registrar en la cafetería, marca 🍱 <b>Táper</b> (y 🍴 si llevaste tus cubiertos): cada cosa suma a tu residuo evitado.</p>'}
];

/* ---------- Utilidades ---------- */
function toast(t){var el=$('#toast');el.textContent=t;el.classList.add('on');clearTimeout(toast.h);toast.h=setTimeout(function(){el.classList.remove('on')},2300);}
function push(t,delay){clearTimeout(push.d);push.d=setTimeout(function(){$('#pushTxt').textContent=t;var p=$('#push');p.classList.add('on');clearTimeout(push.h);if(!SHOT)push.h=setTimeout(function(){p.classList.remove('on')},4500);},SHOT?0:(delay||0));}
$('#push').addEventListener('click',function(){this.classList.remove('on');});
function countTo(el,to,dec){var from=parseFloat(el.textContent)||0,t0=null;function f(ts){if(!t0)t0=ts;var p=Math.min((ts-t0)/700,1),v=from+(to-from)*(1-Math.pow(1-p,3));el.textContent=dec?v.toFixed(1):Math.round(v);if(p<1)requestAnimationFrame(f);}requestAnimationFrame(f);}
function totalAvoid(){var t=0;for(var k in S.kinds)t+=S.kinds[k];return t;}
function grams(){var t=0;for(var k in S.kinds)t+=S.kinds[k]*GR[k];return t;}
function semList(){var l=SEM.concat([{n:me.n,s:me.s,v:S.pts,me:true}]);return l.sort(function(a,b){return b.v-a.v;});}
function rachaList(){var l=RACHA.concat([{n:me.n,s:me.s,v:S.streak,me:true}]);return l.sort(function(a,b){return b.v-a.v;});}
function myPos(){return semList().findIndex(function(x){return x.me;})+1;}
function nextMeta(){var M=[7,21,50,100];for(var i=0;i<M.length;i++)if(S.streak<M[i])return M[i];return 100;}
function prevMeta(){var M=[0,7,21,50,100],p=0;M.forEach(function(m){if(S.streak>=m)p=m;});return p;}

/* círculo de racha */
function ring(el){var r=70,c=2*Math.PI*r,nm=nextMeta(),pm=prevMeta(),pc=(S.streak-pm)/(nm-pm);
  if(!el.innerHTML){el.innerHTML='<svg viewBox="0 0 160 160"><circle class="bg" cx="80" cy="80" r="'+r+'" fill="none" stroke-width="12"/><circle class="fg" cx="80" cy="80" r="'+r+'" fill="none" stroke-width="12" stroke-dasharray="'+c+'" stroke-dashoffset="'+c+'"/></svg><div class="in"><span class="f">🔥</span><b data-streak>'+S.streak+'</b><span>días</span></div>';}
  el.classList.toggle('done',S.todayDone);
  requestAnimationFrame(function(){requestAnimationFrame(function(){$('.fg',el).style.strokeDashoffset=c*(1-pc);});});}

function refresh(){
  $$('[data-streak]').forEach(function(e){countTo(e,S.streak);});
  $$('[data-pts]').forEach(function(e){countTo(e,S.pts);});
  $$('[data-count="avoid"]').forEach(function(e){countTo(e,totalAvoid());});
    $$('[data-k]').forEach(function(e){countTo(e,S.kinds[e.getAttribute('data-k')]);});
  $$('[data-pos]').forEach(function(e){e.textContent='#'+myPos();});
  var L=semList(),a=L[myPos()-2];
  $$('[data-gap]').forEach(function(e){e.innerHTML=a?'Te faltan <b>'+(a.v-S.pts+1)+' pts</b> para pasar a '+a.n:'¡Vas primera en la UPC! 🏆';});
  $$('[data-today]').forEach(function(e){e.className='today'+(S.todayDone?' ok':'');e.textContent=S.todayDone?'✓ Hoy cumplido':'⏳ Hoy pendiente';});
  $$('[data-week]').forEach(function(e){var d=['L','M','M','J','V'],h='';d.forEach(function(x,i){var done=i<3||(i===3&&S.todayDone);h+='<i class="'+(done?'d':'')+(i===3?' t':'')+'" title="'+(i===3?'Hoy':x)+'">'+(done?'💧':x)+'</i>';});e.innerHTML=h;});
  $$('[data-meta]').forEach(function(e){var nm=nextMeta();e.textContent='Te faltan '+(nm-S.streak)+' días para la insignia de '+nm+' días';});
  ring($('#ringHome'));ring($('#ringReto'));
  var pr=$('#pRing');if(pr)pr.style.strokeDashoffset=389.6*(1-(S.streak-prevMeta())/(nextMeta()-prevMeta()));
  $('[data-reto-title]').textContent=S.todayDone?'¡Hoy ya cumpliste! Puedes seguir sumando puntos':'Recarga y regístralo para mantener tu racha';
  $('[data-limit]').textContent='Hoy: '+S.today+' de 5 registros · 1 por punto cada 30 min';
  var g=grams();$$('[data-residuo]').forEach(function(e){e.textContent=fmtG(g);});
  $$('[data-equiv]').forEach(function(e){e.textContent='≈ '+Math.round(g/12)+' botellas de 500 ml · este mes';});
  var mx=0;Object.keys(KN).forEach(function(k){mx=Math.max(mx,S.kinds[k]*GR[k]);});
  var order=Object.keys(KN).sort(function(a,b){return S.kinds[b]*GR[b]-S.kinds[a]*GR[a];});
  $$('[data-kbars]').forEach(function(e){var big=e.classList.contains('big');e.innerHTML=order.map(function(k){var gg=S.kinds[k]*GR[k];return '<div class="kb"><span>'+KN[k][0]+'</span>'+(big?'<span>'+S.kinds[k]+' '+KN[k][1].toLowerCase()+'</span>':'')+'<span class="t"><i style="width:'+(gg/mx*100)+'%"></i></span><span>'+gg+' g</span></div>';}).join('');});
  var rb=$('.reto-btn');rb.classList.toggle('done',S.todayDone);
  $('[data-rb-t]').textContent=S.todayDone?'¡Reto de hoy cumplido!':'Continuar mi reto';
  $('[data-rb-s]').textContent=S.todayDone?(S.today<5?'Día '+S.streak+' · puedes sumar más ('+S.today+' de 5)':'Día '+S.streak+' · llegaste al máximo de hoy'):'Día '+(S.streak+1)+' · aún no registras hoy';
  renderBadges();
}
function fmtG(g){return g>=1000?(g/1000).toFixed(2).replace('.',',')+' kg':Math.round(g)+' g';}


/* ---------- Ingreso (HU01–HU06) ---------- */
var ROLE='cafe';
$$('[data-role]').forEach(function(b){b.addEventListener('click',function(){var r=b.getAttribute('data-role');if(r==='est')show('p02');else{ROLE=r;show('p04');}});});
$('#sendCode').addEventListener('click',function(){var m=$('#mail').value.trim(),e=$('#mailErr');
  if(!/^[^@\s]+@upc\.edu\.pe$/i.test(m)){e.textContent=/^\d{8}$/.test(m)?'Ese parece un DNI. Si eres personal de cafetería o limpieza, vuelve y elige tu tipo de usuario.':'Usa tu correo UPC (termina en @upc.edu.pe).';return;}
  e.textContent='';var w=$('#codeWrap');if(w.hidden){w.hidden=false;this.textContent='Verificar';toast('Código enviado a tu correo UPC ✉️');$('#code input').focus();return;}check();});
function codeInputs(sel,done){var ci=$$(sel+' input');ci.forEach(function(inp,i){inp.addEventListener('input',function(){inp.value=inp.value.replace(/\D/g,'');if(inp.value&&ci[i+1])ci[i+1].focus();if(ci.every(function(x){return x.value;}))done(ci.map(function(x){return x.value;}).join(''),ci);});inp.addEventListener('keydown',function(e){if(e.key==='Backspace'&&!inp.value&&ci[i-1])ci[i-1].focus();});});return ci;}
var ci=codeInputs('#code',function(){check();});
function check(){var v=ci.map(function(x){return x.value;}).join(''),m=$('#codeMsg');
  if(v==='4821'){m.style.color='#3F6B1E';m.textContent='✓ Correo verificado';setTimeout(function(){show('p03');},600);}
  else{m.style.color='';m.textContent=v.length<4?'Completa los 4 dígitos.':'El código no coincide. Revisa tu correo (ejemplo: 4821).';}}
$$('#sedes .sede').forEach(function(b){b.addEventListener('click',function(){$$('#sedes .sede').forEach(function(x){x.setAttribute('aria-pressed','false');});b.setAttribute('aria-pressed','true');me.s=b.childNodes[0].textContent;$$('[data-sede]').forEach(function(e){e.textContent=me.s;});});});
function staffForm(){var c=ROLE==='cafe';$('#stEye').textContent=(c?'Cafetería':'Personal de limpieza')+' · Primer ingreso';$('#stTitle').textContent='Ingresa con tu DNI';$('#znLbl').textContent=c?'Tu local':'Tu zona';$('#nm').value=c?'Diego Salazar':'Jorge Ramírez';$('#zn').value=c?'Cafetería Central':'Torres C y D';}
$('#stGo').addEventListener('click',function(){var e=$('#stErr');
  if(!/^\d{8}$/.test($('#dni').value)){e.textContent='El DNI debe tener 8 números.';return;}
  if(!/^\d{4}$/.test($('#sc').value)){e.textContent='El código de sede tiene 4 números. Pídelo a tu supervisor.';return;}
  if(!$('#ok').checked){e.textContent='Para continuar, acepta el uso de tus datos.';return;}
  e.textContent='';show(ROLE==='cafe'?'p18':'p19');});

/* ---------- Router de pantallas ---------- */
var SCR={p01:['onb','s-p01'],p02:['onb','s-p02'],p03:['onb','s-p03'],p04:['onb','s-p04'],
 p05:['est','v-home'],p06:['est','v-home'],p07:['est','v-reto',1],p08:['est','v-reto',2],p09:['est','v-reto',3],p10:['est','v-reto',4],p11:['est','v-reto',5],p12:['est','v-reto',6],
 p13:['est','v-rank'],p14:['est','v-rank'],p15:['est','v-prof'],p16:['est','v-prof'],p17:['est','v-prof'],p18:['cafe','s-p18'],p19:['limp','s-p19'],p20:['limp','s-p20']};
var CUR=null,pushedHome=false;
function show(id,opt){opt=opt||{};var d=SCR[id];if(!d)return;CUR=id;closeSheet();$('#push').classList.remove('on');
  $$('.shell').forEach(function(x){x.classList.toggle('on',x.id==='sh-'+d[0]);});
  $$('.scr,.view').forEach(function(x){x.classList.toggle('on',x.id===d[1]);});
  $$('#sh-est .nav [data-p], #sh-est .bnav [data-p]').forEach(function(b){var t=b.getAttribute('data-p'),act=(t==='p05'&&/p0[56]/.test(id))||(t==='p13'&&/p1[34]/.test(id))||(t==='p15'&&/p1[5-7]/.test(id));if(act)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');});
  if(id==='p04')staffForm();
  if(d[2])retoStep(d[2]);
  if(id==='p13'||id==='p14'){tab=id==='p14'?'sedes':'sem';$$('#rtabs button').forEach(function(x){x.setAttribute('aria-selected',x.getAttribute('data-t')===tab);});renderRank();}
  if(/p1[5-7]/.test(id)){var pn={p15:'ins',p16:'imp',p17:'hue'}[id];$$('#ptabs button').forEach(function(x){x.setAttribute('aria-selected',x.getAttribute('data-p2')===pn);});$$('.pane').forEach(function(p){p.classList.toggle('on',p.getAttribute('data-pane')===pn);});}
  if(d[0]==='est')refresh();
  if(id==='p05'&&!S.todayDone&&(!pushedHome||SHOT)){pushedHome=true;push('¡Aún no registras hoy! Tu racha de '+S.streak+' días te espera 🔥',1800);}
  if(id==='p05'&&!helloT&&!SHOT){helloT=1;setTimeout(function(){reuSay('¿Sabías que Lima y Callao generan 886 toneladas de plástico al día? 😮');},2600);}
  if(!opt.keepHash&&location.hash!=='#'+id)history.replaceState(null,'','#'+id+(location.hash.indexOf('?')>-1&&opt.keepQ?location.hash.slice(location.hash.indexOf('?')):''));
  if(!SHOT)window.scrollTo(0,0);
  var sel=$('#dockSel');if(sel)sel.value=id;
}
document.addEventListener('click',function(e){var b=e.target.closest('[data-p]');if(b&&!b.hasAttribute('data-p2')){e.preventDefault();show(b.getAttribute('data-p'));}});

/* ---------- Feed ---------- */
$('#tk').innerHTML=TICK.concat(TICK).map(function(t){return '<span>'+t+'</span>';}).join('');
$('#feed').innerHTML=FEED.map(function(p,i){var ch='';if(p.chart){var mx=Math.max.apply(null,p.chart.map(function(c){return c[1];}));ch='<div class="chart">'+p.chart.map(function(c,j){return '<div><i style="height:'+(c[1]/mx*100)+'%;animation-delay:'+(j*.08)+'s"></i>'+c[0]+'</div>';}).join('')+'</div>';}
 return '<article class="fp" style="animation-delay:'+(i*.08)+'s"><div class="fp-head"><div class="av" style="background:var(--terra);color:#fff">R</div><div><b>Equipo ReUsa</b><span>'+p.when+'</span></div><span class="tag">'+p.tag+'</span></div>'+
 '<div class="fp-stat '+p.m+'"><span class="num">'+p.num+'</span><span class="unit">'+p.unit+'</span><h3>'+p.t+'</h3>'+ch+'</div>'+
 '<div class="fp-body"><p class="fp-src">'+p.src+'</p><div class="fp-actions"><button class="rbtn sm" aria-pressed="false" data-react="'+p.id+'">👍 Me interesó</button><button class="rbtn sm" aria-pressed="false" data-react="'+p.id+'">👎 No mucho</button><span class="plus1" data-plus="'+p.id+'">+1 ⭐</span><button class="link" data-post="'+i+'">Leer más</button></div></div></article>';}).join('');
$$('[data-react]').forEach(function(b){b.addEventListener('click',function(){var g=b.getAttribute('data-react');
  $$('[data-react="'+g+'"]').forEach(function(x){x.setAttribute('aria-pressed','false');});b.setAttribute('aria-pressed','true');
  reuSay(b.textContent.indexOf('👍')>-1?'¡Me alegra que te guste! 🎉':'¡Gracias! Buscaré algo más interesante 💪',true);
  if(!S.reacted){S.reacted=true;S.pts+=1;var pl=$('[data-plus="'+g+'"]');if(pl)pl.classList.add('show');toast('+1 punto por leer hoy ⭐');refresh();}
  else toast('¡Gracias por tu opinión! El punto del blog es 1 al día');});});
$$('[data-post]').forEach(function(b){b.addEventListener('click',function(){var p=FEED[+b.getAttribute('data-post')];$('#shTag').innerHTML='<span class="chip">'+p.tag+'</span>';$('#shTitle').textContent=p.t;$('#shBody').innerHTML=p.b;$('#scrim').classList.add('on');$('#sheet').classList.add('on');});});
function closeSheet(){$('#scrim').classList.remove('on');$('#sheet').classList.remove('on');}
$('#scrim').addEventListener('click',closeSheet);$('#shClose').addEventListener('click',closeSheet);
document.addEventListener('keydown',function(e){if(e.key==='Escape')closeSheet();});

/* ---------- Reto ---------- */
function qrSvg(el,n,seed){var h='<rect width="'+n+'" height="'+n+'" fill="#fff"/>',r=seed;function rnd(){r=(r*9301+49297)%233280;return r/233280;}
  function finder(x,y){h+='<rect x="'+x+'" y="'+y+'" width="7" height="7" fill="#2F3B24"/><rect x="'+(x+1)+'" y="'+(y+1)+'" width="5" height="5" fill="#fff"/><rect x="'+(x+2)+'" y="'+(y+2)+'" width="3" height="3" fill="#2F3B24"/>';}
  for(var y=0;y<n;y++)for(var x=0;x<n;x++){var inF=(x<8&&y<8)||(x>n-9&&y<8)||(x<8&&y>n-9);if(!inF&&rnd()>.52)h+='<rect x="'+x+'" y="'+y+'" width="1" height="1" fill="#2F3B24"/>';}
  finder(0,0);finder(n-7,0);finder(0,n-7);var c=Math.floor(n/2)-2;h+='<rect x="'+c+'" y="'+c+'" width="5" height="5" rx="1" fill="#B54A26"/>';el.innerHTML=h;}
qrSvg($('#ghost'),21,7);qrSvg($('#qrCafe'),25,42);
function retoStep(n){[1,2,3,4,5,6].forEach(function(i){$('#r'+i).hidden=i!==n;});var el=$('#r'+n);el.style.animation='none';el.offsetHeight;el.style.animation='enter .45s var(--ease)';if(n===2)renderPoints();if(n===3){pci.forEach(function(x){x.value='';});$('#pcodeMsg').textContent='';pci[0].focus();}if(n===5)$('#photoPrev').hidden=true;}
$$('[data-m]').forEach(function(b){b.addEventListener('click',function(){if(S.today>=5){toast('Llegaste al máximo de 5 registros hoy');return;}retoStep(b.getAttribute('data-m')==='qr'?2:3);});});
$$('[data-back]').forEach(function(b){b.addEventListener('click',function(){retoStep(1);});});
function renderPoints(){$('#points').innerHTML=POINTS.map(function(p){var lock=S.scans[p.id];return '<button class="pt" data-pt="'+p.id+'"'+(lock?' disabled':'')+'><span class="ic" style="background:'+p.bg+'">'+p.e+'</span><span><b>'+p.n+'</b><span>'+(lock?'Ya registrado · vuelve en 30 min':p.s)+'</span></span><span class="go">'+(lock?'⏳':'Escanear')+'</span></button>';}).join('');
  $$('[data-pt]').forEach(function(b){b.addEventListener('click',function(){var p=POINTS.filter(function(x){return x.id===b.getAttribute('data-pt');})[0];toast('📷 QR leído: '+p.n);setTimeout(function(){startPoint(p);},450);});});}
var pci=codeInputs('#pcode',function(v,arr){var p=POINTS.filter(function(x){return x.code===v;})[0],m=$('#pcodeMsg');
  if(!p){m.style.color='var(--terra-t)';m.textContent='Ese código no existe. Revisa los 4 números debajo del QR.';return;}
  if(S.scans[p.id]){m.style.color='var(--terra-t)';m.textContent='Ya registraste '+p.n+'. Vuelve en 30 min.';return;}
  m.style.color='#3F6B1E';m.textContent='✓ '+p.n;setTimeout(function(){startPoint(p);},550);});
function startPoint(p){S.pending={p:p,kinds:p.k==='cafe'?[]:['botella'],photo:false};if(p.k==='cafe'){$$('#multi .mopt').forEach(function(x){x.setAttribute('aria-pressed','false');});$('#multiGo').disabled=true;$('#multiGo').style.opacity=.5;$('#s2place').textContent=p.n;retoStep(4);}else retoStep(5);}
$$('#multi .mopt').forEach(function(b){b.addEventListener('click',function(){b.setAttribute('aria-pressed',b.getAttribute('aria-pressed')!=='true');var any=$$('#multi .mopt[aria-pressed="true"]').length;var g=$('#multiGo');g.disabled=!any;g.style.opacity=any?1:.5;});});
$('#multiGo').addEventListener('click',function(){S.pending.kinds=$$('#multi .mopt[aria-pressed="true"]').map(function(x){return x.getAttribute('data-kind');});retoStep(5);});
$('#takePhoto').addEventListener('click',function(){var s=$('#shutter');s.classList.remove('go');s.offsetHeight;s.classList.add('go');$('#photoPrev').hidden=false;S.pending.photo=true;setTimeout(finish,800);});
$('#noPhoto').addEventListener('click',finish);
function finish(){
  var p=S.pending,pts=p.photo?7:5,first=!S.todayDone,before=myPos();
  S.pts+=pts;var g=0;p.kinds.forEach(function(k){S.kinds[k]++;g+=GR[k];});S.scans[p.p.id]=true;S.today++;
  if(first){S.todayDone=true;S.streak++;}
  var L={botella:'1 botella',vaso:'1 vaso con tapa y sorbete',taper:'1 táper de tecnopor',cubiertos:'1 juego de cubiertos',bolsa:'1 bolsa'};
  $('#okPts').textContent='+'+pts+' pts';$('#okTitle').textContent=first?'¡Racha de '+S.streak+' días! 🔥':'¡Sumaste otra vez! ⭐';
  $('#okSub').textContent='Evitaste: '+p.kinds.map(function(k){return L[k];}).join(' + ')+(p.photo?' · con foto 📸':'');
  $('#okG').textContent='♻️ +'+g+' g de residuo evitado';
  retoStep(6);confetti();refresh();
  var after=myPos();if(after<before)push('¡Subiste al puesto #'+after+' del ranking semanal! ⭐',2200);else{var a=semList()[after-2];if(a)push('Estás a '+(a.v-S.pts+1)+' pts de pasar a '+a.n+' 👀',2200);}
}
function confetti(){var c=$('#confetti'),cols=['#B54A26','#E89A6B','#5F7341','#F4C9A6','#2F3B24'],h='';for(var i=0;i<46;i++){h+='<i style="left:'+(Math.random()*100)+'%;background:'+cols[i%5]+';animation-delay:'+(Math.random()*.5)+'s;animation-duration:'+(1.2+Math.random())+'s"></i>';}c.innerHTML=h;}

/* ---------- Ranking ---------- */
var tab='sem';
$$('#rtabs button').forEach(function(b){b.addEventListener('click',function(){var t=b.getAttribute('data-t');if(t==='sedes')show('p14');else if(t==='sem')show('p13');else{tab='racha';$$('#rtabs button').forEach(function(x){x.setAttribute('aria-selected',x===b);});renderRank();}});});
function ini(n){return n.split(' ').map(function(w){return w[0];}).join('').slice(0,2).toUpperCase();}
function renderRank(){var b=$('#rankBody');
  if(tab==='sedes'){var max=SEDES[0].v;var tc={'🟢 Menos':'g','🟡 Igual':'y','🔴 Más':'r'};
    b.innerHTML='<div class="card"><span class="eyebrow">🏆 Copa de Sedes · esta semana</span><p class="small muted" style="margin:6px 0 18px">Descartables evitados por estudiante activo</p><div class="copa">'+SEDES.map(function(s,i){return '<div class="sd'+(i===0?' lead':'')+'"><b>'+(i===0?'🏆 ':'')+s.n+'</b><div class="bar"><i style="width:'+(s.v/max*100)+'%;animation-delay:'+(i*.12)+'s"></i></div><span class="num">'+s.v.toFixed(1).replace('.',',')+'</span></div>';}).join('')+'</div></div>'+
    '<h3 style="font-size:24px;margin:26px 0 4px">Cómo va cada sede</h3><p class="small muted">Registros de los estudiantes + reporte semanal del personal de limpieza</p><div class="sede-cards" style="grid-template-columns:repeat(2,1fr)">'+SEDES.map(function(s){return '<div class="sc"><b>'+s.n+'</b><div><span>Descartables evitados</span><b style="margin:0">'+s.ev+'</b></div><div><span>vs. semana pasada</span><span class="'+(s.up?'up':'down')+'">'+s.d+'</span></div><div><span>Tachos (limpieza)</span><span class="trend '+tc[s.t]+'">'+s.t+'</span></div></div>';}).join('')+'</div><p class="rank-note">Cada registro suma a la sede donde está el punto, no a la sede del estudiante.</p>';return;}
  var L=tab==='sem'?semList():rachaList(),unit=tab==='sem'?'pts':'días',top=L.slice(0,3);
  var pod='<div class="podium">'+[1,0,2].map(function(i){var x=top[i];return '<div class="pod p'+(i+1)+'"><div class="av" style="background:#fff">'+(i===0?'👑':ini(x.n))+'</div><b>'+x.n+'</b><div class="v">'+x.v+' <span class="small" style="font-family:var(--fb)">'+unit+'</span></div><div class="pos">'+(i+1)+'.º</div></div>';}).join('')+'</div>';
  var rows=L.slice(3).map(function(x,i){return '<div class="li'+(x.me?' me':'')+'"><span class="n">'+(i+4)+'</span><div class="av"'+(x.me?' style="background:var(--melo);font-size:20px"':'')+'>'+(x.me?S.av:ini(x.n))+'</div><div class="nm">'+x.n+'<span>'+x.s+'</span></div><span class="val">'+x.v+' <span class="small" style="font-family:var(--fb);font-weight:500">'+unit+'</span></span></div>';}).join('');
  b.innerHTML=pod+'<div class="list">'+rows+'</div><p class="rank-note">'+(tab==='sem'?'Se reinicia cada lunes. 5 pts por registro, 7 con foto, 1 por leer el blog.':'Histórico: días hábiles seguidos con al menos un registro. Fines de semana y vacaciones no cuentan.')+'</p>';}

/* ---------- Perfil ---------- */
function renderBadges(){var B=[[7,'🥉','7 días'],[21,'🥈','21 días'],[50,'🥇','50 días'],[100,'💎','100 días']];
  $('#badges').innerHTML=B.map(function(b){var ok=S.streak>=b[0],pc=Math.min(S.streak/b[0]*100,100);return '<div class="badge'+(ok?'':' lock')+'"><span class="e">'+b[1]+'</span><b>'+b[2]+'</b><div class="pb"><i style="width:'+pc+'%"></i></div><span class="small muted">'+(ok?'Conseguida':S.streak+' / '+b[0])+'</span></div>';}).join('');}
$$('#ptabs button').forEach(function(b){b.addEventListener('click',function(){show({ins:'p15',imp:'p16',hue:'p17'}[b.getAttribute('data-p2')]);});});
var AV=['🦊','🐼','🐸','🦉','🐢','🐙','🌵','🌻','🐬','🦜','🍀','⚡'];
$('#avatars').innerHTML=AV.map(function(a){return '<button aria-pressed="'+(a===S.av)+'" data-av="'+a+'">'+a+'</button>';}).join('');
$('#editAv').addEventListener('click',function(){var a=$('#avatars');a.hidden=!a.hidden;});$('#editAv2').addEventListener('click',function(){var a=$('#avatars');a.hidden=!a.hidden;});
$$('[data-av]').forEach(function(b){b.addEventListener('click',function(){S.av=b.getAttribute('data-av');$$('[data-av]').forEach(function(x){x.setAttribute('aria-pressed',x===b);});$$('[data-avatar]').forEach(function(e){e.textContent=S.av;});$('#avatars').hidden=true;toast('Avatar actualizado '+S.av);});});
var ITEMS=[['botella','💧','Botella',12],['vaso','🥤','Vaso',8],['taper','🍱','Táper',20],['bolsa','🛍️','Bolsa',6],['cubiertos','🍴','Cubiertos',5]],cnt={};
$('#items').innerHTML=ITEMS.map(function(it){cnt[it[0]]=0;return '<div class="item"><span class="e">'+it[1]+'</span><b>'+it[2]+'</b><div class="stepper"><button aria-label="Menos '+it[2]+'" data-st="'+it[0]+'" data-d="-1">−</button><output id="o-'+it[0]+'">0</output><button aria-label="Más '+it[2]+'" data-st="'+it[0]+'" data-d="1">+</button></div></div>';}).join('');
$$('[data-st]').forEach(function(b){b.addEventListener('click',function(){var k=b.getAttribute('data-st');cnt[k]=Math.max(0,cnt[k]+ +b.getAttribute('data-d'));$('#o-'+k).textContent=cnt[k];});});
$('#calc').addEventListener('click',function(){var g=0,n=0;ITEMS.forEach(function(it){g+=cnt[it[0]]*it[3];n+=cnt[it[0]];});var r=$('#result');
  if(!n){toast('Marca al menos una cosa que compraste hoy');return;}
  var ciclo=g*5*16/1000,tips=[];if(cnt.botella)tips.push('Recarga tu tomatodo en el bebedero 💧');if(cnt.vaso)tips.push('Pide tu bebida en tu taza ☕');if(cnt.taper)tips.push('Lleva tu táper para la comida para llevar 🍱');if(cnt.bolsa)tips.push('Lleva una bolsa de tela 🛍️');if(cnt.cubiertos)tips.push('Guarda cubiertos reutilizables en tu mochila 🍴');
  r.innerHTML='<span class="small">Si cada día de clases fuera así, en el ciclo generarías aprox.</span><b class="k">'+ciclo.toFixed(1).replace('.',',')+' kg de plástico</b><span class="small">('+n*80+' descartables en 16 semanas)</span><ul>'+tips.slice(0,3).map(function(t){return '<li>'+t+'</li>';}).join('')+'</ul>';r.classList.add('on');});

/* ---------- Cafetería ---------- */
$('#dlQr').addEventListener('click',function(){toast('QR descargado. ¡Imprímelo y pégalo en tu caja! 🖨️');});

/* ---------- Limpieza ---------- */
var rep=null;
$$('#bigOpts .bo').forEach(function(b){b.addEventListener('click',function(){$$('#bigOpts .bo').forEach(function(x){x.setAttribute('aria-pressed','false');});b.setAttribute('aria-pressed','true');rep=b.getAttribute('data-v');var s=$('#sendRep');s.disabled=false;s.style.opacity=1;});});
$('#limpPhoto').addEventListener('click',function(){this.classList.add('ok');this.textContent='✓ Foto agregada';});
$('#sendRep').addEventListener('click',function(){if(!rep)return;var e={Menos:'🟢',Igual:'🟡','Más':'🔴'}[rep];$('[data-last]').textContent=e+' '+rep;show('p20');});

/* ---------- Dato del día + Reu ---------- */
var di=0;
function showDato(i){var d=DATOS[i];var fb=$('.ft-body');fb.classList.remove('swap');fb.offsetHeight;fb.classList.add('swap');
  $('#ftBig').textContent=d.n;$('#ftTxt').textContent=d.t;$('#ftSrc').textContent=d.f;$('#ftIdx').textContent=(i+1)+'/'+DATOS.length;
  $$('[data-react="d"]').forEach(function(x){x.setAttribute('aria-pressed','false');});}
function reuSay(t,happy){var bb=$('#reuBubble');bb.textContent=t;bb.classList.remove('swap');bb.offsetHeight;bb.classList.add('swap');
  var h=$('#reuHost');h.classList.remove('jump');h.offsetHeight;h.classList.add('jump');
  var pk=$('.reu-peek');if(happy){pk.innerHTML=reu('feliz');clearTimeout(reuSay.t);reuSay.t=setTimeout(function(){pk.innerHTML=reu('hola');},2600);}}
$('#reuHost').addEventListener('click',function(){clearTimeout(helloT);di=(di+1)%DATOS.length;showDato(di);reuSay(DATOS[di].r,true);});
setInterval(function(){if(document.hidden||!$('#v-home').classList.contains('on')||!$('#sh-est').classList.contains('on'))return;var h=$('#reuHost');h.classList.remove('jump');h.offsetHeight;h.classList.add('jump');},9000);
var helloT=null;
$('#ftNext').addEventListener('click',function(){di=(di+1)%DATOS.length;showDato(di);reuSay(DATOS[di].r,true);});


/* ---------- Inicio del prototipo ---------- */
var DOCK=[['p01','P01 Tipo de usuario'],['p02','P02 Correo UPC y código'],['p03','P03 Sede principal'],['p04','P04 Ingreso del personal'],['p05','P05 Inicio del estudiante'],['p06','P06 Publicación abierta'],['p07','P07 Mi reto'],['p08','P08 Escanear QR'],['p09','P09 Escribir código'],['p10','P10 ¿Qué trajiste?'],['p11','P11 Foto opcional'],['p12','P12 Registro confirmado'],['p13','P13 Ranking'],['p14','P14 Sedes'],['p15','P15 Perfil · insignias'],['p16','P16 Perfil · mi impacto'],['p17','P17 Perfil · mi huella'],['p18','P18 Panel cafetería'],['p19','P19 Reporte de limpieza'],['p20','P20 Reporte enviado']];
if(!SHOT){var dk=document.createElement('div');dk.className='dock';dk.innerHTML='<label for="dockSel">Pantalla</label><select id="dockSel">'+DOCK.map(function(x){return '<option value="'+x[0]+'">'+x[1]+'</option>';}).join('')+'</select><label for="fidSel">Fidelidad</label><select id="fidSel"><option value="">Mockup</option><option value="wf">Wireframe</option></select>';document.body.appendChild(dk);
  $('#dockSel').addEventListener('change',function(){show(this.value);});$('#fidSel').value=WF?'wf':'';$('#fidSel').addEventListener('change',function(){document.documentElement.classList.toggle('wf',this.value==='wf');});}
function fromHash(){var h=location.hash.slice(1),q='';if(h.indexOf('?')>-1){q=h.slice(h.indexOf('?')+1);h=h.slice(0,h.indexOf('?'));}
  if(!SCR[h])h='p01';if(/r=limp/.test(q))ROLE='limp';
  if(h==='p09'){show('p09',{keepHash:1});'7790'.split('').forEach(function(d,i){pci[i].value=d;});$('#pcodeMsg').style.color='#3F6B1E';$('#pcodeMsg').textContent='✓ Cafetería Central';return;}
  if(h==='p10'){show('p10',{keepHash:1});startPoint(POINTS[2]);$$('#multi .mopt').forEach(function(x){if(/taper|cubiertos/.test(x.getAttribute('data-kind')))x.click();});return;}
  if(h==='p11'){S.pending={p:POINTS[2],kinds:['taper','cubiertos'],photo:false};show('p11',{keepHash:1});return;}
  if(h==='p12'){show('p07',{keepHash:1});S.pending={p:POINTS[2],kinds:['taper','cubiertos'],photo:true};finish();CUR='p12';return;}
  if(h==='p06'){show('p05',{keepHash:1});$('#push').classList.remove('on');$$('[data-post]')[0].click();CUR='p06';return;}
  if(h==='p02'&&/code/.test(q)){show('p02',{keepHash:1});$('#codeWrap').hidden=false;$('#sendCode').textContent='Verificar';return;}
  if(h==='p17'){show('p17',{keepHash:1});[['botella',1],['vaso',1],['taper',1]].forEach(function(x){cnt[x[0]]=x[1];$('#o-'+x[0]).textContent=x[1];});$('#calc').click();return;}
  if(h==='p19'&&/sel/.test(q)){show('p19',{keepHash:1});$$('#bigOpts .bo')[0].click();return;}
  show(h,{keepHash:1});}
fromHash();window.addEventListener("hashchange",function(){var h=location.hash.slice(1).split("?")[0];if(h!==CUR)fromHash();});
})();

