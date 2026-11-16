
(() => {
  'use strict';

  const KEY = 'littleMuslimVoiceLocale';
  const labels = {
    msa: 'العربية الفصحى',
    iraqi: 'اللهجة العراقية'
  };

  function readLocale() {
    try {
      return localStorage.getItem(KEY) === 'iraqi' ? 'iraqi' : 'msa';
    } catch (_) {
      return 'msa';
    }
  }

  function writeLocale(value) {
    try {
      localStorage.setItem(KEY, value);
    } catch (_) {}
  }

  let locale = readLocale();

  const letterSounds = {
    ا: 'أَ', ب: 'بَ', ت: 'تَ', ث: 'ثَ',
    ج: 'جَ', ح: 'حَ', خ: 'خَ', د: 'دَ',
    ذ: 'ذَ', ر: 'رَ', ز: 'زَ', س: 'سَ',
    ش: 'شَ', ص: 'صَ', ض: 'ضَ', ط: 'طَ',
    ظ: 'ظَ', ع: 'عَ', غ: 'غَ', ف: 'فَ',
    ق: 'قَ', ك: 'كَ', ل: 'لَ', م: 'مَ',
    ن: 'نَ', ه: 'هَ', و: 'وَ', ي: 'يَ'
  };

  let speechSequence = 0;

  function speakArabicText(text, rate = 0.82) {
    return new Promise(resolve => {
      if (
        !('speechSynthesis' in window) ||
        !('SpeechSynthesisUtterance' in window)
      ) {
        resolve(false);
        return;
      }

      const content = String(text || '').trim();

      if (!content) {
        resolve(false);
        return;
      }

      try {
        const sequence = ++speechSequence;
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(content);

        utterance.lang = locale === 'iraqi' ? 'ar-IQ' : 'ar-SA';
        utterance.rate = rate;
        utterance.pitch = 1;
        utterance.volume = 1;

        const voices = window.speechSynthesis.getVoices();

        const preferred =
          voices.find(voice =>
            voice.lang.toLowerCase() ===
            (locale === 'iraqi' ? 'ar-iq' : 'ar-sa')
          ) ||
          voices.find(voice =>
            voice.lang.toLowerCase().startsWith('ar')
          );

        if (preferred) {
          utterance.voice = preferred;
        }

        utterance.onend = () => {
          resolve(sequence === speechSequence);
        };

        utterance.onerror = () => {
          resolve(false);
        };

        window.speechSynthesis.speak(utterance);

      } catch (_) {
        resolve(false);
      }
    });
  }

  function speakArabicLetter(letter) {
    const character = String(letter || '').trim();
    const sound = letterSounds[character] || character;

    return speakArabicText(sound, 0.78);
  }

  function stopArabicSpeech() {
    speechSequence++;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  window.speakArabicText = speakArabicText;
  window.speakArabicLetter = speakArabicLetter;
  window.stopArabicSpeech = stopArabicSpeech;

  window.getPreferredVoiceLocale = () => locale;

  // إيقاف النطق عند مغادرة الصفحة
  window.addEventListener('pagehide', stopArabicSpeech);

  // تفعيل أزرار القراءة والأذكار
  function activateReadingButtons() {
    const speakReadBtn = document.getElementById('speakRead');

    if (speakReadBtn) {
      speakReadBtn.disabled = false;
      speakReadBtn.textContent = '🔊 استمع للكلمة';
      speakReadBtn.removeAttribute('title');

      speakReadBtn.onclick = () => {
        if (window.gameSoundEnabled === false) return;

        const word = (document.getElementById('readWord') ? document.getElementById('readWord').textContent : null);

        if (word && word.trim()) {
          speakArabicText(word, 0.75);
        }
      };
    }

    const speakIslamBtn = document.getElementById('speakIslam');

    if (speakIslamBtn) {
      speakIslamBtn.disabled = false;
      speakIslamBtn.textContent = '🔊 استمع للذكر';
      speakIslamBtn.removeAttribute('title');

      speakIslamBtn.onclick = () => {
        if (window.gameSoundEnabled === false) return;

        const dua = (document.getElementById('islamText') ? document.getElementById('islamText').textContent : null);

        if (dua && dua.trim()) {
          speakArabicText(dua, 0.8);
        }
      };
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener(
      'DOMContentLoaded',
      activateReadingButtons,
      { once: true }
    );
  } else {
    activateReadingButtons();
  }

  // تصميم إعدادات الصوت
  const style = document.createElement('style');

  style.textContent = `
    #voiceSettingsBtn {
      border: 1px solid #ffffff66;
      background: #ffffff20;
      color: inherit;
      border-radius: 12px;
      padding: 9px 11px;
      font: inherit;
      font-weight: bold;
      cursor: pointer;
    }

    #voiceSettingsPanel {
      position: fixed;
      inset: 0;
      background: #102c2188;
      z-index: 9999;
      display: none;
      place-items: center;
      padding: 16px;
    }

    #voiceSettingsPanel.open {
      display: grid;
    }

    #voiceSettingsPanel .voice-card {
      width: min(420px, 100%);
      background: #fff;
      color: #183b35;
      border-radius: 20px;
      padding: 20px;
      box-shadow: 0 12px 40px #0003;
    }

    #voiceSettingsPanel h2 {
      margin-top: 0;
      color: #145b48;
    }

    #voiceSettingsPanel label {
      display: flex;
      gap: 10px;
      align-items: center;
      padding: 12px;
      background: #f0f8f2;
      border-radius: 12px;
      margin: 8px 0;
      cursor: pointer;
    }

    #voiceSettingsPanel input {
      accent-color: #145b48;
      width: 18px;
      height: 18px;
    }

    #voiceSettingsPanel .voice-note {
      line-height: 1.8;
      background: #fff5dc;
      padding: 11px;
      border-radius: 12px;
      font-size: 13px;
      margin-top: 12px;
    }

    #voiceSettingsPanel .voice-actions {
      display: flex;
      gap: 8px;
      margin-top: 14px;
    }

    #voiceSettingsPanel button {
      border: 0;
      border-radius: 12px;
      padding: 11px 14px;
      font: inherit;
      font-weight: bold;
      cursor: pointer;
    }

    #voiceSettingsPanel .save {
      background: #145b48;
      color: white;
    }

    #voiceSettingsPanel .close {
      background: #edf5ef;
      color: #145b48;
    }

    @media (max-width: 520px) {
      #voiceSettingsBtn {
        font-size: 11px;
        padding: 8px 7px;
        white-space: nowrap;
      }

      header .top-actions {
        flex-wrap: wrap;
        justify-content: flex-end;
      }

      header {
        flex-wrap: wrap;
      }
    }
  `;

  document.head.appendChild(style);

  // إنشاء زر إعدادات الصوت
  const header = document.querySelector('header');

  if (header && !document.getElementById('voiceSettingsBtn')) {
    const host = header.querySelector('.top-actions') || header;

    const button = document.createElement('button');
    button.id = 'voiceSettingsBtn';
    button.type = 'button';
    button.textContent = '🗣️ ' + labels[locale];
    button.setAttribute('aria-label', 'إعدادات لغة الصوت');

    host.appendChild(button);

    const panel = document.createElement('div');
    panel.id = 'voiceSettingsPanel';

    panel.innerHTML = `
      <div class="voice-card"
           role="dialog"
           aria-modal="true"
           aria-labelledby="voiceSettingsTitle">

        <h2 id="voiceSettingsTitle">🗣️ لغة الصوت</h2>

        <p>اختر اللهجة التي تفضّلها للتعلّم:</p>

        <label>
          <input type="radio" name="voiceLocale" value="msa">
          <span>
            <b>العربية الفصحى</b><br>
            <small>نطق تعليمي باللغة العربية الفصحى</small>
          </span>
        </label>

        <label>
          <input type="radio" name="voiceLocale" value="iraqi">
          <span>
            <b>اللهجة العراقية</b><br>
            <small>طلب صوت عراقي إذا كان متاحاً على الجهاز</small>
          </span>
        </label>

        <div class="voice-note">
          يدعم النظام نطق الحروف والكلمات والأذكار.
          الصوت آلي ويعتمد على الأصوات المتوفرة في جهازك،
          وقد لا يتوفر صوت عراقي في جميع الأجهزة.
        </div>

        <div class="voice-actions">
          <button class="save" type="button">حفظ الاختيار</button>
          <button class="close" type="button">إغلاق</button>
        </div>
      </div>
    `;

    document.body.appendChild(panel);

    const radios = [
      ...panel.querySelectorAll('input[name="voiceLocale"]')
    ];

    function render() {
      radios.forEach(radio => {
        radio.checked = radio.value === locale;
      });

      button.textContent = '🗣️ ' + labels[locale];
    }

    function open() {
      panel.classList.add('open');
      render();
    }

    function close() {
      panel.classList.remove('open');
    }

    button.addEventListener('click', open);

    panel.querySelector('.close').addEventListener('click', close);

    panel.addEventListener('click', event => {
      if (event.target === panel) close();
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') close();
    });

    panel.querySelector('.save').addEventListener('click', () => {
      const selected = radios.find(radio => radio.checked);

      if (!selected) return;

      locale = selected.value;
      writeLocale(locale);

      render();
      close();

      stopArabicSpeech();

      window.dispatchEvent(
        new CustomEvent('voice-locale-change', {
          detail: { locale }
        })
      );
    });

    render();
  }

})();
