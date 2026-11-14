'use strict';
const CACHE='little-muslim-v18';
const FILES=['./','./index.html','./games.html','./progress.js','./voice-preferences.js','./game-audio.js','./assets/audio/click.ogg','./assets/audio/correct.ogg','./assets/audio/incorrect.ogg','./assets/audio/sparkle.ogg','./assets/audio/reward.ogg','./assets/audio/transition.ogg','./assets/audio/open.ogg','./assets/audio/select.ogg','./manifest.webmanifest','./icon.svg','./boy.jpg','./girl.png','./rabbit.png','./cat.png','./girl.jpg','./rabbit.jpg','./cat.jpg','./sw.js','./audio/arabic-alphabet.ogg'];
self.addEventListener('install',event=>{
 event.waitUntil((async()=>{const cache=await caches.open(CACHE);const required=['./','./index.html','./games.html','./progress.js','./voice-preferences.js','./game-audio.js','./assets/audio/click.ogg','./assets/audio/correct.ogg','./assets/audio/incorrect.ogg','./assets/audio/sparkle.ogg','./assets/audio/reward.ogg','./assets/audio/transition.ogg','./assets/audio/open.ogg','./assets/audio/select.ogg','./manifest.webmanifest','./sw.js'];await cache.addAll(required);await Promise.all(FILES.filter(file=>!required.includes(file)).map(file=>cache.add(file).catch(()=>null)));await self.skipWaiting()})());
});
self.addEventListener('activate',event=>{
 event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET')return;
 const url=new URL(event.request.url);
 if(url.origin!==self.location.origin)return;
 event.respondWith((async()=>{
   try{
     const response=await fetch(event.request);
     if(response&&response.ok){
       const cache=await caches.open(CACHE);
       cache.put(event.request,response.clone()).catch(()=>{});
     }
     return response;
   }catch(error){
     const cached=await caches.match(event.request);
     if(cached)return cached;
     if(event.request.mode==='navigate')return (await caches.match('./index.html'))||Response.error();
     return Response.error();
   }
 })());
});