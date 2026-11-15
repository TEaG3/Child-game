(() => {
  'use strict';
  if (window.__littleMuslimCinematicFX) return;
  window.__littleMuslimCinematicFX = true;
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const store = { get(k){try{return localStorage.getItem(k)}catch(_){return null}}, set(k,v){try{localStorage.setItem(k,v)}catch(_){}} };
  const style = document.createElement('style');
  style.id = 'little-muslim-cinematic-styles';
  style.textContent = [
    'body{position:relative;isolation:isolate;transition:background .65s ease,color .45s ease}',
    '.ambient-sky{position:fixed;inset:0;z-index:0;overflow:hidden;pointer-events:none;contain:strict}',
    '.ambient-sky .orb{position:absolute;display:block;border-radius:50%;filter:blur(34px);opacity:.22;animation:lmOrb 18s ease-in-out infinite alternate}',
    '.ambient-sky .one{width:260px;height:260px;right:3%;top:8%;background:#ffd47a}',
    '.ambient-sky .two{width:300px;height:300px;left:2%;bottom:5%;background:#59d999;animation-delay:-6s}',
    '.ambient-sky .three{width:190px;height:190px;left:42%;top:48%;background:#7cc6ff;animation-delay:-11s}',
    '.ambient-sky .moon-glow{position:absolute;right:12%;top:12%;font-size:clamp(34px,6vw,66px);opacity:0;filter:drop-shadow(0 0 18px #ffe39b);transition:opacity .6s}',
    '@keyframes lmOrb{to{transform:translate3d(24px,-30px,0) scale(1.13)}}',
    'body>header,body>main,body>#app,body>section,body>footer{position:relative;z-index:1}header{z-index:5}',
    '.tile,.category-card,.world,.primary,.secondary,.choice,.letter,.back,.btn,.iconbtn{transform:translateZ(0);transition:transform .22s cubic-bezier(.2,.8,.2,1),box-shadow .22s ease,filter .22s ease}',
    '.tile,.category-card,.world,.primary,.secondary,.choice,.btn{box-shadow:0 5px 0 #145b4826,0 11px 22px #145b4819}',
    '.tile,.category-card,.world{overflow:hidden}',
    '.tile:after,.category-card:after,.hero:after{content:"";position:absolute;top:-20%;left:-130%;width:55%;height:140%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.52),transparent);transform:skewX(-24deg);pointer-events:none;animation:lmShimmer 8s ease-in-out infinite}',
    '@keyframes lmShimmer{0%,72%{left:-130%}100%{left:160%}}',
    '.tile:hover,.category-card:hover,.world:hover{transform:translateY(-4px) scale(1.012);box-shadow:0 9px 0 #145b4826,0 18px 28px #145b4825}',
    '.primary:hover,.secondary:hover,.choice:hover,.btn:hover{filter:brightness(1.035);transform:translateY(-2px)}',
    '.tile:active,.category-card:active,.world:active,.primary:active,.secondary:active,.choice:active,.btn:active{transform:translateY(3px) scale(.985);box-shadow:0 2px 0 #145b4820,0 4px 9px #145b4815}',
    '.mascots img{filter:drop-shadow(0 10px 12px rgba(20,91,72,.2));transition:filter .25s,transform .3s}',
    '.panel.active{animation:lmIrisIn .48s cubic-bezier(.2,.8,.2,1) both}.screen.on{animation:lmIrisIn .42s cubic-bezier(.2,.8,.2,1) both}',
    '@keyframes lmIrisIn{from{opacity:0;clip-path:circle(8% at 50% 48%);transform:translateY(8px) scale(.985)}to{opacity:1;clip-path:circle(150% at 50% 48%);transform:none}}',
    '.cinematic-theme-toggle{min-width:40px;min-height:40px;cursor:pointer}',
    '.flying-star{position:fixed;z-index:10001;left:0;top:0;font-size:34px;line-height:1;pointer-events:none;will-change:transform,opacity;filter:drop-shadow(0 0 12px #ffc857);transition:transform .78s cubic-bezier(.18,.75,.25,1),opacity .78s}',
    '@keyframes lmScoreBump{0%,100%{transform:scale(1)}45%{transform:scale(1.28);filter:drop-shadow(0 0 9px #ffc857)}}.score-bump{animation:lmScoreBump .48s ease}',
    '.touch-trail{position:fixed;z-index:10002;pointer-events:none;font-size:17px;line-height:1;animation:lmTrail .72s ease-out forwards;filter:drop-shadow(0 0 5px #ffc857)}',
    '@keyframes lmTrail{from{opacity:1;transform:translate(-50%,-50%) scale(.55) rotate(0)}to{opacity:0;transform:translate(-50%,-115%) scale(1.3) rotate(70deg)}}',
    '#drawPad{filter:drop-shadow(0 0 3px rgba(33,170,113,.16))}',
    'body.night-mode{background:radial-gradient(ellipse at 82% 8%,#284c68 0,#122c43 42%,#0a1c30 100%)!important;color:#edf8ff}',
    'body.night-mode .ambient-sky .orb{opacity:.34}body.night-mode .ambient-sky .moon-glow{opacity:1}',
    'body.night-mode header{background:#102b42;color:#fff;border-bottom:1px solid #e9c87555}',
    'body.night-mode .hero,body.night-mode .panel,body.night-mode .progress,body.night-mode .coach-box,body.night-mode .world,body.night-mode .result,body.night-mode .coach{background:rgba(18,43,62,.91)!important;color:#edf8ff!important;border-color:#e9c87555!important;backdrop-filter:blur(10px)}',
    'body.night-mode .hero h2,body.night-mode .section-title h2,body.night-mode .read-word,body.night-mode .dua,body.night-mode .big,body.night-mode .panel-head h2{color:#ffda8a!important;text-shadow:0 2px 12px #ffd47a35}',
    'body.night-mode .hero p,body.night-mode .hint,body.night-mode .coach-bubble,body.night-mode .category-card small,body.night-mode .tile small{color:#c5dbe9!important}',
    'body.night-mode .coach-bubble,body.night-mode .prompt,body.night-mode .face.backface{background:rgba(8,27,43,.88)!important;color:#f4f8ff!important;border-color:#e9c87555}',
    'body.night-mode .category-card,body.night-mode .tile,body.night-mode .choice,body.night-mode .letter,body.night-mode .back,body.night-mode .pill{background:linear-gradient(145deg,#25465a,#18364d)!important;color:#f5f8ff!important;border-color:#d5bb7955}',
    'body.night-mode .stars,body.night-mode .stat{color:#ffda8a}body.night-mode canvas{background:#fdfbf4}body.night-mode footer{color:#c5dbe9}',
    '@media(hover:hover) and (pointer:fine){.tile,.category-card,.world{transform-style:preserve-3d}}',
    '@media(prefers-reduced-motion:reduce){.ambient-sky .orb,.tile:after,.category-card:after,.hero:after,.panel.active,.screen.on{animation:none!important}.flying-star,.touch-trail{display:none!important}*,*:before,*:after{scroll-behavior:auto!important}}'
  ].join('');
  document.head.appendChild(style);
  const sky=document.createElement('div');sky.className='ambient-sky';sky.setAttribute('aria-hidden','true');
  sky.innerHTML='<i class="orb one"></i><i class="orb two"></i><i class="orb three"></i><span class="moon-glow">☾</span>';
  document.body.prepend(sky);
  const actions=document.querySelector('header .top-actions,header .stats');
  if(actions){
    const btn=document.createElement('button');btn.type='button';
    btn.className=(document.querySelector('header .round')?'round ':'iconbtn ')+'cinematic-theme-toggle';
    btn.title='تبديل أجواء الإضاءة';btn.setAttribute('aria-label','تبديل الوضع الليلي والنهاري');
    let night=store.get('littleMuslimNightMode')==='1';
    const apply=()=>{document.body.classList.toggle('night-mode',night);btn.textContent=night?'☀️':'🌙';btn.setAttribute('aria-pressed',String(night))};
    btn.addEventListener('click',()=>{night=!night;store.set('littleMuslimNightMode',night?'1':'0');apply()});
    apply();actions.prepend(btn);
  }
  function flyStar(){
    if(reduced)return;
    const target=document.getElementById('score')||document.getElementById('stars');if(!target)return;
    const r=target.getBoundingClientRect(),star=document.createElement('span');
    star.className='flying-star';star.textContent='⭐';star.setAttribute('aria-hidden','true');
    const sx=innerWidth*.5-17,sy=innerHeight*.52-17;
    star.style.transform='translate3d('+sx+'px,'+sy+'px,0) scale(1.15)';
    document.body.appendChild(star);
    requestAnimationFrame(()=>{star.style.transform='translate3d('+(r.left+r.width/2-17)+'px,'+(r.top+r.height/2-17)+'px,0) scale(.28) rotate(420deg)';star.style.opacity='.15'});
    setTimeout(()=>{star.remove();target.classList.remove('score-bump');void target.offsetWidth;target.classList.add('score-bump')},800);
  }
  if(typeof window.reward==='function'){
    const original=window.reward;
    window.reward=function(...args){const result=original.apply(this,args);flyStar();return result};
  }
  if(!reduced){
    const pad=document.getElementById('drawPad');let last=0;
    if(pad)pad.addEventListener('pointermove',e=>{
      if(e.pointerType==='mouse'&&e.buttons!==1)return;
      const now=performance.now();if(now-last<65)return;last=now;
      const spark=document.createElement('span');spark.className='touch-trail';
      spark.textContent=['✨','⭐','✦','💫'][Math.floor(Math.random()*4)];
      spark.style.left=e.clientX+'px';spark.style.top=e.clientY+'px';document.body.appendChild(spark);
      setTimeout(()=>spark.remove(),740);
    },{passive:true});
  }
  if(!reduced&&window.matchMedia&&window.matchMedia('(hover:hover) and (pointer:fine)').matches){
    document.querySelectorAll('.tile,.category-card,.world').forEach(card=>{
      card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform='perspective(850px) rotateX('+(-y*5)+'deg) rotateY('+(x*6)+'deg) translateY(-2px)'});
      card.addEventListener('pointerleave',()=>{card.style.transform=''});
    });
  }
  document.addEventListener('click',e=>{
    const b=e.target.closest('button');if(!b||b.disabled||b.classList.contains('cinematic-theme-toggle')||b.id==='soundBtn'||b.id==='sound')return;
    if(window.gameSoundEnabled&&typeof window.playGameSound==='function'){try{window.playGameSound('click')}catch(_){}}
  },true);
})();