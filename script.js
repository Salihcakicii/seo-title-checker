function checkTitle() {
  const input = document.getElementById("titleInput").value.trim();
  const length = input.length;
  const resultBox = document.getElementById("result");

  if (!input) {
    alert("Lütfen bir başlık girin.");
    return;
  }

  let message = `Başlık uzunluğu: ${length} karakter.<br>`;

  if (length < 50) {
    message += "🔍 Çok kısa. Daha açıklayıcı olabilir.";
  } else if (length <= 60) {
    message += "✅ Mükemmel! SEO için ideal uzunluk.";
  } else {
    message += "⚠️ Çok uzun. Google sonuçlarında kesilebilir.";
  }

  // CTA kontrolü
  const ctaWords = ["şimdi", "en iyi", "rehber", "ücretsiz", "liste", "2025", "kapsamlı"];
  const foundCTA = ctaWords.filter(word => input.toLowerCase().includes(word));

  if (foundCTA.length > 0) {
    message += `<br>🎯 Başlığınız CTA içeriyor: <strong>${foundCTA.join(", ")}</strong>`;
  } else {
    message += "<br>💡 Tıklanma oranını artırmak için güçlü kelimeler ekleyin.";
  }

  resultBox.innerHTML = message;
}
