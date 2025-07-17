const titleInput = document.getElementById("titleInput");
const charCount = document.getElementById("charCount");
const pixelWidth = document.getElementById("pixelWidth");
const feedback = document.getElementById("feedback");
const serpTitle = document.getElementById("serpTitle");
const keywordInput = document.getElementById("keywordInput");
const keywordCheck = document.getElementById("keywordCheck");
const languageSelect = document.getElementById("languageSelect");
const brandInput = document.getElementById("brandInput");
const suggestionsList = document.getElementById("suggestionsList");
const generateBtn = document.getElementById("generateSuggestions");
const generateAI = document.getElementById("generateAI");

const pixelPerChar = 7.2;
const OPENAI_API_KEY = "YOUR_API_KEY"; // ← BURAYA kendi API key'ini gir

titleInput.addEventListener("input", updateAnalysis);
keywordInput.addEventListener("input", updateAnalysis);

document.querySelectorAll("input[name='view']").forEach(radio => {
  radio.addEventListener("change", e => {
    document.getElementById("serpPreview").style.fontSize = e.target.value === "mobile" ? "14px" : "16px";
  });
});

function updateAnalysis() {
  const title = titleInput.value.trim();
  const keyword = keywordInput.value.trim().toLowerCase();
  const length = title.length;
  const pixels = Math.round(length * pixelPerChar);

  charCount.textContent = `${length} karakter`;
  pixelWidth.textContent = `${pixels} piksel`;

  serpTitle.textContent = title || "Başlık önizlemesi burada görünecek";

  if (!title) {
    feedback.textContent = "";
    keywordCheck.textContent = "";
    return;
  }

  if (pixels < 200) {
    feedback.textContent = "⚠️ Başlık çok kısa.";
    feedback.style.color = "orange";
  } else if (pixels <= 580) {
    feedback.textContent = "✅ Başlık ideal uzunlukta.";
    feedback.style.color = "green";
  } else if (pixels <= 650) {
    feedback.textContent = "ℹ️ Biraz uzun ama kabul edilebilir.";
    feedback.style.color = "#007bff";
  } else {
    feedback.textContent = "❌ Başlık çok uzun.";
    feedback.style.color = "red";
  }

  if (keyword) {
    if (title.toLowerCase().includes(keyword)) {
      keywordCheck.textContent = "✅ Anahtar kelime başlıkta var.";
      keywordCheck.style.color = "green";
    } else {
      keywordCheck.textContent = "❌ Anahtar kelime başlıkta yok.";
      keywordCheck.style.color = "red";
    }
  } else {
    keywordCheck.textContent = "";
  }
}

// Statik öneriler
generateBtn.addEventListener("click", () => {
  const keyword = keywordInput.value.trim();
  const brand = brandInput.value.trim();
  const lang = languageSelect.value;

  suggestionsList.innerHTML = "";

  if (!keyword) {
    suggestionsList.innerHTML = "<li>Lütfen anahtar kelime girin.</li>";
    return;
  }

  const suggestions = [
    `${keyword} hakkında bilmeniz gerekenler`,
    `En iyi ${keyword} rehberi`,
    `${keyword} nasıl kullanılır?`,
    `${keyword} | ${brand || "Marka"}`,
    `${brand || "Marka"} ile ${keyword} çözümleri`,
    `2025'te en iyi ${keyword} stratejileri`,
  ];

  suggestions.forEach(s => {
    const li = document.createElement("li");
    li.textContent = s;
    suggestionsList.appendChild(li);
  });
});

// AI destekli başlık önerisi
generateAI.addEventListener("click", async () => {
  const keyword = keywordInput.value.trim();
  const brand = brandInput.value.trim();
  const lang = languageSelect.value;
  const langPrompt = lang === "en" ? "English" : "Turkish";

  suggestionsList.innerHTML = "<li>AI önerileri yükleniyor...</li>";

  if (!keyword) {
    suggestionsList.innerHTML = "<li>Lütfen anahtar kelime girin.</li>";
    return;
  }

  const prompt = `
You are an SEO expert. Suggest 5 creative and optimized page titles using the keyword "${keyword}" and optional brand name "${brand}". Language: ${langPrompt}. Titles should be within 60 characters and suitable for Google SEO.
`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7
      })
    });

    const data = await response.json();
    const content = data.choices[0].message.content;

    // Temiz listele
    suggestionsList.innerHTML = "";
    content.split("\n").forEach(line => {
      if (line.trim()) {
        const li = document.createElement("li");
        li.textContent = line.replace(/^\d+\.\s*/, ""); // baştaki sayılar silinsin
        suggestionsList.appendChild(li);
      }
    });
  } catch (error) {
    suggestionsList.innerHTML = "<li>AI öneri alınamadı. API Key doğru mu?</li>";
    console.error(error);
  }
});
