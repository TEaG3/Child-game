'use strict';
const CACHE='little-muslim-v6';
const FILES=['./','./index.html','./progress.js','./manifest.webmanifest','./icon.svg','./coach-happy.svg','./coach-try.svg','./child-boy.svg','./child-girl.svg','./sw.js'];
self.addEventListener('install',event=>{
 event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting()));
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