(()=> {
'use strict';
const ready=()=> {
 const host=document.getElementById('activityChooser');
 if(!host || document.getElementById('educationExtras')) return;
 const style=document.createElement('style');
 style.textContent=`
 #educationExtras{margin:20px 0;display:grid;gap:12px}
 .edu-extra-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
 .edu-extra-card{border:2px solid white;border-radius:18px;padding:14px 12px;text-align:right;background:#fff;box-shadow:var(--shadow);color:var(--ink);min-height:126px}
 .edu-extra-card span{font-size:30px;display:block;margin-bottom:7px}
 .edu-extra-card b{display:block;font-size:15px}
 .edu-extra-card small{display:block;line-height:1.6;margin-top:5px;color:#587268}
 .edu-extra-panel{display:none;background:#fffaf0;border:2px solid #f2dfad;border-radius:18px;padding:15px;line-height:1.9}
 .edu-extra-panel.active{display:block}
 .edu-extra-panel button{margin:5px;padding:10px 13px;border-radius:12px;background:#e3f4e9;color:#145b48;font-weight:bold}
 .edu-story-choice{display:block;width:100%;text-align:right;margin:8px 0!important}
 .edu-progress-line{height:10px;background:#e7eee9;border-radius:12px;overflow:hidden;margin:8px 0}
 .edu-progress-line i{display:block;height:100%;background:#36b77c}
 @media(max-width:650px){.edu-extra-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.edu-extra-card{min-height:118px;padding:11px}}
 @media(max-width:390px){.edu-extra-grid{grid-template-columns:1fr 1fr}.edu-extra-card b{font-size:14px}}
 `;
 document.head.appendChild(style);
 const wrap=document.createElement('section');wrap.id='educationExtras';
 wrap.innerHTML=`
 <div class="section-title"><h2>🌟 مغامرات تطوير التعلم</h2><small>مهارات إضافية داخل التعليم</small></div>
 <div class="edu-extra-grid">
  <button class="edu-extra-card" data-extra="map"><span>🗺️</span><b>خريطة التعلم والمراحل</b><small>مسار متدرج للحروف والقراءة والكتابة والحساب</small></button>
  <button class="edu-extra-card" data-extra="stories"><span>📚</span><b>قصص تفاعلية</b><small>الصدق والأمانة والرحمة والآداب</small></button>
  <button class="edu-extra-card" data-extra="coach"><span>🗣️</span><b>المدرب الصوتي</b><small>استمع للتعليمات والتشجيع بصوت الجهاز</small></button>
  <button class="edu-extra-card" data-extra="parents"><span>👨‍👩‍👧</span><b>تقرير الأهل الأسبوعي</b><small>ملخص محلي للتقدم والمهارات</small></button>
  <button class="edu-extra-card" data-extra="badges"><span>🏅</span><b>ألبوم الإنجازات</b><small>شارات تُفتح مع التعلم والمثابرة</small></button>
  <button class="edu-extra-card" data-extra="access"><span>📱</span><b>سهولة الاستخدام</b><small>تحسين القراءة واللمس والصوت على الهاتف والآيباد</small></button>
 </div>
 <div id="eduExtraPanel" class="edu-extra-panel" aria-live="polite"></div>`;
 const tiles=host.querySelector('.tiles'); if(tiles) tiles.after(wrap); else host.appendChild(wrap);
 const panel=wrap.querySelector('#eduExtraPanel');
 const readData=()=>{let d={};try{d=JSON.parse(localStorage.getItem('littleMuslimProgressV1')||'{}')}catch(e){}return d};
 const speak=(text)=>{if(!('speechSynthesis'in window)){panel.insertAdjacentHTML('beforeend','<p>ميزة النطق غير مدعومة في هذا المتصفح.</p>');return}speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='ar-SA';u.rate=Number((panel.querySelector('#voiceRate') ? panel.querySelector('#voiceRate').value : null)||0.9);speechSynthesis.speak(u)};
 const show=(kind)=>{
  panel.classList.add('active');
  if(kind==='map'){
   const d=readData(),tracks=[['الحروف',(d.letters ? d.letters.length : 0)||0,8,'letters'],['القراءة',d.reading||0,5,'reading'],['الكتابة',d.writing||0,5,'writing'],['الحساب',d.math||0,5,'math']];
   panel.innerHTML='<h3>🗺️ خريطة رحلة التعلم</h3><p>ابدأ بالمهارة، ثم كرر التدريب لفتح المرحلة التالية. التقدم محفوظ على هذا الجهاز.</p>'+tracks.map(x=>'<p><b>'+x[0]+'</b> — '+x[1]+' من '+x[2]+' للتقدم للمرحلة التالية<div class="edu-progress-line"><i style="width:'+Math.min(100,x[1]/x[2]*100)+'%"></i></div><button data-go="'+x[3]+'">ابدأ '+x[0]+'</button></p>').join('');
   panel.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>(function(target){if(target)target.click()})(document.querySelector('[data-open="'+b.dataset.go+'"]')));
  }else if(kind==='stories'){
   panel.innerHTML='<h3>📚 قصة: الأمانة الجميلة</h3><p id="storyText">وجد أحمد قلماً في ساحة المدرسة، ولم يعرف صاحبه. ماذا يفعل؟</p><div id="storyChoices"><button class="edu-story-choice" data-answer="wrong">يحتفظ به لنفسه</button><button class="edu-story-choice" data-answer="right">يسلمه للمعلم ليسأل عن صاحبه</button></div><p id="storyFeedback"></p>';
   panel.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>{const ok=b.dataset.answer==='right';panel.querySelector('#storyFeedback').textContent=ok?'أحسنت! الأمانة تعني حفظ حقوق الآخرين 🌟':'فكر مرة أخرى: كيف نعيد الشيء إلى صاحبه؟';if(ok)panel.querySelector('#storyChoices').innerHTML='<button id="nextStory">قصة أخرى</button>';(function(nextStory){if(nextStory)nextStory.addEventListener('click',()=>{panel.querySelector('#storyText').textContent='رأيت زميلاً يحتاج إلى مساعدة، ماذا تفعل؟';panel.querySelector('#storyChoices').innerHTML='<button class="edu-story-choice" data-answer="right">أساعده بلطف</button><button class="edu-story-choice" data-answer="wrong">أتجاهله</button>';panel.querySelectorAll('[data-answer]').forEach(x=>x.onclick=()=>panel.querySelector('#storyFeedback').textContent=x.dataset.answer==='right'?'رائع! الرحمة والتعاون من الأخلاق الجميلة.':'حاول اختيار التصرف الرحيم.');});})(panel.querySelector('#nextStory'));});
  }else if(kind==='coach'){
   panel.innerHTML='<h3>🗣️ المدرب الصوتي</h3><p>اختر سرعة الصوت ثم استمع إلى رسالة تشجيعية.</p><label>سرعة القراءة <input id="voiceRate" type="range" min=".7" max="1.2" step=".1" value=".9"></label><p><button id="coachSpeak">🔊 اقرأ رسالة التشجيع</button><button id="coachStop">إيقاف الصوت</button></p><p>يمكن أن تختلف جودة النطق حسب الأصوات العربية المثبتة في جهازك.</p>';
   panel.querySelector('#coachSpeak').onclick=()=>speak('أهلاً يا بطل! تعلم خطوة خطوة. اقرأ الحرف، وحاول مرة أخرى، فأنت تستطيع.');panel.querySelector('#coachStop').onclick=()=>{if('speechSynthesis' in window) window.speechSynthesis.cancel();};
  }else if(kind==='parents'){
   const d=readData(),now=new Date(),start=new Date(now);start.setDate(now.getDate()-7);
   panel.innerHTML='<h3>👨‍👩‍👧 ملخص الأسبوع</h3><p>هذا ملخص تقريبي من بيانات التعلم المحفوظة محلياً على هذا الجهاز، وليس سجلاً زمنياً يومياً.</p><ul><li>الحروف التي تمت زيارتها: '+(d.letters?.length||0)+'</li><li>إجابات القراءة: '+(d.reading||0)+'</li><li>تدريبات الكتابة: '+(d.writing||0)+'</li><li>مسائل الحساب: '+(d.math||0)+'</li></ul><p>آخر تحديث مسجل: '+(d.updatedAt?new Date(d.updatedAt).toLocaleString('ar-IQ'):'لا توجد بيانات بعد')+'</p><p>لإحصاءات أسبوعية دقيقة نحتاج لاحقاً إلى حفظ تاريخ كل جلسة، مع إبقاء البيانات على الجهاز.</p>';
  }else if(kind==='badges'){
   const d=readData(),badges=[['مستكشف الحروف',(d.letters?.length||0)>=5],['قارئ نشيط',(d.reading||0)>=5],['كاتب صغير',(d.writing||0)>=5],['بطل الحساب',(d.math||0)>=5],['مثابر التعلم',((d.letters?.length||0)+(d.reading||0)+(d.writing||0)+(d.math||0))>=20]];
   panel.innerHTML='<h3>🏅 ألبوم الإنجازات</h3><div class="edu-extra-grid">'+badges.map(x=>'<div class="edu-extra-card"><span>'+(x[1]?'🏅':'🔒')+'</span><b>'+x[0]+'</b><small>'+(x[1]?'تم فتح الشارة!':'واصل التعلم لفتحها')+'</small></div>').join('')+'</div>';
  }else{
   panel.innerHTML='<h3>📱 إعدادات سهولة الاستخدام</h3><p>تكبير النصوص وتحسين مساحة الأزرار لتناسب الهاتف والآيباد.</p><button id="fontDown">A− تصغير النص</button><button id="fontUp">A+ تكبير النص</button><button id="contrast">تباين أعلى</button><button id="normalView">إعادة العرض الطبيعي</button><p id="accessMsg">يمكنك إعادة الإعداد الطبيعي في أي وقت.</p>';
   let scale=Number(localStorage.getItem('eduTextScale')||1);
   const apply=()=>{document.documentElement.style.fontSize=(16*scale)+'px';localStorage.setItem('eduTextScale',scale)};
   apply();panel.querySelector('#fontDown').onclick=()=>{scale=Math.max(.9,scale-.05);apply()};panel.querySelector('#fontUp').onclick=()=>{scale=Math.min(1.25,scale+.05);apply()};
   panel.querySelector('#contrast').onclick=()=>{document.body.style.filter='contrast(1.12)';};panel.querySelector('#normalView').onclick=()=>{scale=1;apply();document.body.style.filter='none'};
  }
  panel.scrollIntoView({behavior:'smooth',block:'nearest'});
 };
 wrap.querySelectorAll('[data-extra]').forEach(b=>b.addEventListener('click',()=>show(b.dataset.extra)));
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready);else ready();
})();