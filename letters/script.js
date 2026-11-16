'use strict';
const lettersData=[
['alif','أ','أَلِف',[['أرنب','🐇'],['أسد','🦁'],['ألوان','🎨']],['بطة','🐤','باب','🚪']],
['baa','ب','بَاء',[['بطة','🦆'],['باب','🚪'],['باص','🚌']],['قطة','🐱','تفاحة','🍎']],
['taa','ت','تَاء',[['تفاحة','🍎'],['تمساح','🐊'],['تاج','👑']],['باب','🚪','أرنب','🐇']],
['thaa','ث','ثَاء',[['ثعلب','🦊'],['ثلج','❄️'],['ثوم','🧄']],['أسد','🦁','باص','🚌']],
['jeem','ج','جِيم',[['جمل','🐪'],['جزر','🥕'],['جرس','🔔']],['بطة','🦆','ثعلب','🦊']],
['haa','ح','حَاء',[['حصان','🐎'],['حليب','🥛'],['حوت','🐋']],['تفاحة','🍎','ثلج','❄️']],
['khaa','خ','خَاء',[['خروف','🐑'],['خبز','🍞'],['خيمة','⛺']],['جمل','🐪','أرنب','🐇']],
['daal','د','دَال',[['ديك','🐓'],['دراجة','🚲'],['دب','🐻']],['باب','🚪','جزر','🥕']],
['thaal','ذ','ذَال',[['ذئب','🐺'],['ذرة','🌽'],['ذهب','🪙']],['باص','🚌','حصان','🐎']],
['raa','ر','رَاء',[['رمان','🍎'],['ريشة','🪶'],['رجل','🧍']],['خروف','🐑','دراجة','🚲']],
['zay','ز','زَاي',[['زرافة','🦒'],['زهرة','🌸'],['زيتون','🫒']],['ديك','🐓','ذئب','🐺']],
['seen','س','سِين',[['سمكة','🐟'],['سيارة','🚗'],['ساعة','⌚']],['دب','🐻','خبز','🍞']],
['sheen','ش','شِين',[['شمس','☀️'],['شجرة','🌳'],['شمعة','🕯️']],['سمكة','🐟','ذهب','🪙']],
['saad','ص','صَاد',[['صقر','🦅'],['صندوق','📦'],['صابون','🧼']],['شمس','☀️','رجل','🧍']],
['daad','ض','ضَاد',[['ضفدع','🐸'],['ضرس','🦷'],['ضوء','💡']],['ساعة','⌚','زهرة','🌸']],
['taa2','ط','طَاء',[['طائرة','✈️'],['طاووس','🦚'],['طماطم','🍅']],['شجرة','🌳','صقر','🦅']],
['zhaa','ظ','ظَاء',[['ظرف','✉️'],['ظل','🌤️'],['ظبي','🦌']],['ضفدع','🐸','صندوق','📦']],
['ayn','ع','عَيْن',[['عصفور','🐦'],['عنب','🍇'],['عين','👁️']],['طائرة','✈️','ضرس','🦷']],
['ghayn','غ','غَيْن',[['غزالة','🦌'],['غسالة','🧺'],['غيوم','☁️']],['ظبي','🦌','طماطم','🍅']],
['faa','ف','فَاء',[['فيل','🐘'],['فراشة','🦋'],['فراولة','🍓']],['عصفور','🐦','ظرف','✉️']],
['qaaf','ق','قَاف',[['قرد','🐒'],['قطار','🚆'],['قلم','🖊️']],['غزالة','🦌','عين','👁️']],
['kaaf','ك','كَاف',[['كلب','🐕'],['كتاب','📚'],['كرسي','🪑']],['فيل','🐘','غسالة','🧺']],
['laam','ل','لَام',[['ليمون','🍋'],['لعبة','🧸'],['لسان','👅']],['قرد','🐒','فراشة','🦋']],
['meem','م','مِيم',[['موز','🍌'],['مفتاح','🔑'],['مسجد','🕌']],['كتاب','📚','قلم','🖊️']],
['noon','ن','نُون',[['نمر','🐅'],['نحلة','🐝'],['نجمة','⭐']],['ليمون','🍋','كرسي','🪑']],
['haa2','هـ','هَاء',[['هدهد','🐦'],['هدية','🎁'],['هلال','🌙']],['موز','🍌','لعبة','🧸']],
['waaw','و','وَاو',[['وردة','🌹'],['ولد','👦'],['وسادة','🛏️']],['نمر','🐅','مفتاح','🔑']],
['yaa','ي','يَاء',[['يد','✋'],['يقطين','🎃'],['يوسفي','🍊']],['هدية','🎁','نجمة','⭐']]
];
const $=id=>document.getElementById(id);let currentId=null,currentIndex=0,voice=null,sequence=[];
function speak(text){if(!('speechSynthesis'in window))return; speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='ar';u.rate=.82;const vs=speechSynthesis.getVoices();u.voice=vs.find(v=>/^ar/.test(v.lang))||null;speechSynthesis.speak(u);}
function showPhase(n){['phase-intro','phase-words','phase-quiz'].forEach((id,i)=>$(id).classList.toggle('hidden',i!==n));$('phase-label').textContent='المرحلة '+(n+1)+' من 3';$('phase-progress').style.width=((n+1)*33.33)+'%';}
function startLesson(id){currentId=id;const d=lettersData.find(x=>x[0]===id);if(!d)return;$('selection-screen').classList.remove('active');$('lesson-screen').classList.add('active');$('celebration-screen').classList.add('hidden');$('big-letter').textContent=d[1];$('letter-name-display').textContent=d[2];document.querySelectorAll('.current-letter-text').forEach(e=>e.textContent=d[2]);$('quiz-feedback').textContent='';showPhase(0);speak('هذا حرف '+d[2]);}
function card(word,emoji,click){const b=document.createElement('button');b.className='item-card';b.type='button';b.innerHTML='<span class="picture" aria-hidden="true">'+emoji+'</span><p></p>';b.querySelector('p').textContent=word;b.addEventListener('click',click);return b;}
function setupWords(){const d=lettersData.find(x=>x[0]===currentId);const c=$('words-container');c.replaceChildren();d[3].forEach(([w,e])=>c.appendChild(card(w,e,()=>speak(w))));showPhase(1);speak('كلمات تبدأ بحرف '+d[2]);}
function setupQuiz(){const d=lettersData.find(x=>x[0]===currentId);const correct=d[3][0];const opts=[{word:correct[0],emoji:correct[1],ok:true},...[[d[4][0],d[4][1]],[d[4][2],d[4][3]]].map(x=>({word:x[0],emoji:x[1],ok:false}))];opts.sort(()=>Math.random()-.5);const c=$('quiz-options');c.replaceChildren();$('quiz-feedback').textContent='';opts.forEach(o=>c.appendChild(card(o.word,o.emoji,function(){if(o.ok){this.classList.add('correct-choice');c.querySelectorAll('button').forEach(b=>b.disabled=true);$('quiz-feedback').textContent='إجابة رائعة! أحسنت ⭐';setTimeout(()=>$('celebration-screen').classList.remove('hidden'),500);speak('أحسنت! إجابة صحيحة');}else{this.classList.add('wrong-choice');$('quiz-feedback').textContent='حاول مرة أخرى، أنت تستطيع!';speak('حاول مرة أخرى');setTimeout(()=>this.classList.remove('wrong-choice'),500);}})));showPhase(2);speak('أي صورة تبدأ بحرف '+d[2]+'؟');}
function back(){speechSynthesis?.cancel?.();$('celebration-screen').classList.add('hidden');$('lesson-screen').classList.remove('active');$('selection-screen').classList.add('active');}
function nextLetter(){const i=lettersData.findIndex(x=>x[0]===currentId);const d=lettersData[(i+1)%lettersData.length];startLesson(d[0]);}
window.addEventListener('DOMContentLoaded',()=>{const g=$('letters-grid');lettersData.forEach(d=>{const b=document.createElement('button');b.type='button';b.className='letter-btn';b.textContent=d[1];b.setAttribute('aria-label','تعلم حرف '+d[2]);b.addEventListener('click',()=>startLesson(d[0]));g.appendChild(b);});$('back-btn').addEventListener('click',back);$('speak-name').addEventListener('click',()=>speak('حرف '+lettersData.find(x=>x[0]===currentId)[2]));$('speak-sound').addEventListener('click',()=>speak(lettersData.find(x=>x[0]===currentId)[3][0][0][0]));$('next-words').addEventListener('click',setupWords);$('next-quiz').addEventListener('click',setupQuiz);$('again-btn').addEventListener('click',()=>startLesson(currentId));$('next-letter-btn').addEventListener('click',nextLetter);});
