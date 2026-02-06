// ---------- STARFIELD AND METEORS ----------
const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
for(let i=0;i<200;i++){
  stars.push({x:Math.random()*canvas.width, y:Math.random()*canvas.height, size:Math.random()*1.5+0.5, speed:Math.random()*0.3+0.1, alpha:Math.random()});
}
let meteors = [];

function animate(){
  const grad = ctx.createRadialGradient(canvas.width/2, canvas.height/2,0,canvas.width/2,canvas.height/2,canvas.width);
  grad.addColorStop(0,"#0a0a0a"); grad.addColorStop(1,"#000");
  ctx.fillStyle = grad; ctx.fillRect(0,0,canvas.width,canvas.height);

  stars.forEach(s=>{
    s.y -= s.speed; if(s.y<0) s.y=canvas.height;
    s.alpha += (Math.random()-0.5)*0.02;
    if(s.alpha>1)s.alpha=1; if(s.alpha<0.2)s.alpha=0.2;
    ctx.fillStyle = `rgba(102,255,204,${s.alpha})`; ctx.fillRect(s.x,s.y,s.size,s.size);
  });

  if(Math.random()<0.008){ meteors.push({x:Math.random()*canvas.width, y:canvas.height+20, size:2+Math.random()*2, speed:3+Math.random()*1.5, trail:[]}); }
  meteors.forEach((m,i)=>{
    m.trail.push({x:m.x,y:m.y}); if(m.trail.length>10)m.trail.shift();
    m.x -= m.speed*0.3; m.y -= m.speed;
    for(let j=0;j<m.trail.length;j++){ const p=m.trail[j]; ctx.fillStyle = `rgba(255,165,0,${j/m.trail.length})`; ctx.fillRect(p.x,p.y,m.size*2,m.size/2);}
    if(m.x<0 || m.y<0) meteors.splice(i,1);
  });
  requestAnimationFrame(animate);
}
animate();
window.addEventListener('resize',()=>{ canvas.width=window.innerWidth; canvas.height=window.innerHeight; });

// ---------- QUIZ DATA ----------
const data = { /* same as your previous JS quiz data */ };

// ---------- QUIZ LOGIC ----------
let quiz, i, score;
function start(type){ quiz = data[type]; i=0; score=0; show("quiz"); load(); }
function load(){ /* same as previous load() */ }
function check(btn, idx, correctIdx){ /* same as previous check() */ }
function next(){ i++; if(i<quiz.length) load(); else end(); }
function end(){ show("result"); document.getElementById("final").textContent=`Final Score: ${score} / ${quiz.length}`; }
function menu(){ show("menu"); }
function show(id){ document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active")); document.getElementById(id).classList.add("active"); }
