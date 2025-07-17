function checkTitle() {
  const input = document.getElementById("titleInput").value.trim();
  const charCount = input.length;
  const charCountEl = document.getElementById("charCount");
  const feedbackEl = document.getElementById("feedback");

  charCountEl.textContent = `${charCount} karakter`;

  if (charCount === 0) {
    feedbackEl.textContent = "Başlık girmediniz.";
    feedbackEl.className = "feedback-bad";
  } else if (charCount <= 60) {
    feedbackEl.textContent = "Harika! Başlığınız SEO uyumlu.";
    feedbackEl.className = "feedback-good";
  } else {
    feedbackEl.textContent = "Uyarı: Başlık 60 karakteri geçti. SEO için çok uzun olabilir.";
    feedbackEl.className = "feedback-bad";
  }
}

// Canlı karakter sayacı
document.getElementById("titleInput").addEventListener("input", checkTitle);
