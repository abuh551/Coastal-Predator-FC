const players=[
 {name:'Umair',num:28,role:'Goalkeeper'}, {name:'Ahmed',num:3,role:'Defender'}, {name:'Sahzaib',num:4,role:'Defender'}, {name:'Waqar',num:9,role:'Right Back'}, {name:'Anas',num:22,role:'Left Back'}, {name:'Talha',num:12,role:'Right Winger'}, {name:'Huzaifa',num:19,role:'Right Winger'}, {name:'Arqam',num:7,role:'Left Winger'}, {name:'Saad',num:15,role:'Midfield'}, {name:'Abu Huraira',num:8,role:'Center Midfield'}
];
let selected=new Set([28,3,4,9,12]);
const $=s=>document.querySelector(s); const $$=s=>document.querySelectorAll(s);
function initials(name){return name.split(' ').map(x=>x[0]).join('').slice(0,2)}
function render(){
 $('#availableCount').textContent=players.length-2;
 $('#playerStack').innerHTML=players.slice(0,6).map(p=>`<div class="mini-avatar">${initials(p.name)}</div>`).join('');
 $('#selectedText').textContent=`${selected.size} / ${players.length} selected`;
 $('#squadList').innerHTML=players.map(p=>`<article class="squad-row ${selected.has(p.num)?'selected':''}" data-num="${p.num}"><div class="number">${p.num}</div><div class="player-details"><strong>${p.name}</strong><span>${p.role.toUpperCase()}</span></div><div class="checkbox">${selected.has(p.num)?'✓':''}</div></article>`).join('');
 $('#teamGrid').innerHTML=players.map((p,i)=>`<article class="player-card" data-num="${p.num}"><div class="shirt ${i%3===1?'dark':''}">${p.num}</div><h3>${p.name}</h3><p>${p.role.toUpperCase()} ${p.name==='Abu Huraira'?' · CAPTAIN':''}</p></article>`).join('');
 const positions=[[50,82],[18,59],[81,59],[28,24],[72,24]];
 $('#pitchPlayers').innerHTML=players.filter(p=>selected.has(p.num)).slice(0,5).map((p,i)=>`<div class="pitch-player" style="left:${positions[i][0]}%;top:${positions[i][1]}%"><b>${p.num}</b><span>${p.name.split(' ')[0]}</span></div>`).join('');
}
const schedule=[['MON','Recovery & mobility','20:00 · Seaview Courts'],['WED','High intensity finishing','20:00 · Seaview Courts'],['SAT','Tactical game play','18:30 · Truff Arena']];
function renderSchedule(){ $('#practiceList').innerHTML=schedule.map((s,i)=>`<article class="practice-row"><b>${s[0]}</b><div><strong>${s[1]}</strong><span>${s[2]}</span></div><span>${i===1?'NEXT':'→'}</span></article>`).join('') }
function toast(message){const el=$('#toast');el.textContent=message;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),2400)}
$$('[data-target]').forEach(button=>button.addEventListener('click',()=>{const t=button.dataset.target; $$('.screen').forEach(s=>s.classList.toggle('active',s.id===t)); $$('.nav-link').forEach(n=>n.classList.toggle('active',n.dataset.target===t));window.scrollTo({top:0,behavior:'smooth'})}));
$('#squadList').addEventListener('click',e=>{const row=e.target.closest('.squad-row');if(!row)return;const num=Number(row.dataset.num); if(selected.has(num))selected.delete(num);else selected.add(num);render()});
$('#saveSquad').onclick=()=>toast(`Matchday squad saved — ${selected.size} players ready.`);
$('#checkIn').onclick=()=>{const b=$('#checkIn'); b.textContent=b.textContent==='CHECKED IN'?'CHECK IN':'CHECKED IN';toast(b.textContent==='CHECKED IN'?'You’re checked in. See you on the court!':'Check-in removed.');};
$('#quickAdd').onclick=()=>{$('[data-target="match"]').click();toast('Choose your available players for Friday.');};
$('#notify').onclick=()=>toast('No new club notifications.');
$('#addPractice').onclick=()=>toast('Practice-session creation is ready for coach access.');
$$('.filter').forEach(b=>b.onclick=()=>{ $$('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active'); const type=b.textContent; $$('.player-card').forEach((card,i)=>{const role=players[i].role;const show=type==='ALL'||(type==='ATTACK'&&/Winger|Pivot/.test(role))||(type==='DEFENCE'&&/Back|Defender|K/.test(role));card.style.display=show?'block':'none'})});
render();renderSchedule();
if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js'));
