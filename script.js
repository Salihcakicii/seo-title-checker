function checkTitle() {
  const title = document.getElementById("title").value.trim();
  const keyword = document.getElementById("keyword").value.trim();
  const feedback = document.getElementById("feedback");

  if (!title) {
    feedback.innerHTML = '<span class="bad">Başlık boş bırakılamaz.</span>';
    return;
  }

  let lengthFeedback = '';
  const length = title.length;

  if (length >= 50 && length <= 60) {
    lengthFeedback = '<span class="good">✅ Uzunluk ideal: ' + length + ' karakter</span>';
  } else if (length < 50) {
    lengthFeedback = '<span class="warning">⚠️ Kısa: ' + length + ' karakter (50-60 önerilir)</span>';
  } else {
    lengthFeedback = '<span class="warning">⚠️ Uzun: ' + length + ' karakter (maks. 60 önerilir)</span>';
  }

  let keywordFeedback = '';
  if (keyword && title.toLowerCase().includes(keyword.toLowerCase())) {
    keywordFeedback = '<span class="good">✅ Anahtar kelime içeriyor</span>';
  } else {
    keywordFeedback = '<span class="bad">❌ Anahtar kelime bulunamadı</span>';
  }

  feedback.innerHTML = lengthFeedback + '<br>' + keywordFeedback;
}
