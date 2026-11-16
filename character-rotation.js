(() => {
  'use strict';
  const characters = [
    { name: 'عبد الحي', image: './boy.jpg', alt: 'عبد الحي الطفل', message: 'مرحباً يا بطل! أنا عبد الحي، هيا نتعلم ونكتشف أشياء جديدة.' },
    { name: 'صهيب', image: './rabbit.png', alt: 'صهيب الأرنب', message: 'أهلاً! أنا صهيب، سأشجعك في كل محاولة.' },
    { name: 'عبدالمهيمن', image: './cat.png', alt: 'عبدالمهيمن القط', message: 'مرحباً! أنا عبدالمهيمن، لنفكر ونتعلم معاً.' },
    { name: 'عائشة', image: './girl.png', alt: 'عائشة الطفلة', message: 'أهلاً يا صديقي! أنا عائشة، هيا نكمل المغامرة.' }
  ];
  const image = document.getElementById('coachImg');
  const name = document.getElementById('coachName');
  const message = document.getElementById('coachText');
  if (!image || !name || !message) return;
  let index = 0;
  let timer = null;
  function showCharacter(next) {
    index = next % characters.length;
    const character = characters[index];
    image.classList.remove('character-enter');
    image.src = character.image;
    image.alt = character.alt;
    name.textContent = character.name;
    message.textContent = character.message;
    void image.offsetWidth;
    image.classList.add('character-enter');
  }
  function start() {
    if (timer !== null || document.hidden) return;
    timer = window.setInterval(() => showCharacter(index + 1), 5000);
  }
  function stop() {
    if (timer !== null) window.clearInterval(timer);
    timer = null;
  }
  showCharacter(0);
  start();
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else start();
  });
})();
