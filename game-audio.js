/* Kenney Interface Sounds — CC0 1.0. See assets/audio/LICENSE-KENNEY-CC0.txt */
(function(){
  'use strict';
  const files={
    click:'./assets/audio/click.ogg',
    correct:'./assets/audio/correct.ogg',
    incorrect:'./assets/audio/incorrect.ogg',
    sparkle:'./assets/audio/sparkle.ogg',
    reward:'./assets/audio/reward.ogg',
    transition:'./assets/audio/transition.ogg',
    open:'./assets/audio/open.ogg',
    select:'./assets/audio/select.ogg'
  };
  const players={};
  Object.keys(files).forEach(key=>{
    const a=new Audio(files[key]);
    a.preload='auto';
    /* Keep everyday interface feedback gentle; reserve louder cues for rewards. */
    a.volume=key==='click'?0.18:key==='select'?0.24:key==='open'?0.28:0.55;
    players[key]=a;
  });
  window.playGameSound=function(name){
    const a=players[name];
    if(!a||window.gameSoundEnabled===false)return;
    try{a.pause();a.currentTime=0;const p=a.play();if(p&&p.catch)p.catch(()=>{});}catch(e){}
  };
  document.addEventListener('click',function(e){
    const b=e.target.closest('button,[role="button"]');
    if(!b||b.disabled||b.dataset.noClickSound!==undefined)return;
    if(b.id==='sound'||b.id==='soundBtn')return;
    window.playGameSound('click');
  },true);
})();