document.getElementById("checkBtn").addEventListener("click", function () {
  const title = document.getElementById("title").value.trim();
  const keywords = document.getElementById("keywords").value.trim().toLowerCase().split(",");
  const charCountEl = document.getElementById("charCount");
  const keywordCoverageEl = document.getElementById("keywordCoverage");
  const repeatedWordsEl = document.getElementById("repeatedWords");
  const statusTextEl = document.getElementById("statusText");
  const previewEl = document.getElementById("preview");

  if (title.length === 0) {
    statusTextEl.textContent = "Lütfen bir başlık girin.";
    return;
  }

  // Google görünümü
  previewEl.textContent = title;

  // Karakter sayısı
  charCountEl.textContent = title.length + " karakter";

  // Anahtar kelime kapsamı
  let keywordMatch = 0;
  keywords.forEach(k => {
    if (k.trim() && title.toLowerCase().includes(k.trim())) keywordMatch++;
  });

  const coverage = Math.round((keywordMatch / keywords.length) * 100);
  keywordCoverageEl.textContent = coverage + "%";

  // Renkli durum
  if (title.length <= 60 && coverage >= 60) {
    statusTextEl.textContent = "Mükemmel!";
    statusTextEl.className = "green";
  } else if (title.length <= 70) {
    statusTextEl.textContent = "İdare eder.";
    statusTextEl.className = "yellow";
  } else {
    statusTextEl.textContent = "Başlık çok uzun veya anahtar kelime eksik.";
    statusTextEl.className = "red";
  }

  // Tekrar eden kelimeler
  const words = title.toLowerCase().split(" ");
  const wordMap = {};
  let repeated = [];

  words.forEach(word => {
    if (!wordMap[word]) wordMap[word] = 1;
    else wordMap[word]++;
  });

  for (let word in wordMap) {
    if (wordMap[word] > 1) repeated.push(`${word} (${wordMap[word]})`);
  }

  repeatedWordsEl.textContent = repeated.length > 0 ? repeated.join(", ") : "Yok";
});
