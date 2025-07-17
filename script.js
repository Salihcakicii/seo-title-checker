const titleInput = document.getElementById("titleInput");
const charCount = document.getElementById("charCount");
const feedback = document.getElementById("feedback");

titleInput.addEventListener("input", () => {
  const text = titleInput.value.trim();
  const length = text.length;

  charCount.textContent = `${length} karakter`;

  if (length === 0) {
    feedback.textContent = "";
    feedback.style.color = "#333";
  } else if (length < 30) {
    feedback.textContent = "⚠️ Başlık çok kısa";
    feedback.style.color = "orange";
  } else if (length <= 60) {
    feedback.textContent = "✅ SEO için ideal uzunluk";
    feedback.style.color = "green";
  } else if (length <= 70) {
    feedback.textContent = "ℹ️ Kabul edilebilir ama biraz uzun";
    feedback.style.color = "#007bff";
  } else {
    feedback.textContent = "❌ Başlık çok uzun (arama sonuçlarında kesilebilir)";
    feedback.style.color = "red";
  }
});
