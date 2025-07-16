const input = document.getElementById("titleInput");
const count = document.getElementById("charCount");
const preview = document.getElementById("previewTitle");
const copyBtn = document.getElementById("copyBtn");

input.addEventListener("input", () => {
  const length = input.value.length;
  count.textContent = `${length} karakter`;

  if (length < 30) {
    count.style.color = "gray";
  } else if (length <= 60) {
    count.style.color = "green";
  } else if (length <= 80) {
    count.style.color = "orange";
  } else {
    count.style.color = "red";
  }

  preview.textContent = input.value || "Başlık burada görünecek";

  if (input.value.trim() !== "") {
    copyBtn.style.display = "inline-block";
  } else {
    copyBtn.style.display = "none";
  }
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(input.value).then(() => {
    copyBtn.textContent = "Kopyalandı!";
    setTimeout(() => {
      copyBtn.textContent = "Başlığı Kopyala";
    }, 1500);
  });
});
