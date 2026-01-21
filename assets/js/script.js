const container = document.getElementById("cookie-container");
const resetBtn = document.getElementById('reset');
let cracked = false;
const fortuneDiv = document.getElementById('fortune');
let fortunes = [];

const xhr = new XMLHttpRequest();
xhr.open('GET', './assets/jsondata/fortune_cookies_100000.json', true);
xhr.responseType = 'json';

xhr.onload = function() {
  if (xhr.status === 200) {
    fortunes = xhr.response;
    fortuneDiv.textContent = "Fortunes loaded! Click the cookie to reveal a fortune.";
  } else {
    console.error("Failed to load fortunes:", xhr.statusText);
    fortuneDiv.textContent = "Failed to load JSON";
  }
};

xhr.onerror = function() {
  console.error("Network error while loading fortunes");
  fortuneDiv.textContent = "Failed to load JSON";
};

xhr.send();

// when cookie is clicked
container.addEventListener("click", () => {
  if (!fortunes.length) return;

  const pick = fortunes[Math.floor(Math.random() * fortunes.length)];
  fortuneDiv.textContent = pick.fortune;

  fortuneDiv.classList.toggle("bad", /know what you did|karma|careless|mistake/i.test(pick.fortune));

  container.classList.add("open");
});

// reset
resetBtn.addEventListener("click", () => {
  container.classList.remove("open");
  fortuneDiv.textContent = "";
  fortuneDiv.classList.remove("bad");
});