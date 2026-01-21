const container = document.getElementById("cookie-container");
const cookieTop = document.getElementById('cookie-top');
const cookieBottom = document.getElementById('cookie-bottom');
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
function getRandomFortune() {
  if (!fortunes.length) return "No fortune available.";
  const randomIndex = Math.floor(Math.random() * fortunes.length);
  const fortuneObj = fortunes[randomIndex];

  if (fortuneObj.fortune.toLowerCase().includes("bad luck") || fortuneObj.fortune.toLowerCase().includes("loom")) {
    fortuneDiv.classList.add('bad-luck');
  } else {
    fortuneDiv.classList.remove('bad-luck');
  }

  return fortuneObj.fortune;
}
function crackCookie() {
  if (!fortunes.length) {
    alert("Fortunes not loaded yet.");
    return;
  }
  if (cracked) return;
  cracked = true;
  cookieTop.classList.add('cookie-cracked');
  cookieBottom.classList.add('cookie-cracked');
  setTimeout(() => {
    fortuneDiv.style.opacity = 0;
    fortuneDiv.textContent = getRandomFortune();
    fortuneDiv.style.opacity = 1;
  }, 600);
}

function resetCookie() {
  cracked = false;
  cookieTop.classList.remove('cookie-cracked');
  cookieBottom.classList.remove('cookie-cracked');
  fortuneDiv.style.opacity = 0;
  fortuneDiv.classList.remove('bad-luck');
  setTimeout(() => { fortuneDiv.textContent = ''; }, 300);
}


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

cookieTop.addEventListener('click', crackCookie);
cookieBottom.addEventListener('click', crackCookie);
resetBtn.addEventListener('click', resetCookie);
